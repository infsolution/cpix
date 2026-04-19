import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: "100%",
        height: 80,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 24,
    },
    backcontainer: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: colors.btn.goBack,
        alignItems: "center",
        justifyContent: "center",
    }
})