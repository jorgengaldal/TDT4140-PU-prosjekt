"use client";
import Link from "next/link";
import Photo from "./Photo";
import { useState, useEffect } from "react";

interface FilmInfoProps {
    selectedMovieId: string;
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

    return (
            <div className="flex flex-col w-2/3 items-center justify-center relative my-20">
                {trailerData?.trailer && (
                    <iframe
                        width="1260"
                        height="675"
                        src={`https://www.youtube.com/embed/${trailerData?.trailer.youtube_video_id}`}
                        allowFullScreen
                    ></iframe>
                )}
            </div>
    );
}
