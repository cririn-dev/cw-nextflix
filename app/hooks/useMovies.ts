"use client";
import { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMovies()
      .then(setMovies)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { movies, loading };
}
