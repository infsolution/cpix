import { TouchableOpacity, TouchableOpacityProps, Text, ActivityIndicator } from "react-native";
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
    title: string;
    inProgress?: boolean;
}

export function Button({ title, inProgress = false, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} {...rest} disabled={inProgress}>
            <Text style={styles.title}>
                {
                    inProgress ? (<ActivityIndicator size="small" color={styles.title.color} />) : (title)
                }
            </Text>
        </TouchableOpacity>
    )
}