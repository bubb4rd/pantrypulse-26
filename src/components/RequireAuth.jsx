import { GoogleLogo, LockKey } from "@phosphor-icons/react";
import { useAuth } from "../context/AuthContext.jsx";
import { btnPrimary } from "../lib/ui.js";

export default function RequireAuth({ title, children }) {
  const { user, loading, configured, signInWithGoogle } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-ember-500 border-t-transparent" />
      </div>
    );
  }

  if (user) return children;

  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-card border border-ink-900/10 bg-cream/70 px-6 py-14 text-center dark:border-cream/10 dark:bg-ink-900/60">
      <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-ember-500/12 text-ember-600 dark:text-ember-300">
        <LockKey size={30} weight="fill" />
      </span>
      <h2 className="font-display text-2xl font-bold text-ink-900 dark:text-cream">
        {title ?? "Sign in to continue"}
      </h2>
      <p className="mt-2 text-ink-800/65 dark:text-cream/65">
        {configured
          ? "Sign in with Google to save your dietary needs and recipes across devices."
          : "Firebase is not configured yet. Add your VITE_FIREBASE_* keys to .env to enable accounts."}
      </p>
      {configured && (
        <button
          type="button"
          onClick={signInWithGoogle}
          className={`${btnPrimary} mt-6`}
        >
          <GoogleLogo size={20} weight="bold" />
          Continue with Google
        </button>
      )}
    </div>
  );
}
