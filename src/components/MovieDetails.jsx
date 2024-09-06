import { useEffect, useState } from "react";

import StarRating from "./StarRating";
import Loading from "./Loading";

const key = "141fd5e2";

function MovieDetails({
  selectedMovieId,
  closeMovieDetail,
  handleSetWatch,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const rated = watched.map((movie) => movie.imdbID).includes(selectedMovieId);

  const givenRating = watched.find(
    (movie) => movie.imdbID === selectedMovieId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: gener,
  } = movie;

  function handleAddClick() {
    const detail = {
      imdbID: selectedMovieId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    handleSetWatch(detail);
    closeMovieDetail();
  }

  useEffect(() => {
    async function getMovieDetails() {
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${key}&i=${selectedMovieId}`
      );
      const data = await res.json();
      setMovie(data);
      setLoading(false);
    }
    getMovieDetails();
  }, [selectedMovieId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "UsePopcorn🍿🍿🍿";
      console.log(`Clean up effect for movie ${title}`);
    };
  });

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") closeMovieDetail();
    }
    document.addEventListener("keydown", callback);
    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [closeMovieDetail]);

  return (
    <div className="details">
      {loading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={closeMovieDetail}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{gener}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!rated ? (
                <>
                  <StarRating size={40} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddClick}>
                      + Add to watch
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You have already rated this movie with {givenRating}{" "}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetails;
