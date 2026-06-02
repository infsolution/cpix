import { Text, View, Image } from "react-native";
import { styles } from "./styles";
import { AppBar } from "@/components/AppBar";
import { TabGoBack } from "@/components/TabGoBack";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/theme/colors";
import { PixList } from "@/components/PixList";
import { KeysToShare } from "../Type/types";
import { useState } from "react";

export function Profile() {
  const [keysToShare, setKeysToShare] = useState<KeysToShare[]>([]);
  return (
    <AppBar keys={keysToShare} currentRoute={"profile"}>
      <TabGoBack />
      <View style={styles.formContainer}>
        <View style={styles.formControl}>
          <Image
            source={require("@/assets/profile.png")}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.title}>Cicero</Text>
          <Entypo
            name="chevron-thin-right"
            size={20}
            color={colors.text.titles}
            onPress={() => console.log("Editar perfil")}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.subTitle}>cicero@example.com</Text>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.subTitle}>@cicero</Text>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Sua conta está pública</Text>
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
