'use client';
import { SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Breadcrumb  from "./Breadcrumbs";


const Header = () => {
    const { user } = useUser();
    
    return (
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
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <div className="flex gap-2">
                    <UserButton />
                </div>
            </div>
        </div>
    )
}

export default Header
