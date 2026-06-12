import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import { colors } from "@/theme/colors";
import { useState } from "react";
import { ItemSearch } from "@/app/Type/types";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { getSendInvitation } from "@/shared/services/c-pix/users.service";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";
type ItemProp = {
  itemPix: ItemSearch;
};
export const SearchListItem = ({ itemPix }: ItemProp) => {
  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();
  const handleConnect = async (id: string | number) => {
    try {
      const { code } = await getSendInvitation(id);
      if (code == "201") {
        notify({
          message: "Solicitação enviada com sucesso",
          messageType: "SUCCESS",
        });
      }
    } catch (error) {
      handleError(error, "Erro ao buscar usuários");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Text style={styles.name}>{itemPix?.name}</Text>
        <Text style={styles.bankName}>
          {itemPix?.nameBank ?? itemPix.user_name}
        </Text>
      </View>
      <View style={styles.icons}>
        {itemPix.user_name && (
          <TouchableOpacity
            onPress={() => {
              handleConnect(itemPix.id);
            }}
          >
            <FontAwesome5
              name="user-friends"
              size={24}
              color={colors.callAction.tertiary}
            />
          </TouchableOpacity>
        )}
        {!itemPix.user_name && (
          <TouchableOpacity>
            <FontAwesome6 name="pix" size={24} color={colors.callAction.main} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
