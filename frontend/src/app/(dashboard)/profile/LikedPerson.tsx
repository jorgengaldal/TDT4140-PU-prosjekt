import { useEffect, useState } from "react";
import Cookie from 'js-cookie';
import Icons from "@/components/General/Icons";
import Link from "next/link";
import PersonPoster from "@/components/General/PersonPoster";

interface Person {
    name: string,
    picture: string,
    person_type?: Array<string | undefined>
}

interface LikedNotMovie {
    id: string,
    person: Person,
    category: {
        name: string,
        category_type?: string
    }
    profile: string
}

interface LikedPersonProps {
    title: string;
    link: string;
    filterBy: (person: any) => boolean;
}

const LikedPerson: React.FC<LikedPersonProps> = ({ title, link, filterBy }) => {
    // TODO: Bytt initial state fra placeholder. Bruk fetching i stedet.
    const [persons, setPersons] = useState<any[]>([]);
    const authToken = Cookie.get('token');

    useEffect(() => {
        // Fetch films from the API endpoint
        fetch("http://localhost:8000/api/reviews/likednotmovies", {
            headers: {
                Authorization: `Token ${authToken}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch actors");
                }
                return response.json();
            })
            .then((data) => {
                if (!data) {
                    console.log("No dataa")
                    return
                }
                const filteredData = data.filter((likedNotMoviesObject: LikedNotMovie) => "person_type" in likedNotMoviesObject.person && filterBy(likedNotMoviesObject.person))
                const filteredPersons = filteredData.map((likedNotMoviesObject: LikedNotMovie) => likedNotMoviesObject.person)
                setPersons(filteredPersons);
            })
            .catch((error) => {
                console.error("Error fetching liked actor:", error);
            });
    }, []);

    const renderPersons = () => {
        return (<div className="flex flex-row space-x-4">{
            persons.map((person: any, index: number) => {
                console.log(person); return (<div key={index}>
                    <PersonPoster person={person} />
                </div>)
            })}
        </div>)
    }


    return (
        <div className="flex flex flex-col items-center pb-12">
            <div className="flex justify-between w-full">
                <h1 className="text-xl underline">{title}</h1>
                <Link href={link}>
                    <h1 className="text-sm flex items-center">
                        Show more
                        <Icons name="RightArrow" />
                    </h1>
                </Link>
            </div>
            <div className="flex mt-4">{renderPersons()}</div>
        </div>
    );
};


export default LikedPerson;