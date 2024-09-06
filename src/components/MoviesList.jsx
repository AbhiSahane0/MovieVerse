import Movie from "./Movie";

function MoviesList({ movies, setSelectedId }) {
  return (
    <>
      <ul className="list list-movies">
        {movies?.slice(0, 6).map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            setSelectedId={setSelectedId}
          />
        ))}
      </ul>
    </>
  );
}

export default MoviesList;
