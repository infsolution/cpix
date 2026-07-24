import { View, TouchableOpacity, ToastAndroid, Text } from "react-native";
import { styles } from "./styles";
import { ReactNode, useState } from "react";
import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "@/theme/colors";
import { KeysToShare } from "@/app/Type/types";
import { shareText } from "@/utils/structure";
import { useTranslation } from "react-i18next";

type Props = {
  children: ReactNode;
  keys?: KeysToShare[];
  currentRoute: string;
};
export function AppBar({ children, currentRoute, keys = [] }: Props) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  function share() {
    if (keys.length === 0) {
      ToastAndroid.show(t("message.selectKeys"), ToastAndroid.SHORT);
      return;
    }
    let toShare = t("message.sharingKeys");
    if (keys.length === 1) {
      toShare = t("message.singleSharingKey");
    }
    if (keys.length > 0) {
      toShare += keys.map((keyPix) => {
        return (
          "\n" + keyPix.name + "\n" + t("words.key") + ": " + keyPix.keyPix
        );
      });
    }
    toShare += "\n\n" + t("message.downloadLink") + ": " + t("linkFromPlay");
    //TODO: Desmarcar as chaves na lista
    shareText(toShare);
  }
  return (
    <View style={styles.container}>
      {children}
      {(currentRoute === "home" ||
        currentRoute === "profile" ||
        currentRoute === "friend") && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            bottom: -52,
            width: 50,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
          onPress={share}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: 50,
              borderRadius: 50,
              backgroundColor: colors.callAction.tertiary,
            }}
          >
            <Feather
              name="share-2"
              size={32}
              color={colors.tab.defaultIconText}
            />
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.appBar}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: "home" }] })
          }
          style={currentRoute === "home" ? styles.ActiveIcon : styles.icon}
        >
          <Feather
            name="home"
            size={26}
            color={
              currentRoute === "home"
                ? colors.tab.defaultIconText
                : colors.tab.defaultIcon
            }
          />
          {currentRoute !== "home" && <Text style={styles.textIcon}>Home</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("profile")}
          style={currentRoute === "profile" ? styles.ActiveIcon : styles.icon}
        >
          <Ionicons
            name="person-circle-outline"
            size={28}
            color={
              currentRoute === "profile"
                ? colors.tab.defaultIconText
                : colors.tab.defaultIcon
            }
          />
          {currentRoute !== "profile" && (
            <Text style={styles.textIcon}>Perfil</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
