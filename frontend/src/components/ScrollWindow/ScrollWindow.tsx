"use client";
import React, { useEffect, useState, useRef} from "react";
import Layout from "./layout/Layout";
import GalleryDiv from "./layout/GalleryDiv";

interface MoviePoster {
  imageUrl: string;
  // Add other properties as needed
}

function ScrollWindow(props: any) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/movies/movies/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const movieData = await response.json();
        setMovies(movieData);
      } catch (error) {
        setError(error as Error);
      } 
    };

    fetchData();
  }, []);

  const handleClick = (movie: any) => { // Pass movie as a parameter
    if (movie) {
      window.location.href = `/info/${movie.imdbid}`; // Use movie.id to create the URL
    }
  };
  
  let filteredMovies = movies;
  if (props.filterBy && props.filterValue) {
    // If filterBy and filterValue are specified, filter movies based on the property
    filteredMovies = movies.filter(
      (movie: any) => movie[props.filterBy].includes(props.filterValue)
    );
  }
  
  return (
    <Layout contentMaxWidth="100ch">
      <p className="scrollWindowTitle">{props.filterValue}</p>
        <GalleryDiv galleryItemsAspectRatio="portrait" >
          {filteredMovies.map((movie:any, index: number) => (
            <div className="posterComponent">
            <img
              className="posterImage"
              key={index}
              onClick={() => handleClick(movie)} // Call handleClick with movie as argument
              src={movie.poster || '/no_poster.jpeg'}
              alt={`Movie Poster ${index}`}
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = '/no_poster.jpeg';
              }}
            />
            <div className="posterTitle">
              {movie.title}
            </div>
            </div>
          ))}
        </GalleryDiv>
    </Layout>
  );
}

export default ScrollWindow;
