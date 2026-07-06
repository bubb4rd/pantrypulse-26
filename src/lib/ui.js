/** Shared class strings so buttons/inputs stay consistent (one radius, one accent). */

// Deep ember passes WCAG AA (5.8:1) for white label text; vibrant ember-500
// stays reserved for accents/highlights/focus rings.
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-ember-700 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-ember-800 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-500 disabled:opacity-60 disabled:pointer-events-none";

export const btnGhost =
  "inline-flex items-center justify-center gap-2 rounded-full border border-ink-900/15 dark:border-cream/20 px-6 py-3 text-base font-semibold text-ink-900 dark:text-cream transition-all hover:border-ember-500 hover:text-ember-700 dark:hover:text-ember-300 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-500";

export function cx(...parts) {
  return parts.filter(Boolean).join(" ");
}
