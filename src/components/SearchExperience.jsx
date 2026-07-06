import { useEffect, useState } from "react";
import { MagnifyingGlass, ShieldCheck, SlidersHorizontal, X } from "@phosphor-icons/react";
import { useRecipeSearch } from "../hooks/useRecipeSearch.js";
import { useUserData } from "../context/UserDataContext.jsx";
import { MAX_CALORIES, POPULAR } from "../lib/filters.js";
import { btnGhost, btnPrimary, cx } from "../lib/ui.js";
import Filters from "./Filters.jsx";
import RecipeCard from "./RecipeCard.jsx";
import RecipeDetailsDialog from "./RecipeDetailsDialog.jsx";
import {
  EmptyState,
  ErrorState,
  IdleState,
  SkeletonGrid,
} from "./SearchStates.jsx";

const DEFAULT_FILTERS = {
  cuisineType: [],
  diet: [],
  health: [],
  calMin: 0,
  calMax: MAX_CALORIES,
};

function buildParams(term, filters) {
  const usesCalories =
    filters.calMin > 0 || filters.calMax < MAX_CALORIES;
  return {
    q: term,
    cuisineType: filters.cuisineType,
    diet: filters.diet,
    health: filters.health,
    calories: usesCalories ? `${filters.calMin}-${filters.calMax}` : undefined,
  };
}

export default function SearchExperience() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [selected, setSelected] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { allergens } = useUserData();

  const { recipes, status, error, total, lastQuery, hasMore, run, loadMore, reset } =
    useRecipeSearch();

  // Seed the dietary filter from the signed-in user's saved allergens so their
  // searches respect their preferences automatically.
  useEffect(() => {
    setFilters((f) => ({ ...f, health: allergens }));
  }, [allergens]);

  // Re-run whenever the active search term or filters change (debounced so
  // dragging the calorie slider does not spam the API).
  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => run(buildParams(submitted, filters)), 350);
    return () => clearTimeout(t);
  }, [submitted, filters, run]);

  const submit = (e) => {
    e?.preventDefault();
    const term = query.trim();
    if (!term) return;
    setSubmitted(term);
  };

  const searchChip = (term) => {
    setQuery(term);
    setSubmitted(term);
  };

  const clearFilters = () => setFilters(DEFAULT_FILTERS);

  const needsKeys = error?.code === "NO_CREDENTIALS";
  const loading = status === "loading";

  return (
    <section id="search" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl dark:text-cream">
            Find your recipe
          </h2>
          <p className="mt-4 text-lg text-ink-800/70 dark:text-cream/70">
            Start with an ingredient or a dish. Layer on diet and calorie
            filters to narrow the results.
          </p>
        </div>

        {/* Search bar */}
        <form
          onSubmit={submit}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <div className="flex flex-1 items-center gap-3 rounded-full border border-ink-900/12 bg-cream px-5 py-3.5 focus-within:border-ember-500 dark:border-cream/15 dark:bg-ink-900">
            <MagnifyingGlass
              size={22}
              weight="bold"
              className="shrink-0 text-ink-800/50 dark:text-cream/50"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a recipe or ingredient"
              aria-label="Search a recipe or ingredient"
              className="w-full bg-transparent text-lg text-ink-900 placeholder:text-ink-800/40 focus:outline-none dark:text-cream dark:placeholder:text-cream/40"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSubmitted("");
                  reset();
                }}
                aria-label="Clear search"
                className="text-ink-800/40 hover:text-ember-700 dark:text-cream/40"
              >
                <X size={20} weight="bold" />
              </button>
            )}
          </div>
          <button type="submit" className={btnPrimary}>
            Search
          </button>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className={cx(btnGhost, "lg:hidden")}
          >
            <SlidersHorizontal size={20} weight="bold" />
            Filters
          </button>
        </form>

        {/* Popular chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-ink-800/50 dark:text-cream/50">
            Popular:
          </span>
          {POPULAR.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => searchChip(term)}
              className="rounded-full bg-ink-900/[0.05] px-3.5 py-1.5 text-sm font-semibold capitalize text-ink-800/80 transition-colors hover:bg-ember-500/15 hover:text-ember-700 dark:bg-cream/[0.08] dark:text-cream/75 dark:hover:text-ember-300"
            >
              {term}
            </button>
          ))}
        </div>

        {allergens.length > 0 && (
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-ember-700 dark:text-ember-300">
            <ShieldCheck size={16} weight="fill" />
            Applying your saved dietary needs
          </p>
        )}

        {/* Body */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Filters value={filters} onChange={setFilters} onClear={clearFilters} />
            </div>
          </aside>

          {/* Results */}
          <div>
            {status === "success" && recipes.length > 0 && (
              <p className="mb-5 text-sm font-semibold text-ink-800/60 dark:text-cream/60">
                {total.toLocaleString()} results for{" "}
                <span className="text-ink-900 dark:text-cream">
                  &ldquo;{lastQuery}&rdquo;
                </span>
              </p>
            )}

            {status === "idle" && <IdleState />}
            {loading && <SkeletonGrid />}
            {status === "error" && (
              <ErrorState
                error={error}
                needsKeys={needsKeys}
                onRetry={() => run(buildParams(submitted, filters))}
              />
            )}
            {status === "success" && recipes.length === 0 && (
              <EmptyState query={lastQuery} />
            )}

            {(status === "success" || status === "loadingMore") &&
              recipes.length > 0 && (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {recipes.map((recipe, i) => (
                      <RecipeCard
                        key={`${recipe.url}-${i}`}
                        recipe={recipe}
                        onOpenDetails={setSelected}
                      />
                    ))}
                  </div>

                  {hasMore && (
                    <div className="mt-10 flex justify-center">
                      <button
                        type="button"
                        onClick={loadMore}
                        disabled={status === "loadingMore"}
                        className={btnGhost}
                      >
                        {status === "loadingMore"
                          ? "Loading…"
                          : "Load more recipes"}
                      </button>
                    </div>
                  )}
                </>
              )}
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-[90] flex bg-ink-950/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div
            className="ml-auto h-full w-[85%] max-w-sm overflow-y-auto bg-cream p-4 dark:bg-ink-950"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-xl font-bold text-ink-900 dark:text-cream">
                Filters
              </span>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/10 text-ink-800 dark:border-cream/15 dark:text-cream"
              >
                <X size={20} weight="bold" />
              </button>
            </div>
            <Filters value={filters} onChange={setFilters} onClear={clearFilters} />
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className={cx(btnPrimary, "mt-4 w-full")}
            >
              Show results
            </button>
          </div>
        </div>
      )}

      {selected && (
        <RecipeDetailsDialog recipe={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
