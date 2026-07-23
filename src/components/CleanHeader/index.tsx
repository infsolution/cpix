import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { colors } from "@/theme/colors";
import { View, Image, TouchableOpacity } from "react-native";
import { UserCircle } from "../UserCircle";
import { useAuthContext } from "@/context/auth.context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { SearchList } from "../SearchList";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { mainUrl } from "@/shared/api/c-pix";
import { useEffect, useState } from "react";

export function CleanHeader() {
  const { user, handleLogout } = useAuthContext();
  const { openBottomSheet } = useBottomSheetContext();
  const [image, setImage] = useState("");
  const navigation = useNavigation();
  const logout = () => {
    handleLogout();
  };

  useEffect(() => {
    if (user?.image) {
      setImage(mainUrl + user.image);
    }
  }, [user?.image]);
  return (
    <LinearGradient
      colors={[colors.header.max, colors.header.min]}
      style={styles.container}
    ></LinearGradient>
  );
}
