import { Image, TouchableOpacity } from "react-native";
import { mainUrl } from "@/shared/api/c-pix";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "@/theme/colors";
import { useAppModal } from "@/shared/hooks/useAppModal";
type Props = {
  path?: string;
};
export const ProfileImage = ({ path }: Props) => {
  const modals = useAppModal();

  const handleSelectAvatar = () => {
    modals.showSelection({
      title: "Selecione uma foto",
      message: "Escolha opção:",
      options: [
        {
          text: "Galeria",
          icon: "images",
          variant: "primary",
          onPres: () => console.log("Galeria"),
        },
        {
          text: "Câmera",
          icon: "camera",
          variant: "primary",
          onPres: () => console.log("Camera"),
        },
      ],
    });
  };
  return (
    <>
      {!path && (
        <Image
          source={require("@/assets/profile.png")}
          style={styles.profileImage}
        />
      )}
      {path && (
        <Image
          source={{
            uri: mainUrl + path,
          }}
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
    </>
  );
};
