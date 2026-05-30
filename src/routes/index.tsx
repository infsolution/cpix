import { useCallback, useState } from "react";
import { PublicStackRoutes } from "./PublicStackRoutes";
import { NavigationContainer } from "@react-navigation/native";
import { StackRoutes } from "./StackRoutes";
import { useAuthContext } from "@/context/auth.context";
import { Loading } from "@/app/Loading";

export function NavigationRoutes() {
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const Routes = useCallback(() => {
        if(loading){
            return <Loading setLoading={setLoading}/>
        }
        if (!user) {
            return <PublicStackRoutes />
        } else {
            return <StackRoutes />
        }
    }, [user, loading]);
    return (
        <NavigationContainer>
            <Routes />
        </NavigationContainer>
    )
}