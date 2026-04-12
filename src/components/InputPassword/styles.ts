import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        height: 48,
        width: "100%",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#AED9DA",
        paddingHorizontal: 20,
        marginBottom: 20
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
        paddingTop: 125
    },
    formControl: {
        width: "100%",
    },
    label: {
        marginBottom: 8,
        color: "#080808",
        marginLeft: 2
    },
    forgot: {
        color: "#140EFF"
    },
    forgotContainer: {
        width: "100%",
        justifyContent: "flex-start",
        marginTop: 8
    },
    passwordInput: {
        width: "100%",
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#AED9DA",
        height: 48,
        paddingHorizontal: 10,
        marginBottom: 20
    },
    iconStyle: {
        padding: 5,
    },
    inputStyle: {
        flex: 1,
    },
})