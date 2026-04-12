import { Text, View, Image } from 'react-native';
import { styles } from "./styles";
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Checkbox } from "expo-checkbox";
import { useState } from 'react';
import { InputPassword } from '@/components/InputPassword';

export function SignIn() {
    const [termChecked, SetTermeChecked] = useState(false);
    const [activeSecureTextEntry, setActiveSecureTextEntry] = useState(true);
    const [activeSecureTextEntryConfirm, setActiveSecureTextEntryConfiorm] = useState(true);
    return (
        <View style={styles.container}>
            <Image source={require("@/assets/profile.png")} />
            <View style={styles.formContainer}>
                <View style={styles.formControl}>
                    <Text>Conta pública</Text>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Nome</Text>
                    <Input placeholder='Nome' />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Email</Text>
                    <Input placeholder='Email' />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Senha</Text>
                    <InputPassword activeSecureTextEntry={activeSecureTextEntry} setActiveSecureTextEntry={setActiveSecureTextEntry} />

                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Confirme a Senha</Text>
                    <InputPassword activeSecureTextEntry={activeSecureTextEntryConfirm} setActiveSecureTextEntry={setActiveSecureTextEntryConfiorm} />
                </View>
                <View style={styles.termContainer}>
                    <Checkbox color="#AED9DA" style={styles.checkbox} onValueChange={() => SetTermeChecked(!termChecked)} value={termChecked} />
                    <Text>Concordo com os termos e condições</Text>
                </View>
                <Button title='Cadastrar'></Button>
            </View>
        </View>
    )
}