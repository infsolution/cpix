import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  inProgress?: boolean;
  customStyle: object;
};

export function Button({
  title,
  inProgress = false,
  customStyle,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.container, customStyle]}
      activeOpacity={0.8}
      {...rest}
      disabled={inProgress}
    >
      <Text style={styles.title}>
        {inProgress ? (
          <ActivityIndicator size="small" color={styles.title.color} />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
}
