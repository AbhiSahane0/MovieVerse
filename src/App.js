import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Logo from "./components/Logo";
import Input from "./components/Input";
import NumberOfResult from "./components/NumberOfResult";
import Box from "./components/Box";
import MoviesList from "./components/MoviesList";
import WatchedSummary from "./components/WatchedSummary";
import WatchedMoviesList from "./components/WatchedMoviesList";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";
import MovieDetails from "./components/MovieDetails.jsx";

const key = "141fd5e2";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState([]);
  const [error, setError] = useState("");
  const [isLoadingMovieFetch, setLoadingMovieFetch] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  function handleSetQuery(value) {
    setQuery(value);
  }

  function closeMovieDetail() {
    setSelectedId(null);
  }

  function handleSetWatch(watch) {
    setWatched((prev) => [...prev, watch]);
  }

  function handleRemoveWatched(id) {
    setWatched((watched) => watched.filter((curr) => curr.imdbID !== id));
  }

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
    closeMovieDetail();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Navbar>
        <Logo />
        <Input query={query} setQuery={handleSetQuery} />
        <NumberOfResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoadingMovieFetch && <Loading />}
          {!isLoadingMovieFetch && !error && (
            <MoviesList movies={movies} setSelectedId={setSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedMovieId={selectedId}
              closeMovieDetail={closeMovieDetail}
              handleSetWatch={handleSetWatch}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />

              <WatchedMoviesList
                watched={watched}
                handleRemoveWatched={handleRemoveWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
