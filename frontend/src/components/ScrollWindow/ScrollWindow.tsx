"use client";
import React, { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import Poster from "@/components/General/Poster";
import { Movie } from "@/backend-types";

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
    <Layout contentMaxWidth="90vw">
      <p
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginTop: "5px",
          color: "#fff",
          textShadow: "2px 2px 4px #000000",
          cursor: "pointer",
        }}
        onClick={handleGenreClick}
      >
        {props.title}
      </p>
      <div className="gallery" data-direction="right">
        <div className="floating_content" data-images="portrait">
          {filteredMovies.map((movie: Movie, index: number) => (
            <div
              style={{
                flexDirection: "column",
                paddingTop: "5px",
                margin: "0px 5px 0px 5px",
              }}
              key={index}
            >
              <Poster movie={movie} index={index} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ScrollWindow;
