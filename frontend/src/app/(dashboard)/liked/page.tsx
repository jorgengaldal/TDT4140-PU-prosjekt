'use client';
import React, { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import { Container } from "@mui/material";
import { MovieReviewDetail } from "@/backend-types";
import { MovieRow } from "./MovieRow";

export default function LikedPage() {
    const authToken = Cookie.get('token');
    const [films, setFilms] = useState<any>();
    const [selected, setSelected] = useState<string>("watched");

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
                setFilms(data);
            })
            .catch((error) => {
                console.error("Error fetching films:", error);
            });
    }, []);

    const watchedFilms: MovieReviewDetail[] = [];
    const likedFilms: MovieReviewDetail[] = [];
    if (films) {
        films?.movie_lists.forEach((movieList: { reviews: MovieReviewDetail[] }) => {
            movieList.reviews.forEach((movie) => {
                if (movie.is_favorite) {
                    likedFilms.push(movie);
                } else {
                    watchedFilms.push(movie);
                }
            });
        });
    }

    const getColor = (title: string) => {
        return selected === title ? "#fff" : "grey";
    }

    // Define filmMap variable based on selected value
    const filmMap = selected === "watched" ? watchedFilms : likedFilms;

    return (
        <Container className="min-h-screen mb-20">
            <div className="flex flex-row gap-6">
                <h1
                    style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        marginTop: "5px",
                        color: getColor("watched"),
                        cursor: "pointer",
                        marginBottom: "10px",
                    }}
                    onClick={() => setSelected("watched")}
                >
                    My Watched
                </h1>
                <h1
                    style={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        marginTop: "5px",
                        color: getColor("liked"),
                        cursor: "pointer",
                        marginBottom: "10px",
                    }}
                    onClick={() => setSelected("liked")}
                >
                    My Liked
                </h1>
            </div>

            {filmMap.length === 0 && (
                <p>You have not {selected === "watched" ? "watched" : "liked"} any films</p>
            )}
            {filmMap
                ?.filter(filmReview => filmReview.movie) // Filter out entries where movie is falsy
                .map((filmReview, index) => (
                    <MovieRow key={index} movie={filmReview.movie} filmReview={filmReview} />
                ))
            }
        </Container>
    );
}

