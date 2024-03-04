"use client";
import { Grid } from "@mui/material";
import Poster from "@/components/General/Poster";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@mui/material";

const GenrePage: React.FC = () => {
  const [movies, setMovies] = React.useState<any[]>([]);

  const name = useSearchParams().get("name");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/categories/" + name)
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

  return (
    <Container className="min-h-screen">
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
        {name}
      </h1>
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
