"use client";
import React from "react";
import { Card, CardMedia } from "@mui/material";
import { useRouter } from "next/navigation";
import { Movie } from "@/backend-types";

type PosterProps = {
  movie: Movie;
  index: number;
  height?: string;
  fontSize?: string;
  text?: boolean;
  clickable?: boolean;
};

export default function Poster({
  movie,
  index,
  height,
  fontSize="2xl",
  text=true,
  clickable=true
}: PosterProps) {
  const router = useRouter();
  console.log(movie);
  function handleClick() {
    if (!clickable) {
      return;
    }
    router.push(`/info?id=${movie.imdbid}`);
  }

  function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = "/no_poster.jpeg";
    e.currentTarget.onerror = null;
  }

  return (
    <div key={index}>
      <Card
        sx={{
          transition: "transform 0.3s",
          bgcolor: "transparent",
          borderRadius: "8px",
          width: height ? height : "17rem",
          aspectRatio: "17/25",
          ":hover": (clickable? {
            transform: "translateY(-5px)",
            boxShadow: 20,
          } : {}),
        }}
      >
        <CardMedia
          sx={{
            width: "100%",
            height: "100%",
            cursor: "pointer",
            "& img": {
              objectFit: "fill",
              width: "100%",
              height: "100%",
            },
          }}
        >
          <img
            loading="lazy"
            onClick={handleClick}
            src={movie.poster || "/testImg1.jpg"}
            alt={`Movie Poster of ${movie.title}`}
            onError={handleImageError}
          />
        </CardMedia>
      </Card>
      { text && 
        <div
          className={`text-${fontSize} mt-1 mb-1 text-center text-white object-fit`}
        >
          {movie.title}
        </div>
      }
    </div>
  );
}
