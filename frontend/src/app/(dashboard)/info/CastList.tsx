import PersonPoster from "@/components/General/PersonPoster";
import { Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

function matchNamesAndPictures(objects, namesToMatch) {
  return namesToMatch.map((name) => {
    const match = objects.find(
      (obj) => obj.name.toLowerCase() === name.toLowerCase()
    );
    if (match) {
      return { name, picture: match.picture };
    } else {
      return { name, picture: "No picture found" };
    }
  });
}

export default function CastList({ movieData }) {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/movies/persons/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie data");
        }
        const tempPeople = await response.json();
        const peopleAndNames = matchNamesAndPictures(tempPeople, movieData.actors);
        setPeople(peopleAndNames);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
    fetchMovieData();
  }, [movieData]);
  return (
    <div className="w-full relative inset-x-0 bottom-0 h-[55%] bg-[#202439]">
      <div className="p-10">
        <Typography variant="h5" className="mb-4">
          Top Cast:
        </Typography>
        <div className="flex flex-row mb-3 space-x-4">
          {people.map((actor: any, index: number) => (
            <div key={index}>
              <PersonPoster person={actor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
