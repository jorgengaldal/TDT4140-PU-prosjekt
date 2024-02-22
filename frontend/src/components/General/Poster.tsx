import React from "react";

import "./style/style.css";

export default function Poster(movie: any, index: number) {
  function handleClick() {
    window.location.href = "/info?id=" + movie.imdbid;
  }

    movie = movie.movie
    index = movie.index
    
    return (
        <div className="flex-col pt-5 ">
            
                <img
                    className="text-2xl mt-5 mb-5 text-center text-white hover:transform hover:scale-110 transition duration-300 cursor-pointer"
                    key={index}
                    onClick={handleClick}
                    src={movie.poster || '/testImg1.jpg'}
                    alt={`Movie Poster ${index}`}
                    onError={(e) => {
                        (e.target as HTMLImageElement).onerror = null;
                        (e.target as HTMLImageElement).src = '/testImg1.jpg';
                    }}
                    style={{ width: "150px", height: "220px" }} // Add this line
                />
                <div className="title-overlay">{movie.title}</div>

        </div>
    );
}
