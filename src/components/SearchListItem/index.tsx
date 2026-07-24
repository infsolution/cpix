import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import { colors } from "@/theme/colors";
import { useState } from "react";
import { ItemSearch } from "@/app/Type/types";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { sendInvitation } from "@/shared/services/c-pix/users.service";
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
      const { code } = await sendInvitation(id);
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
      <TouchableOpacity
        style={styles.text}
        activeOpacity={0.8}
        onPress={() => console.log("Press")}
      >
        <Text style={styles.name}>{itemPix?.name}</Text>
        <Text style={styles.bankName}>
          {itemPix?.nameBank ?? itemPix.user_name}
        </Text>
      </TouchableOpacity>
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
