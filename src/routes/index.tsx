import { useCallback, useState } from "react";
import { PublicStackRoutes } from "./PublicStackRoutes";
import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./StackRoutes";

export function NavigationRoutes() {
    const [user, setUser] = useState(undefined)
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