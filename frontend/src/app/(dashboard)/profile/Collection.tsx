import Icons from "@/components/General/Icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import {MovieReviewDetail} from "@/backend-types";
import Poster from "@/components/General/Poster";

interface CollectionProps {
  title: string;
  link: string;
}

const Rectangle: React.FC = () => {
  return <div className="w-[140px] h-[210px] bg-white m-2"></div>;
};

const Collection: React.FC<CollectionProps> = ({ title, link }) => {
  const [films, setFilms] = useState<any>();

  const authToken = Cookie.get('token');

  useEffect(() => {
    // Fetch films from the API endpoint
    fetch("http://localhost:8000/api/profiles/profile", {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch films");
        }
        return response.json();
      })
      .then((data) => {
        setFilms(data);
      })
      .catch((error) => {
        console.error("Error fetching films:", error);
      });
  }, []);

  const renderContent = () => {
    const getFilmsBasedOnCondition = (condition) => films?.movie_lists.flatMap(movieList => 
      movieList.reviews.filter(review => condition(review))
    ).slice(0, 5);
  
    const renderFilms = (films) => (
      <div className="flex flex-row">
        {films?.map((review, index) => (
          <Poster
            height="140px"
            movie={review?.movie}
            index={index}
          />
        ))}
      </div>
    );
  
    switch (link) {
      case "liked":
        return renderFilms(getFilmsBasedOnCondition(review => review.is_favorite));
      case "watched":
        return renderFilms(getFilmsBasedOnCondition(() => true));
      // Uncomment and modify the condition for "watchlist" if needed
      // case "watchlist":
      //   return renderFilms(getFilmsBasedOnCondition(review => /* your condition here */));
      default:
        return <div>No content available in this category</div>;
    }
  };
  

  return (
    <div className="flex flex flex-col items-center pb-12">
      <div className="flex justify-between w-full">
        <h1 className="text-xl underline">{title}</h1>
        <Link href={link}>
          <h1 className="text-sm flex items-center">
            Show more
            <Icons name="RightArrow" />
          </h1>
        </Link>
      </div>
      <div className="flex">{renderContent()}</div>
    </div>
  );
};

export default Collection;
