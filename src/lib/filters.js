/**
 * Filter option definitions mapped to Edamam v2 parameter values.
 * `label` is what the UI shows; `value` is what the API expects.
 */

export const CUISINES = [
  "American",
  "Asian",
  "British",
  "Caribbean",
  "Chinese",
  "French",
  "Indian",
  "Italian",
  "Japanese",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "South American",
].map((label) => ({ label, value: label.toLowerCase() }));

export const DIETS = [
  "Balanced",
  "High-Fiber",
  "High-Protein",
  "Low-Carb",
  "Low-Fat",
  "Low-Sodium",
].map((label) => ({ label, value: label.toLowerCase() }));

export const HEALTH = [
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Vegan", value: "vegan" },
  { label: "Gluten-Free", value: "gluten-free" },
  { label: "Dairy-Free", value: "dairy-free" },
  { label: "Egg-Free", value: "egg-free" },
  { label: "Peanut-Free", value: "peanut-free" },
  { label: "Tree-Nut-Free", value: "tree-nut-free" },
  { label: "Soy-Free", value: "soy-free" },
  { label: "Fish-Free", value: "fish-free" },
  { label: "Keto", value: "keto-friendly" },
  { label: "Paleo", value: "paleo" },
  { label: "Low-Sugar", value: "low-sugar" },
];

export const MAX_CALORIES = 4000;

/** Quick-search chips shown under the hero/search bar. */
export const POPULAR = ["chicken", "pasta", "salmon", "tofu", "avocado", "steak"];
