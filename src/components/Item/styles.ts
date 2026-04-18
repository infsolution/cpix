import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        height: 56,
        paddingStart: 12,
        paddingEnd: 12,
        backgroundColor: colors.background
    },
    texts: {
        flex: 1,
    },
    title: {
        color: colors.list.titleItem,
        fontWeight: "bold",
        fontSize: 16,
    },
    text:{
        color: colors.list.textItem,
         fontWeight: "normal",
        fontSize: 16,
    },
    checkbox: {
        width: 42,
        height: 42,
        borderRadius: 50,
    }
})