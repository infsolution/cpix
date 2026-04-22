import { Text, View, Image, Switch, Alert } from 'react-native';
import { useState } from 'react';
import { styles } from "./styles";
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { TabGoBack } from '@/components/TabGoBack';
import { usePixDatabase } from '@/database/usePixDatabase';
import { colors } from '@/theme/colors';
import { useNavigation } from '@react-navigation/native';

export function Add() {
    const navigation = useNavigation();
    const pixDatabase = usePixDatabase();
    const [is_public, setChecked] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const toggleSwitch = () => setChecked(!is_public);
    const [name, setName] = useState('');
    const [bank, setBank] = useState('');
    const [key, setKey] = useState('');
    const user_id = "1";

    function handleCreate() {
        if (!name || !bank || !key) {
            Alert.alert("Atenção", "Preencha todos o campos");
            return;
        }
        setIsProcessing(true);
        add();
    }

    async function add() {
        try {
            await pixDatabase.create({
                user_id,
                name,
                bank,
                key,
                is_public
            });
            Alert.alert("Sucesso", "Chave adicionada com sucesso", [{ text: " OK", onPress: () => navigation.navigate("home") }]);
            setIsProcessing(false);
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Erro ao tentar adicionar sua chave");
            setIsProcessing(false);
        }
    }

    return (
        <View style={styles.container}>
            <TabGoBack />
            <Text style={styles.title}>Adicionar chave PIX</Text>
            <View style={styles.formContainer}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Nome</Text>
                    <Input placeholder='Nome' value={name} onChangeText={setName} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Banco</Text>
                    <Input placeholder='Banco' value={bank} onChangeText={setBank} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Chave</Text>
                    <Input placeholder='Chave' value={key} onChangeText={setKey} />
                </View>


                <View style={styles.formControlPublic}>
                    <Switch
                        trackColor={{ false: colors.switch.backOff, true: colors.switch.backOff }}
                        thumbColor={is_public ? colors.switch.btnOn : colors.switch.btnOff}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={is_public}
                    />
                    <Text>Compartilhar</Text>
                </View>


                <Button title='Adicionar' onPress={() => handleCreate()} inProgress={isProcessing} />
            </View>
        </View>
    )
}