import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { colors } from "@/theme/colors";
import { View, Image, TouchableOpacity } from "react-native";
import { UserCircle } from "../UserCircle";
import { Input } from "@/components/Input";
import { useAuthContext } from "@/context/auth.context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { SearchList } from "../SearchList";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

export function Header() {
  const { user, handleLogout } = useAuthContext();
  const { openBottomSheet } = useBottomSheetContext();
  const navigation = useNavigation();
  const logout = () => {
    handleLogout();
  };
  return (
    <LinearGradient
      colors={[colors.header.max, colors.header.min]}
      style={styles.container}
    >
      <View style={styles.inputSession}>
        {!user?.image && <UserCircle name="Cicero Leonardo" />}
        {user?.image && (
          <Image
            source={{
              uri: user.image,
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
          <TouchableOpacity activeOpacity={0.8} onPress={logout}>
            <MaterialIcons name="logout" size={26} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}
