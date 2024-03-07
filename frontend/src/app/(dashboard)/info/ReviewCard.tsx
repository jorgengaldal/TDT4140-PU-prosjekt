// ReviewCard.tsx

import { Grid } from "@mui/material";

interface Review {
  review_text?: string;
  rating?: number;
  is_favorite?: boolean;
  movie_list: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="review-card p-4 bg-accent1 shadow-md rounded-md">
      {/* <p className="text-sm">Favorite: {review.is_favorite ? "Yes" : "No"}</p> */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          
          <p>Username</p>
        </Grid>
        <Grid item xs={6}>
          <p className="text-sm">Rating: {review.rating}/5</p>
        </Grid>
        <Grid item xs={2}>
          <p> Dato</p>
        </Grid>

        <Grid item xs={4}></Grid>
        <Grid item xs={8}>
          <p className="text-sm">{review.review_text}</p>
        </Grid>

        <Grid item xs={4}>

        </Grid>
        <Grid item xs={3}>
          <p>Showmore url knapp</p>
        </Grid>
        <Grid item xs={5}>
          <p>Respond to review knapp</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReviewCard;
