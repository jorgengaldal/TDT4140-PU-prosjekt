import React, { useState } from "react";

const ViewThree = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <div className="w-2/3 bg-accent1 h-100% rounded-lg px-24 py-12">
            <h1 className="text-xl underline">Account Settings</h1>
            <div className="flex flex-col">
                <div className="flex justify-between border-b border-[#7077A1] py-7">
                    <h1 className="text-xl">Username</h1>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        className="text-xl"
                    />
                </div>

                <div className="flex justify-between border-b border-[#7077A1] py-7">
                    <h1 className="text-xl">Name</h1>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className="text-xl"
                    />
                </div>

                <div className="flex justify-between border-b border-[#7077A1] py-7">
                    <h1 className="text-xl">Email</h1>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className="text-xl"
                    />
                </div>

                <div className="flex justify-between border-b border-[#7077A1] py-7">
                    <h1 className="text-xl">Password</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="text-xl"
                    />
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
            <ViewThree />
        )
    } else if (currentSetting === "Setting4") {
        return (
            <div className="w-2/3 bg-accent1 h-100% rounded-lg px-24 py-12">
                <h1>{currentSetting}</h1>
            </div>
        )
    }
}

export default DisplayView;
