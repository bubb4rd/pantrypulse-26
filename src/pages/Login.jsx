import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogo, LockKey } from "@phosphor-icons/react";
import { useAuth } from "../context/AuthContext.jsx";
import { btnPrimary } from "../lib/ui.js";

export default function Login() {
  const { user, loading, configured, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate("/settings", { replace: true });
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-ember-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 pb-24 pt-28 sm:px-8">
      <div className="w-full rounded-card border border-ink-900/10 bg-cream/70 px-6 py-14 text-center dark:border-cream/10 dark:bg-ink-900/60">
        <span className="mb-5 inline-grid h-16 w-16 place-items-center rounded-2xl bg-ember-500/12 text-ember-600 dark:text-ember-300">
          <LockKey size={30} weight="fill" />
        </span>
        <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-cream">
          Sign in to PantryPulse
        </h1>
        <p className="mt-3 text-ink-800/65 dark:text-cream/65">
          Save your dietary needs, bookmark recipes, and pick up where you left off
          on any device.
        </p>

        {configured ? (
          <button
            type="button"
            onClick={signInWithGoogle}
            className={`${btnPrimary} mt-8 w-full`}
          >
            <GoogleLogo size={20} weight="bold" />
            Continue with Google
          </button>
        ) : (
          <p className="mt-8 text-sm text-ink-800/55 dark:text-cream/55">
            Firebase is not configured. Add your VITE_FIREBASE_* keys to .env to
            enable sign-in.
          </p>
        )}

        <Link
          to={{ pathname: "/", hash: "#search" }}
          className="mt-6 inline-block text-sm font-semibold text-ember-700 hover:underline dark:text-ember-300"
        >
          Continue without signing in
        </Link>
      </div>
    </section>
  );
}
