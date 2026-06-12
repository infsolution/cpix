import {
  Text,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { styles } from "./styles";
import { fontFamily } from "@/theme/fontFamily";
import { ListType } from "@/app/Type/types";

type Props = {
  setListType: (type: ListType) => void;
  listType: string;
};
export function TabBarFriend({ listType, setListType }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setListType("connection")}
      >
        <Text style={fontFamily.regular}>Conexões</Text>
        <View style={listType === "connection" ? styles.activeTab : ""}></View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={() => setListType("sent")}>
        <Text style={fontFamily.regular}>Convites Feitos</Text>
        <View style={listType === "sent" ? styles.activeTab : ""}></View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => setListType("receiver")}
      >
        <Text style={fontFamily.regular}>Convites Recebidos</Text>
        <View style={listType === "receiver" ? styles.activeTab : ""}></View>
      </TouchableOpacity>
    </View>
  );
}
