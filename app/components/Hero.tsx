"use client";
import { useEffect, useState } from "react";
import { fetchMovies } from "./../services/api";
import { PlayIcon } from "@heroicons/react/24/solid"; // Import Icons
import { InformationCircleIcon } from "@heroicons/react/24/outline"; // Import Icons

export default function Hero({ openModal }: { openModal: (movie: any) => void }) {
  const [movie, setMovie] = useState<any | null>(null);

  useEffect(() => {
    fetchMovies().then((movies) => {
      setMovie(movies[Math.floor(Math.random() * movies.length)]); // Random Movie
    });
  }, []);

  if (!movie) return <div className="h-[750px] bg-gray-900 animate-pulse"></div>;

  return (
    <div
      className="relative h-[750px] bg-cover bg-center"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

      {/* Movie's Information */}
      <div className="absolute bottom-24 left-10 text-white max-w-lg">
        <h1 className="text-5xl font-bold">{movie.title}</h1>
        <p className="mt-4 text-gray-300 text-lg">{movie.overview.slice(0, 150)}...</p>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          {/* Play Button */}
          <button 
            className="flex items-center gap-2 bg-zinc-50 px-6 py-2 text-lg font-semibold text-black rounded hover:bg-zinc-300 transition">
            <PlayIcon className="w-6 h-6" /> Play
          </button>

          {/* More Info Button */}
          <button
            className="flex items-center gap-2 bg-gray-600 px-6 py-2 text-lg font-semibold text-white rounded hover:bg-gray-700 transition"
            onClick={() => openModal(movie)}
          >
            <InformationCircleIcon className="w-6 h-6" /> More Info
          </button>
        </div>
      </div>
    </div>
  );
}