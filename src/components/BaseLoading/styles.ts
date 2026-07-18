import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap:12,
        backgroundColor: colors.list.circle,
    },
    text:{
        fontSize: 16,
        fontWeight: "medium",
        color: colors.text.label
    }
})