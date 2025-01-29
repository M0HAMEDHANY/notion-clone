'use client'
import { SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Breadcrumb from "./Breadcrumbs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useState, useEffect } from "react";
import React from 'react';
import { useTheme } from './ThemeProvider';

interface HeaderProps {

    className?: string;

}

const Header: React.FC<HeaderProps> = ({ className }) => {
    const { user } = useUser();
    const { theme, toggleTheme } = useTheme();
    const style = `gap-2 hover:text-white ${theme === "dark"
        ? "text-gray-300 bg-gray-900 hover:bg-gray-100 hover:text-gray-700"
        : "text-gray-700 bg-white hover:bg-gray-900 hover:text-gray-300"
        }`;

    return (
        <div className={className}>
            <div className="flex items-center justify-between p-3">
                {user && (
                    <h1 className="lg:text-2xl text-1xl text-primary font-semibold">
                        {user.firstName}
                        {`'s `} Space
                    </h1>
                )}

                <div className="hidden md:block ml-auto">
                    <Breadcrumb />
                </div>
                <div className="flex ml-auto">
                    <div className="flex gap-2">
                        <Button className={style} onClick={toggleTheme}>
                            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
                        </Button>
                        <UserButton />
                    </div>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>

                </div>
            </div>
        </div>
    );
};

export default Header;