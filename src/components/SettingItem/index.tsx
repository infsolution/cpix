import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import Entypo from "@expo/vector-icons/Entypo";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { Icon } from "@expo/vector-icons/build/createIconSet";
type ItemProps = {
  DefaultIcon: React.ReactNode;
  description: string;
  onPress: () => void;
  isDisabled: boolean;
};
export function SettingItem({
  DefaultIcon,
  description,
  onPress,
  isDisabled,
}: ItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, isDisabled && styles.disabledButton]}
      disabled={isDisabled}
    >
      <View style={styles.iconContainer}>
        {DefaultIcon}
        <Text>{description}</Text>
      </View>

      <Entypo
        name="chevron-thin-right"
        size={16}
        color={colors.callAction.main}
      />
    </TouchableOpacity>
  );
}
