"use client";
import ScrollWindow from "@/components/ScrollWindow/ScrollWindow";
import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { Movie } from "@/backend-types";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [profile, setProfile] = useState<any>();
  const [liked, setLiked] = useState<any>();

  useEffect(() => {
    const authToken = Cookie.get("token");

    const authHeaders = {
      "Content-Type": "application/json",
      Authorization: `Token ${authToken}`,
    };
    fetch(`http://127.0.0.1:8000/api/movies/movies/`, { "headers": authHeaders })
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


  const authToken = Cookie.get('token');

  useEffect(() => {
    // Fetch films from the API endpoint
    fetch("http://localhost:8000/api/profiles/profile", {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch films");
        }
        return response.json();
      })
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.error("Error fetching films:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch films from the API endpoint
    fetch("http://localhost:8000/api/reviews/likednotmovies", {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch films");
        }
        return response.json();
      })
      .then((data) => {
        setLiked(data);
      })
      .catch((error) => {
        console.error("Error fetching films:", error);
      });
  }, []);

  const genreRanking: { [key: string]: number } = {}; // Declare rankedGenres outside the forEach loop

  profile?.movie_lists.forEach((movieList: {
    genre_data: any; reviews: any[]
  }) => {
    const data = movieList.genre_data;
    const allGenres = new Set<string>();
    Object.keys(data.reviews_per_genre).forEach((genre) =>
      allGenres.add(genre)
    );
    Object.keys(data.favorites_per_genre).forEach((genre) =>
      allGenres.add(genre)
    );
    Object.keys(data.genre_rating_averages).forEach((genre) =>
      allGenres.add(genre)
    );

    allGenres.forEach((genre) => {
      const reviews = data.reviews_per_genre[genre] || 0;
      const favorites = data.favorites_per_genre[genre] || 0;
      const averageRating = data.genre_rating_averages[genre] || 0;
      genreRanking[genre] = reviews + favorites + averageRating;
    });

  });

  const forYouSorting = (a: Movie, b: Movie) => {

    const genreFavouriteFactor = (movie: Movie) => {
      const numLikedGenres = liked
          .filter((likedItem) => likedItem.category.name !== "" && likedItem.category.category_type === "Genre")
          .filter((likedItem) => likedItem.category.name in movie.genres).length;

      if(numLikedGenres === 0) {
        return 1;
      }

      return 1.1 * numLikedGenres;
  }

    const actorFavouriteFactor = (movie: Movie) => {
      const numLikedActors = liked
          .filter((likedItem) => likedItem.category.name === "")
          .filter((likedItem) => likedItem.person.name in movie.actors
            || likedItem.person.name in movie.directors
            || likedItem.person.name in movie.writers).length;
      
      if(numLikedActors === 0) {
        return 1;
      }
      return 1.1 * numLikedActors;
    }

    return (
      b.genres.map((genre) => genreRanking[genre] ?? 0).reduce((sum, current) => sum + current, 0) *  Math.floor(Math.random() * 1.2 + 0.8) * genreFavouriteFactor(b) * actorFavouriteFactor(b)
      - a.genres.map((genre) => genreRanking[genre] ?? 0).reduce((sum, current) => sum + current, 0) *  Math.floor(Math.random() * 1.2 + 0.8) * genreFavouriteFactor(b) * actorFavouriteFactor(b)
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ScrollWindow
        movies={movies}
        filterBy={(movie: Movie) => movie.is_sponsored}
        title={"Sponsored"}
        doNotLinkTitle
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
        sortBy={(a: Movie, b: Movie) => forYouSorting(a, b)}
        title={"For you"}
        limit={20}
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
