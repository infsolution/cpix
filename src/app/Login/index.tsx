import { Text, View, Linking, TouchableOpacity, Alert } from 'react-native';
import { styles } from "./styles";
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useState } from 'react';
import { InputPassword } from '@/components/InputPassword';
import { useNavigation } from '@react-navigation/native';
import { usePixDatabase } from '@/database/usePixDatabase';

export function Login() {
    const pixDatabase = usePixDatabase();
    const navigation = useNavigation();
    const [activeSecureTextEntry, setActiveSecureTextEntry] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');

    async function handleLogin() {
        if (!email || !password) {
            Alert.alert("Atenção", "Preencha email e senha");
            return;
        }
        setIsProcessing(true);

        login();
    }

    async function login() {
        try {
            const response = await pixDatabase.login({
                email,
                password
            });

            if (!response) {
                Alert.alert("Error", "Email ou senha incorretosssss");
                setIsProcessing(false);
                return;
            }

            setIsProcessing(false);

            console.log(response);
            navigation.navigate("home")


        } catch (error) {
            Alert.alert("Error", "Erro de validação dos dados");
            setIsProcessing(false);
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>CPIX</Text>
            <Text style={styles.subTitle}>Deixa o PIX ainda mais prático</Text>
            <View style={styles.formContainer}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Email</Text>
                    <Input placeholder='Email' value={email} onChangeText={SetEmail} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Senha</Text>
                    <InputPassword activeSecureTextEntry={activeSecureTextEntry} setActiveSecureTextEntry={setActiveSecureTextEntry} value={password} onChangeText={SetPassword} />
                </View>
                <Button title='Entrar' onPress={() => handleLogin()} inProgress={isProcessing}></Button>

                <TouchableOpacity style={styles.forgotContainer} activeOpacity={0.8} onPress={() => console.log("forgot password")}>
                    <Text style={styles.forgot}>Esqueci minha senha</Text>
                </TouchableOpacity>
                <Text >É novo por aqui? <Text style={styles.linkSignin} onPress={() => navigation.navigate("signIn")}>Cadastre-se</Text></Text>

            </View>
        </View>
    )
}