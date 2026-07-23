import { StackRouterProps } from "@/routes/StackRoutes";
import { KeysToShare } from "@/app/Type/types";
import { useEffect, useState } from "react";
import { AppBar } from "@/components/AppBar";
import { Header } from "@/components/Header";
import { FriendPixList } from "@/components/FriendPixList";
import { View, Text, Image } from "react-native";
import { UserFriend } from "@/shared/interfaces/user-interface";
import { UserCircle } from "@/components/UserCircle";
import { styles } from "./styles";
import { getFriend } from "@/shared/services/c-pix/users.service";
import { mainUrl } from "@/shared/api/c-pix";
export const FriendProfile = ({ route }: StackRouterProps<"friend">) => {
  const [keysToShare, setKeysToShare] = useState<KeysToShare[]>([]);
  const [userFriend, setUserFriend] = useState<UserFriend>({
    id: "0",
    name: "User Friend",
    userName: "@user_friend",
    image: "",
    connectionNumber: "10",
    keyNumber: "4",
  });
  const fetchUserData = async () => {
    const id = route.params.id;
    try {
      const { data } = await getFriend(id);
      setUserFriend(data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <AppBar keys={keysToShare} currentRoute={"friend"}>
      <Header />

      <View style={styles.container}>
        <>
          {!userFriend?.image && <UserCircle name={userFriend?.name} />}
          {userFriend?.image && (
            <Image
              source={{
                uri: mainUrl + userFriend.image,
              }}
              style={styles.profileImage}
            />
          )}
        </>
        <View style={styles.info}>
          <View style={styles.userContainer}>
            <Text style={styles.title}>{userFriend.name}</Text>
            <Text style={styles.subTitle}>{userFriend.userName}</Text>
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.subTitle}>
              {userFriend.connectionNumber}{" "}
              {Number(userFriend.connectionNumber) > 1 ? "Conexões" : "Conexão"}
            </Text>
            <Text style={styles.subTitle}>
              {userFriend.keyNumber}{" "}
              {Number(userFriend.keyNumber) > 1
                ? "Chaves"
                : Number(userFriend.keyNumber) < 1
                  ? "Chaves"
                  : "Chave"}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.legend}>
        <Text style={styles.title}>Chaves de {userFriend.name}</Text>
        <Text style={styles.subTitle}>
          Você pode copiar e compartilhar essas chaves
        </Text>
      </View>
      <FriendPixList
        id={route.params.id}
        keysToShare={keysToShare}
        setKeysToShare={setKeysToShare}
        friendName={userFriend.name}
      />
    </AppBar>
  );
};
