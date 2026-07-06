import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookmarkSimple,
  GearSix,
  GoogleLogo,
  List,
  MoonStars,
  SignOut,
  Sun,
  X,
} from "@phosphor-icons/react";
import { useAuth } from "../context/AuthContext.jsx";
import { btnPrimary, cx } from "../lib/ui.js";

const SECTION_LINKS = [
  { hash: "#search", label: "Search" },
  { hash: "#features", label: "Features" },
  { hash: "#how", label: "How it works" },
  { hash: "#contact", label: "Contact" },
];

function Avatar({ user, size = "h-9 w-9" }) {
  if (user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt=""
        referrerPolicy="no-referrer"
        className={cx(size, "rounded-full object-cover")}
      />
    );
  }
  return (
    <span
      className={cx(
        size,
        "grid place-items-center rounded-full bg-ember-500 font-display font-bold text-cream"
      )}
    >
      {(user.displayName ?? user.email ?? "?").charAt(0).toUpperCase()}
    </span>
  );
}

function ThemeToggleButton({ dark, onToggleTheme, className }) {
  return (
    <button
      type="button"
      onClick={onToggleTheme}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={cx(
        "flex items-center gap-2.5 rounded-xl px-4 py-3 text-left font-semibold text-ink-800 transition-colors hover:bg-ember-50 dark:text-cream dark:hover:bg-ink-800",
        className
      )}
    >
      {dark ? <Sun size={20} weight="bold" /> : <MoonStars size={20} weight="bold" />}
      {dark ? "Light mode" : "Dark mode"}
    </button>
  );
}

export default function Navbar({ dark, onToggleTheme }) {
  const { user, loading, signOutUser } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const showLogin = !loading && !user;

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { rootMargin: "0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const closeMobile = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cx(
          "mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 transition-all sm:px-8",
          scrolled &&
            "backdrop-blur-md bg-cream/80 dark:bg-ink-950/80 border-b border-ink-900/5 dark:border-cream/10"
        )}
      >
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-ember-500 text-cream">
            <span className="h-2.5 w-2.5 rounded-full bg-cream" />
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ink-900 dark:text-cream">
            PantryPulse
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {SECTION_LINKS.map((link) => (
            <Link
              key={link.hash}
              to={{ pathname: "/", hash: link.hash }}
              className="text-[15px] font-semibold text-ink-800/80 transition-colors hover:text-ember-700 dark:text-cream/75 dark:hover:text-ember-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Theme toggle: desktop only (mobile lives in hamburger) */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="hidden h-10 w-10 place-items-center rounded-full border border-ink-900/10 text-ink-800 transition-colors hover:border-ember-500 hover:text-ember-700 lg:grid dark:border-cream/15 dark:text-cream dark:hover:text-ember-300"
          >
            {dark ? <Sun size={20} weight="bold" /> : <MoonStars size={20} weight="bold" />}
          </button>

          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Account menu"
                aria-expanded={menuOpen}
                className="grid place-items-center rounded-full ring-2 ring-transparent transition hover:ring-ember-500"
              >
                <Avatar user={user} />
              </button>

              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 z-50 mt-2 w-60 overflow-hidden rounded-2xl border border-ink-900/10 bg-cream shadow-xl dark:border-cream/10 dark:bg-ink-900">
                    <div className="border-b border-ink-900/8 px-4 py-3 dark:border-cream/10">
                      <p className="truncate font-semibold text-ink-900 dark:text-cream">
                        {user.displayName ?? "Signed in"}
                      </p>
                      <p className="truncate text-sm text-ink-800/60 dark:text-cream/60">
                        {user.email}
                      </p>
                    </div>
                    <Link
                      to="/saved"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-ink-800 hover:bg-ember-50 dark:text-cream dark:hover:bg-ink-800"
                    >
                      <BookmarkSimple size={18} weight="bold" />
                      Saved recipes
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-ink-800 hover:bg-ember-50 dark:text-cream dark:hover:bg-ink-800"
                    >
                      <GearSix size={18} weight="bold" />
                      Settings
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMenuOpen(false);
                        signOutUser();
                      }}
                      className="flex w-full items-center gap-2.5 border-t border-ink-900/8 px-4 py-3 text-sm font-semibold text-ink-800 hover:bg-ember-50 dark:border-cream/10 dark:text-cream dark:hover:bg-ink-800"
                    >
                      <SignOut size={18} weight="bold" />
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            showLogin && (
              <Link
                to="/login"
                className={cx(
                  btnPrimary,
                  "inline-flex shrink-0 px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base"
                )}
              >
                <GoogleLogo size={18} weight="bold" />
                Log in
              </Link>
            )
          )}

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/10 text-ink-800 lg:hidden dark:border-cream/15 dark:text-cream"
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-4 mt-2 rounded-2xl border border-ink-900/10 bg-cream p-2 shadow-xl lg:hidden dark:border-cream/10 dark:bg-ink-900">
          {SECTION_LINKS.map((link) => (
            <Link
              key={link.hash}
              to={{ pathname: "/", hash: link.hash }}
              onClick={closeMobile}
              className="block rounded-xl px-4 py-3 font-semibold text-ink-800 hover:bg-ember-50 dark:text-cream dark:hover:bg-ink-800"
            >
              {link.label}
            </Link>
          ))}

          <div className="my-2 border-t border-ink-900/8 dark:border-cream/10" />

          <ThemeToggleButton
            dark={dark}
            onToggleTheme={onToggleTheme}
            className="w-full"
          />

          {user ? (
            <>
              <Link
                to="/saved"
                onClick={closeMobile}
                className="block rounded-xl px-4 py-3 font-semibold text-ink-800 hover:bg-ember-50 dark:text-cream dark:hover:bg-ink-800"
              >
                Saved recipes
              </Link>
              <Link
                to="/settings"
                onClick={closeMobile}
                className="block rounded-xl px-4 py-3 font-semibold text-ink-800 hover:bg-ember-50 dark:text-cream dark:hover:bg-ink-800"
              >
                Settings
              </Link>
              <button
                type="button"
                onClick={() => {
                  closeMobile();
                  signOutUser();
                }}
                className="block w-full rounded-xl px-4 py-3 text-left font-semibold text-ink-800 hover:bg-ember-50 dark:text-cream dark:hover:bg-ink-800"
              >
                Sign out
              </button>
            </>
          ) : (
            showLogin && (
              <Link
                to="/login"
                onClick={closeMobile}
                className={cx(btnPrimary, "mx-2 mt-2 flex w-[calc(100%-1rem)] justify-center")}
              >
                <GoogleLogo size={20} weight="bold" />
                Log in
              </Link>
            )
          )}
        </div>
      )}
    </header>
  );
}
