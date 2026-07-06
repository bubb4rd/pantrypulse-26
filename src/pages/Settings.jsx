import { Check } from "@phosphor-icons/react";
import RequireAuth from "../components/RequireAuth.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useUserData } from "../context/UserDataContext.jsx";
import { HEALTH } from "../lib/filters.js";
import { cx } from "../lib/ui.js";

function AllergenPicker() {
  const { allergens, setAllergens } = useUserData();

  const toggle = (value) => {
    const set = new Set(allergens);
    set.has(value) ? set.delete(value) : set.add(value);
    setAllergens([...set]);
  };

  return (
    <div className="rounded-card border border-ink-900/8 bg-cream/70 p-6 sm:p-8 dark:border-cream/10 dark:bg-ink-900/60">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-cream">
            Dietary needs & allergens
          </h2>
          <p className="mt-1 text-ink-800/65 dark:text-cream/65">
            Pick what to avoid. We apply these to your searches and remember them
            across devices.
          </p>
        </div>
        <span className="mt-1 hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-ember-700 sm:inline-flex dark:text-ember-300">
          <Check size={16} weight="bold" />
          Saved automatically
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {HEALTH.map((h) => {
          const active = allergens.includes(h.value);
          return (
            <button
              key={h.value}
              type="button"
              onClick={() => toggle(h.value)}
              aria-pressed={active}
              className={cx(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                active
                  ? "border-ember-600 bg-ember-600 text-white"
                  : "border-ink-900/15 text-ink-800/80 hover:border-ember-500 hover:text-ember-700 dark:border-cream/20 dark:text-cream/75 dark:hover:text-ember-300"
              )}
            >
              {active && <Check size={16} weight="bold" />}
              {h.label}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-ink-800/55 dark:text-cream/55">
        {allergens.length === 0
          ? "Nothing selected yet."
          : `${allergens.length} preference${allergens.length > 1 ? "s" : ""} active.`}
      </p>
    </div>
  );
}

function ProfileCard() {
  const { user, signOutUser } = useAuth();
  return (
    <div className="rounded-card border border-ink-900/8 bg-cream/70 p-6 dark:border-cream/10 dark:bg-ink-900/60">
      <div className="flex items-center gap-4">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt=""
            className="h-14 w-14 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="grid h-14 w-14 place-items-center rounded-full bg-ember-500 font-display text-xl font-bold text-cream">
            {(user.displayName ?? user.email ?? "?").charAt(0).toUpperCase()}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate font-display text-lg font-bold text-ink-900 dark:text-cream">
            {user.displayName ?? "Signed in"}
          </p>
          <p className="truncate text-sm text-ink-800/60 dark:text-cream/60">
            {user.email}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={signOutUser}
        className="mt-5 w-full rounded-full border border-ink-900/15 px-5 py-2.5 text-sm font-semibold text-ink-900 transition-colors hover:border-ember-500 hover:text-ember-700 dark:border-cream/20 dark:text-cream dark:hover:text-ember-300"
      >
        Sign out
      </button>
    </div>
  );
}

export default function Settings() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-24 pt-28 sm:px-8">
      <h1 className="font-display text-4xl font-bold tracking-tight text-ink-900 sm:text-5xl dark:text-cream">
        Settings
      </h1>
      <p className="mt-3 text-lg text-ink-800/70 dark:text-cream/70">
        Tune PantryPulse to the way you eat.
      </p>

      <RequireAuth title="Sign in to save your preferences">
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <AllergenPicker />
          <ProfileCard />
        </div>
      </RequireAuth>
    </section>
  );
}
