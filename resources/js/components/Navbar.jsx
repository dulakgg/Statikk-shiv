import React from "react";
import { usePage, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppearanceToggleDropdown from "./appearance-dropdown";

const Navbar = () => {
    const { auth } = usePage().props;

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b dark:text-white text-black hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]">
            <div className="container px-4 mx-auto text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img src="/favicon.svg" className="h-10 w-10 mr-2" alt="logo" />
                        <a href="/" className="text-xl tracking-tight">Statikk Shiv</a>
                    </div>
                    <div className="flex items-center gap-4">
                        {auth?.user ? (
                            <>
                                <AppearanceToggleDropdown />
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal dark:text-white text-black hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]"
                                >
                                    Your stats
                                </Link>
                                
                            </>
                            
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="py-2 px-3 border rounded-md transition duration-150 hover:-translate-y-1 hover:scale-105"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="py-2 px-3 rounded-md transition duration-150 hover:-translate-y-1 hover:scale-105 bg-gradient-to-r from-orange-500 to-orange-800"
                                >
                                    Create an account
                                </Link>
                                <AppearanceToggleDropdown />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
