'use client'
import { useState } from "react";
import Collection from "./Collection";
import Genres from "./Genres";
import Icons from "@/components/General/Icons";
import Link from "next/link";

const tempGenres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Mystery", "Romance", "Thriller", "Western"];

const ViewOne = () => {
    return (
        <div className="w-2/3 bg-accent1 h-100% rounded-lg px-24 py-12">
            <Collection title={"My Liked"} link={"liked"} />
            <Collection title={"Watched"} link={"watched"} />
            <Genres title={"Your Top Genres"} genres={tempGenres} />
            <Collection title={"Watch List"} link={"watchlist"} />
        </div>
    );
}

const ProfileInfo = () => {
    {/* fetch profile info here */ }

    return (
        <div className="text-left flex flex-col items-center pt-10 pb-14 bg-primary rounded-tl-lg" >
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile Picture" className="w-32 h-32 rounded-full mb-8" />
            <h2 className="text-xl font-bold mb-2">John Doe</h2>
            <p className="text-lg mb-2">Full Name: John Doe</p>
            <p className="text-lg mb-2">Email: john.doe@example.com</p>
            <p className="text-lg mb-2">Phone Number: 123-456-7890</p>
        </div >
    );
}

interface SettingsPanelProps {
    setSetting: (setting: string) => void;
    setting: string;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ setSetting, setting }) => {
    return (
        <div className="flex flex-col">
            <button onClick={() => setSetting("Setting1")} className={`text-white py-5 px-5 w-full text-xl ${setting === "Setting1" ? "bg-accent1" : "bg-dark1 hover:bg-dark2"}`}>
                Profile 
            </button>
            <button onClick={() => setSetting("Setting2")} className={`text-white py-5 px-5 w-full text-xl ${setting === "Setting2" ? "bg-accent1" : "bg-dark1 hover:bg-dark2"}`}>
                Preferances
            </button>
            <button onClick={() => setSetting("Setting3")} className={`text-white py-5 px-5 w-full text-xl ${setting === "Setting3" ? "bg-accent1" : "bg-dark1 hover:bg-dark2"}`}>
                General
            </button>
        </div>
    );
}

export default function ProfilePage() {
    const [setting, setSetting] = useState<string>("main");

    return (
        <main className="flex min-h-screen flex-col items-center justify-between px-40 py-20">
            <div className="bg-accent1 w-full h-100% rounded-lg flex ">
                <div className="w-1/3 bg-dark1 h-100% rounded-lg">
                    <div className="flex flex-col h-full w-full ">
                        <ProfileInfo />
                        <SettingsPanel setSetting={setSetting} setting={setting}/>
                    </div>
                </div>

                {setting === "main" && (
                    <ViewOne />
                )}

                {setting === "Setting1" && (
                    <button onClick={() => setSetting("main")}>
                        <Icons name="LeftArrow" />
                    </button>
                )}

                {setting === "Setting2" && (
                    <button onClick={() => setSetting("main")}>
                        <Icons name="LeftArrow" />
                    </button>

                )}

                {setting === "Setting3" && (
                    <button onClick={() => setSetting("main")}>
                        <Icons name="LeftArrow" />
                    </button>
                )}
            </div>
        </main>
    )
}