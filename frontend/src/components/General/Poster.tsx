import React from "react";

import "./style/style.css";

export default function Poster(movie: any, index: number) {
  function handleClick() {
    window.location.href = "/info?id=" + movie.imdbid;
  }

  movie = movie.movie;
  index = movie.index;

  return (
    <div className="posterComponent">
      <img
        className="posterImage"
        key={index}
        onClick={handleClick}
        src={movie.poster || "/testImg1.jpg"}
        alt={`Movie Poster ${index}`}
        onError={(e) => {
          (e.target as HTMLImageElement).onerror = null;
          (e.target as HTMLImageElement).src = "/testImg1.jpg";
        }}
      />
      <p className="text-lg mt-2 mb-2 text-center text-white shadow-lg">{movie.title}</p>
    </div>
  );
}
