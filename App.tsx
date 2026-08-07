import { NavigationRoutes } from "@/routes";
import React, { useEffect, Suspense, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import { SQLiteProvider } from "expo-sqlite";
import { DATABASE_NAME, migrate } from "@/database/migrate";
import { AuthContextProvider } from "@/context/auth.context";
import { SnackbarContextProvider } from "@/context/snackbar.context";
import { Snackbar } from "@/components/Snackbar";
import { BottomSheetProvider } from "@/context/bottomsheet.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import "./src/i18n";
import { AppModal } from "@/components/AppModal";
import { BaseLoading } from "@/components/BaseLoading";
import { useOneSignal } from "@/shared/hooks/useOneSignal";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import { Platform } from "react-native";
import { initializeBackgroundTask } from "@/tasks/backgroundBackupTask";

SplashScreen.preventAutoHideAsync();

const ANDROID_PLAY_STORE_API_KEY =
  process.env.EXPO_PUBLIC_ANDROID_PLAY_STORE_API_KEY;

initializeBackgroundTask();
export default function App() {
  const [loaded, error] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
  });
  useEffect(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

    if (Platform.OS === "ios") {
      // Purchases.configure({ apiKey: <revenuecat_project_apple_api_key> });
    } else if (Platform.OS === "android") {
      Purchases.configure({ apiKey: ANDROID_PLAY_STORE_API_KEY });
    }
  }, []);
  useOneSignal();
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }
  return (
    <Suspense fallback={<BaseLoading />}>
      <StatusBar style="dark" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SnackbarContextProvider>
          <AuthContextProvider>
            <SQLiteProvider
              databaseName={DATABASE_NAME}
              onInit={migrate}
              useSuspense
            >
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
