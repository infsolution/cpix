import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { colors } from "@/theme/colors";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { UserCircle } from "../../components/UserCircle";
import { useAuthContext } from "@/context/auth.context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { SearchList } from "../../components/SearchList";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { mainUrl } from "@/shared/api/c-pix";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";
import * as BackgroundTask from "expo-background-task";
import { updateOrCreateBackup } from "@/shared/services/c-pix/backup.service";
import { getStorageUser } from "@/shared/storage/service/user";
export const Settings = () => {
  const { user, handleLogout } = useAuthContext();
  const { openBottomSheet } = useBottomSheetContext();
  const [image, setImage] = useState("");
  const navigation = useNavigation();
  const backup = async () => {
    const user = await getStorageUser("user-data");
    if (user) {
      await updateOrCreateBackup(user);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button
        title="Teste"
        customStyle={{ backgroundColor: "black" }}
        onPress={async () => {
          console.info("➡️ Calling triggerTaskWorkerForTestingAsync");
          try {
            await BackgroundTask.triggerTaskWorkerForTestingAsync();
            // await BackgroundTask.unregisterTaskAsync("auto-backup");
            // backup();
            console.info("✅ triggerTaskWorkerForTestingAsync terminou");
          } catch (error) {
            console.info("❌ triggerTaskWorkerForTestingAsync ERROR", error);
          }
          console.log("3️⃣ Fim");
        }}
      />
    </View>
  );
};
