'use client';

import { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import { Container, Typography } from "@mui/material";
import Poster from "@/components/General/Poster";
import { Movie, MovieReviewDetail } from "@/backend-types";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { grey } from "@mui/material/colors";

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
    films?.movie_lists.forEach((movieList: { reviews: any[] }) => {
        movieList.reviews.forEach((movie) => {
            watchedFilms.push(movie);
        });
    });

    const likedFilms: MovieReviewDetail[] = [];
    films?.movie_lists.forEach((movieList: { reviews: any[] }) => {
        movieList.reviews.forEach((movie) => {
            if (movie.is_favorite) {
                likedFilms.push(movie);
            }
        });
    });

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
            {filmMap?.map((filmReview, index) => {
                const movie = filmReview.movie as unknown as Movie;
                return (
                    <div key={index} className="flex flex-row w-full bg-primary mb-4">
                        <Poster movie={movie} index={index} text={false} height={150} />
                        <div className="ml-4">
                            <h1
                                style={{
                                    fontSize: "2rem",
                                    marginTop: "5px",
                                    color: "#fff",
                                    cursor: "pointer",
                                    marginBottom: "10px",
                                }}
                            >
                                {movie.title}
                            </h1>
                            <div className="flex flex-row justify-content-between">
                                <div className="mr-4">
                                    <Typography sx={{ fontSize: 15, opacity: 0.8 }}>
                                        IMDb RATING:
                                    </Typography>
                                    <div>
                                        <Typography sx={{ fontSize: 20 }}>
                                            <StarRoundedIcon sx={{ color: "#F5C519", fontSize: 30 }} />
                                            {movie && movie.imdbrating}
                                            <span style={{ opacity: 0.8, fontSize: 17 }}>/10</span>
                                        </Typography>
                                    </div>
                                </div>
                                <div className="mx-4">
                                    <Typography sx={{ fontSize: 15, opacity: 0.8 }}>
                                        Your RATING:
                                    </Typography>
                                    <div>
                                        {filmReview.rating ? (
                                            <Typography sx={{ fontSize: 20 }}>
                                                <StarRoundedIcon sx={{ color: "#F5C519", fontSize: 30 }} />
                                                {filmReview.rating && filmReview.rating}
                                                <span style={{ opacity: 0.8, fontSize: 17 }}>/10</span>
                                            </Typography>
                                        ) : (
                                            <Typography sx={{ fontSize: 20 }}>
                                                <span>Not rated</span>
                                            </Typography>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </Container>
    );
}
