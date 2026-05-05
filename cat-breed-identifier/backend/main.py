"""
Cat Breed Identifier — FastAPI Backend
Run with: uvicorn main:app --reload --port 8000

Model files needed in this folder:
  - pet_identifier_model_2.keras   (primary — EfficientNetB3 fine-tuned)
  - cat_breeds_classes.npy         (class names saved during training)

Fallback order if primary is missing:
  best_phase2.keras → best_phase1.keras

Non-cat detection strategy:
  We use two signals from the breed model itself — no second model needed:
    1. Top confidence < 30%  → model is very uncertain = likely not a cat
    2. Entropy of predictions is very high → all breeds equally likely = not a cat
  This works because a model trained only on cats will produce low, spread-out
  scores when it sees something it was never trained on (humans, dogs, etc.)
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import os

app = FastAPI(title="Cat Breed Identifier API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Config ────────────────────────────────────────────────────────────────────

MODEL_CANDIDATES = [
    "pet_identifier_model_2.keras",
    "best_phase2.keras",
    "best_phase1.keras",
]

IMG_SIZE = (300, 300)

FALLBACK_CLASS_NAMES = [
    "Abyssinian", "American Bobtail", "American Shorthair", "Bengal", "Birman",
    "Bombay", "British Shorthair", "Egyptian Mau", "Maine Coon", "Persian",
    "Ragdoll", "Russian Blue", "Siamese", "Sphynx", "Tuxedo",
]

# If the top breed confidence is below this, we reject as "not a cat".
# Your model should be 40-90%+ confident on real cat photos.
# Non-cat images typically score 5-20% on the top class.
CAT_CONFIDENCE_THRESHOLD = 40.0  # percent

# Maximum allowed prediction entropy (log-scale).
# High entropy = model equally unsure about all breeds = not a cat.
# For 15 classes: max entropy = ln(15) ≈ 2.71
# Threshold at ~85% of max entropy
CAT_ENTROPY_THRESHOLD = 2.3

model       = None
CLASS_NAMES = FALLBACK_CLASS_NAMES


# ── Startup ───────────────────────────────────────────────────────────────────

@app.on_event("startup")
def load_models():
    global model, CLASS_NAMES

    npy_path = "cat_breeds_classes.npy"
    if os.path.exists(npy_path):
        CLASS_NAMES = [str(c) for c in np.load(npy_path, allow_pickle=True)]
        print(f"Loaded {len(CLASS_NAMES)} class names from {npy_path}")
    else:
        print(f"Warning: {npy_path} not found — using hardcoded class names")

    for candidate in MODEL_CANDIDATES:
        if os.path.exists(candidate):
            print(f"Loading breed model: {candidate}")
            model = tf.keras.models.load_model(candidate, compile=False)
            print(f"Model loaded. Input shape: {model.input_shape}")
            return

    raise RuntimeError(f"No model file found. Tried: {MODEL_CANDIDATES}")


# ── Helpers ───────────────────────────────────────────────────────────────────

def check_is_cat(scores: np.ndarray) -> tuple[bool, str]:
    """
    Given softmax scores from the breed model, decide if the image
    looks like a cat at all.

    Returns (is_cat, reason_string).
    """
    top_confidence = float(np.max(scores)) * 100

    # Signal 1 — top confidence too low
    if top_confidence < CAT_CONFIDENCE_THRESHOLD:
        return False, (
            f"The model is only {top_confidence:.1f}% confident — "
            "this doesn't look like a cat."
        )

    # Signal 2 — prediction entropy too high (uniform distribution)
    eps = 1e-9  # avoid log(0)
    entropy = float(-np.sum(scores * np.log(scores + eps)))
    if entropy > CAT_ENTROPY_THRESHOLD:
        return False, (
            "The model couldn't find any cat-like features in this image."
        )

    return True, "ok"


# ── Health check ──────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {
        "status": "ok",
        "model_loaded": model is not None,
        "num_classes": len(CLASS_NAMES),
        "classes": CLASS_NAMES,
        "cat_confidence_threshold_pct": CAT_CONFIDENCE_THRESHOLD,
        "cat_entropy_threshold": CAT_ENTROPY_THRESHOLD,
    }


# ── Prediction ────────────────────────────────────────────────────────────────

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    contents = await file.read()
    try:
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Could not open image.")

    # Preprocess — EfficientNetB3, no /255 normalisation
    img = image.resize(IMG_SIZE)
    img_array = np.array(img, dtype=np.float32)
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array, verbose=0)
    scores = predictions[0]

    # ── Cat gate ──────────────────────────────────────────────────────────────
    is_cat, reason = check_is_cat(scores)
    if not is_cat:
        raise HTTPException(
            status_code=422,
            detail={
                "error": "not_a_cat",
                "message": f"No cat detected. {reason} Please upload a clear photo of a cat.",
            },
        )

    # ── Breed prediction ──────────────────────────────────────────────────────
    all_predictions = sorted(
        [
            {"breed": CLASS_NAMES[i], "confidence": round(float(scores[i]) * 100, 2)}
            for i in range(len(CLASS_NAMES))
        ],
        key=lambda x: x["confidence"],
        reverse=True,
    )

    top    = all_predictions[0]
    second = all_predictions[1]
    is_mixed = top["confidence"] < 75

    return {
        "dominant_breed":       top["breed"],
        "dominant_confidence":  top["confidence"],
        "secondary_breed":      second["breed"] if is_mixed else None,
        "secondary_confidence": second["confidence"] if is_mixed else None,
        "is_mixed":             is_mixed,
        "all_predictions":      all_predictions[:5],
    }