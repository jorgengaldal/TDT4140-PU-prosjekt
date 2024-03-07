"use client";
import { useSearchParams } from "next/navigation";
import Banner from "./Banner";
import FilmInfo from "./FilmInfo";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import CastList from "./CastList";
import Trailer from "./Trailer";

interface Movie {
  id: string;
  imdbid: string;
  title: string;
  poster: string;
  plot: string;
  genres: string[];
  actors: string[];
  directors: string[];
  writers: string[];
  released: string;
  imdbrating: string;
}
export default function InfoPage() {
  const searchParams = useSearchParams();
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/movies/movies/${id}/`
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
  }, [id]);

  return (
    <main className="flex min-h-screen flex-col bg-primary items-center justify-between">
      <Banner movieData={movieData} />
      <Box
        className="w-2/3 mt-10 rounded-t-lg"
        sx={{ backgroundColor: "#262B47", boxShadow: 4 }}
      >
        <Box sx={{ padding: 3 }}>
          <FilmInfo selectedMovieId={id} movieData={movieData} />
          <Trailer selectedMovieId={id} />
        </Box>
        <CastList movieData={movieData} />
      </Box>
    </main>
  );
}
