import { useState } from "react";
import { CheckCircle, PaperPlaneTilt } from "@phosphor-icons/react";
import Reveal from "./Reveal.jsx";

const inputBase =
  "w-full rounded-xl border border-cream/15 bg-ink-950/40 px-4 py-3 text-cream placeholder:text-cream/40 focus:border-ember-400 focus:outline-none";
const labelBase = "mb-1.5 block text-sm font-semibold text-cream/70";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <h2 className="font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl dark:text-cream">
            Drop us a line
          </h2>
          <p className="mt-4 max-w-md text-lg text-ink-800/70 dark:text-cream/70">
            Questions, ideas, or a recipe you wish we surfaced? Fill out the form
            and we will get back to you.
          </p>
          <p className="mt-6 max-w-md text-ink-800/55 dark:text-cream/55">
            We read everything and reply case by case, so tell us what would make
            PantryPulse more useful for the way you cook.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-card bg-ink-900 p-6 sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center py-12 text-center">
                <CheckCircle size={56} weight="fill" className="text-ember-400" />
                <h3 className="mt-4 font-display text-2xl font-bold text-cream">
                  Message sent
                </h3>
                <p className="mt-2 max-w-sm text-cream/70">
                  Thanks for reaching out. We will be in touch soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-6 rounded-full border border-cream/20 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-ember-400 hover:text-ember-300"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fname" className={labelBase}>
                      First name
                    </label>
                    <input
                      id="fname"
                      name="fname"
                      required
                      placeholder="Bo"
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label htmlFor="lname" className={labelBase}>
                      Last name
                    </label>
                    <input
                      id="lname"
                      name="lname"
                      required
                      placeholder="Hubbard"
                      className={inputBase}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className={labelBase}>
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={inputBase}
                  />
                </div>
                <div>
                  <label htmlFor="message" className={labelBase}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    placeholder="What's on your mind?"
                    className={`${inputBase} resize-y`}
                  />
                </div>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-ember-700 px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-ember-800 active:scale-[0.99]"
                >
                  Send message
                  <PaperPlaneTilt size={18} weight="fill" />
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
