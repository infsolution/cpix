import { FC, PropsWithChildren } from "react";
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { styles } from "./style";

type FormButtonMode = "fill" | "outline";
interface FormButtonParams extends TouchableOpacityProps {
    mode?: FormButtonMode;
    inProgress?: boolean;
}

export const FormButton: FC<PropsWithChildren<FormButtonParams>> = ({ children, mode = "fill", inProgress = false, ...rest }) => {
    const isFill = mode === "fill";
    return <TouchableOpacity
        style={isFill ? styles.containerFill : styles.containerOutline}
        activeOpacity={0.8}
        disabled={inProgress}
        {...rest}
    >
        <Text style={isFill ? styles.title : styles.titleOutline}>
            {
                inProgress ? (<ActivityIndicator size="small" color={styles.title.color} />) : (children)

            }
        </Text>
    </TouchableOpacity>
}