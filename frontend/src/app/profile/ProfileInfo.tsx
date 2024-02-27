import React, { useEffect } from "react";

export const ProfileInfo = () => {
    {/* fetch profile info here */ }

    
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
        <div className="text-left flex flex-col items-center pt-10 pb-14 bg-primary rounded-tl-lg" >
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile Picture" className="w-32 h-32 rounded-full mb-8" />
            <h2 className="text-xl font-bold mb-2">{username}</h2>
            <p className="text-lg mb-2">Full Name: John Doe</p>
            <p className="text-lg mb-2">Email: john.doe@example.com</p>
            <p className="text-lg mb-2">Phone Number: 123-456-7890</p>
        </div >
    );
}