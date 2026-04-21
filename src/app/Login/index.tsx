import { Text, View, Linking, TouchableOpacity, Alert } from 'react-native';
import { styles } from "./styles";
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useState, useEffect } from 'react';
import { InputPassword } from '@/components/InputPassword';
import { useNavigation } from '@react-navigation/native';
import { usePixDatabase } from '@/database/usePixDatabase';
import { Loading } from '@/components/Loading';

export function Login() {
    const pixDatabase = usePixDatabase();
    const navigation = useNavigation();
    const [activeSecureTextEntry, setActiveSecureTextEntry] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [isLoged, setIsloged] = useState(false);


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
                email: email.trim(),
                password: password.trim()
            });
            if (!response) {
                Alert.alert("Error", "Email ou senha incorretos");
                setIsProcessing(false);
                return;
            }

            setIsProcessing(false);

            setIsloged(true);
            navigation.navigate("home")


        } catch (error) {
            Alert.alert("Error", "Erro de validação dos dados");
            setIsProcessing(false);
        }
    }

    useEffect(() => {
        if (isLoged) {
            navigation.navigate("home");
        } else {
            setIsLoading(false);
        }
    }, [])

    if (isLoading) {
        return <Loading />
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