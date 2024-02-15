"use client";
import React, { useEffect, useState, useRef} from "react";
import Layout from "./layout/Layout";
import GalleryDiv from "./layout/GalleryDiv";

interface MoviePoster {
  imageUrl: string;
  // Add other properties as needed
}

function ScrollWindow() {
  const [movies, setMovies] = useState<any>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/movies/movies/')
      .then(response => {
        console.log(response);
        return response.json()})
      .then(data => {
        console.log(data)
        return setMovies(data.results)}) 
      .catch(error => {
        console.error('Error fetching movie posters:', error)});
  }, []);

  

  return (
    <Layout contentMaxWidth="100ch">

        <GalleryDiv galleryItemsAspectRatio="auto" >
          {movies.map((movie:any, index: number) => (
            <div className="posterName">
            <img
              key={index}
              src={movie.poster || '/testImg2.jpeg'}
              alt={`Movie Poster ${index}`}
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = '/testImg2.jpeg';
              }}
            />
            <div>
              {movie.title}
            </div>
            </div>
          ))}
        </GalleryDiv>
    </Layout>
  );
}

export default ScrollWindow;
