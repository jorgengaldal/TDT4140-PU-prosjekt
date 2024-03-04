"use client";

import Link from "next/link";
import Photo from "./Photo";
import { useState, useEffect } from "react";
import Cookie from 'js-cookie';
import Trailer from "./Trailer";
import Icons from "../../../components/General/Icons";

interface FilmInfoProps {
  selectedMovieId: string;
}

interface Review {
  review_text?: string;
  rating?: number;
  is_favorite?: boolean;
  movie_list: string;
}

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
}

export default function FilmInfo({ selectedMovieId }: FilmInfoProps) {
  const [movieData, setMovieData] = useState<Movie | null>(null);

  const [isClickedWatched, setIsClickedWatched] = useState<boolean>(false);
  const [isClickedHeart, setIsClickedHeart] = useState<boolean>(false);

  const authToken = Cookie.get('token');

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Token ${authToken}`,
  };

  let defaultMovieListId: string | null = null;
  // Fetches Id for default movie list
  fetch("http://localhost:8000/api/profiles/profile", { headers: authHeaders })
    .then((response) => response.json())
    .then((data) => {
      defaultMovieListId = data.my_movie_list;
    });

  const handleClickWatched = () => {
    if (isClickedWatched) {
      return;
    }
    if (movieData == null) {
      console.error("There's no movie to mark as watched.");
      return;
    }
    if (defaultMovieListId == null) {
      console.error("Current profile has no assigned movie list");
      return;
    }
    const review = {
      movie: movieData.id,
      movie_list: defaultMovieListId,
    };
    fetch("http://localhost:8000/api/reviews/moviereviews/", {
      headers: authHeaders,
      method: "POST",
      body: JSON.stringify(review),
    }).then((response: any) => {
      if (response.status != 201) {
        console.error("Could not post review \n" + response.text);
      }
    });

    // TODO: Kan bare markere som sett, ikke som usett.
    setIsClickedWatched(true);
  };

  const handleClickHeart = () => {
    //   const review = { is_favorite };
    setIsClickedHeart(!isClickedHeart);
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/movies/movies/${selectedMovieId}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const selectedMovie = await response.json();
        if (selectedMovie) {
          setMovieData(selectedMovie);
          // Checks if there exists a review of this movie.
          fetch("http://localhost:8000/api/reviews/moviereviews/", {
            headers: {
              Authorization: `Token ${authToken}`,
              "Content-Type": "application/json",
            },
          })
            .then((response: any) => response.json())
            .then((data) => {
              if (
                data.some(
                  (movieReview: any) => movieReview.movie.id == selectedMovie.id
                )
              ) {
                setIsClickedWatched(true);
              }
            });
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
    <div className="w-2/3 mt-10 bg-accent2 rounded-t-lg h-[800px]">
      <div className="flex flex-row">
        {movieData && (
          <div className="p-4 w-1/5 rounded-lg">
            <Photo width="150" height="300" imageUrl={movieData.poster} />
          </div>
        )}
        <div className="p-4 w-4/5">
          <div className="flex flex-row">
            <h1 className="text-2xl mr-4">{movieData && movieData.title}</h1>
            <button onClick={handleClickWatched}>
              {isClickedWatched ? <Icons name="Watched" /> : <Icons name="NotWatched" />}
            </button>
            <h1 className="text-2xl mr-4">{/* content here */}</h1>{" "}
            {/* Add your content here */}
            <button onClick={handleClickHeart}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isClickedHeart ? "white" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>
          <div className="">
            <h1 className="">{movieData && movieData.released}</h1>
            <h1 className="text-1g mt-2 mx-10">
              {movieData &&
                movieData.genres.map((genre, index) => (
                  <Link key={index} href={"/category?name=" + genre}>
                    <span className="mx-2">{genre}</span>
                  </Link>
                ))}
            </h1>
          </div>
          <h1 className="mt-3 text-2 mr-4">{movieData && movieData.plot}</h1>
          <p className="mt-8">Imdb rating:</p>{" "}
          <p>{movieData && movieData.imdbrating}</p>
          {/* <p className="mt-10">Add personal rating:</p>
          <p className="mt-1">Number:</p>
          <p className="mt-1">Description:</p> */}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Trailer selectedMovieId={selectedMovieId} />
      </div>
      <div className="w-full relative inset-x-0 bottom-0 bg-accent1 rounded-lg h-[55%]">
        <p className="mt-40">Top 3 cast:</p>
        <div className="p-4">
          <h1 className="text-1g mt-2 mx-2">
            {movieData &&
              movieData.actors.map((actor, index) => (
                <Link key={index} href={"/persons?name=" + actor}>
                  <p className="mx-2">{actor}</p>
                </Link>
              ))}
          </h1>
        </div>
        <p className="mt-10">Directors:</p>
        <div className="p-4">
          <h1 className="text-1g mt-2 mx-2">
            {movieData &&
              movieData.directors.map((director, index) => (
                <Link key={index} href={"/persons?name=" + director}>
                  <p className="mx-2">{director}</p>
                </Link>
              ))}
          </h1>
        </div>
      </div>
    </div>
  );
}
