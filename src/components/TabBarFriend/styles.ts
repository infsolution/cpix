import { StyleSheet } from "react-native";
import { colors } from "@/theme/colors";
export const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        flexDirection: "row",
        columnGap: 12,
        paddingBottom: 8,
    },
    title: {
        fontSize: 38,
        fontWeight: 700,
    },
    tab: {

    },
    activeTab: {
        height: 4,
        backgroundColor: colors.tab.tabUnderline,
        paddingHorizontal: 6,
        paddingVertical: 4,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        marginTop:8
    }
})