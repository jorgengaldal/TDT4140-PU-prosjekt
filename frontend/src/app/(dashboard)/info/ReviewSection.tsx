import { useEffect, useState } from "react";

import ReviewCard from "@/components/General/Review/ReviewCard";
import ReviewForm from "@/components/General/Review/ReviewForm";

export default function ReviewSection(props: any) {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/reviews/moviereviews/")
      .then((response) => response.json())
      .then((data) => {
        console.log(props)
        console.log(data)
        const tempReviews = data.filter(
          (review) => review.movie.imdbid === props.imdbID
        );
        console.log(tempReviews);
        setReviews(tempReviews);
      });
  }, []);

  return (
    <>
      <ReviewForm movieID={props.movieID}/>
      <div className="reviews-container">
        {/* Loop gjennom hver anmeldelse og send data til ReviewCard */}
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </>
  );
}
