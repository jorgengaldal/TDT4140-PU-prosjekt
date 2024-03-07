"use client";
import { useState, useEffect } from "react";

interface FilmInfoProps {
  selectedMovieId: string | null;
}

export default function Trailer({ selectedMovieId }: FilmInfoProps) {
  const [trailerData, setTrailerData] = useState<any>();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `https://api.kinocheck.de/movies?imdb_id=${selectedMovieId}&language=en`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const selectedMovieData = await response.json();
        if (selectedMovieData) {
          setTrailerData(selectedMovieData);
        } else {
          console.error("Movie not found");
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [selectedMovieId]);
  if (!trailerData?.trailer) {
    return;
  }
  return (
    <div className="border-t-2 border-[#10121C]">
      <div className="flex flex-col w-[100%] items-center relative my-10">
        {trailerData?.trailer && (
          <iframe
            width="80%"
            style={{ aspectRatio: "16/9" }}
            src={`https://www.youtube.com/embed/${trailerData?.trailer.youtube_video_id}`}
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
}
