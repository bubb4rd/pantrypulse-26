/** Helpers for identifying and trimming Edamam recipes for persistence. */

const NUTRIENT_KEYS = ["ENERC_KCAL", "PROCNT", "FAT", "CHOCDF"];

/** Stable, Firestore-safe id derived from the recipe uri (falls back to url). */
export function recipeId(recipe) {
  const uri = recipe?.uri ?? recipe?.url ?? "";
  const fromUri = uri.split("#recipe_")[1];
  if (fromUri) return fromUri;
  // Fallback: strip anything Firestore dislikes in a doc id.
  return encodeURIComponent(uri).replace(/[.#$/[\]]/g, "_").slice(0, 200) || "unknown";
}

/**
 * Trim a full recipe down to the fields the UI needs, so saved docs stay small.
 * Note: Edamam image URLs are time-limited, so the UI falls back on error.
 */
export function toSavedRecipe(recipe) {
  const totalNutrients = {};
  NUTRIENT_KEYS.forEach((key) => {
    const q = recipe?.totalNutrients?.[key]?.quantity;
    if (typeof q === "number") totalNutrients[key] = { quantity: q };
  });

  return {
    uri: recipe.uri ?? recipe.url ?? "",
    label: recipe.label ?? "Untitled recipe",
    image: recipe.images?.REGULAR?.url ?? recipe.image ?? "",
    url: recipe.url ?? "",
    source: recipe.source ?? "",
    yield: recipe.yield ?? 1,
    totalTime: recipe.totalTime ?? 0,
    cuisineType: recipe.cuisineType ?? [],
    dietLabels: recipe.dietLabels ?? [],
    healthLabels: (recipe.healthLabels ?? []).slice(0, 12),
    ingredientLines: recipe.ingredientLines ?? [],
    totalNutrients,
  };
}
