import { createBottomTabNavigator, BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Home } from "@/app/Home";
import { Login } from "@/app/Login";
import { Profile } from "@/app/Profile";
import { SignIn } from "@/app/SignIn";
import { Add } from "@/app/Add";
import { Edit } from "@/app/Edit";

export type BottomTabsRoutelist ={
    home: undefined;
    login: undefined;
    signIn: undefined;
    profile: undefined;
    add: undefined;
    edit: {id: string};
}

export type BottomTabsRouterProps<T extends keyof BottomTabsRoutelist> = BottomTabScreenProps<BottomTabsRoutelist, T>;
const Stack = createBottomTabNavigator<BottomTabsRoutelist>();

export function BottomTabsRoutes(){
    return(
    <Stack.Navigator initialRouteName="home" screenOptions={{headerShown:false}}>
        <Stack.Screen name="login" component={Login} options={{
            tabBarButton: () => null, // Returns null to render nothing in the bar
        }} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="signIn" component={SignIn} options={{
            tabBarButton: () => null, // Returns null to render nothing in the bar
        }} />
        <Stack.Screen name="edit" component={Edit}  options={{
            tabBarButton: () => null, // Returns null to render nothing in the bar
        }}/>
            <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="add" component={Add}  options={{
            tabBarButton: () => null, // Returns null to render nothing in the bar
        }}/>

    </Stack.Navigator>
    )
}