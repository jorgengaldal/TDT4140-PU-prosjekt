"use client";
import React, { useRef, useEffect, useState, ElementRef } from "react";
import Layout from "./layout/Layout";
import Poster from "@/components/General/Poster";
import { Movie } from "@/backend-types";
import Icons from "../General/Icons";


interface MoviePoster {
  imageUrl: string;
  // Add other properties as needed
}
//Arguments for ScrollWindow
//movies: list of movies
//filterBy: filter function
//sortBy: sort function
//title: title of the scroll window
//limit: number of movies to display
//doNotLinkTitle: if true, the title is not a link


function ScrollWindow(props: any) {
  const elementRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);
  const unsplashed = "https://source.unsplash.com/200x200/";

  const handleHorizantalScroll = (element: any, speed: number | undefined, distance: number, step: number) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      if (element && element.current) {
        element.current.scrollLeft += step;
        scrollAmount += Math.abs(step);
        if (scrollAmount >= distance) {
          clearInterval(slideTimer);
        }
        if (element.current.scrollLeft === 0) {
          setArrowDisable(true);
        } else {
          setArrowDisable(false);
        }
      }
    }, speed);
  };
  const handleGenreClick = () => {
    // Pass movie as a parameter
    if (!props.doNotLinkTitle) {
      window.location.href = `/category?name=${props.title}`; // Use movie.id to create the URL
    }
  };

  if (!props.movies) {
    return <div>Loading...</div>;
  }

  let filteredMovies = [...props.movies];
  if (props.filterBy) {
    filteredMovies = props.movies.filter(props.filterBy);
  }
  if (props.sortBy) {
    filteredMovies = filteredMovies.sort(props.sortBy);
  }
  if (props.limit) {
    filteredMovies = filteredMovies.slice(0, props.limit);
  }

  return (
    <Layout contentMaxWidth="90vw">
      <p
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginTop: "5px",
          color: "#fff",
          textShadow: "2px 2px 4px #000000",
          cursor: "pointer",
        }}
        onClick={handleGenreClick}
      >
        {props.title}
      </p>
      <div className="flex pb-28">
    
        <Icons name="LeftArrow"/>

        
        <div className="gallery " data-direction="right">
          <div className="floating_content" data-images="portrait">
            {filteredMovies.map((movie: Movie, index: number) => (
              <div
                style={{
                  flexDirection: "column",
                  paddingTop: "2px",
                  margin: "0px 2px 0px 2px",
                }}
                key={index}
              >
                <Poster movie={movie} index={index} />
              </div>
            ))}
          </div>
         
        </div>
        <Icons name="RightArrow"/>
      </div>
    </Layout>
  );

  function scrollGallery(direction: string) {
    const gallery = document.querySelector(".gallery");
    if (gallery) {
      if (direction === "left") {
        gallery.scrollLeft -= 100;
      } else if (direction === "right") {
        gallery.scrollLeft += 100;
      }
    }
  }
}

export default ScrollWindow;
