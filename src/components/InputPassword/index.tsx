import { View, TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";
import Entypo from '@expo/vector-icons/Entypo';

type Props = TextInputProps & {
    activeSecureTextEntry: boolean,
    setActiveSecureTextEntry: (activeSecureTextEntry: boolean) => void
}

export function InputPassword({ activeSecureTextEntry, setActiveSecureTextEntry, ...rest }: Props) {
    return (
        <View style={styles.passwordInput}>
            <TextInput placeholder='**********' secureTextEntry={activeSecureTextEntry} style={styles.inputStyle} />
            {activeSecureTextEntry ?
                <Entypo name="eye" size={24} color="#32BCAD" style={styles.iconStyle} onPress={() => setActiveSecureTextEntry(!activeSecureTextEntry)} /> :
                <Entypo name="eye-with-line" size={24} color="#32BCAD" style={styles.iconStyle} onPress={() => setActiveSecureTextEntry(!activeSecureTextEntry)} />
            }
        </View>
    )
}