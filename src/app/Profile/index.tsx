import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { AppBar } from "@/components/AppBar";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import { colors } from "@/theme/colors";
import { PixList } from "@/components/PixList";
import { KeysToShare } from "../Type/types";
import { useState } from "react";
import { useAuthContext } from "@/context/auth.context";
import { Header } from "@/components/Header";
import { Banner } from "@/ads/Banner";
import { Dashboard } from "@/components/Dashboard";

type NavBar = "profile" | "dashboard";
export function Profile() {
  const [keysToShare, setKeysToShare] = useState<KeysToShare[]>([]);
  const { user } = useAuthContext();
  const navigation = useNavigation();
  const [navbar, setNavbar] = useState<NavBar>("profile");
  const changeTab = (tab: NavBar) => {
    setNavbar(tab);
  };
  return (
    <AppBar keys={keysToShare} currentRoute={"profile"}>
      <Header />
      {user?.plan?.have_dashboard && (
        <View style={styles.appBar}>
          <TouchableOpacity
            style={styles.btnBar}
            onPress={() => changeTab("profile")}
          >
            <Text
              style={
                navbar === "profile"
                  ? styles.navActiveText
                  : styles.navInactiveText
              }
            >
              Perfil
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnBar}
            onPress={() => changeTab("dashboard")}
          >
            <Text
              style={
                navbar === "dashboard"
                  ? styles.navActiveText
                  : styles.navInactiveText
              }
            >
              Dashboard
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {navbar === "profile" ? (
        <>
          <View style={styles.profileContainer}>
            <View style={styles.formControl}></View>
            <View style={styles.formControl}>
              <Text style={styles.title}>{user?.name || ""}</Text>
              <Entypo
                name="chevron-thin-right"
                size={16}
                color={colors.text.titles}
                onPress={() => navigation.navigate("profileEdit")}
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
              <Text>
                Suas chaves {!user?.is_public && "não"} podem ser compartilhadas
                com suas conexões
              </Text>
              {!user?.is_public && "Não"}
            </View>
          </View>
          <PixList
            own={1}
            keysToShare={keysToShare}
            setKeysToShare={setKeysToShare}
            custoStyleListItem={{ paddingBottom: 36 }}
          />
          <Banner custom={{ position: "absolute", bottom: "106" }} />
        </>
      ) : (
        <Dashboard />
      )}
    </AppBar>
  );
}
