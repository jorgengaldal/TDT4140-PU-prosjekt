"use client";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarBorderRounded from "@mui/icons-material/StarBorderRounded";

interface ReviewFormProps {
  movieListId: string | null;
}

export default function ReviewForm({ movieID, review, setIsEditing, fetchData }) {
  const [reviewText, setReviewText] = useState(
    review ? review.review_text : ""
  );
  const [rating, setRating] = useState<number>(review ? review.rating : 0);
  const [movieListId, setMovieListId] = useState("");

  const authToken = Cookie.get("token");
  useEffect(() => {
    const authHeaders = {
      "Content-Type": "application/json",
      Authorization: `Token ${authToken}`,
    };

    let defaultMovieListId: string | null = null;
    // Fetches Id for default movie list
    fetch("http://localhost:8000/api/profiles/profile", {
      headers: authHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        defaultMovieListId = data.my_movie_list;
        console.log(defaultMovieListId);
        setMovieListId(defaultMovieListId);
      });
  }, []);

  //når review-teksten endres:
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  //når review-stjernen endres:
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  //håndtering av review submit
  const handleSubmit = async () => {
    try {
      if (!reviewText || rating === 0) {
        alert("You need to provide both rating and review.");
        return;
      }
      if (review) {
        const response = await fetch(
          `http://localhost:8000/api/reviews/moviereviews/${review.id}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              review_text: reviewText,
              rating: rating,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to submit review");
        }
        console.log("Review submitted successfully");
      }
      else {
        const response = await fetch(
          "http://localhost:8000/api/reviews/moviereviews/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              movie: movieID,
              review_text: reviewText,
              rating: rating,
              movie_list: movieListId,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to submit review");
        }
        console.log("Review submitted successfully");
      }
      setReviewText("");
      setRating(0);
      setIsEditing(false)
      fetchData()
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="bg-primary p-4 rounded-md">
      <h2 className="text-1g font-semibold mb-2">Write a Review</h2>
      <textarea
        value={reviewText}
        onChange={handleTextChange}
        placeholder="Write your review..."
        className="w-full h-24 border p-2 rounded-md mb-2"
        style={{ color: "black" }}
      />
      <div className="flex items-center mb-2">
        <span className="mr-2">Rating</span>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => handleRatingChange(value)}
            className={`text-2xl ${
              value <= rating ? "text-yellow-500" : "text-gray-400"
            } focus:outline-none`}
          >
            {value <= rating ? (
              <StarRateRoundedIcon sx={{ color: "#F5C519", fontSize: 30 }} />
            ) : (
              <StarBorderRounded sx={{ color: "#F5C519", fontSize: 30 }} />
            )}
          </button>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Submit Review
      </button>
    </div>
  );
}
