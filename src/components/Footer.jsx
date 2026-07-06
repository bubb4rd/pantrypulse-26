import { GithubLogo } from "@phosphor-icons/react";

const LINKS = [
  { href: "#search", label: "Search" },
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink-900/8 py-10 dark:border-cream/10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-ember-500 text-cream">
            <span className="h-2.5 w-2.5 rounded-full bg-cream" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ink-900 dark:text-cream">
            PantryPulse
          </span>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-ink-800/70 transition-colors hover:text-ember-700 dark:text-cream/70 dark:hover:text-ember-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-sm text-ink-800/55 dark:text-cream/55">
            Recipe data powered by Edamam
          </span>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/10 text-ink-800 transition-colors hover:border-ember-500 hover:text-ember-700 dark:border-cream/15 dark:text-cream dark:hover:text-ember-300"
          >
            <GithubLogo size={20} weight="fill" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[1400px] px-4 sm:px-8">
        <p className="text-sm text-ink-800/45 dark:text-cream/45">
          © {new Date().getFullYear()} PantryPulse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
