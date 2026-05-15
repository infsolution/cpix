import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 10,
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
        paddingTop: 10
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
        paddingBottom: 16
    },
    checkbox: {
        width: 18,
        height: 18,
    },
    image: {
        width: 80,
        height: 80
    },
    linkLogin: {
        color: "#140EFF"
    },
    toLogin: {
        marginTop: 16
    }
})