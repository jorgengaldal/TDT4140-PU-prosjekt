"use client";
import React, { useEffect, useState, useRef} from "react";
import { Link } from "react-router-dom"; // Import useHistory
import Layout from "./layout/Layout";
import GalleryDiv from "./layout/GalleryDiv";

interface MoviePoster {
  imageUrl: string;
  // Add other properties as needed
}

function ScrollWindow(props: any) {
  const [movies, setMovies] = useState<any>([]);
  const apiUrl = 'http://127.0.0.1:8000/api/movies/movies/';

  useEffect(() => {
    const fetchData = async () => {
      let allMovies: MoviePoster[] = [];
      let page = 1;

      while (true) {
        const response = await fetch(`${apiUrl}?page=${page}`);
        const data = await response.json();

        if (response.ok) {
          allMovies = [...allMovies, ...data.results];
          if (data.next) {
            // Move to the next page if available
            page++;
          } else {
            // Break the loop if there are no more pages
            break;
          }
        } else {
          console.error('Error fetching movie posters:', data);
          break;
        }
      }

      setMovies(allMovies);
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
