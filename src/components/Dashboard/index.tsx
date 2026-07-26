import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { colors } from "@/theme/colors";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { UserCircle } from "../UserCircle";
import { useAuthContext } from "@/context/auth.context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { SearchList } from "../SearchList";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { mainUrl } from "@/shared/api/c-pix";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const { user, handleLogout } = useAuthContext();
  const { openBottomSheet } = useBottomSheetContext();
  const [image, setImage] = useState("");
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
    </View>
  );
};
