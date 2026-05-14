import { FormLoginParams, FormSigninParams } from "@/app/Type/interfaces";
import React, { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import * as authService from "@/shared/local/services/local.auth.service";
import { UserLoged } from "@/app/Type/types";

type AuthContextType = {
    user: UserLoged | null;
    setUser: (user: UserLoged | null) => void;
    handleLoing: (params: FormLoginParams) => Promise<void>;
    handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<UserLoged | null>(null);

    const handleLoing = async (params: FormLoginParams) => {
        console.log("login", params);
    }



    const handleLogout = () => {
        setUser(null);
        console.log("logout");
    }

    return (
        <AuthContext.Provider value={{ user, setUser, handleLoing, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
}