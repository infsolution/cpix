import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderColor: "#5BD5C7",
        borderWidth: 1,
        borderRadius: 16,
        height: 56,
        paddingStart: 12,
        paddingEnd: 12,
        backgroundColor: "#E4F7F6"
    },
    texts: {
        flex: 1,
        gap: 1,
    },
    text: {
        color: "#035149",
    },
    checkbox: {
        width: 42,
        height: 42,
        borderRadius: 50,
    }
})