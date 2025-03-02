import { useEffect, useState } from "react";
import { fetchMovies } from "@/app/services/api";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies()
      .then(setMovies)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">🎬 Movies</h2>
      <ul>
        {movies.map((movie: any) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
