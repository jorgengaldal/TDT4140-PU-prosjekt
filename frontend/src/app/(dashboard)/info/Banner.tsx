"use client";
import Link from "next/link";
import Photo from "./Photo";
import { useState, useEffect } from "react";

interface FilmInfoProps {
  selectedMovieId: string;
}

interface Movie {
  poster: string;
  title: string;
}

export default function Banner({ movieData }: FilmInfoProps) {
   return (
    <div className="w-full h-[500px] relative bg-primary">
      <div
        className="w-full bg-accent1 h-[500px] relative"
        style={{
          maskImage: `linear-gradient(to bottom, 
                     rgba(0,0,0, 1) 0%, 
                     rgba(0,0,0, 1) 40%, 
                     rgba(0,0,0, 0) 95%, 
                     rgba(0,0,0, 0) 100%)`,
          WebkitMaskImage: `linear-gradient(to bottom, 
                           rgba(0,0,0, 1) 0%, 
                           rgba(0,0,0, 1) 40%, 
                           rgba(0,0,0, 0) 95%, 
                           rgba(0,0,0, 0) 100%)`, // For WebKit browsers
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
        }}
      >
        {movieData && (
          <div
            className="absolute inset-0 bg-cover bg-no-repeat "
            style={{
              backgroundImage: `url(${movieData.poster})`,
              backgroundPosition: "100% 0%",
              height: "100%",
            }}
          ></div>
        )}
      </div>
      {movieData && (
        <div className="absolute bottom-0 left-20 right-0 top-40 text-white">
          <h1
            style={{
              fontSize: "5rem",
              fontWeight: "bold",
              marginTop: "70px",
              color: "#fff",
              //textShadow: "2px 2px 4px #000000",
              cursor: "pointer",
              marginBottom: "10px",
            }}
          >
            {movieData.title}
          </h1>
        </div>
      )}
    </div>
  );
}
