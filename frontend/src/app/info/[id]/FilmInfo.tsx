"use client";

import Photo from "./Photo";
import { useState } from "react";

export default function FilmInfo() {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className="w-2/3 mt-10 bg-accent1 rounded-t-lg h-[800px]">
            <div className="flex flex-row">
                <div className="p-4 w-1/5">
                    <Photo width="150" height="200" />
                </div>
                <div className="p-4 w-4/5">
                    <div className="flex flex-row">
                        <h1 className="text-2xl mr-4">Header</h1>
                        <button onClick={handleClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill={isClicked ? "red" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-sm">Set within a year after the events of Batman Begins (2005), Batman, Lieutenant James Gordon, and new District Attorney Harvey Dent successfully begin to round up the criminals that plague Gotham City, until a mysterious and sadistic criminal mastermind known only as "The Joker" appears in Gotham, creating a new wave of chaos. Batman's struggle against The Joker becomes deeply personal, forcing him to "confront everything he believes" and improve his technology to stop him. A love triangle develops between Bruce Wayne, Dent, and Rachel Dawes</p>
                </div>
            </div>

            <div className="w-full relative inset-x-0 bottom-0 bg-primary rounded-lg h-[25%]">
    
            <p className="mt-80">This is the bottom</p>

                <div className="flex flex-row">
                    <div className="p-4">
                        <Photo width="40" height="80" />
                    </div>
                    <div className="p-4">
                        <Photo width="40" height="150" />
                    </div>
                    <div className="p-4">
                        <Photo width="40" height="150" />
                    </div>
                    <div className="p-4">
                        <Photo width="40" height="150" />
                    </div>
                </div>
            </div>
    </div>
    )
}