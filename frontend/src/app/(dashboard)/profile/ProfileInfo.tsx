export const ProfileInfo = () => {
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