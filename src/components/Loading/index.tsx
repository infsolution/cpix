import { ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme/colors";

type Props = {
  color?: string;
};
export function Loading({ color = colors.green.btn }: Props) {
  return (
    <ActivityIndicator size="large" color={color} style={styles.container} />
  );
}
