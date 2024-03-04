import React from 'react';

interface SettingsButtonProps {
    label: string;
    onClick: () => void;
    isActive: boolean;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ label, onClick, isActive }) => {
    return (
        <button onClick={onClick} className={`text-white py-5 px-5 w-full text-xl ${isActive ? "bg-accent1" : "bg-dark1 hover:bg-dark2"}`}>
            {label}
        </button>
    );
}

interface SettingsPanelProps {
    setSetting: (setting: string) => void;
    setting: string;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ setSetting, setting }) => {
    return (
        <div className="flex flex-col">
            <SettingsButton label="Profile" onClick={() => setSetting("main")} isActive={setting === "main"} />
            <SettingsButton label="Preferences" onClick={() => setSetting("Setting2")} isActive={setting === "Setting2"} />
            <SettingsButton label="General" onClick={() => setSetting("Setting3")} isActive={setting === "Setting3"} />
            <SettingsButton label="Log out" onClick={() => setSetting("Setting4")} isActive={setting === "Setting4"} />
        </div>
    );
}
