"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Grid, IconButton, Typography } from "@mui/material";
import Poster from "@/components/General/Poster";

interface FilmInfoProps {
  movieData: Movie;
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
  writers: string[];
  released: string;
  imdbrating: string;
}

export default function FilmInfo({
  movieData,
}: FilmInfoProps) {
  const [isClickedWatched, setIsClickedWatched] = useState<boolean>(false);
  const [isClickedHeart, setIsClickedHeart] = useState<boolean>(false);

  const authToken = Cookie.get("token");

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Token ${authToken}`,
  };

  let defaultMovieListId: string | null = null;
  fetch("http://localhost:8000/api/profiles/profile", { headers: authHeaders })
    .then((response) => response.json())
    .then((data) => {
      defaultMovieListId = data.my_movie_list;
    });

  const handleClickWatched = () => {
    setIsClickedWatched(!isClickedWatched);
    return;
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
    setIsClickedWatched(!isClickedWatched);
  };

  const handleClickHeart = () => {
    //   const review = { is_favorite };
    setIsClickedHeart(!isClickedHeart);
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
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
                (movieReview: any) => movieReview.movie.id == movieData.id
              )
            ) {
              setIsClickedWatched(true);
            }
          });
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [movieData]);

  return (
    <Grid container spacing={4} sx={{ marginBottom: 7 }}>
      <Grid item md={3}>
        <div>
          {movieData && (
            <Poster
              movie={movieData}
              height="250px"
              text={false}
              clickable={false}
            />
          )}
        </div>
      </Grid>
      <Grid item container md={9}>
        <Grid item md={12}>
          <div className="flex flex-row mb-3">
            <Typography
              variant="h3"
              className="mr-4"
              sx={{ textShadow: "1px 1px 2px black" }}
            >
              {movieData && movieData.title}
            </Typography>
            <IconButton
              className="mr-2"
              sx={{ color: "white" }}
              onClick={handleClickWatched}
            >
              {isClickedWatched ? (
                <VisibilityIcon sx={{ fontSize: 35 }} />
              ) : (
                <VisibilityOffIcon sx={{ fontSize: 35 }} />
              )}
            </IconButton>
            <IconButton sx={{ color: "pink" }} onClick={handleClickHeart}>
              {isClickedHeart ? (
                <FavoriteIcon sx={{ fontSize: 35 }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 35 }} />
              )}
            </IconButton>
          </div>
          <div className="flex flex-row mb-6">
            <p>{movieData && movieData.released} | </p>
            <p className="text-1g ml-2.5" style={{ color: "LightCyan" }}>
              {movieData &&
                movieData.genres.map((genre, index) => (
                  <Link key={index} href={"/category?name=" + genre}>
                    <span className="mx-2">{genre} </span>
                  </Link>
                ))}
            </p>
          </div>
          <h1 className="mt-3 text-2 mr-4">{movieData && movieData.plot}</h1>
          <div className="mt-5">
            Directors:
            <span className="text-1g ml-2.5" style={{ color: "LightCyan" }}>
              {movieData?.directors.join(", ")}
            </span>
            <div>
              Writers:
              <span className="text-1g ml-2.5" style={{ color: "LightCyan" }}>
                {movieData?.writers.join(", ")}
              </span>
            </div>
          </div>
          <a href={`https://www.imdb.com/title/${movieData?.imdbid}/`}>
            <div className="mt-10">
              <Typography sx={{ fontSize: 15, opacity: 0.8 }}>
                IMDb RATING:
              </Typography>
              <div>
                <Typography sx={{ fontSize: 20 }}>
                  <StarRoundedIcon sx={{ color: "#F5C519", fontSize: 30 }} />
                  {movieData && movieData.imdbrating}
                  <span style={{ opacity: 0.8, fontSize: 17 }}>/10</span>
                </Typography>
              </div>
            </div>
          </a>
        </Grid>
      </Grid>
    </Grid>
  );
}
