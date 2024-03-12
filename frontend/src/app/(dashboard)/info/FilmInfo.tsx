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
  movieData: Movie | null;
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

export default function FilmInfo({ movieData }: FilmInfoProps) {
  const [isClickedWatched, setIsClickedWatched] = useState<boolean>(false);
  const [isClickedHeart, setIsClickedHeart] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState({});

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

  const handleClickWatched = async () => {
    if (defaultMovieListId == null) {
      console.error("Current profile has no assigned movie list");
      return;
    }
    if (!isClickedWatched) {
      const review = {
        movie: movieData.id,
        movie_list: defaultMovieListId,
      };
      console.log(review);
      await fetch("http://localhost:8000/api/reviews/moviereviews/", {
        headers: authHeaders,
        method: "POST",
        body: JSON.stringify(review),
      }).then((response: any) => {
        if (response.status != 201) {
          console.error("Could not post review \n" + response.text);
        }
      });
      setIsClickedWatched(true);
    } else {
      await fetch(`http://localhost:8000/api/reviews/moviereviews/${reviewData.id}`, {
        headers: authHeaders,
        method: "DELETE",
      }).then((response: any) => {
        if (response.status != 201) {
          console.error("Could not DELETE review \n" + response.text);
        }
      });
      setIsClickedWatched(false);
      setIsClickedHeart(false);
      setReviewData({});
    }
  };

  const handleClickHeart = async () => {
    //   const review = { is_favorite };
    if (defaultMovieListId == null) {
      console.error("Current profile has no assigned movie list");
      return;
    }
    if (!isClickedWatched) {
      const review = {
        movie: movieData.id,
        movie_list: defaultMovieListId,
        is_favorite: true,
      };
      console.log(review);
      await fetch("http://localhost:8000/api/reviews/moviereviews/", {
        headers: authHeaders,
        method: "POST",
        body: JSON.stringify(review),
      }).then((response: any) => {
        if (response.status != 201) {
          console.error("Could not post review \n" + response.text);
        }
      });
      setIsClickedWatched(true);
      setIsClickedHeart(true)
      return;
    }

    await fetch(`http://localhost:8000/api/reviews/moviereviews/${reviewData.id}/`, {
      method: "PATCH", // Specify the request method
      headers: {
        "Content-Type": "application/json", // Specify the content type in the headers
      },
      body: JSON.stringify({ is_favorite: !isClickedHeart }), // Convert the JavaScript object to a JSON string
    })
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => console.log("Success:", data)) // Handle success
      .catch((error) => console.error("Error:", error)); // Handle errors
    setIsClickedHeart(!isClickedHeart);
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        fetch("http://localhost:8000/api/profiles/profile/", {
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
        })
          .then((response: any) => response.json())
          .then((data) => {
            console.log(data);
            const reviews = data.movie_lists[0].reviews;
            reviews.forEach((review) => {
              if (review.movie.imdbid == movieData?.imdbid) {
                setReviewData(review);
                setIsClickedWatched(true);
                setIsClickedHeart(review.is_favorite)
              }
            });
          });
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [movieData, isClickedWatched]);

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
              {movieData?.directors.map((director, index) => {
                return (
                  <Link href={"/persons?name=" + director} key={index}>
                    <span>
                      {director}
                      {index !== movieData.directors.length - 1 && ", "}
                    </span>
                  </Link>
                );
              })}
            </span>
            <div>
              Writers:
              <span className="text-1g ml-2.5" style={{ color: "LightCyan" }}>
                {movieData?.writers.map((writer, index) => {
                  return (
                    <Link href={"/persons?name=" + writer} key={index}>
                      <span>
                        {writer}
                        {index !== movieData.writers.length - 1 && ", "}
                      </span>
                    </Link>
                  );
                })}
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
