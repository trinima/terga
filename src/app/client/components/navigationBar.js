'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { Bars3Icon } from '@heroicons/react/24/solid';

function NavigationBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = (
        <ul className="list-none p-0 m-0 block space-y-4 md:space-y-0 md:flex md:gap-4 md:items-center text-white [&>li]:py-2 [&>li]:px-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/chemistry" className="hover:underline">Chemistry</a></li>
            <li><a href="/comments" className="hover:underline">Comments</a></li>
            <li><a href="/todo" className="hover:underline">Todo</a></li>
            <li><a href="/about" className="hover:underline">About the Developer</a></li>
        </ul>
    );

    return (
        <div>
            <nav>
                <button
                    className="block md:hidden bg-transparent border-none text-4xl cursor-pointer absolute top-2.5 left-2.5 z-10 p-4"
                    aria-label="Open menu"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <Bars3Icon className="h-6 w-6 text-white" />
                </button>
                <div
                    className={`block md:hidden fixed top-0 left-0 w-[250px] h-full bg-black border-r-1 border-r-gray-300 shadow-lg transition-all duration-300 z-20 p-8 pt-12 ${menuOpen || 'hidden'}`}
                >
                    <button
                        aria-label="Close menu"
                        className="bg-transparent border-none text-2xl cursor-pointer absolute top-2.5 right-2.5 p-2"
                        onClick={() => setMenuOpen(false)}
                    >
                        <XMarkIcon className="h-6 w-6 text-white" />
                    </button>
                    {navLinks}
                </div>
                <div className="hidden md:flex justify-center">
                    {navLinks}
                </div>
            </nav>
        </div>
    );
}

export { NavigationBar }