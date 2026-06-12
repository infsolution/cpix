import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import { colors } from "@/theme/colors";
import { useState } from "react";
import { ConnectionType, ItemSearch } from "@/app/Type/types";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { UserCircle } from "../UserCircle";

type ItemProp = {
  itemPix: ConnectionType;
};
export const ConnectionListItem = ({ itemPix }: ItemProp) => {
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
        <TouchableOpacity onPress={() => {}} style={styles.icon}>
          <FontAwesome5
            name="trash"
            size={14}
            color={colors.callAction.danger}
          />
          <Text style={styles.textIcon}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
