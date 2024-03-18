'use client';

import { Grid, IconButton } from "@mui/material";
import Poster from "@/components/General/Poster";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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
const PersonPage = () => {
    const [writtenMovies, setWrittenMovies] = useState<any[]>([]);
    const [actedInMovies, setActedInMovies] = useState<any[]>([]);
    const [directedMovies, setDirectedMovies] = useState<any[]>([]);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    const person = useSearchParams().get("name");

    const authToken = Cookie.get("token");

    const authHeaders = {
        "Content-Type": "application/json",
        Authorization: `Token ${authToken}`,
    };

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/movies/persons/" + person)
            .then((response) => {
                if (response.status == 404) {
                    return;
                }
                return response.json();
            })
            .then((data) => {
                setWrittenMovies(data.written_movies);
                setActedInMovies(data.acted_movies);
                setDirectedMovies(data.directed_movies);
            })
            .catch((error) => {
                console.error("Error fetching movie posters: ", error);
            });
        fetch("http://localhost:8000/api/reviews/likednotmovies/")
            .then((response) => response.json())
            .then((data) => {
                // Check if any liked item's person name matches the current person's name
                if (data.some((liked: likedItem) => liked.person && liked.person.name === person)) {
                    setIsFavorite(true);
                } else {
                    setIsFavorite(false);
                }
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setIsFavorite(false);
            });
    }, [person]);


    const handleClickHeart = async () => {
        const likedPerson = {
            person: person,
        };

        if (!isFavorite) {
            try {
                
                const response = await fetch("http://localhost:8000/api/reviews/likednotmovies/", {
                    headers: authHeaders,
                    method: "POST",
                    body: JSON.stringify(likedPerson),
                });
                if (response.status !== 201) {
                    console.error("Could not like person \n" + await response.text());
                } else {
                    setIsFavorite(true);
                }
            } catch (error) {
                console.error("Error liking person: ", error);
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
                const entry = data.find((liked: likedItem) => liked.person && liked.person.name === person);
        
                if (!entry) {
                    throw new Error(`No LikedNotMovie found for person ${person}`);
                }
        
                const deleteResponse = await fetch(`http://localhost:8000/api/reviews/likednotmovies/${entry.id}`, {
                    headers: authHeaders,
                    method: "DELETE",
                });
        
                if (deleteResponse.status !== 204) {
                    throw new Error("Could not unlike person \n" + await deleteResponse.text());
                } else {
                    setIsFavorite(false);
                }
            } catch (error) {
                console.error("Error in deleteLikedNotMovie: ", error);
            }
        }
    };

    return (
        <div className="min-h-screen m-20">
            <ul className="flex flex-row gap-4 mb-10">
                <h1 className="text-6xl font-bold">{person}</h1>
                <IconButton sx={{ color: "pink" }} onClick={handleClickHeart}>
              {isFavorite ? (
                <FavoriteIcon sx={{ fontSize: 35 }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 35 }} />
              )}
            </IconButton>
            </ul>


            <div className="flex flex-col gap-5">
                {actedInMovies.length == 0 ? (
                    <p>{person} has not acted in any movies.</p>
                ) : (
                    <>
                        <h2>Acted in: </h2>
                        <Grid container spacing={2}>
                            {actedInMovies.map((movie, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <Poster movie={movie} index={index} />
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}

                {directedMovies.length == 0 ? (
                    <p>{person} has not directed any movies.</p>
                ) : (
                    <>
                        <h2>Directed: </h2>
                        <Grid container spacing={2}>
                            {directedMovies.map((movie, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <Poster movie={movie} index={index} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}

                {writtenMovies.length == 0 ? (
                    <p>{person} has not writtenany movies.</p>
                ) : (
                    <>
                        <h2>Written: </h2>
                        <Grid container spacing={2}>
                            {writtenMovies.map((movie, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                    <Poster movie={movie} index={index} />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </div>
        </div>
    );
};

export default PersonPage;
