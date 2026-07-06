import { useCallback, useRef, useState } from "react";
import { getNextPage, searchRecipes } from "../lib/edamam.js";

/**
 * Owns all live-search state against the Edamam client:
 * query + filters -> results (recipes), loading, error, pagination.
 */
export function useRecipeSearch() {
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | loadingMore | success | error
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [lastQuery, setLastQuery] = useState("");

  const nextUrl = useRef(null);
  // Guards against out-of-order responses when the user types fast.
  const requestId = useRef(0);

  const run = useCallback(async (params) => {
    const id = ++requestId.current;
    setStatus("loading");
    setError(null);
    setRecipes([]);
    nextUrl.current = null;
    setLastQuery(params.q ?? "");

    try {
      const { recipes: found, next, total: count } = await searchRecipes(params);
      if (id !== requestId.current) return; // superseded
      setRecipes(found);
      nextUrl.current = next;
      setTotal(count);
      setStatus("success");
    } catch (err) {
      if (id !== requestId.current) return;
      setError(err);
      setStatus("error");
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (!nextUrl.current || status === "loadingMore") return;
    const id = requestId.current;
    setStatus("loadingMore");
    try {
      const { recipes: more, next } = await getNextPage(nextUrl.current);
      if (id !== requestId.current) return;
      setRecipes((prev) => [...prev, ...more]);
      nextUrl.current = next;
      setStatus("success");
    } catch (err) {
      if (id !== requestId.current) return;
      setError(err);
      setStatus("error");
    }
  }, [status]);

  const reset = useCallback(() => {
    requestId.current++;
    setRecipes([]);
    setStatus("idle");
    setError(null);
    setTotal(0);
    setLastQuery("");
    nextUrl.current = null;
  }, []);

  return {
    recipes,
    status,
    error,
    total,
    lastQuery,
    hasMore: Boolean(nextUrl.current),
    run,
    loadMore,
    reset,
  };
}
