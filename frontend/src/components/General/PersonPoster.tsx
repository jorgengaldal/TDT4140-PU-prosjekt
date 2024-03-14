"use client";
import { Typography } from "@mui/material";
import Link from "next/link";

const PersonPoster = ({person}: {person: {name: string, picture: string}}) => {
    
    console.log(person);
    console.log(person.name);
    return (
        <Link href={"/persons?name=" + person.name}>
          <div className="rounded-lg bg-transparent w-[150px] h-[calc(150px*25/17)] overflow-hidden mb-3">
            <img
              src={person.picture}
              alt="Cast Photo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
          <Typography>{person.name}</Typography>
        </Link>
    );
}; 

export default PersonPoster;