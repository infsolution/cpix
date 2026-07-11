import { SelectionOptions } from "@/shared/hooks/useAppModal";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/colors";

export interface SelectionModalProps {
  title: string;
  message?: string;
  options: SelectionOptions[];
}
export const SelectionModal: FC<SelectionModalProps> = ({
  options,
  title,
  message,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {message && <Text style={styles.subtitle}>{message}</Text>}
      </View>
      <View style={styles.options}>
        {options.map((option, index) => (
          <TouchableOpacity
            onPress={option.onPres}
            style={styles.option}
            key={`select-image-${index}`}
            activeOpacity={0.8}
          >
            {option.icon && (
              <Ionicons name={option.icon} size={20} color={colors.white} />
            )}
            <Text style={styles.optionText}>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
