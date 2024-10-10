import { useEffect } from "react";

export function useLocalStorage(key) {
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(key));
  }, [key]);
}
