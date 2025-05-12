import React from "react";
import { usePage, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import AppearanceToggleDropdown from "./appearance-dropdown";
import { UserMenuContent } from "./user-menu-content";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';


const Navbar = () => {
    const { auth } = usePage().props;
    const getInitials = useInitials();
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
