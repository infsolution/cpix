import { Text, View, Image } from "react-native";
import { styles } from "./styles";
import { AppBar } from "@/components/AppBar";
import { TabGoBack } from "@/components/TabGoBack";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/theme/colors";
import { PixList } from "@/components/PixList";
import { KeysToShare } from "../Type/types";
import { useState } from "react";
import { useAuthContext } from "@/context/auth.context";
import { Header } from "@/components/Header";

export function Profile() {
  const [keysToShare, setKeysToShare] = useState<KeysToShare[]>([]);
  const { user } = useAuthContext();
  return (
    <AppBar keys={keysToShare} currentRoute={"profile"}>
      <Header />
      <View style={styles.profileContainer}>
        <View style={styles.formControl}></View>
        <View style={styles.formControl}>
          <Text style={styles.title}>{user?.name || ""}</Text>
          <Entypo
            name="chevron-thin-right"
            size={16}
            color={colors.text.titles}
            onPress={() => console.log("Editar perfil")}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.subTitle}>{user?.email || ""}</Text>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.subTitle}>{user?.user_name || ""}</Text>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>
            {user?.is_public
              ? "Sua conta está pública"
              : "Sua conta não está pública"}
          </Text>
        </View>
        <View style={styles.formControl}>
          <Text>Suas chaves podem ser compartilhadas com suas conexões</Text>
        </View>
      </View>
      <PixList
        own={1}
        keysToShare={keysToShare}
        setKeysToShare={setKeysToShare}
      />
    </AppBar>
  );
}
