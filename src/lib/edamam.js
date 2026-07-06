/**
 * Edamam Recipe Search API v2 client.
 *
 * This is the preserved "backend" layer from the original PantryPulse: same
 * endpoint, same credential model, same query shape. Only the wiring is new
 * (the original never finished connecting the UI to it).
 *
 * Docs: https://developer.edamam.com/edamam-docs-recipe-api
 */

const BASE_URL = "https://api.edamam.com/api/recipes/v2";

const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY;
// Only some Edamam plans accept this header; sending it on a standard app
// returns "This app does not support users. Do not supply the Edamam-Account-User header."
const USE_ACCOUNT_USER = import.meta.env.VITE_EDAMAM_USE_ACCOUNT_USER === "true";
const ACCOUNT_USER = import.meta.env.VITE_EDAMAM_ACCOUNT_USER;

export function hasCredentials() {
  return Boolean(APP_ID && APP_KEY);
}

/** Fields we ask Edamam to return, keeping payloads lean. */
const FIELDS = [
  "label",
  "image",
  "images",
  "source",
  "url",
  "shareAs",
  "yield",
  "dietLabels",
  "healthLabels",
  "cautions",
  "ingredientLines",
  "calories",
  "totalTime",
  "cuisineType",
  "mealType",
  "dishType",
  "totalNutrients",
];

/**
 * Build a fully-formed request URL from a params object.
 *
 * @param {Object} params
 * @param {string}   params.q            free-text query (recipe or ingredient)
 * @param {string[]} [params.health]     health/allergy labels (e.g. "vegan")
 * @param {string[]} [params.diet]       diet labels (e.g. "balanced")
 * @param {string[]} [params.cuisineType]cuisine types (e.g. "Italian")
 * @param {string}   [params.calories]   range string, e.g. "0-4000" or "500+"
 * @param {string[]} [params.mealType]
 * @param {string[]} [params.dishType]
 */
export function buildSearchUrl(params = {}) {
  const url = new URL(BASE_URL);
  const sp = url.searchParams;

  sp.set("type", "public");
  sp.set("app_id", APP_ID ?? "");
  sp.set("app_key", APP_KEY ?? "");
  if (params.q) sp.set("q", params.q);

  const appendAll = (key, values) => {
    if (!Array.isArray(values)) return;
    values.filter(Boolean).forEach((v) => sp.append(key, v));
  };

  appendAll("health", params.health);
  appendAll("diet", params.diet);
  appendAll("cuisineType", params.cuisineType);
  appendAll("mealType", params.mealType);
  appendAll("dishType", params.dishType);

  if (params.calories) sp.set("calories", params.calories);

  FIELDS.forEach((f) => sp.append("field", f));

  return url.toString();
}

function requestHeaders() {
  const headers = {};
  if (USE_ACCOUNT_USER && ACCOUNT_USER) {
    headers["Edamam-Account-User"] = ACCOUNT_USER;
  }
  return headers;
}

async function readErrorMessage(res) {
  try {
    const body = await res.json();
    return body?.message || res.statusText;
  } catch {
    return res.statusText;
  }
}

async function fetchJson(requestUrl) {
  const res = await fetch(requestUrl, { headers: requestHeaders() });
  if (!res.ok) {
    const detail = await readErrorMessage(res);
    const error = new Error(
      detail || `Edamam request failed with status ${res.status}`
    );
    error.status = res.status;
    throw error;
  }
  return res.json();
}

/** Normalize a raw v2 response into { recipes, next, total }. */
function normalize(json) {
  return {
    recipes: (json.hits ?? []).map((hit) => hit.recipe),
    next: json?._links?.next?.href ?? null,
    total: json?.count ?? 0,
  };
}

/** Run a search. Throws if credentials are missing. */
export async function searchRecipes(params) {
  if (!hasCredentials()) {
    const error = new Error(
      "Missing Edamam credentials. Add VITE_EDAMAM_APP_ID and VITE_EDAMAM_APP_KEY to your .env file."
    );
    error.code = "NO_CREDENTIALS";
    throw error;
  }
  const json = await fetchJson(buildSearchUrl(params));
  return normalize(json);
}

/** Follow the `_links.next` cursor returned by a previous search. */
export async function getNextPage(nextUrl) {
  const json = await fetchJson(nextUrl);
  return normalize(json);
}

/** Small helpers for reading nutrient values off a recipe safely. */
export function macro(recipe, key) {
  const value = recipe?.totalNutrients?.[key]?.quantity;
  return typeof value === "number" ? Math.round(value) : null;
}

export function perServing(recipe, key) {
  const total = macro(recipe, key);
  const servings = recipe?.yield || 1;
  return total == null ? null : Math.round(total / servings);
}
