import { useEffect, useState } from "react";
import Cookie from 'js-cookie';

interface GenreBoxProps {
  title: string;
}

const GenreBox: React.FC<GenreBoxProps> = ({ title }) => {
  return (
    <div className="w-[296px] h-[60px] bg-accent2 m-2 p-2 text-xl">{title}</div>
  );
};

interface GenresProps {
  title: string;
}

interface Person {
  name: string,
  picture: string,
  person_type?: Array<string | undefined>
}

interface LikedNotMovie {
  id: string,
  person: Person,
  category: {
    name: string,
    category_type?: string
  }
  profile: string
}

const Genres: React.FC<GenresProps> = ({ title }) => {
  const [films, setFilms] = useState<any>();
  const [genres, setGenres] = useState<any>([]);

  const authToken = Cookie.get('token');

  useEffect(() => {
    // Fetch films from the API endpoint
    fetch("http://localhost:8000/api/reviews/likednotmovies", {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch actors");
        }
        return response.json();
      })
      .then((data) => {
        if (!data) {
          console.log("No dataa")
          return
        }
        const genres = data.filter((likedNotMoviesObject: LikedNotMovie) => "category_type" in likedNotMoviesObject.category)
          .filter((likedNotMoviesObject: LikedNotMovie) => likedNotMoviesObject.category.category_type == "Genre")
          .map((likedNotMoviesObject: LikedNotMovie) => likedNotMoviesObject.category.name)

        setGenres(genres);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
      });
  }, []);

  return (
    <div className="flex flex flex-col items-center pb-10">
      <div className="flex justify-between w-full">
        <h1 className="text-xl underline">{title}</h1>
      </div>
      <div className="grid grid-cols-2">
        {/* At this point, there is no slicing (max limit to entries, but this can be changed later.) */}
        {genres.length > 0 ? genres.map((genre: string) => {
          return <GenreBox key={genre} title={genre} />;
        }) : <p> You have not liked any genres yet.</p>}
      </div>
    </div >
  );
};

export default Genres;
