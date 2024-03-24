import { type ReactNode, createContext, useContext, useState, useEffect } from "react";
import { getAuthUser } from "@src/modules/auth/actions/get-auth-user";

import { authenticate } from "../modules/auth/services/auth.service";

type TAuthUser = Record<string, any>;

type TAuthContext = {
    authUser: TAuthUser | null;
    login: (params: { email: string; password: string }) => Promise<Record<string, unknown>>;
    logout: () => void;
};

const AuthContext = createContext<TAuthContext | null>(null);

const AuthProvider = ({ children }: { children: ReactNode } ) => {
    const [authUser, setAuthUser] = useState(null);

    const login: TAuthContext["login"] = async (params) => {
        await authenticate(params);
        const user = await getAuthUser();
        setAuthUser(user as any);
        
        return {};
    }

    const logout: TAuthContext["logout"] = () => {}

    useEffect(() => {
        const getData = async () => {
            const user = await getAuthUser();
            setAuthUser(user as any);
        }

        getData();
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext);

    if (context == null) {
        throw new Error("useAuth must be used within an <AuthProvider> component");
    }

    return context;
}

export { AuthProvider, useAuth };
