import { NavigationRoutes } from "@/routes";
import React, { useEffect, Suspense } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Loading } from "@/components/Loading";
import { SQLiteProvider } from "expo-sqlite";
import { migrate } from "@/database/migrate";
import { AuthContextProvider } from "@/context/auth.context";
import { SnackbarContextProvider } from "@/context/snackbar.context";
import { Snackbar } from "@/components/Snackbar";
import { BottomSheetProvider } from "@/context/bottomsheet.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import "./src/i18n";
import { AppModal } from "@/components/AppModal";
SplashScreen.preventAutoHideAsync();
export default function App() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }
  return (
    <Suspense fallback={<Loading />}>
      <StatusBar style="dark" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SnackbarContextProvider>
          <AuthContextProvider>
            <SQLiteProvider databaseName="cpix.db" onInit={migrate} useSuspense>
              <BottomSheetProvider>
                <NavigationRoutes />
                <Snackbar />
                <AppModal />
              </BottomSheetProvider>
            </SQLiteProvider>
          </AuthContextProvider>
        </SnackbarContextProvider>
      </GestureHandlerRootView>
    </Suspense>
  );
}
