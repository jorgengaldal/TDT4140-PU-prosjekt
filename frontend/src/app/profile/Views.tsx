import React, { useEffect } from "react";
import CountrySelect from "./CountrySelect";
import Collection from "./Collection";
import Genres from "./Genres";
import { useSearchParams } from "next/navigation";




export const ProfileView = () => {
    return (
        <div className="w-2/3 bg-accent1 h-100% rounded-lg px-24 py-12">
            <Collection title={"My Liked"} link={"liked"} />
            <Collection title={"Watched"} link={"watched"} />
            <Genres title={"Your Top Genres"} />
            <Collection title={"Watch List"} link={"watchlist"} />
        </div>
    );
}

export const PreferencesView = () => {
    return (
        <div className="w-2/3 bg-accent1 h-100% rounded-lg px-24 py-12">
            <div className="flex flex-col">

                <div className="flex justify-between">
                    <h1 className="text-xl ">Preferences</h1>
                    <CountrySelect />
                </div>

                <div className="flex justify-between">
                    {/* Add content here */}
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
    )
}

export const GeneralView = () => {

    const [username, setUsername] = React.useState<string>("");

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/profiles/profile').then(response => {
            console.log(response)
            return response.json();
        }).then(data => {
            console.log(data)
            return setUsername(data.user);
        }).catch(error => {
            console.error("Error fetching user: ", error);
        })
    }, []);



    return (
        <div className="w-2/3 bg-accent1 h-100% rounded-lg px-24 py-12">
            <div className="flex flex-col">

                <div className="flex justify-between mb-4 ">
                    <h1 className="text-xl ">General</h1>
                </div>

                <div className="flex justify-between mb-4">
                    <h1 className="text-xl underline">Name</h1>
                    <input type="text" className="text-xl text-black py-2" placeholder={username} />
                </div>

                <div className="flex justify-between mb-4">
                    <h1 className="text-xl underline">Username</h1>
                    <input type="text" className="text-xl text-black" placeholder="Enter your username" />
                </div>

                <div className="flex justify-between mb-4">
                    <h1 className="text-xl underline">Password</h1>
                    <input type="password" className="text-xl text-black" placeholder="Enter your password" />
                </div>
                <div className="flex justify-between mb-4">
                    <h1 className="text-xl underline">Email</h1>
                    <input type="email" className="text-xl text-black" placeholder="Enter your email" />
                </div>
            </div>
        </div>
    )
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
            <GeneralView />
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