"use client";
import { Grid, IconButton } from "@mui/material";
import Poster from "@/components/General/Poster";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Cookie from "js-cookie";


type likedItem = {
  id: string;
  person: {
      name: string;
      person_type: string[];
  };
  category: {
      name: string;
  };
  profile: string;
};
const GenrePage: React.FC = () => {
  const [movies, setMovies] = React.useState<any[]>([]);
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false);
  const category = useSearchParams().get("name");

  const authToken = Cookie.get("token");

    const authHeaders = {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
    };
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/categories/" + category)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return setMovies(data.movies);
      })
      .catch((error) => {
        console.error("Error fetching movie posters: ", error);
      });
      fetch("http://localhost:8000/api/reviews/likednotmovies/")
        .then((response) => response.json())
        .then((data) => {
            // Check if any liked item's person name matches the current person's name
            if (data.some((liked: likedItem) => liked.category && liked.category.name === category)) {
                setIsFavorite(true);
            } else {
                setIsFavorite(false);
            }
        })
        .catch((error) => {
            console.error("Error fetching data: ", error);
            setIsFavorite(false);
        });
  }, []);

  const handleClickHeart = async () => {
    const likedCategory = {
        category: category,
    };

    if (!isFavorite) {
        try {
            const response = await fetch("http://localhost:8000/api/reviews/likednotmovies/", {
                headers: authHeaders,
                method: "POST",
                body: JSON.stringify(likedCategory),
            });
            if (response.status !== 201) {
                console.error("Could not like category \n" + await response.text());
            } else {
                setIsFavorite(true);
            }
        } catch (error) {
            console.error("Error liking category: ", error);
        }
    }
    else {
        try {
            const response = await fetch("http://localhost:8000/api/reviews/likednotmovies/", {
                headers: authHeaders,
            });
    
            if (!response.ok) {
                throw new Error("Error fetching LikedNotMovies");
            }
    
            const data: likedItem[] = await response.json();
            const entry = data.find((liked: likedItem) => liked.category && liked.category.name === category);
    
            if (!entry) {
                throw new Error(`No LikedNotMovie found for category ${category}`);
            }
    
            const deleteResponse = await fetch(`http://localhost:8000/api/reviews/likednotmovies/${entry.id}`, {
                headers: authHeaders,
                method: "DELETE",
            });
    
            if (deleteResponse.status !== 204) {
                throw new Error("Could not unlike category \n" + await deleteResponse.text());
            } else {
                setIsFavorite(false);
                console.log(`Successfully unliked category: ${entry.category.name}`);
            }
        } catch (error) {
            console.error("Error in deleteLikedNotMovie: ", error);
        }
    }
};

  return (
    <Container className="min-h-screen">
      <ul className="flex flex-row gap-4 mb-10">
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginTop: "5px",
          color: "#fff",
          textShadow: "2px 2px 4px #000000",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        {category}
      </h1>
      <IconButton sx={{ color: "pink" }} onClick={handleClickHeart}>
              {isFavorite ? (
                <FavoriteIcon sx={{ fontSize: 35 }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 35 }} />
              )}
            </IconButton>
      </ul>
      <Grid container spacing={3} justifyContent="center">
        {movies?.map((movie, index) => (
          <Grid item xs={10} sm={5} md={4} lg={3} key={index}>
            <Poster movie={movie} index={index} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GenrePage;
