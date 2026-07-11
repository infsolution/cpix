import { FlatList, Text, View } from "react-native";
import { styles } from "./styles";
import { StackRouterProps } from "@/routes/StackRoutes";
import { AppBar } from "@/components/AppBar";
import { Header } from "@/components/Header";
import { TabBarFriend } from "@/components/TabBarFriend";
import { useEffect, useState } from "react";
import { ConnectionType, ListType } from "../Type/types";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import {
  acceptConnection,
  deleteConnection,
  getConnection,
  getReceiverInvitation,
  getSentInvitation,
} from "@/shared/services/c-pix/users.service";
import { Loading } from "@/components/Loading";
import { ConnectionListItem } from "@/components/ConenctionListItem";
import { useSnackbarContext } from "@/context/snackbar.context";
import { ConnectionEmptyList } from "@/components/ConnectionEmptyList";

export function Friends({ route }: StackRouterProps<"friends">) {
  const [listType, setListType] = useState<ListType>("connection");
  const [listItems, setListItems] = useState<ConnectionType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deletionsCount, setDeletionsCount] = useState(0);
  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();

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
    setIsLoading(true);
    try {
      const { data } = await getSentInvitation();
      setListItems(data);
    } catch (error) {
      handleError(error, "Erro ao buscar usuários");
    } finally {
      setIsLoading(false);
    }
  };
  const getReceiver = async () => {
    setIsLoading(true);
    try {
      const { data } = await getReceiverInvitation();
      setListItems(data);
    } catch (error) {
      handleError(error, "Erro ao buscar usuários");
    } finally {
      setIsLoading(false);
    }
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

  const handleDeleteConnection = async (connection_id: string) => {
    try {
      if (connection_id) {
        const status = await deleteConnection(connection_id);
        console.log("Code Deleted ", status);
        if (status === 204) {
          setDeletionsCount(deletionsCount + 1);
          notify({
            message: "Conexão excluída com sucesso",
            messageType: "SUCCESS",
          });
        }
      }
    } catch (error) {
      handleError(error, "Erro ao excluir a conexão");
    }
  };

  const handleAcceptConnection = async (connection_id: string) => {
    try {
      if (connection_id) {
        const { code } = await acceptConnection(connection_id);
        if (code == "200") {
          setDeletionsCount(deletionsCount + 1);
          notify({
            message: "Conexão aceita",
            messageType: "SUCCESS",
          });
        }
      }
    } catch (error) {
      handleError(error, "Erro ao aceitar a conexão");
    }
  };
  useEffect(() => {
    getList();
  }, [listType, deletionsCount]);
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
              renderItem={({ item }) => (
                <ConnectionListItem
                  itemPix={item}
                  handleDeleteConnection={handleDeleteConnection}
                  handleAcceptConnection={handleAcceptConnection}
                  listType={listType}
                />
              )}
              ItemSeparatorComponent={() => <View style={styles.separators} />}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<ConnectionEmptyList listType={listType} />}
            />
          </View>
        )}
      </View>
    </AppBar>
  );
}
