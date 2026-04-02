import { Text, View, Linking } from 'react-native';
import { styles } from "./styles";
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export function Login() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>CPIX</Text>
            <Text style={styles.subTitle}>Deixa o PIX ainda mais prático</Text>
            <View style={styles.formContainer}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Email</Text>
                    <Input placeholder='Email' />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Senha</Text>
                    <Input placeholder='**********' secureTextEntry={true} />
                </View>
                <Button title='Entrar'></Button>

            </View>
        </View>
    )
}