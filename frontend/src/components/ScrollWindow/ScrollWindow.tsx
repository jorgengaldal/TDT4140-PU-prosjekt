"use client";
import React, { useEffect, useState, useRef } from "react";
import Layout from "./layout/Layout";
import GalleryDiv from "./layout/GalleryDiv";

interface MoviePoster {
  imageUrl: string;
  // Add other properties as needed
}
//Arguments for ScrollWindow
//movies: list of movies
//filterBy: filter function
//sortBy: sort function
//title: title of the scroll window
//limit: number of movies to display
//doNotLinkTitle: if true, the title is not a link

function ScrollWindow(props: any) {
  const handlePosterClick = (movie: any) => {
    // Pass movie as a parameter
    if (movie) {
      window.location.href = `/info?id=${movie.imdbid}`; // Use movie.id to create the URL
    }
  };

  const handleGenreClick = () => {
    // Pass movie as a parameter
    if (!props.doNotLinkTitle) {
      window.location.href = `/category?name=${props.title}`; // Use movie.id to create the URL
    }
  };

  if (!props.movies) {
    return <div>Loading...</div>;
  }

  let filteredMovies = [...props.movies];
  if (props.filterBy) {
    filteredMovies = props.movies.filter(props.filterBy);
  }
  if (props.sortBy) {
    filteredMovies = filteredMovies.sort(props.sortBy);
  }
  if (props.limit) {
    filteredMovies = filteredMovies.slice(0, props.limit);
  }

  return (
    <Layout contentMaxWidth="100ch">
      <p className="scrollWindowTitle" onClick={() => handleGenreClick()}>
        {props.title}
      </p>
      <GalleryDiv galleryItemsAspectRatio="portrait">
        {filteredMovies.map((movie: any, index: number) => (
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
