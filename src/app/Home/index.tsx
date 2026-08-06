import { StackRouterProps } from "@/routes/StackRoutes";
import { AppBar } from "@/components/AppBar";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { PixList } from "@/components/PixList";
import { KeysToShare } from "@/app/Type/types";
import { Banner } from "@/ads/Banner";
import { initializeBackgroundTask } from "@/tasks/backgroundBackupTask";
import { useSettings } from "@/shared/hooks/useSettings";
import * as Notifications from "expo-notifications";
import { Alert, Linking, Platform } from "react-native";

let resolver: (() => void) | null;
const promise = new Promise<void>((resolve) => {
  resolver = resolve;
});
initializeBackgroundTask(promise);
export function Home({ route }: StackRouterProps<"home">) {
  const [keysToShare, setKeysToShare] = useState<KeysToShare[]>([]);
  const { getSettings, calcTimeLastInteraction, setSettings } = useSettings();

  const getNotificationPermission = async () => {
    const settings = await getSettings();
    if (
      !settings ||
      calcTimeLastInteraction(settings.lastInteractionNotification)
    ) {
      const hasPermission = await Notifications.getPermissionsAsync();
      if (hasPermission.granted) {
        return true;
      }
      if (!hasPermission.granted && !hasPermission.canAskAgain) {
        setSettings({
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
    if (resolver) {
      resolver();
    }
  }, []);

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
