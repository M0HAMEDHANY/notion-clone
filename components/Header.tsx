'use client';
import { SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { LogOut, LogOutIcon, } from "lucide-react";
import Breadcrumb  from "./Breadcrumbs";


const Header = () => {
    const { user } = useUser();

    // const testUser = user?.emailAddresses[0].emailAddress
    // const isString = typeof testUser === 'string';
    // console.log(isString);
    // console.log("email",testUser);
    // console.log("primary email",user?.primaryEmailAddress?.emailAddress);
    
    return (
        <div className="flex items-center justify-between p-3">
            {user && (
                <h1 className="text-2xl text-primary font-bold">
                    {user.firstName}
                    {`'s `} Space
                </h1>
            )}

            {/* Breadcrunbs */}
            <Breadcrumb />  

            <div className="flex">
                <SignedOut>
                    <SignInButton />
                </SignedOut>

                <div className="flex gap-2">
                    <UserButton />
                    <LogOut>
                        <LogOutIcon />
                    </LogOut>

                </div>
            </div>
        </div>
    )
}

export default Header
