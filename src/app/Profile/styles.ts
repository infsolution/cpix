import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: 500,
        color: colors.text.titles
    },
    subTitle: {
        fontSize: 18,
        color: colors.text.titles
    },
    formContainer: {
        flex: 1,
        width: "100%",
        paddingTop: 20,
        padding: 24
    },
    formControl: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
    },
    label: {
        marginBottom: 8,
        color: "#080808",
        marginLeft: 2
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 50
    }
})