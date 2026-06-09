import { Text, View } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import { colors } from "@/theme/colors";
import { useState } from "react";
import { ItemSearch } from "@/app/Type/types";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type ItemProp = {
  itemPix: ItemSearch;
};
export const SearchListItem = ({ itemPix }: ItemProp) => {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.name}>{itemPix?.name}</Text>
        <Text style={styles.bankName}>{itemPix?.nameBank}</Text>
      </View>
      <View style={styles.icons}>
        {itemPix.userName && (
          <FontAwesome5
            name="user-friends"
            size={24}
            color={colors.callAction.tertiary}
          />
        )}
        {!itemPix.userName && (
          <FontAwesome6 name="pix" size={24} color={colors.callAction.main} />
        )}
      </View>
    </View>
  );
};
