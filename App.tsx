import { Routes } from "@/routes";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold} from "@expo-google-fonts/inter"
import { useEffect } from "react";
import { Loading } from "@/components/Loading";
export default function App() {
  const [fontLoaded, error]=useFonts({
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
    <Routes />
  );
}