// "use client";

// import { Grid } from "@mui/material";
// import Poster from "../../components/General/Poster";
// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// const PersonPage: React.FC = () => {
//   const [writtenMovies, setWrittenMovies] = React.useState<any[]>([]);
//   const [actedInMovies, setActedInMovies] = React.useState<any[]>([]);
//   const [directedMovies, setDirectedMovies] = React.useState<any[]>([]);

//   const person = useSearchParams().get("name");

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/movies/persons/" + person)
//       .then((response) => {
//         if (response.status == 404) {
//           return <></>;
//         }
//         console.log(response);
//         return response.json();
//       })
//       .then((data) => {
//         setWrittenMovies(data.written_movies);
//         setActedInMovies(data.acted_movies);
//         setDirectedMovies(data.directed_movies);
//       })
//       .catch((error) => {
//         console.error("Error fetching movie posters: ", error);
//       });
//   }, []);

//   const [isFavorite, setIsFavorite] = useState<boolean>(false);

//   // Setting initial isFavorite state
//   fetch("http://localhost:8000/api/profile/fa")
//     .then((response) => response.json())
//     .then((data) => {
//       // TODO: Set variabler til det riktige.
//       setIsFavorite(data.favorited);
//     })
//     .catch(() => console.log("Could not get initial favorite state."));

//   function handleFavorite() {
//     setIsFavorite(!isFavorite);
//     fetch("http://localhost:8000/api/profile/fa", { method: "POST" })
//       .then((response) => response.json())
//       .then((data) => {})
//       .catch(() => console.log("Could not set favorite."));
//   }

//   return (
//     <div>
//       <h1>{person}</h1>
//       {/* TODO: Style */}

//       {/* Favorite-button */}
//       <button onClick={handleFavorite}>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill={isFavorite ? "white" : "none"}
//           viewBox="0 0 24 24"
//           strokeWidth={1.5}
//           stroke="currentColor"
//           className="w-6 h-6"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
//           />
//         </svg>
//       </button>

//       {/* Acted in grid */}
//       {actedInMovies.length > 0 ? (
//         z
//           ) : (
//           <p>{person} has not acted in any movies</p>
//           )
// }

//       {/* Grid for directed movies*/}
//       <h2>Har regissert disse filmene</h2>
//       <Grid container spacing={2}>
//         {directedMovies.map((movie, index) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//             <Poster movie={movie} index={index} />
//           </Grid>
//         ))}
//       </Grid>

//       {/* Grid for written movies */}
//       <h2>Har skrevet disse filmene</h2>
//       <Grid container spacing={2}>
//         {writtenMovies.map((movie, index) => (
//           <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//             <Poster movie={movie} index={index} />
//           </Grid>
//         ))}
//       </Grid>
//     </div>
//   );
// };

// export default PersonPage;
