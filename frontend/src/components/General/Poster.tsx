"use client";
import React from "react";
import { Card, CardMedia } from "@mui/material";
import { useRouter } from "next/navigation";
import { Movie } from "@/backend-types";

type PosterProps = {
  movie: Movie;
  index: number;
};

export default function Poster({ movie, index }: PosterProps) {
  const router = useRouter();

  function handleClick() {
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
          transition: "transform 0.3s", // This applies the transition effect
          bgcolor: "transparent",
          borderRadius: "8px",
          ":hover": {
            transform: "translateY(-5px)", // This moves the card up on hover
            boxShadow: 20, // Assuming theme.shadows[20] exists and you want a deeper shadow on hover
          },
        }}
      >
        <CardMedia
          sx={{
            width: "17rem",
            height: "25rem",
            aspectRatio: "17/25",
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
      <div className="text-2xl mt-1 mb-1 text-center text-white  object-fit">
        {movie.title}
      </div>
    </div>
  );
}
