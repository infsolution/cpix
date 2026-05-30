import { FormLoginParams, FormSigninParams } from "@/app/Type/interfaces";
import React, { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import * as authService from "@/shared/services/c-pix/auth.service";
import { IUser } from "@/shared/interfaces/user-interface";

type AuthContextType = {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    handleLogin: (params: FormLoginParams) => Promise<void>;
    handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);

    const handleLogin = async (userData: FormLoginParams) => {
        const {message, code, data} = await authService.authenticate(userData);
        setUser(data);
        console.log("login", data, code, message);
    }



    const handleLogout = () => {
        setUser(null);
        console.log("logout");
    }

    return (
        <AuthContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
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