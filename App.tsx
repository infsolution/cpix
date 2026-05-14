import { NavigationRoutes } from "@/routes";
import { useEffect, Suspense } from "react";
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Inter_400Regular, Inter_500Medium, Inter_700Bold
} from "@expo-google-fonts/inter"
import { Loading } from "@/components/Loading";
import { SQLiteProvider } from "expo-sqlite";
import { migrate } from "@/database/migrate";
import { AuthContextProvider } from "@/context/auth.context";

export default function App() {
  const [fontLoaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold
  });
  useEffect(() => {
    if (fontLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, error]);

  if (!fontLoaded && !error) {
    return <Loading />;
  }
  return (
    <Suspense fallback={<Loading />}>
      <AuthContextProvider>
        <SQLiteProvider databaseName="cpix.db" onInit={migrate} useSuspense>
          <NavigationRoutes />
        </SQLiteProvider>
      </AuthContextProvider>
    </Suspense>
  );
}