import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import { StackRouterProps } from "@/routes/StackRoutes";
import { AppBar } from "@/components/AppBar";
import { Header } from "@/components/Header";
import { TabBarFriend } from "@/components/TabBarFriend";
import { useEffect, useState } from "react";
import { ConnectionType, ListType } from "../Type/types";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { getConnection } from "@/shared/services/c-pix/users.service";
import { Loading } from "@/components/Loading";
import { EmptyList } from "@/components/EmptyList";
import { ConnectionListItem } from "@/components/ConenctionListItem";

export function Friends({ route }: StackRouterProps<"friends">) {
  const [listType, setListType] = useState<ListType>("connection");
  const [listItems, setListItems] = useState<ConnectionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { handleError } = useErrorHandler();

  const getConnections = async () => {
    setIsLoading(true);
    try {
      const { data } = await getConnection();
      setListItems(data);
    } catch (error) {
      handleError(error, "Erro ao buscar usuários");
    } finally {
      setIsLoading(false);
    }
  };
  const getSent = async () => {
    setListItems([]);
  };
  const getReceiver = async () => {
    setListItems([]);
  };
  const getList = async () => {
    switch (listType) {
      case "connection":
        getConnections();
        break;
      case "sent":
        getSent();
        break;
      case "receiver":
        getReceiver();
        break;

      default:
        break;
    }
    if (listType === "connection") {
    }
  };
  useEffect(() => {
    getList();
  }, [listType]);
  return (
    <AppBar keys={[]} currentRoute={"friends"}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Suas conexões</Text>
        <TabBarFriend listType={listType} setListType={setListType} />
        {isLoading && (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </View>
        )}
        {!isLoading && (
          <View style={styles.formContainer}>
            <FlatList
              data={listItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <ConnectionListItem itemPix={item} />}
              ItemSeparatorComponent={() => <View style={styles.separators} />}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<EmptyList />}
            />
          </View>
        )}
      </View>
    </AppBar>
  );
}
