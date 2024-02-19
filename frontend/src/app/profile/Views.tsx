import React from "react";
import CountrySelect from "./CountrySelect";
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

export const ViewTwo = () => {
    return (
        <div className="w-2/3 bg-accent1 h-100% rounded-lg px-24 py-12">
            <h1 className="text-xl">Preferences</h1>
            <div className="App">
            <CountrySelect />
            </div>
           
            <div className="flex flex-col">


                <div className="flex justify-between">
                </div>
                <div className="flex justify-between">
                    <h1 className="text-xl underline">Country</h1>
                    <h1 className="text-xl underline">United States</h1>
                </div>
                <div className="flex justify-between">
                    <h1 className="text-xl underline">Time Zone</h1>
                    <h1 className="text-xl underline">UTC-07:00</h1>
                </div>
            </div>
        </div>
    );
}

interface DisplayViewProps {
    currentSetting: string;
}

const DisplayView: React.FC<DisplayViewProps> = ({ currentSetting }) => {
    if (currentSetting === "main") {
        return (
            <ViewOne />
        )
    } else if (currentSetting === "Setting2") {
        return (
            <ViewTwo />
        )

    } else if (currentSetting === "Setting3") {
        return (
            <div className="w-2/3 bg-accent1 h-100% rounded-lg px-24 py-12">
                <h1>{currentSetting}</h1>
            </div>
        )

    } else if (currentSetting === "Setting4") {
        return (
            <div className="w-2/3 bg-accent1 h-100% rounded-lg px-24 py-12">
                <h1>{currentSetting}</h1>
            </div>
        )
    }
}

export default DisplayView