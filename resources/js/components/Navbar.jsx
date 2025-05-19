import React, { useState } from "react";
import { usePage, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppearanceToggleDropdown from "./appearance-dropdown";
import { UserMenuContent } from "./user-menu-content";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import logo from '../assets/favicon.svg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';

const Navbar = () => {
    const { auth } = usePage().props;
    const getInitials = useInitials();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMobileMenu = () => setIsMenuOpen(false);

    return (
        <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b dark:text-white text-black hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b]">
            <div className="container px-4 mx-auto text-sm">
                <div className="flex justify-between items-center">
                    <div className="flex items-center flex-shrink-0">
                        <img src={logo} className="h-10 w-10 mr-2" alt="logo" />
                        <a href="/" className="text-xl tracking-tight"><h1>Statikk Shiv</h1></a>
                    </div>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        {auth?.user ? (
                            <>
                                <Link
                                    href={route('searches')}
                                    className="py-2 px-3 border rounded-md transition duration-150 hover:-translate-y-1 hover:scale-105"
                                >
                                    <h1>Hot searches</h1>
                                </Link>
                                <AppearanceToggleDropdown />
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="size-10 rounded-full p-1">
                                            <Avatar className="size-8 overflow-hidden rounded-full">
                                                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                    {getInitials(auth.user.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end">
                                        <UserMenuContent user={auth.user} />
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={route('searches')}
                                    className="py-2 px-3 border rounded-md transition duration-150 hover:-translate-y-1 hover:scale-105"
                                >
                                    <h1>Hot searches</h1>
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="py-2 px-3 border rounded-md transition duration-150 hover:-translate-y-1 hover:scale-105"
                                >
                                    <h1>Sign in</h1>
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="py-2 px-3 rounded-md transition duration-150 hover:-translate-y-1 hover:scale-105 bg-gradient-to-r from-[#64ddcd] to-[#3c8277]"
                                >
                                    <h1>Register</h1>
                                </Link>
                                <AppearanceToggleDropdown />
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden absolute left-0 right-0 top-full bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-lg z-40">
                        <div className="container px-4 mx-auto py-4">
                            <div className="flex flex-col gap-4">
                                {auth?.user ? (
                                    <>
                                        <Link
                                            href={route('searches')}
                                            onClick={closeMobileMenu}
                                            className="py-2 px-3 border rounded-md transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            Hot searches
                                        </Link>
                                        <div className="flex items-center justify-between">
                                            <AppearanceToggleDropdown />
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="rounded-full p-1">
                                                        <Avatar className="size-8">
                                                            <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                                                            <AvatarFallback className="bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                                {getInitials(auth.user.name)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-56" align="end">
                                                    <UserMenuContent user={auth.user} />
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route('searches')}
                                            onClick={closeMobileMenu}
                                            className="py-2 px-3 border rounded-md transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            Hot searches
                                        </Link>
                                        <Link
                                            href={route('login')}
                                            onClick={closeMobileMenu}
                                            className="py-2 px-3 border rounded-md transition-colors duration-150 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        >
                                            Sign in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            onClick={closeMobileMenu}
                                            className="py-2 px-3 rounded-md transition-colors duration-150 bg-gradient-to-r from-[#64ddcd] to-[#3c8277] text-white hover:opacity-90"
                                        >
                                            Register
                                        </Link>
                                        <AppearanceToggleDropdown />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;