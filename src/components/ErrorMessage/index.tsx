
import { colors } from "@/theme/colors"
import { FC, PropsWithChildren } from "react"
import { Text, View } from "react-native"

export const ErrorMessage: FC<PropsWithChildren> = ({ children }) => {
    return (
        <View>
            <Text style={{ color: colors.red.delete, paddingLeft: 5 }}>{children}</Text>
        </View>
    )
}