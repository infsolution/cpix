import { Text, View, Image } from 'react-native';
import { styles } from "./styles";
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { AppBar } from '@/components/AppBar';

export function Profile() {
    return (
        <View style={styles.formContainer}>
            <View style={styles.formControl}>
                <Image source={require("@/assets/profile.png")} />
            </View>
            <View style={styles.formControl}>
                <Text>Configurações</Text>
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
                <Input placeholder='**********' secureTextEntry={true} />
            </View>

            <View style={styles.formControl}>
                <Text style={styles.label}>Conta publica</Text>
            </View>
            <Button title='Salvar'></Button>
        </View>
    )
}