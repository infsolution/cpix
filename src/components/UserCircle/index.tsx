import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
type Props = {
  name: string | undefined;
};
export function UserCircle({ name }: Props) {
  let captOne = "C";
  let latsName = [""];
  let captTwo = "P";
  if (name) {
    captOne = name.split(" ")[0].charAt(0).toUpperCase();
    latsName = name.split(" ");
    captTwo = name.split(" ")[latsName.length - 1].charAt(0).toUpperCase();
  }
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8}>
      <Text style={styles.text}>{captOne + captTwo}</Text>
    </TouchableOpacity>
  );
}
