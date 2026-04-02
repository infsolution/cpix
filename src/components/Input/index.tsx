import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";


export function Input({ ...rest }: TextInputProps) {
    return (
        <TextInput
            placeholderTextColor="#A5B1B4"
            style={styles.container}
            {...rest}
        />
    )
}