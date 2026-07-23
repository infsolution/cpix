import * as IMagePicker from "expo-image-picker";
import { ImagePickerOptions } from "expo-image-picker";
import { useCallback, useState } from "react";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";
import { useTranslation } from "react-i18next";
import { Alert, Linking } from "react-native";

export const useGallery = (pickerOptions: ImagePickerOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();
  const { t } = useTranslation();

  const requestGalleryPermission = useCallback(async () => {
    try {
      const { status } =
        await IMagePicker.requestMediaLibraryPermissionsAsync();
      const currentStatus = status === "granted";
      if (!currentStatus) {
        Alert.alert(
          t("message.deniedPermission"),
          t("error.galleryDeniedPermission"),
          [
            {
              text: t("verbs.cancel"),
              style: "cancel",
            },
            {
              text: t("message.openConfig"),
              onPress: () => {
                Linking.openSettings();
              },
            },
          ],
        );
      }
      return currentStatus;
    } catch (error) {
      notify({
        message: t("error.galleryPermission"),
        messageType: "ERROR",
      });
      return false;
    }
  }, []);

  const openGallery = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);
    try {
      const hasPermission = requestGalleryPermission();
      if (!hasPermission) return null;
      const result = await IMagePicker.launchImageLibraryAsync(pickerOptions);
      if (!result.canceled && result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
      }
      return null;
    } catch (error) {
      notify({
        message: t("error.galleryPermission"),
        messageType: "ERROR",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    requestGalleryPermission,
    openGallery,
    isLoading,
  };
};
