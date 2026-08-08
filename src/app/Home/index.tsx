import { StackRouterProps } from "@/routes/StackRoutes";
import { AppBar } from "@/components/AppBar";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { PixList } from "@/components/PixList";
import { KeysToShare } from "@/app/Type/types";
import { Banner } from "@/ads/Banner";
import { useSettings } from "@/shared/hooks/useSettings";
import * as Notifications from "expo-notifications";
import { Alert, Linking, Platform } from "react-native";
import { useAuthContext } from "@/context/auth.context";

export function Home({ route }: StackRouterProps<"home">) {
  const [keysToShare, setKeysToShare] = useState<KeysToShare[]>([]);
  const { user } = useAuthContext();
  const { getSettings, calcTimeLastInteraction, setSettings } = useSettings();

  const getNotificationPermission = async () => {
    if (!user) return;
    const settings = await getSettings(user);
    if (
      !settings ||
      calcTimeLastInteraction(settings.lastInteractionNotification)
    ) {
      const hasPermission = await Notifications.getPermissionsAsync();
      if (hasPermission.granted) {
        return true;
      }
      if (!hasPermission.granted && !hasPermission.canAskAgain) {
        await setSettings(user, {
          lastInteractionNotification: new Date(),
          authorizationBackup: settings?.authorizationBackup || false,
        });
        Alert.alert(
          "Notificações desativadas",
          "Para receber notificações, habilite a permissão nas configurações do aplicativo.",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Abrir configurações",
              onPress: () => Linking.openSettings(),
            },
          ],
        );
      }
    }
  };

  useEffect(() => {
    getNotificationPermission();
  }, []);
  return (
    <AppBar keys={keysToShare} currentRoute={"home"}>
      <Header />
      <PixList
        own={0}
        keysToShare={keysToShare}
        setKeysToShare={setKeysToShare}
        custoStyleListItem={{ paddingBottom: 126 }}
      />
      <Banner custom={{ position: "absolute", bottom: "106" }} />
    </AppBar>
  );
}
