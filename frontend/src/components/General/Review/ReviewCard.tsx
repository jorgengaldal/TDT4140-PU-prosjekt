// ReviewCard.tsx

import { Grid } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import StarBorderRounded from "@mui/icons-material/StarBorderRounded";

interface Review {
  review_text?: string;
  rating?: number;
  is_favorite?: boolean;
  movie_list: string;
}

interface ReviewCardProps {
  review: Review;
}

// Example: Format date in a more readable form
// This will format the date according to the default locale

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="review-card p-4 bg-primary shadow-md rounded-md mt-5">
      {/* <p className="text-sm">Favorite: {review.is_favorite ? "Yes" : "No"}</p> */}
      <Grid container spacing={2}>
        <Grid item md={2.5}>
          <p>{review.movie_list_owners[0].username}</p>
        </Grid>
        <Grid item md={7}>
          <p className="text-sm">
            <div className="flex items-center mb-2">
              {[1, 2, 3, 4, 5].map((value) =>
                value <= review.rating ? (
                  <StarRateRoundedIcon
                    sx={{ color: "#F5C519", fontSize: 30 }}
                  />
                ) : (
                  <StarBorderRounded sx={{ color: "#F5C519", fontSize: 30 }} />
                )
              )}
            </div>
          </p>
          <p className="text-sm">{review.review_text}</p>
          {/*<p>Showmore url knapp</p>*/}
        </Grid>
        <Grid item md={2.5}>
          <p>
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }).format(new Date(review?.created_at))}
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default ReviewCard;
