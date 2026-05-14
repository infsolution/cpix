import { colors } from "@/theme/colors";
import { FC, PropsWithChildren } from "react";
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const DismissKeiboardview: FC<PropsWithChildren> = ({ children }) => {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                <KeyboardAvoidingView behavior="padding" >
                    <ScrollView>
                        {children}
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}