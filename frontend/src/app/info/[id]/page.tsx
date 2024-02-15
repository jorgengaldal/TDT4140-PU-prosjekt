"use client";

import Banner from "./Banner";
import FilmInfo from "./FilmInfo";

export default function InfoPage() {
    return (
        <main className="flex min-h-screen flex-col bg-accent2 items-center justify-between">
            <Banner/>
            <FilmInfo/>
        </main>
    )
}