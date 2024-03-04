"use client";
import React, { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import Poster from "@/components/General/Poster";
import { Movie } from "@/backend-types";

function ScrollWindow(props: { filterValue: string; filterBy: string }) {
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

  const handleGenreClick = () => {
    window.location.href = `/category?name=${props.filterValue}`;
  };

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
        {props.filterValue}
      </p>
      <div className="gallery" data-direction="right">
        <div className="floating_content" data-images="portrait">
          {movies.map((movie: Movie, index: number) => (
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
