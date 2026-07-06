import { ArrowUpRight, Clock, BookmarkSimple, Fire } from "@phosphor-icons/react";
import { perServing } from "../lib/edamam.js";
import { cx } from "../lib/ui.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useUserData } from "../context/UserDataContext.jsx";

const FALLBACK_IMAGE = "/assets/burger.jpg";

function Macro({ label, value }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-ink-900/[0.04] px-2 py-1.5 dark:bg-cream/[0.06]">
      <span className="font-display text-base font-bold text-ink-900 dark:text-cream">
        {value == null ? "n/a" : `${value}g`}
      </span>
      <span className="text-[11px] font-semibold uppercase tracking-wide text-ink-800/50 dark:text-cream/50">
        {label}
      </span>
    </div>
  );
}

export default function RecipeCard({ recipe, onOpenDetails }) {
  const { user, configured, signInWithGoogle } = useAuth();
  const { isSaved, toggleSave } = useUserData();
  const saved = isSaved(recipe);

  const image = recipe.images?.REGULAR?.url || recipe.image || FALLBACK_IMAGE;
  const calories = perServing(recipe, "ENERC_KCAL");
  const time = recipe.totalTime > 0 ? Math.round(recipe.totalTime) : null;
  const cuisine = recipe.cuisineType?.[0];

  const onBookmark = () => {
    if (!configured) return;
    if (!user) {
      signInWithGoogle();
      return;
    }
    toggleSave(recipe);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-ink-900/5 bg-cream/60 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-cream/10 dark:bg-ink-900/60">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={recipe.label}
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== window.location.origin + FALLBACK_IMAGE)
              e.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          onClick={onBookmark}
          aria-label={saved ? "Remove from saved" : "Save recipe"}
          aria-pressed={saved}
          title={!configured ? "Sign-in unavailable" : !user ? "Sign in to save" : undefined}
          className={cx(
            "absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-cream/90 backdrop-blur transition-colors hover:text-ember-700 dark:bg-ink-950/80",
            saved ? "text-ember-600 dark:text-ember-400" : "text-ink-900 dark:text-cream"
          )}
        >
          <BookmarkSimple size={20} weight={saved ? "fill" : "regular"} />
        </button>
        {cuisine && (
          <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-bold capitalize text-ink-900 backdrop-blur dark:bg-ink-950/80 dark:text-cream">
            {cuisine}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="line-clamp-2 font-display text-xl font-bold leading-tight text-ink-900 dark:text-cream">
            {recipe.label}
          </h3>
          <p className="mt-1 truncate text-sm text-ink-800/55 dark:text-cream/55">
            {recipe.source}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm text-ink-800/70 dark:text-cream/70">
          {calories != null && (
            <span className="inline-flex items-center gap-1.5">
              <Fire size={16} weight="fill" className="text-ember-500" />
              {calories} kcal
            </span>
          )}
          {time != null && (
            <span className="inline-flex items-center gap-1.5">
              <Clock size={16} weight="fill" className="text-ember-500" />
              {time} min
            </span>
          )}
          <span className="text-ink-800/45 dark:text-cream/45">per serving</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Macro label="Protein" value={perServing(recipe, "PROCNT")} />
          <Macro label="Carbs" value={perServing(recipe, "CHOCDF")} />
          <Macro label="Fat" value={perServing(recipe, "FAT")} />
        </div>

        <div className="mt-auto flex gap-2 pt-1">
          <button
            type="button"
            onClick={() => onOpenDetails(recipe)}
            className="flex-1 rounded-full border border-ink-900/15 px-4 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:border-ember-500 hover:text-ember-700 dark:border-cream/20 dark:text-cream dark:hover:text-ember-300"
          >
            Details
          </button>
          <a
            href={recipe.url}
            target="_blank"
            rel="noreferrer noopener"
            className={cx(
              "flex flex-1 items-center justify-center gap-1 rounded-full bg-ember-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-ember-800"
            )}
          >
            Recipe
            <ArrowUpRight size={16} weight="bold" />
          </a>
        </div>
      </div>
    </article>
  );
}
