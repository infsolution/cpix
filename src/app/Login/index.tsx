import { Text, View, Linking, TouchableOpacity, Alert } from 'react-native';
import { styles } from "./styles";
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useUserDatabase } from '@/database/useUserDatabase';
import { Loading } from '@/components/Loading';
import { DismissKeiboardview } from '@/components/DismissKeyboardView';
import { LoginForm } from './LoginForm';

export function Login() {
    const userDatabase = useUserDatabase();
    const navigation = useNavigation();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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
            const response = await userDatabase.login({
                email: email.trim(),
                password: password.trim()
            });
            if (!response) {
                Alert.alert("Error", "Email ou senha incorretos");
                setIsProcessing(false);
                return;
            }

            setIsProcessing(false);


            // navigation.navigate("home")


        } catch (error) {
            Alert.alert("Error", "Erro de validação dos dados");
            setIsProcessing(false);
        }
    }

    // if (isLoading) {
    //     return <Loading />
    // }
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