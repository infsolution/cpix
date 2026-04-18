import { colors } from "@/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        width:"100%",
        height: 130,
        alignItems: "center",
        justifyContent: "center",
    },
    inputSession:{
        flexDirection: "row",
        gap: 12,
    },
    input:{
        width: "70%",
        color: "#fff",
        backgroundColor:colors.header.inputBacground,
        borderRadius:26,
        paddingHorizontal:18,
    }
})