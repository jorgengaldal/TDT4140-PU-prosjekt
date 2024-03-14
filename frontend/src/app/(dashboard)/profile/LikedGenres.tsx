import { useEffect, useState } from "react";
import Cookie from 'js-cookie';

interface LikedGenresProps {
    title: string;
    link: string;
}

const LikedGenres: React.FC<LikedGenresProps> = ({ title }) => {
    const [genres, setGenres] = useState<string[]>([]);
    const authToken = Cookie.get('token');

    useEffect(() => {
        /*
        // Fetch films from the API endpoint
        fetch("http://localhost:8000/api/profiles/profile", { //MÅ ENDRES
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
                setGenres(data);
            })
            .catch((error) => {
                console.error("Error fetching liked actor:", error);
            });
            */
    }, []);

    return (
        <div>
            <h2>{title}</h2>
            <div className="flex">
                {genres && genres.map((genre, index) => (
                    <div key={index} className="m-2">
                        <p>{genre}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LikedGenres;