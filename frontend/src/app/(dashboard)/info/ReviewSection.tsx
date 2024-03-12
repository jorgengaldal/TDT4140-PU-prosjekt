import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import ReviewCard from "@/components/General/Review/ReviewCard";
import ReviewForm from "@/components/General/Review/ReviewForm";

export default function ReviewSection(props: any) {
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const fetchData = async () => {
    try {
      const profileResponse = await fetch(
        "http://localhost:8000/api/profiles/profile/",
        {
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!profileResponse.ok) {
        throw new Error("Failed to fetch profile");
      }

      const profileData = await profileResponse.json();
      const reviews = profileData.movie_lists[0]?.reviews || [];

      let myReviewTemp = null;
      let tempIsEditing = true;
      reviews.forEach((review) => {
        if (review.movie.imdbid === props.imdbID) {
          console.log(review);
          myReviewTemp = review;
          if (review.review_text || review.rating) {
          tempIsEditing = false;
        }
        }
      });
      setIsEditing(tempIsEditing);
      setMyReview(myReviewTemp);
      
        
        
        const reviewsResponse = await fetch(
          "http://localhost:8000/api/reviews/moviereviews/"
        );
        if (!reviewsResponse.ok) {
          throw new Error("Failed to fetch movie reviews");
        }

        const reviewsData = await reviewsResponse.json();
        const tempReviews = reviewsData.filter(
          (review) =>
            review.movie.imdbid === props.imdbID &&
            (!myReviewTemp || review.id !== myReviewTemp.id)
        );

        console.log(tempReviews);
        setReviews(tempReviews);
      
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const authToken = Cookie.get("token");
  useEffect(() => {
    fetchData();
  }, [authToken, props.imdbID]);
  return (
    <>
      {isEditing && <ReviewForm movieID={props.movieID} review={myReview} setIsEditing={setIsEditing} fetchData={fetchData}/>}
      <div className="reviews-container">
        {/* Loop gjennom hver anmeldelse og send data til ReviewCard */}
        {(myReview && !isEditing) && <ReviewCard key={myReview?.id} review={myReview} setIsEditing={setIsEditing}/>}
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </>
  );
}
