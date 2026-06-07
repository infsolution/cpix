import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { colors } from "@/theme/colors";
import { View, Image, TouchableOpacity } from "react-native";
import { UserCircle } from "../UserCircle";
import { Input } from "@/components/Input";
import { useAuthContext } from "@/context/auth.context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export function Header() {
  const { user, handleLogout } = useAuthContext();

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
        <Input
          style={styles.input}
          placeholder="Buscar chave..."
          placeholderTextColor={colors.white}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={logout}>
          <MaterialIcons name="logout" size={26} color={colors.white} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
