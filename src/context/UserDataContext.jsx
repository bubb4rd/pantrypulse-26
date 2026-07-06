import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase.js";
import { recipeId, toSavedRecipe } from "../lib/recipes.js";
import { useAuth } from "./AuthContext.jsx";

const UserDataContext = createContext(null);

export function UserDataProvider({ children }) {
  const { user, configured } = useAuth();
  const [allergens, setAllergensState] = useState([]);
  const [saved, setSaved] = useState([]);
  const [ready, setReady] = useState(false);

  // Subscribe to the user's settings doc + saved recipes when signed in.
  useEffect(() => {
    if (!configured || !user) {
      setAllergensState([]);
      setSaved([]);
      setReady(false);
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const unsubUser = onSnapshot(userRef, (snap) => {
      setAllergensState(snap.data()?.allergens ?? []);
      setReady(true);
    });

    const savedRef = query(
      collection(db, "users", user.uid, "saved"),
      orderBy("savedAt", "desc")
    );
    const unsubSaved = onSnapshot(savedRef, (snap) => {
      setSaved(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => {
      unsubUser();
      unsubSaved();
    };
  }, [configured, user]);

  const setAllergens = async (next) => {
    if (!user) return;
    setAllergensState(next); // optimistic
    await setDoc(
      doc(db, "users", user.uid),
      { allergens: next, updatedAt: serverTimestamp() },
      { merge: true }
    );
  };

  const savedIds = useMemo(() => new Set(saved.map((r) => r.id)), [saved]);
  const isSaved = (recipe) => savedIds.has(recipeId(recipe));

  const toggleSave = async (recipe) => {
    if (!user) return false;
    const id = recipeId(recipe);
    const ref = doc(db, "users", user.uid, "saved", id);
    if (savedIds.has(id)) {
      await deleteDoc(ref);
      return false;
    }
    await setDoc(ref, { ...toSavedRecipe(recipe), savedAt: serverTimestamp() });
    return true;
  };

  const value = useMemo(
    () => ({ allergens, setAllergens, saved, isSaved, toggleSave, ready }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allergens, saved, ready]
  );

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const ctx = useContext(UserDataContext);
  if (!ctx) throw new Error("useUserData must be used within a UserDataProvider");
  return ctx;
}
