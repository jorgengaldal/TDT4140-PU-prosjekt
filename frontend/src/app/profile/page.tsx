import Collection from "./Collection";

export default function ProfilePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <div className="bg-accent1 w-full h-100% rounded-lg flex ">
                
                
                <div className="w-1/3 bg-primary h-100% rounded-lg">
                    <div className="flex flex-col justify-center h-full w-full">
                        {/* fetch profile info here */}
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile Picture" className="w-32 h-32 rounded-full mb-4" />
                        <div className="text-left">
                            <h2 className="text-xl font-bold mb-2">John Doe</h2>
                            <p className="text-lg mb-2">Full Name: John Doe</p>
                            <p className="text-lg mb-2">Email: john.doe@example.com</p>
                            <p className="text-lg mb-2">Phone Number: 123-456-7890</p>
                        </div>

                        <div className="flex flex-col">
                            <button className="bg-primary text-white rounded-lg py-2 px-4 mb-2 hover:bg-primary-dark">
                                Settings 1
                            </button>
                            <button className="bg-primary text-white rounded-lg py-2 px-4 mb-2 hover:bg-primary-dark">
                                Settings 2
                            </button>
                            <button className="bg-primary text-white rounded-lg py-2 px-4 mb-2 hover:bg-primary-dark">
                                Settings 3
                            </button>
                        </div>
                    </div>
                </div>
                    

                <div className="w-2/3 bg-accent1 h-100% rounded-lg p-2">
                        <Collection title={"My Liked"} link={""} />
                        <Collection title={"Watched"} link={""} />
                        <Collection title={"Watch List"} link={""} />

                </div>
              
                
            </div>        
        </main>
    )
}
