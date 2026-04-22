import { Text, View, Image, Alert } from 'react-native';
import { styles } from "./styles";
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Checkbox } from "expo-checkbox";
import { useState } from 'react';
import { InputPassword } from '@/components/InputPassword';
import { useNavigation } from '@react-navigation/native';
import { useUserDatabase } from '@/database/useUserDatabase';

export function SignIn() {
    const navigation = useNavigation();
    const [termChecked, SetTermeChecked] = useState(false);
    const [activeSecureTextEntry, setActiveSecureTextEntry] = useState(true);
    const [activeSecureTextEntryConfirm, setActiveSecureTextEntryConfiorm] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [name, SetName] = useState('');
    const [email, SetEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [confirmPassword, SetConfirmPassword] = useState('');

    const userDatabase = useUserDatabase();

    function handleSignIn() {

        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Atenção", "Preencha todos os campos");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Atenção", "As senhas não coincidem");
            return;
        }
        if (!termChecked) {
            Alert.alert("Atenção", "Você deve concordar com os termos e condições");
            return;
        }

        setIsProcessing(true);
        create();
    }

    async function create() {
        try {
            await userDatabase.create({
                name,
                email,
                password,
                confirmPassword,
                termChecked
            });
            Alert.alert("Sucesso", "Conta criada com sucesso", [{ text: " OK", onPress: () => navigation.navigate("login") }]);
            setIsProcessing(false);

        } catch (error) {
            Alert.alert("Error", "Algo deu errado");
            setIsProcessing(false);
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require("@/assets/profile.png")} style={styles.image} />
            <View style={styles.formContainer}>
                <View style={styles.formControl}>
                    <Text>Conta pública</Text>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Nome</Text>
                    <Input placeholder='Nome' onChangeText={SetName} value={name} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Email</Text>
                    <Input placeholder='Email' onChangeText={SetEmail} value={email} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Senha</Text>
                    <InputPassword activeSecureTextEntry={activeSecureTextEntry} setActiveSecureTextEntry={setActiveSecureTextEntry} onChangeText={SetPassword} value={password} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Confirme a Senha</Text>
                    <InputPassword activeSecureTextEntry={activeSecureTextEntryConfirm} setActiveSecureTextEntry={setActiveSecureTextEntryConfiorm} onChangeText={SetConfirmPassword} value={confirmPassword} />
                </View>
                <View style={styles.termContainer}>
                    <Checkbox color="#AED9DA" style={styles.checkbox} onValueChange={() => SetTermeChecked(!termChecked)} value={termChecked} />
                    <Text>Concordo com os termos e condições</Text>
                </View>
                <Button title='Cadastrar' onPress={() => handleSignIn()} inProgress={isProcessing}></Button>
                <Text style={styles.toLogin}>Já tem uma conta? <Text style={styles.linkLogin} onPress={() => navigation.navigate("login")}>Entrar</Text></Text>
            </View>
        </View>
    )
}