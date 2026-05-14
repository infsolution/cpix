import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Login } from "@/app/Login";
import { SignIn } from "@/app/SignIn";


export type PublicStackRoutelist = {
    home: undefined;
    login: undefined;
    signIn: undefined;
    profile: undefined;
    add: undefined;
    edit: { id: string };
}

export type PublicStackRouterProps<T extends keyof PublicStackRoutelist> = NativeStackScreenProps<PublicStackRoutelist, T>;
const Stack = createNativeStackNavigator<PublicStackRoutelist>();
export function PublicStackRoutes() {
    return (
        <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="signIn" component={SignIn} />
        </Stack.Navigator>
    )
}