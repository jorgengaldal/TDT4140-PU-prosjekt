'use client';

import { Grid } from '@mui/material';
import Poster from '../../components/General/Poster';   
import { GridView } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';




const GenrePage: React.FC = () => {
    const [movies, setMovies] = React.useState<any[]>([]);

    const name = useSearchParams().get("name")

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/movies/categories/' + name).then(response => {
        console.log(response)    
        return response.json();
        }).then(data => {
            return setMovies(data.movies);
        }).catch(error => {
            console.error("Error fetching movie posters: ", error);
        })
    }, []);
    

    return (
            <div>
                <h1>{name}</h1>
            {/* TODO: Style */}
                
                <Grid container spacing={2}>
                    {movies.map((movie, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Poster movie={movie} index={index} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
};

export default GenrePage;