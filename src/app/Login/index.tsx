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