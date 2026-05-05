

import breedsJson from './breeds.json';

// ─── Breed Info ───────────────────────────────────────────────────────────────

export const BREED_INFO: Record<string, BreedDetail> = breedsJson as Record<string, BreedDetail>;


  // ─── Types ────────────────────────────────────────────────────────────────────

export interface BreedDetail {
  origin: string;
  description: string;
  averageLifespan: string;
  averageWeight: string;
  temperament: string;
  temperamentDetail: string;
  physicalCharacteristics: string;
  healthIssues: string;
  /** Parsed array version of healthIssues for bullet-list display */
  commonIllnesses: string[];
  recommendedCare: string;
  dietaryNeeds: string;
  funFact: string;
}


/** The canonical shape used everywhere in the app */
export interface BreedIdentification {
  id: string;
  breedName: string;
  /** 0–1 fraction (e.g. 0.91 = 91%) */
  confidence: number;
  secondaryBreed: string | null;
  secondaryConfidence: number | null;
  isMixed: boolean;
  allPredictions: { breed: string; confidence: number }[];
  imageUrl: string;
  timestamp: Date;
  details: BreedDetail;
}

export interface ApiResponse {
  success: boolean;
  data?: BreedIdentification;
  error?: string;
  errorType?: "not_a_cat" | "general";
}


export async function identifyBreed(imageData: string): Promise<ApiResponse> {
  try {
    const res = await fetch(imageData);
    const blob = await res.blob();
    const file = new File([blob], "cat.jpg", { type: blob.type });

    const form = new FormData();
    form.append("file", file);

    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: form,
    });

    // Handle the "not a cat" rejection from the gate model
    if (response.status === 422) {
      const errBody = await response.json();
      const detail = errBody?.detail;
      if (detail?.error === "not_a_cat") {
        return {
          success: false,
          errorType: "not_a_cat",
          error: detail.message ?? "No cat detected in this image.",
        };
      }
    }

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const raw = await response.json();

    const breedName = raw.dominant_breed as string;
    const rawInfo = BREED_INFO[breedName];

    // Build a safe details object whether or not we have breed info
    const details: BreedDetail = rawInfo ?? {
          origin: "Unknown",
          description: "No description available.",
          averageLifespan: "Unknown",
          averageWeight: "Unknown",
          temperament: "Unknown",
          temperamentDetail: "No temperament data available.",
          physicalCharacteristics: "Unknown",
          healthIssues: "No data available.",
          commonIllnesses: [],
          recommendedCare: "Consult your vet.",
          dietaryNeeds: "Standard balanced cat food.",
          funFact: "No fun fact available.",
        };


    return {
      success: true,
      data: {
        id: `${breedName}-${Date.now()}`,
        breedName,
        // Backend returns 0–100; we normalise to 0–1 for the BreedCard progress bar
        confidence: raw.dominant_confidence,
        secondaryBreed: raw.secondary_breed ?? null,
        secondaryConfidence: raw.secondary_confidence
          ? raw.secondary_confidence
          : null,
        isMixed: raw.is_mixed,
        allPredictions: (raw.all_predictions ?? []).map(
          (p: { breed: string; confidence: number }) => ({
            breed: p.breed,
            confidence: p.confidence ,
          })
        ),
        imageUrl: imageData,
        timestamp: new Date(),
        details,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}