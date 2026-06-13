import { Image, Text, TouchableOpacity, View, Alert } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme/colors";
import { ConnectionType, ItemSearch, ListType } from "@/app/Type/types";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { UserCircle } from "../UserCircle";

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
      <View style={styles.text}>
        <Text style={styles.name}>{itemPix?.name}</Text>
        <Text style={styles.bankName}>{itemPix.user_name}</Text>
      </View>
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
