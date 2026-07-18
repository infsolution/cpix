import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { colors } from "@/theme/colors";
import { View, Text, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { useAuthContext } from "@/context/auth.context";
import { FC, useEffect } from "react";
import { BaseLoading } from "@/components/BaseLoading";

interface Props {
  setLoading: (value: boolean) => void;
}
export const Loading: FC<Props> = ({ setLoading }) => {
  const { restoreUserSession, handleLogout } = useAuthContext();

  useEffect(() => {
    (async () => {
      try {
        const user = await restoreUserSession();
        if (!user) {
          handleLogout();
        }
      } catch (error) {
        console.info(error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <BaseLoading />
    </SafeAreaView>
  );
};
