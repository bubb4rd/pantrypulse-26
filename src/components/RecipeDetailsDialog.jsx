import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowUpRight, Clock, Fire, X } from "@phosphor-icons/react";
import { perServing } from "../lib/edamam.js";

function Stat({ label, value, unit }) {
  return (
    <div className="rounded-2xl bg-ink-900/[0.04] px-4 py-3 text-center dark:bg-cream/[0.06]">
      <p className="font-display text-2xl font-bold text-ink-900 dark:text-cream">
        {value == null ? "n/a" : value}
        {value != null && unit ? (
          <span className="text-base font-semibold text-ink-800/50 dark:text-cream/50">
            {unit}
          </span>
        ) : null}
      </p>
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-800/50 dark:text-cream/50">
        {label}
      </p>
    </div>
  );
}

export default function RecipeDetailsDialog({ recipe, onClose }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const image =
    recipe.images?.LARGE?.url || recipe.images?.REGULAR?.url || recipe.image;
  const ingredients = recipe.ingredientLines ?? [];
  const health = (recipe.healthLabels ?? []).slice(0, 8);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-end justify-center bg-ink-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={recipe.label}
          onClick={(e) => e.stopPropagation()}
          initial={reduce ? false : { y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduce ? undefined : { y: 40, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-cream shadow-2xl sm:rounded-[2rem] dark:bg-ink-900 scrollbar-none"
        >
          <div className="relative">
            <img
              src={image}
              alt={recipe.label}
              className="aspect-[16/9] w-full object-cover"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-cream/90 text-ink-900 backdrop-blur transition-colors hover:text-ember-700 dark:bg-ink-950/80 dark:text-cream"
            >
              <X size={20} weight="bold" />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-sm font-semibold text-ink-800/55 dark:text-cream/55">
              {recipe.source}
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold leading-tight text-ink-900 dark:text-cream">
              {recipe.label}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-ink-800/70 dark:text-cream/70">
              <span className="inline-flex items-center gap-1.5">
                <Fire size={16} weight="fill" className="text-ember-500" />
                {perServing(recipe, "ENERC_KCAL") ?? "n/a"} kcal / serving
              </span>
              {recipe.totalTime > 0 && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={16} weight="fill" className="text-ember-500" />
                  {Math.round(recipe.totalTime)} min
                </span>
              )}
              <span>{recipe.yield} servings</span>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <Stat label="Protein" value={perServing(recipe, "PROCNT")} unit="g" />
              <Stat label="Carbs" value={perServing(recipe, "CHOCDF")} unit="g" />
              <Stat label="Fat" value={perServing(recipe, "FAT")} unit="g" />
            </div>

            {health.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {health.map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-ember-500/12 px-3 py-1 text-xs font-semibold text-ember-700 dark:text-ember-300"
                  >
                    {h}
                  </span>
                ))}
              </div>
            )}

            {ingredients.length > 0 && (
              <div className="mt-6">
                <h3 className="font-display text-lg font-bold text-ink-900 dark:text-cream">
                  Ingredients
                </h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {ingredients.map((line, i) => (
                    <li
                      key={i}
                      className="flex gap-2 text-[15px] leading-snug text-ink-800/80 dark:text-cream/75"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href={recipe.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-ember-700 px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-ember-800"
            >
              View full recipe at {recipe.source}
              <ArrowUpRight size={18} weight="bold" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
