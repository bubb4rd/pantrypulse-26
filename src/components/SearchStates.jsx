import { Key, MagnifyingGlass, WarningCircle, CookingPot } from "@phosphor-icons/react";
import { btnGhost } from "../lib/ui.js";

function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card border border-ink-900/5 bg-cream/60 dark:border-cream/10 dark:bg-ink-900/60">
      <div className="aspect-[4/3] animate-pulse bg-ink-900/8 dark:bg-cream/10" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-ink-900/8 dark:bg-cream/10" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-ink-900/8 dark:bg-cream/10" />
        <div className="grid grid-cols-3 gap-2 pt-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-12 animate-pulse rounded-xl bg-ink-900/8 dark:bg-cream/10"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

function Shell({ icon, title, children }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-ink-900/15 px-6 py-20 text-center dark:border-cream/15">
      <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-ember-500/12 text-ember-600 dark:text-ember-300">
        {icon}
      </span>
      <h3 className="font-display text-2xl font-bold text-ink-900 dark:text-cream">
        {title}
      </h3>
      <div className="mt-2 max-w-md text-ink-800/65 dark:text-cream/65">
        {children}
      </div>
    </div>
  );
}

export function IdleState() {
  return (
    <Shell icon={<CookingPot size={30} weight="fill" />} title="What's in your pantry?">
      Search an ingredient or dish above, or tap a suggestion to see recipes you
      can make right now.
    </Shell>
  );
}

export function EmptyState({ query }) {
  return (
    <Shell icon={<MagnifyingGlass size={30} weight="bold" />} title="No recipes found">
      We could not find anything for {query ? `"${query}"` : "that search"} with
      these filters. Try a broader term or loosen a filter.
    </Shell>
  );
}

export function ErrorState({ error, onRetry, needsKeys }) {
  return (
    <Shell
      icon={needsKeys ? <Key size={30} weight="fill" /> : <WarningCircle size={30} weight="fill" />}
      title={needsKeys ? "API keys required" : "Something went wrong"}
    >
      <p>{error?.message ?? "The recipe service did not respond."}</p>
      {needsKeys ? (
        <p className="mt-3 text-sm">
          Add <code className="rounded bg-ink-900/10 px-1.5 py-0.5 dark:bg-cream/15">VITE_EDAMAM_APP_ID</code>{" "}
          and{" "}
          <code className="rounded bg-ink-900/10 px-1.5 py-0.5 dark:bg-cream/15">VITE_EDAMAM_APP_KEY</code>{" "}
          to your <code>.env</code> file, then restart the dev server.
        </p>
      ) : (
        onRetry && (
          <button type="button" onClick={onRetry} className={`${btnGhost} mt-5`}>
            Try again
          </button>
        )
      )}
    </Shell>
  );
}
