import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderColor: "green",
        borderWidth: 1,
        borderRadius: 4,
        height: 36,
        paddingStart: 12,
        paddingEnd: 12,
        backgroundColor: "green"
    },
    texts: {
        flex: 1,
        flexDirection: "row",
        gap: 12,
    },
    text: {
        color: "white",
    },
    checkbox: {
        width: 12,
        height: 12,
        color: "white"
    }
})