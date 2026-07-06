import Reveal from "./Reveal.jsx";

const STEPS = [
  {
    n: "1",
    title: "Add your ingredients",
    body: "Search a dish or list what you have on hand. Chicken, chickpeas, whatever is in reach.",
  },
  {
    n: "2",
    title: "Set your filters",
    body: "Dial in diet, allergies, and a calorie range so every result fits how you eat.",
  },
  {
    n: "3",
    title: "Cook something great",
    body: "Scan nutrition at a glance, open the full recipe, and get to the good part.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="scroll-mt-20 bg-ink-900 py-20 text-cream sm:py-28 dark:bg-ink-900/40"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            From pantry to plate in three moves
          </h2>
          <p className="mt-4 text-lg text-cream/70">
            No account, no clutter. Search to plate in under a minute.
          </p>
        </Reveal>

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i * 0.1} className="relative">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-ember-500 font-display text-2xl font-bold text-cream">
                  {step.n}
                </span>
                {i < STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="hidden h-px flex-1 bg-gradient-to-r from-ember-500/60 to-transparent md:block"
                  />
                )}
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold">
                {step.title}
              </h3>
              <p className="mt-2 text-cream/70">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
