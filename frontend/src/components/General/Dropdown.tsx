import { useEffect, useRef, useState } from 'react';
import Icons from './Icons';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            closeDropdown();
        }
    };

    useEffect(() => {
        // Attach the event listener when the component mounts
        document.addEventListener('click', handleClickOutside);

        // Detach the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []); // Empty dependency array to run this effect only once

    return (
        <div className="relative group " ref={dropdownRef}>
            <button onClick={toggleDropdown} className='flex justify-center items-center'>
                {isOpen ?
                    <Icons name="Cross" /> : <Icons name="Dropdown" />
                }
            </button>
            {/* Dropdown content */}
            <div className={`flex flex-col absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 bg-gray-600 rounded-md shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
                <a href={"/category?name=" + "Action"}>Action</a>
                <a href={"/category?name=" + "Thriller"}>Thriller</a>
                <a href={"/category?name=" + "Adventure"}>Adventure</a>
                <a href={"/category?name=" + "Comedy"}>Comedy</a>
                <a href={"/category?name=" + "Horror"}>Horror</a>
                <a href={"/category?name=" + "Drama"}>Drama</a>
                <a href={"/category?name=" + "Sci-Fi"}>Sci-Fi</a>
            </div>
        </div>
    );
};

export default Dropdown;