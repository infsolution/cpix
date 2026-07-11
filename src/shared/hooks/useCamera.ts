import * as IMagePicker from "expo-image-picker";
import { ImagePickerOptions } from "expo-image-picker";
import { useCallback, useState } from "react";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";
import { useTranslation } from "react-i18next";
import { Alert, Linking } from "react-native";

export const useCamera = (pickerOptions: ImagePickerOptions) => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();
  const { t } = useTranslation();

  const requestCameraPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await IMagePicker.requestCameraPermissionsAsync();
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
        message: t("error.cameraPermission"),
        messageType: "ERROR",
      });
      return false;
    }
  }, []);

  const openCamera = useCallback(async (): Promise<string | null> => {
    setIsLoading(true);
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return null;
      const result = await IMagePicker.launchCameraAsync(pickerOptions);
      if (!result.canceled && result.assets && result.assets.length > 0) {
        return result.assets[0].uri;
      }
      return null;
    } catch (error) {
      handleError(error, t("error.camera"));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    requestCameraPermission,
    isLoading,
    openCamera,
  };
};
