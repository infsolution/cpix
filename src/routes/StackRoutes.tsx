import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Home } from "@/app/Home";
import { Login } from "@/app/Login";
import { Profile } from "@/app/Profile";
import { SignIn } from "@/app/SignIn";
import { Add } from "@/app/Add";

export type StackRoutelist ={
    home: undefined;
    login: undefined;
    signIn: undefined;
    profile: undefined;
    add: undefined | {id: string};
}

export type StackRouterProps<T extends keyof StackRoutelist> = NativeStackScreenProps<StackRoutelist, T>;
const Stack = createNativeStackNavigator<StackRoutelist>();

export function StackRoutes(){
    return(
    <Stack.Navigator initialRouteName="home" screenOptions={{headerShown:false}}>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signIn" component={SignIn} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="add" component={Add} />

    </Stack.Navigator>
    )
}