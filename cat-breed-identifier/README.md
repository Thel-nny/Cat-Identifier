## Cat Breed Identifier Model

A full-stack machine learning web application that identifies cat breeds from uploaded photos and provides detailed breed information including diet, health, temperament, and care tips. 

Built for **SE 3231: Machine Learning Finals**.

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | Next.js 14, TypeScript, Tailwind CSS    |
| Backend   | FastAPI, Python                         |
| ML Model  | EfficientNetB3 (TensorFlow / Keras)     |
| Training  | Jupyter Notebook, scikit-learn          |


## Project Structure

cat-breed-identifier/
├── main.py                          # FastAPI backend
├── pet_identifier_model_2.keras     # Trained EfficientNetB3 model
├── cat_breeds_classes.npy           # Class names saved during training
├── best_phase1.keras                # Phase 1 checkpoint (head only)
├── best_phase2.keras                # Phase 2 checkpoint (fine-tuned)
├── cat_breeds_improved.ipynb        # Training notebook
│
└── src/
    ├── app/
    │   ├── page.tsx                 # Landing page
    │   └── app/
    │       └── page.tsx             # Main identifier app
    │
    ├── components/
    │   ├── UploadSection.tsx        # Drag-and-drop image uploader
    │   ├── BreedCard.tsx            # Breed result display card
    │   ├── HistorySidebar.tsx       # Scan history panel
    │   └── NotACat.tsx              # Error screen for non-cat images
    │
    └── lib/
        ├── api.ts                   # API calls + breed info data
        └── types.ts                 # Shared TypeScript types
```

---

## Supported Breeds

The model can identify **15 cat breeds**:

| | | |
|---|---|---|
| Abyssinian | American Bobtail | American Shorthair |
| Bengal | Birman | Bombay |
| British Shorthair | Egyptian Mau | Maine Coon |
| Persian | Ragdoll | Russian Blue |
| Siamese | Sphynx | Tuxedo |

---

## Setup & Installation

---

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm

---

### 1. Clone or download the project

``` bash
cd cat-breed-identifier
```

---

### 2. Backend Setup


open a terminal for the server

``` bash
cd backend

```

Install Python dependencies:

```bash
venv/Scripts/activate pip install fastapi uvicorn tensorflow pillow numpy
```

Start the backend server:

```bash
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup

open another terminal for the frontend

``` bash
cd src

```

Install Node dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

> Make sure the backend is running on port 8000 before using the app.

---

## How It Works

### Prediction Flow

```
User uploads image
       │
       ▼
FastAPI receives image
       │
       ▼
Cat Gate Check
  ├─ Top confidence < 40%  → Reject (not a cat)
  ├─ Prediction entropy too high → Reject (not a cat)
  └─ Passes → Continue
       │
       ▼
EfficientNetB3 breed classifier
       │
       ▼
Return top 5 predictions + breed info
       │
       ▼
Frontend displays BreedCard with tabs:
  Overview / Temperament / Diet / Health
```

### Non-Cat Detection

The app uses two signals from the breed model itself to reject non-cat images — no second model required:

- **Confidence threshold** — if the top breed score is below 30%, the image is rejected
- **Entropy check** — if predictions are spread too evenly across all breeds (high uncertainty), the image is rejected

To adjust sensitivity, edit these values in `main.py`:

```python
CAT_CONFIDENCE_THRESHOLD = 40.0   # lower = more lenient, higher = stricter
CAT_ENTROPY_THRESHOLD    = 2.3    # lower = stricter, higher = more lenient
```

---

## Model Training

The model was trained in two phases using `cat_breeds_improved.ipynb`:

**Phase 1 — Head training (20 epochs)**
- EfficientNetB3 backbone frozen
- Only the classification head is trained
- Learning rate: `1e-3`

**Phase 2 — Fine-tuning (30 epochs)**
- Last 40 backbone layers unfrozen
- Very low learning rate: `1e-5`
- Early stopping + ReduceLROnPlateau callbacks

**Other improvements over the original MobileNetV2 model:**
- Data augmentation (flip, rotation, zoom, brightness, contrast)
- Class weight balancing via `sklearn`
- ModelCheckpoint saves the best weights automatically
- Input resolution upgraded from 224×224 to 300×300
