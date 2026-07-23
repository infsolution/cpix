import { styles } from "./styles";
import { Text, View, Linking, TouchableOpacity, Alert } from "react-native";
import { DismissKeiboardview } from "@/components/DismissKeyboardView";
import { SigninForm } from "./SigninForm";
import { useTranslation } from "react-i18next";
export function SignIn() {
  const { t, i18n } = useTranslation();
  return (
    <DismissKeiboardview>
      <View style={styles.container}>
        <Text style={styles.title}>{t("appName")}</Text>
        <Text style={styles.subTitle}>{t("appDescription")}</Text>
        <SigninForm />
      </View>
    </DismissKeiboardview>
  );
}
