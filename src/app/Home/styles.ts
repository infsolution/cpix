import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        paddingTop: 60,
        paddingBottom: 72,
        padding: 24

    },
    formContainer: {
        flex: 1,
        width: "100%",
    },
    formControl: {
        width: "100%",
    },
    headerList: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 8
    },
    listItem: {
        paddingTop: 8
    },
    separators: {
        width: "100%",
        height: 3,
        backgroundColor: "#32FT99"
    },
    actions:{
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        height: 24,
        gap:120,
        alignItems: "center",
        marginBottom:8,
        marginTop: 8,
    }
})
