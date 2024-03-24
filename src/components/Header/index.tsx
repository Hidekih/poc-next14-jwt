"use client";

import { useAuth } from "@src/context/auth.context";

export const Header = () => {
    const { authUser } = useAuth();

    return (
        <div className="flex flex-row items-center px-4 w-full h-12 bg-zinc-900">
            {authUser && (
                <p className="text-white text-xl">Hello, {authUser.name}!</p>
            )}
        </div>
    )
};
