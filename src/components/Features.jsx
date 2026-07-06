import {
  Basket,
  ChartDonut,
  Heart,
  SlidersHorizontal,
} from "@phosphor-icons/react";
import Reveal from "./Reveal.jsx";

export default function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl dark:text-cream">
            Everything you need to cook smarter
          </h2>
          <p className="mt-4 text-lg text-ink-800/70 dark:text-cream/70">
            PantryPulse works from what you already have, so dinner starts with
            your kitchen instead of a shopping list.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {/* Big image tile */}
          <Reveal className="md:col-span-2">
            <div className="group relative h-full min-h-[320px] overflow-hidden rounded-card">
              <img
                src="/assets/pantry-shelf.png"
                alt="A styled pantry shelf with jars of grains and a basket of fresh vegetables"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent" />
              <div className="absolute bottom-0 p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ember-500 text-cream">
                  <Basket size={24} weight="fill" />
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-cream">
                  Search by what you have
                </h3>
                <p className="mt-2 max-w-md text-cream/80">
                  Type the ingredients sitting in your fridge and pantry. We match
                  them to recipes you can actually make tonight.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Gradient tile */}
          <Reveal delay={0.08}>
            <div className="flex h-full min-h-[320px] flex-col justify-between rounded-card bg-gradient-to-br from-ember-500 to-tang p-7 text-cream">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cream/20 backdrop-blur">
                <SlidersHorizontal size={24} weight="bold" />
              </span>
              <div>
                <h3 className="font-display text-2xl font-bold">
                  Filter for your diet
                </h3>
                <p className="mt-2 text-cream/90">
                  Vegan, keto, gluten-free, low-sodium, and more. Set it once and
                  every result respects it.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Nutrition tile */}
          <Reveal delay={0.04}>
            <div className="flex h-full flex-col justify-between rounded-card border border-ink-900/8 bg-cream/70 p-7 dark:border-cream/10 dark:bg-ink-900/60">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ember-500/12 text-ember-600 dark:text-ember-300">
                <ChartDonut size={24} weight="fill" />
              </span>
              <div className="mt-6">
                <h3 className="font-display text-2xl font-bold text-ink-900 dark:text-cream">
                  Nutrition at a glance
                </h3>
                <p className="mt-2 text-ink-800/70 dark:text-cream/70">
                  Calories and protein, carbs, and fat per serving on every card,
                  no clicking through required.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Save tile */}
          <Reveal delay={0.08} className="md:col-span-2">
            <div className="flex h-full flex-col justify-between gap-4 rounded-card border border-ink-900/8 bg-cream/70 p-7 sm:flex-row sm:items-center dark:border-cream/10 dark:bg-ink-900/60">
              <div className="max-w-md">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ember-500/12 text-ember-600 dark:text-ember-300">
                  <Heart size={24} weight="fill" />
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold text-ink-900 dark:text-cream">
                  Save what you love
                </h3>
                <p className="mt-2 text-ink-800/70 dark:text-cream/70">
                  Bookmark the recipes that land, so the winners are one tap away
                  next time you are staring into the fridge.
                </p>
              </div>
              <div className="grid shrink-0 grid-cols-3 gap-2 text-center">
                {[
                  { v: "38g", l: "Protein" },
                  { v: "540", l: "Kcal" },
                  { v: "22m", l: "Time" },
                ].map((s) => (
                  <div
                    key={s.l}
                    className="rounded-2xl bg-ink-900/[0.04] px-4 py-4 dark:bg-cream/[0.06]"
                  >
                    <p className="font-display text-2xl font-bold text-ember-600 dark:text-ember-300">
                      {s.v}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-wide text-ink-800/50 dark:text-cream/50">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
