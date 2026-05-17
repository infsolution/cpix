import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        backgroundColor: colors.white
    },
    title: {
        fontSize: 24,
        fontWeight: 400,
        marginTop: 24
    },
    subTitle: {
        fontSize: 14
    },
    formContainer: {
        flex: 1,
        width: "100%",
        padding: 24
    },
    formControl: {
        width: "100%",
    },
    label: {
        marginBottom: 8,
        color: "#080808",
        marginLeft: 2
    },
    formControlPublic: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 26,
        marginBottom: 16
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


})