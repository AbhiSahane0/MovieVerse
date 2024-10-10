import { useState } from "react";
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
import { useMovies } from "./components/useMovies.js";
import { useLocalStorage } from "./components/useLocalStorage.js";

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return storedValue ? JSON.parse(storedValue) : [];
  });
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

  // Custom hook
  const { movies, isLoadingMovieFetch, error } = useMovies(query);

  useLocalStorage(watched);

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
