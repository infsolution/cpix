import { FormLoginParams, FormSigninParams } from "@/app/Type/interfaces";
import React, { createContext, FC, PropsWithChildren, useContext, useState } from "react";
import * as authService from "@/shared/services/c-pix/auth.service";
import { IUser } from "@/shared/interfaces/user-interface";
import { getStorageUser, setJWT, setStorageUser } from "@/shared/storage/service/user";
import { clearStorage } from "@/shared/storage/service/general";

type AuthContextType = {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    handleLogin: (params: FormLoginParams) => Promise<void>;
    handleSignin: (params: FormSigninParams) => Promise<string>;
    restoreUserSession: () => Promise<IUser|null>;
    handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);

    const handleSignin = async(userData: FormSigninParams):Promise<string>=>{
        const {message, code,data}= await authService.register(userData);
        if(data.token){
            setUser(data);
            setJWT('user-jwt', data.token);
            setStorageUser('user-data', data);
        }
        console.log("login", data, code, message);
         return code;
    }

    const handleLogin = async (userData: FormLoginParams) => {
        const {message, code, data} = await authService.authenticate(userData);
       if(data.token){
            setUser(data);
            setJWT('user-jwt', data.token);
            setStorageUser('user-data', data);
        }
        console.log("login", data, code, message);
    }

    const restoreUserSession = async ()=>{
        const userData = await getStorageUser('user-data');
        if(userData){
            setUser(userData);
        }
        return userData;
    }

    const handleLogout = () => {
        clearStorage();
        setUser(null);
        console.log("logout");
    }

    return (
        <AuthContext.Provider value={{ user, setUser, handleSignin, handleLogin, handleLogout, restoreUserSession }}>
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