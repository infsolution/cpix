import { ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme/colors";

export function Loading() {
    return (
        <ActivityIndicator size="large" color={colors.green.btn} style={styles.container} />
    )
}