"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieRow from "./components/MovieRow";
import { Modal } from "bootstrap";

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    import("bootstrap").then((bootstrap) => {
      if (modalRef.current) {
        new bootstrap.Modal(modalRef.current);
      }
    });
  }, []);

  const openModal = (movie: any) => {
    setSelectedMovie(movie);
    import("bootstrap").then((bootstrap) => {
      if (modalRef.current) {
        const modalInstance = new bootstrap.Modal(modalRef.current);
        modalInstance.show();
      }
    });
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <Hero openModal={openModal}/>
      <MovieRow title="Popular Movies" openModal={openModal} />
      <MovieRow title="Trending Now" openModal={openModal} />
      <MovieRow title="New Releases" openModal={openModal} />

      {/* Modal */}
      <div className="modal fade" ref={modalRef} tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content bg-[#181818] text-white rounded-lg shadow-lg">
            {selectedMovie && (
              <>
                <div className="modal-body bg-[#181818]">
                  <h5 className="modal-title text-2xl font-bold">{selectedMovie.title}</h5>
                  <img src={`https://image.tmdb.org/t/p/w780${selectedMovie.backdrop_path}`} alt={selectedMovie.title} className="w-full rounded-md"/>
                  <p className="mt-3 text-gray-300">{selectedMovie.overview}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
