import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./styles";
import { colors } from "@/theme/colors";
import { View, Image, TouchableOpacity, Text, ScrollView } from "react-native";
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
import { Header } from "@/components/Header";
import { SettingItem } from "@/components/SettingItem";
import { Ionicons } from "@expo/vector-icons";
import { useChangePasswordModal } from "@/shared/hooks/useChangePasswordModal";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Banner } from "@/ads/Banner";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";
import Purchases from "react-native-purchases";
import * as Linking from "expo-linking";
import { Alert } from "react-native";
export const Settings = () => {
  const { user, handleLogout } = useAuthContext();
  const { openBottomSheet } = useBottomSheetContext();
  const [image, setImage] = useState("");
  const { handleError } = useErrorHandler();
  const navigation = useNavigation();
  const { showForm } = useChangePasswordModal();
  const [isDisabled, setIsDisabled] = useState(false);
  const { notify } = useSnackbarContext();

  const backup = async () => {
    try {
      const user = await getStorageUser("user-data");
      if (user) {
        await updateOrCreateBackup(user);
        notify({
          message: "Backup criado com sucesso!",
          messageType: "SUCCESS",
        });
      }
    } catch (error) {
      handleError(error, "Erro a tentar criar um backup!");
    }
  };

  const handleChangePassword = async () => {
    showForm();
  };

  const getUserManagementURL = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo();
      const url = customerInfo.managementURL;
      if (url) {
        // Opens the Google Play Store subscription panel directly
        Linking.openURL(url);
      } else {
        // Fallback if no active subscription or URL is found
        Alert.alert(
          "No Active Subscription",
          "We couldn't find an active store subscription. Please manage via Google Play manually.",
        );
      }
    } catch (error) {
      console.error("Error fetching customer info:", error);
      return null;
    }
  };
  const handleDeleteAccount = () => {
    Linking.openURL("https://xavex.clsdev.com.br/delete_account");
  };
  useEffect(() => {
    if (!user?.plan?.have_backup) {
      setIsDisabled(true);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll}>
        <SettingItem
          DefaultIcon={
            <MaterialIcons
              name="payment"
              size={24}
              color={colors.callAction.main}
            />
          }
          description="Gerenciar plano"
          onPress={getUserManagementURL}
          isDisabled={false}
        />
        <SettingItem
          DefaultIcon={
            <FontAwesome5
              name="user-edit"
              size={22}
              color={colors.callAction.main}
            />
          }
          description="Editar perfil"
          onPress={() => navigation.navigate("profileEdit")}
          isDisabled={false}
        />
        <SettingItem
          DefaultIcon={
            <MaterialIcons
              name="delete"
              size={24}
              color={colors.callAction.main}
            />
          }
          description="Excluir conta"
          onPress={handleDeleteAccount}
          isDisabled={false}
        />
        <SettingItem
          DefaultIcon={
            <MaterialIcons
              name="lock-outline"
              size={24}
              color={colors.callAction.main}
            />
          }
          description="Alterar senha"
          onPress={handleChangePassword}
          isDisabled={false}
        />
        <SettingItem
          DefaultIcon={
            <MaterialIcons
              name="backup"
              size={24}
              color={colors.callAction.main}
            />
          }
          description="Criar backup"
          onPress={backup}
          isDisabled={isDisabled}
        />
        {/* <SettingItem
          DefaultIcon={
            <MaterialCommunityIcons
              name="backup-restore"
              size={24}
              color={colors.callAction.main}
            />
          }
          description="Restaurar backup"
          onPress={() => console.log("password")}
          isDisabled={isDisabled}
        /> */}

        {/* <SettingItem
          DefaultIcon={
            <AntDesign
              name="exclamation-circle"
              size={22}
              color={colors.callAction.main}
            />
          }
          description="Sobre o app - versão 1.0.0"
          onPress={() => console.log("password")}
          isDisabled={false}
        /> */}
        <SettingItem
          DefaultIcon={
            <Ionicons
              name="arrow-back"
              size={24}
              color={colors.callAction.main}
            />
          }
          description="Voltar"
          onPress={() => navigation.goBack()}
          isDisabled={false}
        />
      </ScrollView>
      <Banner custom={{ position: "absolute", bottom: "50" }} />
    </View>
  );
};
