import { Text, View, Linking, TouchableOpacity } from 'react-native';
import { styles } from "./styles";
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useState } from 'react';
import { InputPassword } from '@/components/InputPassword';
import { useNavigation } from '@react-navigation/native';
import { TabGoBack } from '@/components/TabGoBack';

export function Login() {
    const navigation = useNavigation();
    const [activeSecureTextEntry, setActiveSecureTextEntry] = useState(true);
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
                    <InputPassword activeSecureTextEntry={activeSecureTextEntry} setActiveSecureTextEntry={setActiveSecureTextEntry} />
                </View>
                <Button title='Entrar' onPress={() => navigation.navigate("home")}></Button>

                <TouchableOpacity style={styles.forgotContainer} activeOpacity={0.8} onPress={() => console.log("forgot password")}>
                    <Text style={styles.forgot}>Esqueci minha senha</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}