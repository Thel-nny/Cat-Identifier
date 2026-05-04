import { ApiResponse } from "./types";

// ─── Breed Info ───────────────────────────────────────────────────────────────

export const BREED_INFO: Record<string, BreedDetail> = {
  Abyssinian: {
    origin: "Ethiopia",
    description:
      "The Abyssinian is a slender, medium-sized cat with a short, fine coat that comes in various colors. They are known for their playful and active nature.",
    averageLifespan: "9–15 years",
    averageWeight: "Male (7–10 lbs) · Female (6–8 lbs)",
    temperament: "Active, Energetic, Independent",
    temperamentDetail:
      "Highly intelligent and very inquisitive — they love to investigate and tend to collect things that grab their interest. Best with another Abyssinian or a playful dog. Can be good with children, but may not suit households with very young kids due to their active nature and dislike of rough handling.",
    physicalCharacteristics: "Short, fine coat; large ears; almond-shaped eyes",
    healthIssues:
      "Dental disease, kidney problems, early periodontal disease, hyperesthesia syndrome, patellar luxation, progressive retinal atrophy, pyruvate kinase deficiency, renal amyloidosis",
    recommendedCare:
      "Regular playtime and dental care. Keep them mentally stimulated with interactive toys and puzzles, and provide plenty of exercise opportunities to prevent obesity.",
    dietaryNeeds:
      "High-protein, nutrient-dense diet rich in quality animal meat (chicken, fish, or beef). Low in carbohydrates and fillers, with a mix of wet and dry food for proper hydration. Taurine supplements recommended.",
    funFact: "One of the oldest known cat breeds, often depicted in ancient Egyptian art.",
  },

  "American Bobtail": {
    origin: "United States",
    description:
      "An athletic breed that looks like a bobtailed wildcat with many dog-like tendencies. Medium to large with a distinctive short tail, muscular build, and wild appearance — yet friendly and playful.",
    averageLifespan: "13–15 years",
    averageWeight: "Male (12–16 lbs) · Female (7–11 lbs)",
    temperament: "Friendly, Playful, Intelligent",
    temperamentDetail: "Adaptable and sociable; bonds closely with family members.",
    physicalCharacteristics: "Short tail (1–4 inches); muscular build; shaggy coat",
    healthIssues: "Spinal issues due to shortened tail, obesity",
    recommendedCare: "Regular exercise, balanced diet, routine vet check-ups",
    dietaryNeeds: "High-quality cat food with balanced nutrients",
    funFact: "The American Bobtail's short tail is the result of a natural genetic mutation.",
  },

  "American Shorthair": {
    origin: "United States",
    description:
      "A medium to large cat with a sturdy build and short, dense coat. Known for their calm and easygoing personality.",
    averageLifespan: "15–20 years",
    averageWeight: "Male (10–15 lbs) · Female (8–12 lbs)",
    temperament: "Calm, Easygoing, Affectionate",
    temperamentDetail: "Highly adaptable and great with families, children, and other pets.",
    physicalCharacteristics: "Short, dense coat; round face; muscular build",
    healthIssues: "Hypertrophic cardiomyopathy, obesity",
    recommendedCare: "Regular playtime, balanced diet, routine vet check-ups",
    dietaryNeeds: "High-quality cat food with balanced nutrients",
    funFact:
      "One of the most popular cat breeds in the United States, known for its adaptability and friendly nature.",
  },

  Bengal: {
    origin: "United States",
    description:
      "A large, muscular cat with a distinctive spotted or marbled coat. Known for their energetic and playful personality.",
    averageLifespan: "12–16 years",
    averageWeight: "Male (10–15 lbs) · Female (8–12 lbs)",
    temperament: "Active, Playful, Affectionate",
    temperamentDetail: "Highly energetic and curious; needs plenty of stimulation and space to roam.",
    physicalCharacteristics: "Spotted or marbled coat; large, muscular build; bright eyes",
    healthIssues: "Hypertrophic cardiomyopathy, hip dysplasia",
    recommendedCare: "Daily playtime, regular vet check-ups, high-quality diet",
    dietaryNeeds: "High-protein diet with essential nutrients; grain-free preferred",
    funFact: "Bengals were bred to look like wild leopards but have the temperament of domestic cats.",
  },

  Birman: {
    origin: "France",
    description:
      "A medium to large cat with a long, silky coat and striking blue eyes. Known for their gentle and affectionate nature.",
    averageLifespan: "12–16 years",
    averageWeight: "Male (10–12 lbs) · Female (8–10 lbs)",
    temperament: "Gentle, Affectionate, Social",
    temperamentDetail: "Calm and loving; enjoys being around people and gets along well with other pets.",
    physicalCharacteristics: "Long, silky coat; blue eyes; color-pointed pattern",
    healthIssues: "Hypertrophic cardiomyopathy, kidney disease",
    recommendedCare: "Regular grooming, balanced diet, routine vet check-ups",
    dietaryNeeds: "High-quality cat food with balanced nutrients; wet food helps with hydration",
    funFact: "Often referred to as 'Sacred Cats of Burma' and believed to bring good luck.",
  },

  Bombay: {
    origin: "United States",
    description:
      "A medium-sized cat with a sleek, black coat and striking copper or gold eyes. Known for their affectionate and social nature.",
    averageLifespan: "12–16 years",
    averageWeight: "Male (8–11 lbs) · Female (6–9 lbs)",
    temperament: "Affectionate, Social, Intelligent",
    temperamentDetail: "Loves attention and follows owners around; often compared to a dog in loyalty.",
    physicalCharacteristics: "Sleek black coat; copper or gold eyes; muscular build",
    healthIssues: "Hypertrophic cardiomyopathy, respiratory issues",
    recommendedCare: "Regular playtime, balanced diet, routine vet check-ups",
    dietaryNeeds: "High-quality cat food; moderate calories to prevent weight gain",
    funFact:
      "Bred to resemble a miniature black panther, combining traits of the Burmese and American Shorthair.",
  },

  "British Shorthair": {
    origin: "United Kingdom",
    description:
      "A medium to large cat with a sturdy build and dense, plush coat. Known for their calm and easygoing personality.",
    averageLifespan: "12–20 years",
    averageWeight: "Male (9–17 lbs) · Female (7–12 lbs)",
    temperament: "Calm, Easygoing, Affectionate",
    temperamentDetail: "Independent yet loving; not overly demanding but enjoys companionship.",
    physicalCharacteristics: "Dense, plush coat; round face; muscular build",
    healthIssues: "Hypertrophic cardiomyopathy, obesity, hemophilia",
    recommendedCare: "Regular playtime, balanced diet, routine vet check-ups",
    dietaryNeeds: "Portion-controlled diet; prone to weight gain with sedentary lifestyle",
    funFact: "One of the oldest cat breeds in the world, with a history dating back to Roman times.",
  },

  "Egyptian Mau": {
    origin: "Egypt",
    description:
      "A medium-sized cat with a distinctive spotted coat and striking green eyes. Known for their agility and playful nature.",
    averageLifespan: "12–15 years",
    averageWeight: "Male (8–12 lbs) · Female (6–10 lbs)",
    temperament: "Agile, Playful, Affectionate",
    temperamentDetail: "Loyal and devoted to their family; can be shy with strangers.",
    physicalCharacteristics: "Spotted coat; green eyes; muscular build",
    healthIssues: "Hypertrophic cardiomyopathy, sensitivity to anaesthesia",
    recommendedCare: "Daily playtime, regular vet check-ups, high-quality diet",
    dietaryNeeds: "High-protein diet with essential nutrients",
    funFact:
      "The only naturally spotted breed of domestic cat; considered a symbol of good luck in ancient Egyptian culture.",
  },

  "Maine Coon": {
    origin: "United States",
    description:
      "A large, muscular cat with a long, shaggy coat and tufted ears. Known for their friendly and sociable nature.",
    averageLifespan: "12–15 years",
    averageWeight: "Male (13–18 lbs) · Female (8–12 lbs)",
    temperament: "Friendly, Sociable, Playful",
    temperamentDetail: "Often called 'the dog of the cat world' — loyal, trainable, and loves water.",
    physicalCharacteristics: "Long, shaggy coat; tufted ears; large, muscular build",
    healthIssues: "Hypertrophic cardiomyopathy, hip dysplasia, obesity",
    recommendedCare: "Regular playtime, large-breed kibble, routine vet check-ups",
    dietaryNeeds: "Large-breed formula kibble; supports joint health and dental hygiene",
    funFact: "One of the largest domesticated cat breeds, with males weighing up to 18 pounds.",
  },

  Persian: {
    origin: "Iran",
    description:
      "A medium to large cat with a long, dense coat and sweet, docile personality. Known for their distinctive flat faces and large, round eyes.",
    averageLifespan: "12–16 years",
    averageWeight: "Male (9–14 lbs) · Female (7–11 lbs)",
    temperament: "Sweet, Docile, Affectionate",
    temperamentDetail: "Calm and quiet; prefers a peaceful indoor environment and gentle handling.",
    physicalCharacteristics: "Long, dense coat; flat face; large, round eyes",
    healthIssues: "Respiratory issues, dental problems, eye drainage",
    recommendedCare: "Daily grooming, regular eye and dental care, interactive play",
    dietaryNeeds:
      "High-protein, nutrient-dense diet. Mix of wet and dry food for hydration. Chicken, fish, or beef with taurine supplements.",
    funFact: "One of the oldest cat breeds, with a history dating back to ancient Persia.",
  },

  Ragdoll: {
    origin: "United States",
    description:
      "A large, muscular cat with a semi-long coat and striking blue eyes. Known for their docile and affectionate nature.",
    averageLifespan: "12–17 years",
    averageWeight: "Male (15–20 lbs) · Female (10–15 lbs)",
    temperament: "Docile, Affectionate, Social",
    temperamentDetail: "Extremely gentle and patient; great with children and other pets.",
    physicalCharacteristics: "Semi-long coat; blue eyes; color-pointed pattern",
    healthIssues: "Hypertrophic cardiomyopathy, kidney disease",
    recommendedCare: "Regular grooming, controlled portions, routine vet check-ups",
    dietaryNeeds: "High-quality cat food; portion-controlled due to low activity levels",
    funFact: "Known for going limp when picked up — which is exactly how they got their name.",
  },

  "Russian Blue": {
    origin: "Russia",
    description:
      "A medium-sized cat with a short, dense coat of bluish-gray fur and striking green eyes. Known for their gentle and reserved nature.",
    averageLifespan: "15–20 years",
    averageWeight: "Male (8–12 lbs) · Female (7–10 lbs)",
    temperament: "Gentle, Reserved, Affectionate",
    temperamentDetail: "Loyal to family but shy around strangers; thrives on routine and a quiet environment.",
    physicalCharacteristics: "Short, dense bluish-gray coat; green eyes; slender build",
    healthIssues: "Bladder stones (FLUTD), obesity from overeating",
    recommendedCare: "Strict feeding schedule, regular playtime, routine vet check-ups",
    dietaryNeeds: "High-quality cat food; strict portions — they will overeat if given the chance",
    funFact: "Believed to be a favorite of Russian royalty, often associated with good luck and prosperity.",
  },

  Siamese: {
    origin: "Thailand",
    description:
      "A slender, elegant cat with a short coat and striking blue almond-shaped eyes. Known for their vocal and social nature.",
    averageLifespan: "15–20 years",
    averageWeight: "Male (8–12 lbs) · Female (6–8 lbs)",
    temperament: "Vocal, Social, Affectionate",
    temperamentDetail:
      "Highly communicative and demanding of attention; bonds deeply with one person but loves the whole family.",
    physicalCharacteristics:
      "Short coat; pointed coloration (darker ears, face, paws, and tail); blue almond-shaped eyes",
    healthIssues: "Respiratory issues, dental problems, amyloidosis",
    recommendedCare: "Regular grooming, dental care, interactive play",
    dietaryNeeds: "Small, frequent meals; balanced diet with high-quality protein",
    funFact:
      "One of the oldest and most recognizable cat breeds, often featured in movies and literature.",
  },

  Sphynx: {
    origin: "Canada",
    description:
      "A medium-sized cat known for its lack of fur and distinctive wrinkled skin. Known for their friendly and energetic personality.",
    averageLifespan: "8–14 years",
    averageWeight: "Male (8–11 lbs) · Female (6–9 lbs)",
    temperament: "Friendly, Energetic, Social",
    temperamentDetail: "Loves warmth and physical contact; extremely people-oriented and playful.",
    physicalCharacteristics: "Hairless; wrinkled skin; large ears",
    healthIssues: "Skin conditions, ear infections, respiratory problems",
    recommendedCare: "Regular skin and ear cleaning, balanced diet, routine vet check-ups",
    dietaryNeeds: "Higher calorie intake than most breeds to maintain body temperature",
    funFact: "Despite being hairless, Sphynx cats are renowned for being cuddly and love to stay warm.",
  },

  Tuxedo: {
    origin: "Global (not a specific breed)",
    description:
      "Tuxedo cats are not a specific breed but are defined by their black and white coat pattern. They can belong to various breeds and are known for their playful and affectionate nature.",
    averageLifespan: "Varies by breed (typically 10–20 years)",
    averageWeight: "Varies by breed",
    temperament: "Playful, Affectionate, Social",
    temperamentDetail: "Generally bold and confident; often described as having 'big personalities'.",
    physicalCharacteristics: "Black and white coat pattern; body type varies by underlying breed",
    healthIssues: "Varies by underlying breed",
    recommendedCare: "Regular playtime, balanced diet, routine vet check-ups",
    dietaryNeeds: "High-quality cat food; adjust based on the cat's energy levels and weight",
    funFact: "Tuxedo cats are popular in folklore and pop culture, and are often associated with good luck.",
  },
};

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
  recommendedCare: string;
  dietaryNeeds: string;
  funFact: string;
}

// ─── API call ─────────────────────────────────────────────────────────────────

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

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const raw = await response.json();

    const breed = raw.dominant_breed as string;
    const info = BREED_INFO[breed];

    return {
      success: true,
      data: {
        breed,
        confidence: raw.dominant_confidence,
        secondaryBreed: raw.secondary_breed ?? null,
        secondaryConfidence: raw.secondary_confidence ?? null,
        isMixed: raw.is_mixed,
        allPredictions: raw.all_predictions ?? [],
        imageUrl: imageData,
        timestamp: new Date().toISOString(),
        info: info ?? null,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}