'use client'
import Link from 'next/link';
import { signIn, signOut } from "next-auth/react";
import Icons from './Icons';

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
                    <p>Home</p>
                    <Icons name="Home" />
                </Link>
                <Link href="/liked" className="mr-10">
                    <Icons name="Liked" />
                </Link>
                <Link href="/shuffle" className="mr-10">
                    <Icons name="Shuffle" />
                </Link>
            </div>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Search for movies"
                    className="bg-accent1 order rounded-md focus:outline-none text-md w-[400px] px-4 py-2"
                />
                <Link href="/login">
                    <Icons name="Profile" />
                </Link>
            </div>
        </nav >
    )
}

export default Navbar;
