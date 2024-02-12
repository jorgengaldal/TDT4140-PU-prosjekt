import Collection from "./Collection";
import Genres from "./Genres";

const tempGenres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Thriller", "Western"];

export const ViewOne = () => {
    return (
        <div className="w-2/3 bg-accent1 h-100% rounded-lg px-24 py-12">
            <Collection title={"My Liked"} link={"liked"} />
            <Collection title={"Watched"} link={"watched"} />
            <Genres title={"Your Top Genres"} genres={tempGenres} />
            <Collection title={"Watch List"} link={"watchlist"} />
        </div>
    );
}

interface DisplayViewProps {
    currentSetting: string;
}

const DisplayView: React.FC<DisplayViewProps> = ({ currentSetting }) => {
    if(currentSetting === "main") {
        return (
            <ViewOne />
        )
    } else {
        return (
            <div className="w-2/3 bg-accent1 h-100% rounded-lg px-24 py-12">
                    <h1>{currentSetting}</h1>
                </div>
        )
    }
}

export default DisplayView