import { useState, useEffect } from "react";

const key = "141fd5e2";

export function useMovies(query) {
  const [error, setError] = useState("");
  const [isLoadingMovieFetch, setLoadingMovieFetch] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setLoadingMovieFetch(true);
        setError("");
        const searchQuery = query === "" ? "spider" : query;
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&s=${searchQuery}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("❌ Failed to fetch movies");

        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setLoadingMovieFetch(false);
      }
    };
    // closeMovieDetail();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);
  return { movies, isLoadingMovieFetch, error };
}
