import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";

export const styles = StyleSheet.create({
    container: {
        width: 44,
        height: 44,
        borderRadius: 50,
        backgroundColor: colors.list.circle,
        alignItems: "center",
        justifyContent: "center",
    },
    text:{
        fontSize:24,
        color: colors.list.captular
    }
});