import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { colors } from "@/theme/colors";
import { askToShare } from "@/shared/services/notification/notification.service";
import { useAuthContext } from "@/context/auth.context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";
import { useState } from "react";
import { Loading } from "../Loading";
import { AppError } from "@/shared/helpers/AppError";
type Props = {
  friendName: string;
  friendId: string;
};
export function FriendEmptyKeyList({ friendName, friendId }: Props) {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [sended, setSended] = useState(false);
  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();
  const handleAskToShare = async () => {
    setIsLoading(true);
    try {
      const { message, code, data } = await askToShare({
        friendId: friendId,
        headings: "Compartilhar Chave",
        contents: `${user?.name} pede que você compartilhe ou cadastre suas chaves PIX com ele!`,
        data: { solicitante: user?.name },
        deepLink: "xavex://profile",
      });
      if (code != "200") {
        throw new AppError(message);
      }
      notify({
        message: "Solicitação enviada com sucesso.",
        messageType: "SUCCESS",
      });
      setSended(true);
    } catch (error) {
      handleError(error, "Erro na solicitação");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <FontAwesome6 name="pix" size={68} color={colors.green.btn} />
      <Text style={styles.titleMain}>OPA!</Text>
      <View style={styles.info}>
        <Text style={styles.title}>
          {friendName} ainda não compartilhou nenhuma chave.
        </Text>
        <Text style={styles.text}>
          Peça para que cadastre ou compartilhe uma chave!
        </Text>
      </View>
      {!isLoading && !sended && (
        <View style={styles.askToShare}>
          <TouchableOpacity onPress={handleAskToShare} activeOpacity={0.8}>
            <FontAwesome6
              name="slideshare"
              size={48}
              color={colors.list.capitular}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Pedir para compartilhar!</Text>
        </View>
      )}

      {!isLoading && sended && (
        <View style={styles.askToShare}>
          <TouchableOpacity activeOpacity={0.8}>
            <MaterialCommunityIcons
              name="transit-connection-variant"
              size={48}
              color={colors.list.capitular}
            />
          </TouchableOpacity>
          <Text style={styles.text}>Solicitação enviada</Text>
        </View>
      )}
      {isLoading && <Loading />}
    </View>
  );
}
