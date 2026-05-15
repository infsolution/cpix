
import { styles } from "./styles";
import { Text, View, Linking, TouchableOpacity, Alert } from 'react-native';
import { DismissKeiboardview } from '@/components/DismissKeyboardView';
import { SigninForm } from './SigninForm';

export function SignIn() {
    return (
        <DismissKeiboardview >
            <View style={styles.container}>
                <Text style={styles.title}>CPIX</Text>
                <Text style={styles.subTitle}>Deixa o PIX ainda mais prático</Text>
                <SigninForm />
            </View>
        </DismissKeiboardview>
    )
}

{/* <View style={styles.container}>
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
</View> */}