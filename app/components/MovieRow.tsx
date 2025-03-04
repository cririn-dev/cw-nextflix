"use client";
import { useEffect, useState, useRef } from "react";
import { fetchMovies } from "./../services/api";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"; // Import arrow icons

export default function MovieRow({ title, openModal }: { title: string; openModal: (movie: any) => void }) {
  const [movies, setMovies] = useState([]);
  const [isScrolledLeft, setIsScrolledLeft] = useState(true);
  const [isScrolledRight, setIsScrolledRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchMovies().then(setMovies);
  }, []);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsScrolledLeft(scrollLeft <= 0);
      setIsScrolledRight(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust scroll distance
      if (direction === "left") {
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
      setTimeout(checkScrollPosition, 200); // Allow time for smooth scrolling
    }
  };

  return (
    <div className="relative text-white mt-6 px-10">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="relative">
        {/* Left Arrow Button (Hidden when at start) */}
        {!isScrolledLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute h-[170] left-0 top-1/2 -translate-y-1/2 z-10 
            bg-gradient-to-r from-black to-transparent p-3 rounded-full hover:bg-opacity-80 transition"
          >
            <ChevronLeftIcon className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Movie Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hidden scroll-smooth"
          onScroll={checkScrollPosition}
        >
          {movies.map((movie: any) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
              alt={movie.title}
              className="w-[300px] h-[170px] rounded-lg cursor-pointer object-cover hover:scale-105 transition"
              onClick={() => openModal(movie)}
            />
          ))}
        </div>

        {/* Right Arrow Button (Hidden when at end) */}
        {!isScrolledRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute h-[170px] right-0 top-1/2 -translate-y-1/2 z-10 
            bg-gradient-to-l from-black to-transparent p-3 rounded-full hover:bg-opacity-80 transition"
          >
            <ChevronRightIcon className="w-6 h-6 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
