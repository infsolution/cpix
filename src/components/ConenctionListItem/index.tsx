import { Image, Text, TouchableOpacity, View, Alert } from "react-native";
import { ConnectionType, ItemSearch, ListType } from "@/app/Type/types";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { UserCircle } from "../UserCircle";
import { colors } from "@/theme/colors";
import { styles } from "./styles";

type ItemProp = {
  itemPix: ConnectionType;
  handleDeleteConnection: (connection_id: string) => void;
  handleAcceptConnection: (connection_id: string) => void;
  listType: ListType;
};
export const ConnectionListItem = ({
  itemPix,
  handleDeleteConnection,
  handleAcceptConnection,
  listType,
}: ItemProp) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {!itemPix?.image && <UserCircle name={itemPix.name} />}
      {itemPix?.image && (
        <Image
          source={{
            uri: itemPix.image,
          }}
          style={styles.profileImage}
        />
      )}
      <TouchableOpacity
        style={styles.text}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("friend", { id: itemPix.id })}
        disabled={listType !== "connection"}
      >
        <Text style={styles.name}>{itemPix?.name}</Text>
        <Text style={styles.bankName}>{itemPix.user_name}</Text>
      </TouchableOpacity>
      <View style={styles.icons}>
        {listType === "receiver" && (
          <TouchableOpacity
            style={styles.icon}
            activeOpacity={0.8}
            onPress={() => handleAcceptConnection(itemPix.connection_id)}
          >
            <FontAwesome5
              name="check-double"
              size={18}
              color={colors.callAction.tertiary}
            />
            <Text style={styles.textIconAccept}>Aceitar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() =>
            Alert.alert("Excluir?", "Tem certeza que vai excluir a conexão?", [
              { text: "Não", style: "cancel" },
              {
                text: "Sim",
                onPress: () => handleDeleteConnection(itemPix.connection_id),
              },
            ])
          }
          style={styles.icon}
          activeOpacity={0.8}
        >
          <FontAwesome5
            name="trash"
            size={14}
            color={colors.callAction.danger}
          />
          <Text style={styles.textIconDelete}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
