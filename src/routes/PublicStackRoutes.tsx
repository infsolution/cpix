import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Login } from "@/app/Login";
import { SignIn } from "@/app/SignIn";
import { Recovery } from "@/app/Recovery";

export type PublicStackRoutelist = {
  recovery: undefined;
  login: undefined;
  signIn: undefined;
};

export type PublicStackRouterProps<T extends keyof PublicStackRoutelist> =
  NativeStackScreenProps<PublicStackRoutelist, T>;
const Stack = createNativeStackNavigator<PublicStackRoutelist>();
export function PublicStackRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signIn" component={SignIn} />
      <Stack.Screen name="recovery" component={Recovery} />
    </Stack.Navigator>
  );
}
