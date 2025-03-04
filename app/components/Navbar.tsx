"use client";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust threshold for smoother transition
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center px-10 p-4 transition-colors duration-500 ease-in-out ${
        isScrolled
          ? "bg-gradient-to-b from-black to-black" // Solid background when scrolled
          : "bg-gradient-to-b from-black to-transparent" // Transparent gradient when at the top
      }`}
    >
      <b className="text-white text-2xl">Nextflix</b>

      <ul className="flex gap-6 text-white items-center mt-3">
        <li className="cursor-pointer font-medium hover:text-gray-400">Home</li>
      </ul>
    </nav>
  );
}
