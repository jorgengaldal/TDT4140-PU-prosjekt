"use client";
import Link from "next/link";
import Photo from "./Photo";
import { useState, useEffect } from "react";

interface FilmInfoProps {
  selectedMovieId: string;
}

interface Movie {
  poster: string;
  title: string;
}

export default function Banner({ selectedMovieId }: FilmInfoProps) {
  const [movieData, setMovieData] = useState<Movie | null>(null);

  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/movies/movies/${selectedMovieId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const selectedMovie = await response.json();
        if (selectedMovie) {
          setMovieData(selectedMovie);
        } else {
          console.error("Movie not found");
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [selectedMovieId]);

  return (
    <div className="w-full bg-accent1 h-[400px] relative">
      {movieData && (
        <div
          className="absolute inset-0 bg-cover bg-no-repeat "
          style={{
            backgroundImage: `url(${movieData.poster})`,
            backgroundPosition: "100% 0%",
            height: "100%",
          }}
        >
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
            <Link href={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </Link>
            <h1 className="text-2xl mr-4">{movieData.title}</h1>
          </div>
        </div>
      )}
    </div>
  );
}
