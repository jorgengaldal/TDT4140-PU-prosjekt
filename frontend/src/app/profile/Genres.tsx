import Icons from "@/components/General/Icons";
import Link from "next/link";

interface GenreBoxProps {
    title: string;
}

const GenreBox: React.FC<GenreBoxProps> = ({ title }) => {
    return <div className="w-[296px] h-[60px] bg-accent1 m-2 p-2 text-xl">{title}</div>;
};

interface GenresProps {
    title: string;
    genres: string[];
}

const Genres: React.FC<GenresProps> = ({ title, genres }) => {
    return (
        <div className="flex flex flex-col items-center">
            <div className="flex justify-between w-full">
                <h1 className="text-xl underline">{title}</h1>
            </div>
            <div className="grid grid-cols-2">
                {genres.slice(0, 6).map(genre => {
                    return <GenreBox key={genre} title={genre} />
                })}
            </div>
        </div>
    );
};

export default Genres;