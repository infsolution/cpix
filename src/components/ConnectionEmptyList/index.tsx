import { View, Text } from "react-native";
import { styles } from "./styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { colors } from "@/theme/colors";
import { ListType } from "@/app/Type/types";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
type Props = {
  listType: ListType;
};

type TextMessage =
  | "Você não tem nenhum convite!"
  | "Você não fez nenhum convite!"
  | "Você não tem nenhuma conexão!";
export function ConnectionEmptyList({ listType }: Props) {
  const [text, setText] = useState<TextMessage>(
    "Você não tem nenhuma conexão!",
  );
  const { t } = useTranslation();
  useEffect(() => {
    switch (listType) {
      case "connection":
        setText("Você não tem nenhuma conexão!");
        break;
      case "receiver":
        setText("Você não tem nenhum convite!");
        break;
      case "sent":
        setText("Você não fez nenhum convite!");
        break;

      default:
        break;
    }
  }, [listType]);
  return (
    <View style={styles.container}>
      <FontAwesome5
        name="user-friends"
        size={66}
        color={colors.callAction.tertiary}
      />
      <Text style={styles.titleMain}>OPA!</Text>
      <View style={styles.info}>
        <Text style={styles.title}>{text}</Text>
        <Text style={styles.text}>{t("message.notFriend")}</Text>
        <Text style={styles.text}>convide-os, é de graça</Text>
      </View>

      <Button
        title="CONVIDAR AMIGO"
        customStyle={{ backgroundColor: colors.callAction.main, width: "100%" }}
      />
    </View>
  );
}
