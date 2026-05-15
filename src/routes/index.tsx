import { useCallback, useState } from "react";
import { PublicStackRoutes } from "./PublicStackRoutes";
import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./StackRoutes";
import { useAuthContext } from "@/context/auth.context";

export function NavigationRoutes() {
    const { user } = useAuthContext();
    const Routes = useCallback(() => {
        if (!user) {
            return <PublicStackRoutes />
        } else {
            return <StackRoutes />
        }
    }, [user]);
    return (
        <NavigationContainer>
            <Routes />
        </NavigationContainer>
    )
}