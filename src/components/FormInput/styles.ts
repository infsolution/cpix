import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 16
    },
    label: {
        color: colors.text.label,
        marginBottom: 8,
        paddingHorizontal: 4,
    },
    input: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        height: 48,
        width: "100%",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#AED9DA",
        paddingHorizontal: 10,
    },

    textInput: {
        flex: 1,
        height: "100%",
        color: "#383838"
    }
})
