import { Image, TouchableOpacity, View } from "react-native";
import { mainUrl } from "@/shared/api/c-pix";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/theme/colors";
import { useImage } from "@/shared/hooks/useImage";
import { useEffect, useState } from "react";
import { CameraType } from "expo-image-picker";
import { useAuthContext } from "@/context/auth.context";
import { useTranslation } from "react-i18next";
import { uploadAvatar } from "@/shared/services/c-pix/users.service";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";
import { AppError } from "@/shared/helpers/AppError";
import { useUserDatabase } from "@/database/useUserDatabase";
import { Loading } from "../Loading";
type Props = {
  path: string | null;
  avatarUri: string | null;
  setAvatarUri: (avatarUri: string | null) => void;
};
export const ProfileImage = ({ path, avatarUri, setAvatarUri }: Props) => {
  const { user, setUser } = useAuthContext();
  const userDatabase = useUserDatabase();
  const { t } = useTranslation();
  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleCallback = async (avatarUri: string | null) => {
    setIsLoading(true);
    try {
      if (!avatarUri) {
        throw new AppError(t("error.upload"));
      }
      setAvatarUri(avatarUri);
      const { message, code, image } = await uploadAvatar(avatarUri);
      if (code != "201") {
        throw new AppError(message);
      }

      if (user?.universal_uuid) {
        userDatabase.updateAvatar(image, user?.universal_uuid);
        setUser({
          id: user.id,
          name: user.name,
          user_name: user.user_name,
          email: user.email,
          universal_uuid: user.universal_uuid,
          ddd: user.ddd,
          phone: user.phone,
          is_public: user.is_public,
          token: user.token,
          image: image,
        });
        notify({
          message: t("success.upload"),
          messageType: "SUCCESS",
        });
      }
    } catch (error) {
      handleError(error, t("error.upload"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!avatarUri) {
      if (path && !path.includes("/storage/")) {
        setAvatarUri("/storage/" + path);
      } else {
        setAvatarUri(path);
      }
    }
  }, [avatarUri]);
  const { handleSelectImage } = useImage({
    callback: handleCallback,
    cameraType: CameraType.front,
  });

  const handleSelectAvatar = async () => {
    handleSelectImage();
  };

  return (
    <View style={{ marginBottom: 8 }}>
      {isLoading && (
        <View style={{ width: 48, height: 48 }}>
          <Loading />
        </View>
      )}
      {!isLoading && (
        <View style={{ position: "relative" }}>
          {avatarUri && !isLoading ? (
            <Image
              source={{
                uri: mainUrl + avatarUri,
              }}
              style={styles.profileImage}
            />
          ) : (
            <Image
              source={require("@/assets/profile.png")}
              style={styles.profileImage}
            />
          )}

          <TouchableOpacity onPress={handleSelectAvatar} style={styles.camera}>
            <Ionicons
              name="camera-outline"
              size={32}
              color={colors.callAction.tertiary}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
