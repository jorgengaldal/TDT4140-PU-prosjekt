'use client'
import Link from 'next/link';
import { signIn, signOut } from "next-auth/react";
import Icons from './Icons';
import React from "react";
import Dropdown from 'react-pretty-dropdown';


const Navbar = () => {
    const handleLogin = () => {
        void signIn("google");
    };

    const handleLogout = () => {
        void signOut();
    };


    return (
        <nav className="p-4 flex justify-between items-center">


            <div className="flex items-center">

                <Link href="/" className="mr-10 flex flex-row">
                    <Icons name="Home" />
                </Link>
                <Link href="/liked" className="mr-10">
                    <Icons name="Liked" />
                </Link>
                <Link href="/shuffle" className="mr-10">
                    <Icons name="Shuffle" />
                </Link>
                <Dropdown icon="ellipsis-vertical"
                    background="#2D3250"
                    textColor="white"
                    fontSize="1rem"
                    iconSize="1.5rem"
                    hoverBackground="#424769"
                    width="200px"
                    >
                    <a href={"/category?name=" + "Action"}>Action</a>
                    <a href={"/category?name=" + "Thriller"}>Thriller</a>
                    <a href={"/category?name=" + "Adventure"}>Adventure</a>
                    <a href={"/category?name=" + "Comedy"}>Comedy</a>
                    <a href={"/category?name=" + "Horror"}>Horror</a>   
                    <a href={"/category?name=" + "Drama"}>Drama</a>
                    <a href={"/category?name=" + "Sci-Fi"}>Sci-Fi</a>
                    
                </Dropdown>

            </div>

            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Search for movies"
                    className="bg-accent1 order rounded-md focus:outline-none text-md w-[400px] px-4 py-2"
                />
                <Link href="/profile">
                    <Icons name="Profile" />
                </Link>
            </div>
        </nav >
    )
}

export default Navbar;
