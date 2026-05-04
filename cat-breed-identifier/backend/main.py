"""
Cat Breed Identifier — FastAPI Backend
Run with: uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import tensorflow.compat.v1 as tf_compat
import numpy as np
from PIL import Image
import io

app = FastAPI(title="Cat Breed Identifier API")

# Allow requests from local React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

CLASS_NAMES = [
    "Abyssinian", "American Bobtail", "American Shorthair", "Bengal", "Birman",
    "Bombay", "British Shorthair", "Egyptian Mau", "Maine Coon", "Persian",
    "Ragdoll", "Russian Blue", "Siamese", "Sphynx", "Tuxedo",
]

# Load model once on startup
model = None

@app.on_event("startup")
def load_model():
    global model
    try:

        model = tf.keras.models.load_model("pet_identifier_model.keras", safe_mode=False, compile=False)
        print("Model loaded successfully.")
        print(model.summary())
    except Exception as e:
        print(f"Failed to load model: {e}")
        print("Using random predictions fallback.")
        model = None


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image.")

    contents = await file.read()
    try:
        image = Image.open(io.BytesIO(contents)).convert("RGB")
    except Exception:
        raise HTTPException(status_code=400, detail="Could not open image.")

    # Preprocess — matches training pipeline
    img = image.resize((224, 224))
    img_array = np.array(img, dtype=np.float32) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    if model is None:
        # Fallback random predictions
        scores = np.random.dirichlet(np.ones(len(CLASS_NAMES)), size=1)[0]
    else:
        predictions = model.predict(img_array)
        scores = tf.nn.softmax(predictions[0]).numpy()
# Build all_predictions sorted by confidence desc
    all_predictions = sorted(
        [{"breed": CLASS_NAMES[i], "confidence": float(scores[i]) * 100}
         for i in range(len(CLASS_NAMES))],
        key=lambda x: x["confidence"],
        reverse=True,
    )

    top = all_predictions[0]
    second = all_predictions[1]
    is_mixed = top["confidence"] < 75

    return {
        "dominant_breed": top["breed"],
        "dominant_confidence": round(top["confidence"], 2),
        "secondary_breed": second["breed"] if is_mixed else None,
        "secondary_confidence": round(second["confidence"], 2) if is_mixed else None,
        "is_mixed": is_mixed,
        "all_predictions": all_predictions[:5],  # Top 5 for the confidence tab
    }