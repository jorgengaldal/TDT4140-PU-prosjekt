"use client";
import Link from "next/link";
import Icons from "./Icons";
import React, { useEffect, useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { Movie } from "@/backend-types";
import { IconButton } from "@mui/material";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); // Empty dependency array to run this effect only once

  const closeDropdown = () => {
    setIsSearchOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      closeDropdown();
    }
  };
  const selectRandomMovie = () => {
    console.log(movies);
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    console.log(randomMovie);
    router.push(`/info?id=${randomMovie.imdbid}`);
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/movies/movies`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movie posters: ", error);
      });
  }, []);

  // Function to handle input change
  const handleInputChange = (e: { target: { value: any } }) => {
    if (!e.target.value) {
      setIsSearchOpen(false);
    } else {
      setIsSearchOpen(true);
    }
    setSearchQuery(e.target.value);
  };

  // Filter dropdown options based on search query
  const filteredOptions = movies
    .filter(
      (movie: Movie, index: number, self: Movie[]) =>
        index === self.findIndex((m: Movie) => m.imdbid === movie.imdbid)
    )
    .filter((movie: Movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <nav className="p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link href="/" className="mr-10 flex flex-row">
          <Icons name="Home" />
        </Link>
        <Link href="/liked" className="mr-10">
          <Icons name="Liked" />
        </Link>
        <IconButton onClick={selectRandomMovie} className="mr-10">
          <Icons name="Shuffle" />
        </IconButton>
        <Link href="/filter" className="mr-10">
          <FilterAltOutlinedIcon />
        </Link>
        <Dropdown />
      </div>

      <div className="flex items-center">
        <div className="w-[400px]" ref={dropdownRef}>
          <input
            type="text"
            placeholder="Search for movies"
            className="bg-accent1 order rounded-md focus:outline-none text-md w-full px-4 py-2"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <div className="relative group">
            <div
              className={`absolute top-0 left-0 mt-2 w-full max-h-[200px] overflow-auto rounded-md shadow-lg z-50 ${
                isSearchOpen ? "block" : "hidden"
              }`}
            >
              {filteredOptions.map((option, index) => (
                <Link
                  href={"/info?id=" + option.imdbid}
                  key={option.imdbid}
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                >
                  <div
                    key={index}
                    className="p-2 bg-gray-600 hover:bg-gray-700 w-full"
                  >
                    {option.title}, ({option.released?.slice(0, 4)})
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Link href="/profile">
          <Icons name="Profile" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
