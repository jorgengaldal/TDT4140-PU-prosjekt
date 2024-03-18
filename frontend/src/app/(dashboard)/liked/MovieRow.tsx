"use client";
import React from "react";
import { Typography } from "@mui/material";
import Poster from "@/components/General/Poster";
import { Movie, MovieReviewDetail } from "@/backend-types";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

interface MovieRowProps {
  movie: Movie;
  filmReview: MovieReviewDetail;
}

export const MovieRow = ({ movie, filmReview }: MovieRowProps) => {
    return (
        <div className="flex flex-row w-full bg-primary mb-4">
            <Poster movie={movie} index={0} text={false} height={150} />
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
                    <div className="mx-4">
                        <Typography sx={{ fontSize: 15, opacity: 0.8 }}>
                            Your Review:
                        </Typography>
                        <div>
                            {filmReview.review_text ? (
                                <Typography sx={{ fontSize: 20 }}>
                                    <StarRoundedIcon sx={{ color: "#F5C519", fontSize: 30 }} />
                                    {filmReview.review_text}
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
    );
}