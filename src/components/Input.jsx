import { useEffect, useRef } from "react";

function Input({ query, setQuery }) {
  const inputEle = useRef(null);

  useEffect(() => {
    inputEle.current.focus();
  });
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputEle}
      />
    </>
  );
}

export default Input;
