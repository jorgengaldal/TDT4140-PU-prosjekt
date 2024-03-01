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

const Genres: React.FC<GenresProps> = ({ title }) => {
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

  const rankedGenres: string[] = []; // Declare rankedGenres outside the forEach loop

  films?.movie_lists.forEach((movieList: { reviews: any[] }) => {
    const data = movieList.genre_data;
    const allGenres = new Set<string>();
    Object.keys(data.reviews_per_genre).forEach((genre) =>
      allGenres.add(genre)
    );
    Object.keys(data.favorites_per_genre).forEach((genre) =>
      allGenres.add(genre)
    );
    Object.keys(data.genre_rating_averages).forEach((genre) =>
      allGenres.add(genre)
    );

    const genreRanking: { [key: string]: number } = {};
    allGenres.forEach((genre) => {
      const reviews = data.reviews_per_genre[genre] || 0;
      const favorites = data.favorites_per_genre[genre] || 0;
      const averageRating = data.genre_rating_averages[genre] || 0;
      genreRanking[genre] = reviews + favorites + averageRating;
    });

    const rankedGenresForMovieList = Array.from(allGenres).sort(
      (a, b) => genreRanking[b] - genreRanking[a]
    );
    rankedGenres.push(...rankedGenresForMovieList); // Push the ranked genres for this movie list to the global rankedGenres array
  });

  return (
    <div className="flex flex flex-col items-center pb-10">
      <div className="flex justify-between w-full">
        <h1 className="text-xl underline">{title}</h1>
      </div>
      <div className="grid grid-cols-2">
        {rankedGenres.slice(0, 6).map((genre) => {
          return <GenreBox key={genre} title={genre} />;
        })}
      </div>
    </div>
  );
};

export default Genres;
