"use client";
import React, { useEffect, useState, useRef } from "react";
import Layout from "./layout/Layout";
import GalleryDiv from "./layout/GalleryDiv";

interface MoviePoster {
  imageUrl: string;
  // Add other properties as needed
}

function ScrollWindow(props: any) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/movies/categories/${props.filterValue}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return setMovies(data.movies);
      })
      .catch((error) => {
        console.error("Error fetching movie posters: ", error);
      });
  }, []);

  const handlePosterClick = (movie: any) => {
    // Pass movie as a parameter
    if (movie) {
      window.location.href = `/info?id=${movie.imdbid}`; // Use movie.id to create the URL
    }
  };

  const handleGenreClick = () => {
    // Pass movie as a parameter
      window.location.href = `/category?name=${props.filterValue}`; // Use movie.id to create the URL
  };

  return (
    <Layout contentMaxWidth="100ch">
      <p className="scrollWindowTitle" onClick={() => handleGenreClick()}>{props.filterValue}</p>
      <GalleryDiv galleryItemsAspectRatio="portrait">
        {movies.map((movie: any, index: number) => (
          <div className="posterComponent" key={index}>
            <img
              className="posterImage"
              onClick={() => handlePosterClick(movie)} // Call handleClick with movie as argument
              src={movie.poster || "/no_poster.jpeg"}
              alt={`Movie Poster ${index}`}
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = "/no_poster.jpeg";
              }}
            />
            <div className="posterTitle">{movie.title}</div>
          </div>
        ))}
      </GalleryDiv>
    </Layout>
  );
}

export default ScrollWindow;
