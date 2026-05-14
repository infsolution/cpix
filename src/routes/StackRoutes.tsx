import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Home } from "@/app/Home";
import { Profile } from "@/app/Profile";
import { Add } from "@/app/Add";
import { Edit } from "@/app/Edit";

export type StackRoutelist = {
    home: undefined;
    profile: undefined;
    add: undefined;
    edit: { id: string };
}

export type StackRouterProps<T extends keyof StackRoutelist> = NativeStackScreenProps<StackRoutelist, T>;
const Stack = createNativeStackNavigator<StackRoutelist>();
export function StackRoutes() {

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="edit" component={Edit} />
            <Stack.Screen name="add" component={Add} />

        </Stack.Navigator>
    )
}