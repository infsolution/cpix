import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 100,
        padding: 24,
    },
    title: {
        fontSize: 38,
        fontWeight: 700
    },
    subTitle: {
        fontSize: 14
    },
    formContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        paddingTop: 20
    },
    formControl: {
        width: "100%",
    },
    label: {
        marginBottom: 8,
        color: "#080808",
        marginLeft: 2
    },
    termContainer: {
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 4,
        paddingBottom: 8
    },
    checkbox: {
        width: 12,
        height: 12,
        color: "white",
    }
})