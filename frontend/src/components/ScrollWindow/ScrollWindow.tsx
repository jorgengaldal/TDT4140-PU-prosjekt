"use client";
import React, { useEffect, useState, useRef} from "react";
import Layout from "./layout/Layout";
import GalleryDiv from "./layout/GalleryDiv";

interface MoviePoster {
  imageUrl: string;
  // Add other properties as needed
}

function ScrollWindow() {
  const [moviePosters, setMoviePosters] = useState<MoviePoster[]>([]);

  useEffect(() => {
    // Replace 'your-api-endpoint' with the actual API endpoint
    fetch('http://127.0.0.1:8000/api/movies/')
      .then(response => response.json())
      .then(data => setMoviePosters(data.results)) // Assuming the API response has a 'results' array
      .catch(error => console.error('Error fetching movie posters:', error));
  }, []);

  

  return (
    <Layout contentMaxWidth="100ch">

        <GalleryDiv galleryItemsAspectRatio="auto" >
          {moviePosters.map((poster, index) => (
            <img key={index} src={poster.imageUrl} alt={`Movie Poster ${index}`} />
          ))}
          <img src="https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX300.jpg" alt="test images" />
          <img src="/testImg3.jpeg" alt="test images" />
          <img src="/testImg2.jpeg" alt="test images" />
          <img src="/testImg2.jpeg" alt="test images" />
          <img src="/testImg2.jpeg" alt="test images" />
          <img src="/testImg2.jpeg" alt="test images" />
          <img src="/testImg2.jpeg" alt="test images" />
          <img src="/testImg2.jpeg" alt="test images" />
          <img src="/testImg2.jpeg" alt="test images" />
          <img src="/testImg2.jpeg" alt="test images" />
        </GalleryDiv>
    </Layout>
  );
}

export default ScrollWindow;
