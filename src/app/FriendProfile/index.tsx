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
export const FriendProfile = ({ route }: StackRouterProps<"friend">) => {
  const [keysToShare, setKeysToShare] = useState<KeysToShare[]>([]);
  const [userFriend, setUserFriend] = useState<UserFriend>({
    id: "0",
    name: "User Friend",
    userName: "@user_friend",
    image: "",
    connectionsNumber: "10",
    keyNumber: "4",
  });
  const fetchUserData = async () => {
    const id = route.params.id;
  };
  useEffect(() => {}, []);
  return (
    <AppBar keys={keysToShare} currentRoute={"friend"}>
      <Header />

      <View style={styles.container}>
        <>
          {!userFriend?.image && <UserCircle name={userFriend?.name} />}
          {userFriend?.image && (
            <Image
              source={{
                uri: userFriend.image,
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
              {userFriend.connectionsNumber} Conexões
            </Text>
            <Text style={styles.subTitle}>{userFriend.keyNumber} Chaves</Text>
          </View>
        </View>
      </View>
      <View style={styles.legend}>
        <Text style={styles.title}>Chaves de {userFriend.name}</Text>
        <Text style={styles.subTitle}>
          Você pode copiar e compartilhar chaves de {userFriend.name}
        </Text>
      </View>
      <FriendPixList
        own={1}
        keysToShare={keysToShare}
        setKeysToShare={setKeysToShare}
      />
    </AppBar>
  );
};
