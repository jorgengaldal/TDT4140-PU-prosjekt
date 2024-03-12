"use client";
import ScrollWindow from "@/components/ScrollWindow/ScrollWindow";
import React, { useEffect, useState } from "react";

interface Movie {
  id: string;
  imdbid: string;
  title: string;
  poster: string;
  plot: string;
  genres: string[];
  actors: string[];
  directors: string[];
  released: string;
  imdbrating: string;
  is_sponsored: boolean;
}

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/movies/movies/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movie posters: ", error);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ScrollWindow
        movies={movies}
        filterBy={(movie: Movie) => movie.is_sponsored}
        title={"Sponsored"}
      />
      <ScrollWindow
        movies={movies}
        sortBy={(a: Movie, b: Movie) =>
          parseFloat(a.imdbrating) - parseFloat(b.imdbrating)
        }
        title={"Bottom 10 movies"}
        limit={10}
        doNotLinkTitle 
      />
      <ScrollWindow
        movies={movies}
        filterBy={(movie: Movie) => movie.genres.includes("Comedy")}
        title={"Comedy"}
      />
      <ScrollWindow
        movies={movies}
        filterBy={(movie: Movie) => movie.genres.includes("Action")}
        title={"Action"}
      />
      <ScrollWindow
        movies={movies}
        filterBy={(movie: Movie) => movie.genres.includes("Fantasy")}
        title={"Fantasy"}
      />
      <ScrollWindow
        movies={movies}
        filterBy={(movie: Movie) => movie.genres.includes("Adventure")}
        title={"Adventure"}
      />
    </main>
  );
}
