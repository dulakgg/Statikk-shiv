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

const navLinkBase =
  "py-2 px-3 rounded-md font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#64ddcd] focus:ring-offset-2";
const navLinkHover =
  "hover:-translate-y-1 hover:scale-110 hover:shadow-lg hover:bg-[#64ddcd]/10 dark:hover:bg-[#3c8277]/20";
const navLinkBorder =
  "border border-transparent dark:border-transparent";

const Navbar = () => {
  const { auth } = usePage().props;
  const getInitials = useInitials();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b dark:text-white text-black hover:border-[#1915014a] dark:border-[#3E3E3A] dark:hover:border-[#62605b] shadow-lg transition-shadow duration-300">
      <div className="container px-4 mx-auto text-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 gap-2 group">
            <img
              src={logo}
              className="h-10 w-10 mr-1 drop-shadow-lg group-hover:scale-110 transition-transform duration-200"
              alt="logo"
            />
            <a href="/" className="text-xl tracking-tight font-extrabold bg-gradient-to-r from-[#64ddcd] to-[#3c8277] bg-clip-text text-transparent drop-shadow-sm transition-all duration-200 group-hover:tracking-widest">
              Statikk Shiv
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {auth?.user ? (
              <>
                <Link
                  href={route('searches')}
                  className={`${navLinkBase} ${navLinkHover} ${navLinkBorder}`}
                >
                  Hot searches
                </Link>
                <AppearanceToggleDropdown />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="size-10 rounded-full p-1 group relative">
                      <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#64ddcd]/30 to-[#3c8277]/20 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300"></span>
                      <Avatar className="size-8 overflow-hidden rounded-full border-2 border-[#64ddcd] group-hover:border-[#3c8277] transition-all duration-200 shadow-md">
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
                  className={`${navLinkBase} ${navLinkHover} ${navLinkBorder}`}
                >
                  Hot searches
                </Link>
                <Link
                  href={route('login')}
                  className={`${navLinkBase} ${navLinkHover} ${navLinkBorder}`}
                >
                  Sign in
                </Link>
                <Link
                  href={route('register')}
                  className={`${navLinkBase} bg-gradient-to-r from-[#64ddcd] to-[#3c8277] text-white shadow-lg hover:opacity-90 hover:scale-105`}
                >
                  Register
                </Link>
                <AppearanceToggleDropdown />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#64ddcd]"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute left-0 right-0 top-full bg-white/95 dark:bg-gray-900/95 border-b dark:border-gray-700 shadow-2xl z-40 animate-fade-in-down">
            <div className="container px-4 mx-auto py-4">
              <div className="flex flex-col gap-4">
                {auth?.user ? (
                  <>
                    <Link
                      href={route('searches')}
                      onClick={closeMobileMenu}
                      className={`${navLinkBase} ${navLinkHover} ${navLinkBorder}`}
                    >
                      Hot searches
                    </Link>
                    <div className="flex items-center justify-between">
                      <AppearanceToggleDropdown />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="rounded-full p-1 group relative">
                            <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#64ddcd]/30 to-[#3c8277]/20 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300"></span>
                            <Avatar className="size-8 border-2 border-[#64ddcd] group-hover:border-[#3c8277] transition-all duration-200 shadow-md">
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
                      className={`${navLinkBase} ${navLinkHover} ${navLinkBorder}`}
                    >
                      Hot searches
                    </Link>
                    <Link
                      href={route('login')}
                      onClick={closeMobileMenu}
                      className={`${navLinkBase} ${navLinkHover} ${navLinkBorder}`}
                    >
                      Sign in
                    </Link>
                    <Link
                      href={route('register')}
                      onClick={closeMobileMenu}
                      className={`${navLinkBase} bg-gradient-to-r from-[#64ddcd] to-[#3c8277] text-white shadow-lg hover:opacity-90 hover:scale-105`}
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
      {/* Animations */}
      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-16px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.25s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;