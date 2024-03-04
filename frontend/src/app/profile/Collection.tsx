import Icons from "@/components/General/Icons";
import Image from "next/image";
import Link from "next/link";
import { Key, useEffect, useState } from "react";

interface PosterProps {
  link: string;
  index: number;
  id: string;
}

const ImagePoster: React.FC<PosterProps> = ({ link, index, id }) => {
  return (
    <Link href={"/info?id=" + id} className="mx-2">
      <img
        width={140}
        height={210}
        style={{ height: "100%" }}
        key={index}
        src={link}
        alt={`Poster ${index}`}
      />
    </Link>
  );
};

interface CollectionProps {
  title: string;
  link: string;
}

const Rectangle: React.FC = () => {
  return <div className="w-[140px] h-[210px] bg-white m-2"></div>;
};

const Collection: React.FC<CollectionProps> = ({ title, link }) => {
  const [films, setFilms] = useState<any>();

  const authToken = "7923a7f2f080d8144a4d2b3c2cb7d692f1770b4a";

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
    switch (link) {
      case "liked":
        const likedFilms: any = [];
        films?.movie_lists.forEach((movieList: { reviews: any[] }) => {
          movieList.reviews.forEach((movie) => {
            if (movie.is_favorite) {
              likedFilms.push(movie);
            }
          });
        });

        return (
          <div className="flex flex-row">
            {likedFilms.slice(0, 5).map((film: { movie: { poster: string; imdbid: string; }; }, index: number) => (
              <ImagePoster
                key={index}
                link={film.movie.poster}
                index={index}
                id={film.movie.imdbid}
              />
            ))}
          </div>
        );

      case "watched":
        const wacthedFilms: any = [];
        films?.movie_lists.forEach((movieList: { reviews: any[] }) => {
          movieList.reviews.forEach((movie) => {
            wacthedFilms.push(movie);
          });
        });

        return (
          <div className="flex flex-row">
            {wacthedFilms.slice(0, 5).map((film: { movie: { poster: string; imdbid: string; }; }, index: number) => (
              <ImagePoster
                key={index}
                link={film.movie.poster}
                index={index}
                id={film.movie.imdbid}
              />
            ))}
          </div>
        );
      // case "watchlist":
      //     const watchList: any = [];
      //     films?.movie_lists.forEach((movieList: { reviews: any[]; }) => {
      //         movieList.reviews.forEach(movie => {
      //             if (movie.is_favorite) {
      //                 watchList.push(movie);
      //             }
      //         });
      //     });

      //     return (
      //         <div className="flex flex-row">
      //             {watchList.map((film, index) => (
      //                 <ImagePoster key={index} link={film.movie.poster} index={index}/>
      //             ))}
      //         </div>
      //     );
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
