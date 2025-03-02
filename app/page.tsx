"use client";
import { useState, useEffect, useRef } from "react";
import { useMovies } from "./hooks/useMovies";

export default function Home() {
  const { movies, loading } = useMovies();
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    import("bootstrap").then((bootstrap) => {
      if (modalRef.current) {
        new bootstrap.Modal(modalRef.current); // ✅ สร้าง Modal เมื่อโหลดหน้า
      }
    });
  }, []);

  const openModal = (movie: any) => {
    setSelectedMovie(movie);
    import("bootstrap").then((bootstrap) => {
      if (modalRef.current) {
        const modalInstance = new bootstrap.Modal(modalRef.current); // ✅ สร้าง Modal ใหม่ทุกครั้งที่คลิก
        modalInstance.show(); // ✅ เปิด Modal
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🎬 Movie List</h1>
      {loading ? (
        <p className="text-center text-gray-400 text-xl">Loading movies...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie: any) => (
            <div
              key={movie.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition-all"
              onClick={() => openModal(movie)} // ✅ เปิด Modal เมื่อคลิก
            >
              <h2 className="text-xl font-semibold text-white">{movie.title}</h2>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="mt-2 rounded-md"/>
            </div>
          ))}
        </div>
      )}

      {/* Bootstrap Modal + Tailwind CSS */}
      <div className="modal fade" ref={modalRef} tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content bg-gray-900 text-white">
            {selectedMovie && (
              <>
                <div className="modal-header border-b border-gray-700">
                  <h5 className="modal-title text-xl font-bold">{selectedMovie.title}</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} className="w-full rounded-md"/>
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
