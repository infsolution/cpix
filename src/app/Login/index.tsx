import { Text, View, Linking, TouchableOpacity, Alert } from "react-native";
import { styles } from "./styles";
import { DismissKeiboardview } from "@/components/DismissKeyboardView";
import { LoginForm } from "./LoginForm";
import { useTranslation } from "react-i18next";

export function Login() {
  const { t, i18n } = useTranslation();
  return (
    <DismissKeiboardview>
      <View style={styles.container}>
        <Text style={styles.title}>{t("appName")}</Text>
        <Text style={styles.subTitle}>{t("appDescription")}</Text>
        <LoginForm />
      </View>
    </DismissKeiboardview>
  );
}
