"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Card,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

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
  writers: string[];
  released: string;
  imdbrating: string;
}

export default function FilmInfo({ selectedMovieId }: FilmInfoProps) {
  const [movieData, setMovieData] = useState<Movie | null>(null);

  const [isClickedWatched, setIsClickedWatched] = useState<boolean>(false);
  const [isClickedHeart, setIsClickedHeart] = useState<boolean>(false);

  const authToken = Cookie.get("token");

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
    setIsClickedWatched(!isClickedWatched);
    return;
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
    setIsClickedWatched(!isClickedWatched);
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
    <Box
      className="w-2/3 mt-10 rounded-t-lg"
      sx={{ backgroundColor: "#262B47", boxShadow: 4 }}
    >
      <Grid container spacing={4} sx={{ padding: 3, marginBottom: 5 }}>
        <Grid item md={3}>
          <div>
            {movieData && (
              <Card
                sx={{
                  borderRadius: "8px",
                  bgcolor: "transparent",
                  width: "250px",
                  aspectRatio: "17/25",
                }}
              >
                <CardMedia
                  sx={{
                    height: "100%",
                    width: "100%",
                    "& img": {
                      objectFit: "fill",
                      width: "100%",
                      height: "100%",
                    },
                  }}
                >
                  <img src={movieData.poster} alt="Movie Photo" />
                </CardMedia>
              </Card>
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
      <div className="w-full relative inset-x-0 bottom-0 h-[55%] bg-[#202439]">
        <div className="p-10">
          <Typography variant="h5" className="mb-4">
            Top Cast:
          </Typography>
          <div className="flex flex-row mb-3 space-x-4">
            {movieData?.actors.map((actor, index) => (
              <div>
                <div className="rounded-lg bg-transparent w-[150px] h-[calc(150px*25/17)] overflow-hidden mb-3">
                  <img
                    src="https://m.media-amazon.com/images/M/MV5BMjExNzA4MDYxN15BMl5BanBnXkFtZTcwOTI1MDAxOQ@@._V1_.jpg"
                    alt="Movie Photo"
                    className="object-fill w-full h-full"
                  />
                </div>
                <Typography>{actor}</Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Box>
  );
}
