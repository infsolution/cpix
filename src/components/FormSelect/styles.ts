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
    },
    selectedText: {
        flex: 1,
        color: "#383838",
    },
    placeholder: {
        color: colors.text.placeholder,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.35)",
        paddingHorizontal: 24,
    },
    dropdown: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#AED9DA",
        maxHeight: "70%",
        padding: 12,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 46,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#AED9DA",
        paddingHorizontal: 10,
        marginBottom: 8,
    },
    searchInput: {
        flex: 1,
        height: "100%",
        color: "#383838",
        marginLeft: 8,
    },
    list: {
        width: "100%",
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        minHeight: 48,
        borderBottomWidth: 1,
        borderBottomColor: "#EEF5F5",
        paddingVertical: 8,
        gap: 12,
    },
    optionName: {
        flex: 1,
        color: "#383838",
    },
    optionCode: {
        color: colors.text.placeholder,
    },
    feedback: {
        height: 120,
        alignItems: "center",
        justifyContent: "center",
    },
    emptyText: {
        color: colors.text.placeholder,
        textAlign: "center",
        paddingVertical: 24,
    }
})
