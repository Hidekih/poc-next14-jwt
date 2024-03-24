"use client";

import { AuthProvider } from "@src/context/auth.context";
import { ReactNode } from "react";

export const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
};