'use client';

import { useState } from "react";
import { ProfileInfo } from "./ProfileInfo";
import { SettingsPanel } from "./SettingsPanel";
import DisplayView from "./Views";

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
                <DisplayView currentSetting={setting} />
            </div>
        </main>
    )
}