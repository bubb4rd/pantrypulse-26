import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, googleProvider, isFirebaseConfigured } from "../lib/firebase.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const signInWithGoogle = async () => {
    if (!isFirebaseConfigured) {
      setError(new Error("Firebase is not configured."));
      return;
    }
    try {
      setError(null);
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      // Popup closed by the user is not a real error worth surfacing.
      if (err?.code !== "auth/popup-closed-by-user") setError(err);
    }
  };

  const signOutUser = async () => {
    if (isFirebaseConfigured) await signOut(auth);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      configured: isFirebaseConfigured,
      signInWithGoogle,
      signOutUser,
    }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
