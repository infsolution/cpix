import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: colors.background,
    },
    appBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        height: 112,
        backgroundColor: colors.tab.background,
        padding: 40,
        paddingTop: 4,
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
    },
    ActiveIcon:{
        borderRadius: 50, 
        padding: 6, 
        backgroundColor:colors.tab.circleIcon, 
        height:52, 
        width:52, 
        alignItems:"center", 
        justifyContent:"center"
    },
    icon:{
        borderRadius: 50, 
        padding: 6, 
        backgroundColor:colors.tab.background, 
        height:52, 
        width:52, 
        alignItems:"center", 
        justifyContent:"center"
    }
})