import { motion, useReducedMotion } from "motion/react";
import { ForkKnife } from "@phosphor-icons/react";
import { btnPrimary, btnGhost } from "../lib/ui.js";

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section className="relative min-h-[100dvh] overflow-hidden pt-16">
      {/* soft warm wash, tinted to the brand rather than AI-purple */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_15%_10%,rgba(244,211,94,0.22),transparent),radial-gradient(50%_45%_at_100%_0%,rgba(249,87,56,0.16),transparent)] dark:bg-[radial-gradient(60%_50%_at_15%_10%,rgba(244,211,94,0.10),transparent),radial-gradient(50%_45%_at_100%_0%,rgba(249,87,56,0.14),transparent)]"
      />

      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 pt-16 pb-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-24">
        <div className="max-w-2xl">
          <motion.span
            {...rise(0)}
            className="inline-flex items-center gap-2 rounded-full border border-ember-500/30 bg-ember-50 px-4 py-1.5 text-sm font-semibold text-ember-700 dark:bg-ember-500/10 dark:text-ember-300"
          >
            <ForkKnife size={16} weight="fill" />
            Real recipes from your real pantry
          </motion.span>

          <motion.h1
            {...rise(0.08)}
            className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink-900 sm:text-6xl lg:text-7xl dark:text-cream"
          >
            Cook what you{" "}
            <span className="text-ember-600 dark:text-ember-400">love</span>,
            from what you have.
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-800/70 dark:text-cream/70"
          >
            Tell PantryPulse what&apos;s on hand and how you eat. We surface
            recipes worth cooking tonight, no endless scrolling.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#search" className={btnPrimary}>
              Find a recipe
            </a>
            <a href="#how" className={btnGhost}>
              How it works
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-ember-900/10 ring-1 ring-ink-900/5 dark:ring-cream/10">
            <img
              src="/assets/hero-spread.png"
              alt="An overhead spread of fresh ingredients around a skillet of cooked chicken and a bowl of pasta"
              className="aspect-[4/3] h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
          </div>

          {/* floating stat card, tied to the image */}
          <div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl border border-ink-900/5 bg-cream/95 px-4 py-3 shadow-xl backdrop-blur sm:-left-6 dark:border-cream/10 dark:bg-ink-900/95">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-ember-500/15 text-ember-700 dark:text-ember-300">
              <ForkKnife size={22} weight="fill" />
            </span>
            <div>
              <p className="font-display text-xl font-bold leading-none text-ink-900 dark:text-cream">
                2.3M+
              </p>
              <p className="text-sm text-ink-800/60 dark:text-cream/60">
                recipes to search
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
