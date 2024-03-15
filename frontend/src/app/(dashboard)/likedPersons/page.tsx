"use client";
import { Grid, Link, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Cookie from 'js-cookie';
import { useSearchParams } from "next/navigation";
import { Container } from "@mui/material";
import PersonPoster from "@/components/General/PersonPoster";

interface Person {
    name: string,
    picture: string,
    person_type?: Array<string | undefined>
}

interface LikedNotMovie {
    id: string,
    person: Person,
    category: {
        name: string,
        category_type?: string
    }
    profile: string
}

const LikedPersonPage: React.FC = () => {
    const [persons, setPersons] = React.useState<any[]>([]);

    const role = useSearchParams().get("role");

    const authToken = Cookie.get('token');

    useEffect(() => {
        // Fetch films from the API endpoint
        fetch("http://localhost:8000/api/reviews/likednotmovies", {
            headers: {
                Authorization: `Token ${authToken}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch actors");
                }
                return response.json();
            })
            .then((data) => {
                if (!data) {
                    return
                }
                const likedOfRole = data.filter((likedNotMovieObject: LikedNotMovie) => "person_type" in likedNotMovieObject.person)
                    .map((likedNotMovieObject: LikedNotMovie) => likedNotMovieObject.person)
                    .filter((person: Person) => person.person_type?.map(type => type.toLowerCase()).includes(role))
                setPersons(likedOfRole)
            })
            .catch((error) => {
                console.error("Error fetching liked actor:", error);
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
                Liked {role}s
            </h1>
            <Grid container spacing={3} justifyContent="center">
                {persons?.map((person, index) => (
                    <Grid item xs={10} sm={5} md={4} lg={3} key={index}>
                        <PersonPoster person={person} />
                    </Grid>)
                )}
            </Grid>
        </Container>
    );
};

export default LikedPersonPage;
