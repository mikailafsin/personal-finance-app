"use client";
import { useState } from "react";
import NotificationBell from "./NotificationBell";
import ThemeSwitcher from "./ThemeSwitcher";
import NavLink from "./NavLink";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white dark:bg-gray-700 shadow-md py-4">
            <div className="container mx-auto px-6">
                <div className="flex justify-end items-center">
                    <button
                        className="lg:hidden block text-gray-700 dark:text-gray-200 focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <div className="hidden lg:flex lg:items-center lg:justify-between w-full">
                        <div className="flex flex-row space-x-6">
                            <NavLink href="/">Anasayfa</NavLink>
                            <NavLink href="/add-transaction">Gelir/Gider Ekle</NavLink>
                            <NavLink href="/transactions">İşlemler</NavLink>
                            <NavLink href="/report">Gelir-Gider Raporu</NavLink>
                            <NavLink href="/budget-limits">Bütçe Limitleri</NavLink>
                        </div>
                        <div className="flex items-center space-x-4">
                            <NotificationBell />
                            <ThemeSwitcher />
                        </div>
                    </div>
                </div>

                {isMenuOpen && (
                    <div className="lg:hidden flex flex-col space-y-4 mt-4">
                        <NavLink href="/">Anasayfa</NavLink>
                        <NavLink href="/add-transaction">Gelir/Gider Ekle</NavLink>
                        <NavLink href="/transactions">İşlemler</NavLink>
                        <NavLink href="/report">Gelir-Gider Raporu</NavLink>
                        <NavLink href="/budget-limits">Bütçe Limitleri</NavLink>
                        <div className="flex items-center justify-center space-x-4 mt-4">
                            <NotificationBell />
                            <ThemeSwitcher />
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
