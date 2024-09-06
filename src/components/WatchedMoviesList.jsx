import WatchedMovie from "./WatchedMovie";

function WatchedList({ watched, handleRemoveWatched }) {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <WatchedMovie
            movie={movie}
            key={movie.imdbID}
            handleRemoveWatched={handleRemoveWatched}
          />
        ))}
      </ul>
    </>
  );
}
export default WatchedList;
