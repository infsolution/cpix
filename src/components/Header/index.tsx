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
import Feather from "@expo/vector-icons/Feather";

export function Header() {
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
    >
      <View style={styles.inputSession}>
        {!image && <UserCircle name={user?.name} />}
        {image && (
          <Image
            source={{
              uri: image,
            }}
            style={styles.profileImage}
          />
        )}

        <View style={{ flexDirection: "row", gap: 24 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              openBottomSheet(<SearchList />, 0);
            }}
          >
            <MaterialIcons name="search" size={26} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("friends")}
          >
            <FontAwesome5 name="user-friends" size={26} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("settings")}
          >
            <Feather name="settings" size={26} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={logout}>
            <MaterialIcons name="logout" size={26} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
