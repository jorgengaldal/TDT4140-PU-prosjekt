import React from "react";
import CountrySelect from "./CountrySelect";
import Collection from "./Collection";
import Genres from "./Genres";
import LikedPerson from "./LikedPerson";
import LikedGenres from "./LikedGenres";

export const ProfileView = () => {
    return (
        <div className="w-2/3 bg-accent1 h-100% rounded-lg px-24 py-12">
            <Collection title={"My Liked Movies"} link={"liked"} />
            <Collection title={"Watched"} link={"watched"} />
            {/* TODO: Husk å endre person-filteret etter gutta har fikset endpoint */}
            <LikedGenres title={"My Liked Genres"} link={"/liked-genres"}/>
            <Genres title={"Your Top Genres"} />
            <LikedPerson title={"My Liked Actors"} link={"/likedPersons?actors"} filterBy={(person) => person.person_type.includes("Actor")} /> 
            <LikedPerson title={"My Liked Directors"} link={"/likedPersons?directors"} filterBy={(person) => person.person_type.includes("Director")}/> 
            <LikedPerson title={"My Liked Writers"} link={"/likedPersons?writers"} filterBy={(person) => person.person_type.includes("Writer")}/> 

        </div>
    );
}

export const PreferencesView =() => {
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
            <ProfileView />
        )
    } else if (currentSetting === "Setting2") {
        return (
            <PreferencesView />
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