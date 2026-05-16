import { Text, View, Linking, TouchableOpacity, Alert } from 'react-native';
import { styles } from "./styles";
import { useNavigation } from '@react-navigation/native';
import { useUserDatabase } from '@/database/useUserDatabase';
import { DismissKeiboardview } from '@/components/DismissKeyboardView';
import { LoginForm } from './LoginForm';

export function Login() {
    const userDatabase = useUserDatabase();
    const navigation = useNavigation();
    return (
        <DismissKeiboardview >
            <View style={styles.container}>
                <Text style={styles.title}>CPIX</Text>
                <Text style={styles.subTitle}>Deixa o PIX ainda mais prático</Text>
                <LoginForm />
            </View>
        </DismissKeiboardview>
    )
}