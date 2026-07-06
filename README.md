# PantryPulse

Cook what you have. PantryPulse turns the ingredients already in your kitchen into recipes worth making, with diet and calorie filters and nutrition at a glance.

This is a UI/UX refresh of the original PantryPulse. It keeps the same backend (the Edamam Recipe Search API v2) and rebuilds the front end on a modern stack with a live, working search.

## Stack

- Vite + React 18 + React Router
- Tailwind CSS v4 (`@tailwindcss/vite`, CSS-first `@theme` tokens)
- Motion (`motion/react`) for scroll reveals and micro-interactions
- Firebase Auth (Google) + Cloud Firestore for accounts, saved allergens, and saved recipes
- Phosphor icons
- Self-hosted Apfel Grotezk + Array fonts (carried over from the original brand)

## Accounts

Signed-in users get:

- Google sign-in from the navbar
- A **Settings** page (`/settings`) to select dietary needs / allergens, saved to Firestore and applied to searches automatically
- A **Saved recipes** page (`/saved`) populated by the bookmark button on any recipe card

Accounts are optional. Without Firebase config the app still runs; search works and the account features prompt for setup.

## Backend / API

Recipes come from the Edamam Recipe Search API v2 (`https://api.edamam.com/api/recipes/v2`). All API code lives in [`src/lib/edamam.js`](src/lib/edamam.js).

### Configure credentials

1. Create a free app at https://developer.edamam.com/ (Recipe Search API).
2. Copy `.env.example` to `.env` and fill in your keys:

   ```bash
   cp .env.example .env
   ```

   ```
   VITE_EDAMAM_APP_ID=your_app_id
   VITE_EDAMAM_APP_KEY=your_app_key
   ```

   Do **not** set `VITE_EDAMAM_ACCOUNT_USER` unless your Edamam plan explicitly supports active-user tracking. Standard Recipe Search API apps reject the `Edamam-Account-User` header. If yours does support it, opt in with:

   ```
   VITE_EDAMAM_USE_ACCOUNT_USER=true
   VITE_EDAMAM_ACCOUNT_USER=your-stable-user-id
   ```

3. Restart the dev server after editing `.env`.

`VITE_*` variables are exposed to the browser (the original app also called Edamam directly from the client). For a production deployment you may want to proxy these calls through a small server to keep the key private.

## Firebase (accounts, settings, saved recipes)

Firebase code lives in [`src/lib/firebase.js`](src/lib/firebase.js), with auth in [`src/context/AuthContext.jsx`](src/context/AuthContext.jsx) and Firestore data in [`src/context/UserDataContext.jsx`](src/context/UserDataContext.jsx).

1. In the [Firebase console](https://console.firebase.google.com/), create (or open) your project.
2. **Authentication > Sign-in method**: enable **Google**. Add `localhost` under authorized domains for local dev.
3. **Firestore Database**: create a database.
4. **Project settings > General > Your apps**: register a Web app and copy the config values into `.env`:

   ```
   VITE_FIREBASE_API_KEY=...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=...
   VITE_FIREBASE_APP_ID=...
   ```

5. Restart the dev server.

### Data model

- `users/{uid}` document: `{ allergens: string[], updatedAt }`
- `users/{uid}/saved/{recipeId}` documents: a trimmed recipe plus `savedAt`

### Firestore security rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      match /saved/{recipeId} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

## Develop

```bash
npm install
npm run dev
```

Open the printed local URL. The landing page renders without keys; live recipe search requires the `.env` credentials above.

## Build

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  lib/edamam.js        Edamam v2 client (buildSearchUrl, searchRecipes, getNextPage)
  lib/filters.js       Cuisine/diet/health filter options mapped to API values
  lib/firebase.js      Firebase app/auth/firestore bootstrap (env-gated)
  lib/recipes.js       recipeId + toSavedRecipe helpers for persistence
  context/AuthContext.jsx      Google auth state + sign in/out
  context/UserDataContext.jsx  Firestore allergens + saved recipes (realtime)
  hooks/useRecipeSearch.js   Search state + pagination
  hooks/useDarkMode.js       Theme toggle (light/dark)
  pages/               Home (landing), Settings, Saved
  components/          Navbar, Hero, SearchExperience, Filters, RecipeCard,
                       RecipeDetailsDialog, SearchStates, RequireAuth,
                       Features, HowItWorks, Contact, Footer, Reveal
```
