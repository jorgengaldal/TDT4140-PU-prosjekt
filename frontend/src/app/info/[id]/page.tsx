"use client";

import Banner from "./Banner";
import FilmInfo from "./FilmInfo";

export default function InfoPage() {
    const selectedMovieId = "tt0083866"; // a selected movie ID
    return (
        <main className="flex min-h-screen flex-col bg-accent2 items-center justify-between">
            <Banner />
            <FilmInfo selectedMovieId={selectedMovieId} />
        </main>
    );
}
