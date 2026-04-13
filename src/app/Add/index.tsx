import { Text, View, Image } from 'react-native';
import { styles } from "./styles";
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { AppBar } from '@/components/AppBar';
import { StackRouterProps } from '@/routes/StackRoutes';

export function Add() {

    return (
            <View style={styles.container}>
                <Text style={styles.title}>Adicionar nova chave PIX</Text>
                <View style={styles.formContainer}>
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Nome</Text>
                        <Input placeholder='Nome' />
                    </View>
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Banco</Text>
                        <Input placeholder='Banco' />
                    </View>
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Chave</Text>
                        <Input placeholder='Chave' />
                    </View>


                    <View style={styles.formControl}>
                        <Text style={styles.label}>Conta publica</Text>
                    </View>
                    <Button title='Salvar'></Button>
                </View>
            </View>
    )
}