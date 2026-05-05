import { BreedDetail } from "./api";


export interface BreedIdentification {
  id: string;
  breedName: string;
  confidence: number;
  secondaryBreed: string | null;
  secondaryConfidence: number | null;
  isMixed: boolean;
  allPredictions: { breed: string; confidence: number }[];
  imageUrl: string;
  timestamp: string;
  info: BreedDetail | null;
}

export interface ApiResponse {
  success: boolean;
  data?: BreedIdentification;
  error?: string;
}