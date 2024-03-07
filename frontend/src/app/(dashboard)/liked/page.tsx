'use client';

import { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import Link from "next/link";
import Icons from "@/components/General/Icons";
import Layout from "../layout";
import link from "next/link";

interface PosterProps {
    link: string;
    index: number;
    id: string;
}

const ImagePoster: React.FC<PosterProps> = ({ link, index, id }) => {
    return (
        <Link href={"/info?id=" + id} className="mx-2">
            <img
                width={140}
                height={210}
                style={{ height: "100%" }}
                key={index}
                src={link || "/no_poster.jpeg"}
                alt={`Poster ${index}`}
            />
        </Link>
    );
};

export default function LikedPage() {
    const authToken = Cookie.get('token');
    const [films, setFilms] = useState<any>();

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

    const likedFilms: any = [];
    films?.movie_lists.forEach((movieList: { reviews: any[] }) => {
        movieList.reviews.forEach((movie) => {
            likedFilms.push(movie);
        });
    });

    return (
        <div className="flex flex flex-col items-center pb-12 min-h-screen">
            <div className="flex">
                <div className="flex flex-row">
                    {likedFilms.map((likedFilm: { movie: { poster: string; imdbid: string; }; }, index: number) => (
                        <Link href={"/info?id=" + likedFilm.imdbid} className="mx-2" key={likedFilm.imdbid}>
                            <img
                                width={140}
                                height={210}
                                style={{ height: "100%" }}
                                src={likedFilm.movie.poster || "/no_poster.jpeg"}
                                alt={`Poster ${index}`}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
