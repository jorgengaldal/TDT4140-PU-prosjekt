"use client";

import { useSearchParams } from "next/navigation";
import Banner from "./Banner";
import FilmInfo from "./FilmInfo";

export default function InfoPage() {
    const searchParams = useSearchParams()

    const id = searchParams.get('id');

    return (
        <main className="flex min-h-screen flex-col bg-primary items-center justify-between">
            {id ? (
                <>
                <Banner selectedMovieId={id} />
                <FilmInfo selectedMovieId={id} />
                </>
            ) : (
                <p>URL IS WRONG</p>
            )}
        </main>
    );
}
