import { useState } from "react";
import { Link } from "react-router-dom";
import { BookmarkSimple } from "@phosphor-icons/react";
import RequireAuth from "../components/RequireAuth.jsx";
import RecipeCard from "../components/RecipeCard.jsx";
import RecipeDetailsDialog from "../components/RecipeDetailsDialog.jsx";
import { useUserData } from "../context/UserDataContext.jsx";
import { btnPrimary } from "../lib/ui.js";

function SavedGrid() {
  const { saved } = useUserData();
  const [selected, setSelected] = useState(null);

  if (saved.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center rounded-card border border-dashed border-ink-900/15 px-6 py-20 text-center dark:border-cream/15">
        <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-ember-500/12 text-ember-600 dark:text-ember-300">
          <BookmarkSimple size={30} weight="fill" />
        </span>
        <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-cream">
          No saved recipes yet
        </h2>
        <p className="mt-2 max-w-sm text-ink-800/65 dark:text-cream/65">
          Tap the bookmark on any recipe to keep it here for later.
        </p>
        <Link to={{ pathname: "/", hash: "#search" }} className={`${btnPrimary} mt-6`}>
          Find recipes
        </Link>
      </div>
    );
  }

  return (
    <>
      <p className="mt-6 text-sm font-semibold text-ink-800/60 dark:text-cream/60">
        {saved.length} saved recipe{saved.length > 1 ? "s" : ""}
      </p>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {saved.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onOpenDetails={setSelected}
          />
        ))}
      </div>
      {selected && (
        <RecipeDetailsDialog recipe={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

export default function Saved() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-24 pt-28 sm:px-8">
      <h1 className="font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl dark:text-cream">
        Saved recipes
      </h1>
      <p className="mt-3 text-lg text-ink-800/70 dark:text-cream/70">
        Your bookmarked recipes, ready when you are.
      </p>

      <RequireAuth title="Sign in to see your saved recipes">
        <SavedGrid />
      </RequireAuth>
    </section>
  );
}
