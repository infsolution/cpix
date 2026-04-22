import { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { styles } from "./styles";
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { AppBar } from '@/components/AppBar';
import { StackRouterProps } from '@/routes/StackRoutes';
import { TabGoBack } from '@/components/TabGoBack';
import { Switch } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { colors } from '@/theme/colors';
import { usePixDatabase } from '@/database/usePixDatabase';
import dayjs from "dayjs"
import { Loading } from '@/components/Loading';
import { KeyUpdate } from '../Type/types';

export function Edit({ route }: StackRouterProps<"edit">) {
    const pixDatabase = usePixDatabase();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [is_public, setChecked] = useState(false);
    const toggleSwitch = () => setChecked(!is_public);
    const [editable, setEditable] = useState(false);
    const [name, setName] = useState('');
    const [bank, setBank] = useState('');
    const [key, setKey] = useState('');
    const [createdAt, setCreatedAt] = useState('');

    async function fetchKey() {
        try {
            const response = await pixDatabase.getKey(route.params.id);
            if (!response) {
                Alert.alert("Atenção", "Não encontramos essa chave.", [{ text: "Voltar para Home", onPress: () => navigation.navigate("home") }]);
            }
            if (response) {
                setIsFetching(false);
                setName(response.name);
                setBank(response.bank);
                setKey(response.key);
                setChecked(response.is_public);
                setCreatedAt(response.created_at);
            }
            console.log("Response", response);
        } catch (error) {
            Alert.alert("Error", "Error fetching keys");
            console.error("Error fetching keys:", error);
        }
    }

    function handleUpdate() {
        setEditable(false)
        setIsProcessing(true)
        update();
    }

    async function update() {
        try {
            pixDatabase.updateKey({
                id: route.params.id,
                name,
                key,
                bank,
                is_public
            })
            Alert.alert("Sucesso", "Chave atualizada com sucesso");
            setIsProcessing(false);

        } catch (error) {
            Alert.alert("Erro", "Erro ao tentar atualizar a chave!");
            setIsProcessing(false);
        }
    }

    useEffect(() => {
        fetchKey();
    }, []);

    if (isFetching) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <TabGoBack />
            {
                !editable && (
                    <View style={styles.readyOnlyContainer}>
                        <Text>Chave salva(#add info)º</Text>
                        <View style={styles.readOnlyTitleConteiner}>
                            <Text style={styles.readyOnlyTitle}>{name}</Text>
                            <TouchableOpacity onPress={() => setEditable(true)}>
                                <Feather name="edit-2" size={20} color="black" />
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize: 10 }}>Chave cadstrada em {dayjs(createdAt).format("DD/MM/YYYY")}</Text>

                        <Text style={styles.readyOnlyText}>{bank}</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => { Alert.alert("Chave copiada!", "Cole no app do seu banco") }}>
                            <Text style={styles.readyOnlyTextkey}>{key}</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            {editable && (<View style={styles.formContainer}>
                <Text style={styles.title}>Editar chave PIX</Text>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Nome</Text>
                    <Input placeholder='Nome' editable={editable} value={name} onChangeText={setName} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Banco</Text>
                    <Input placeholder='Banco' editable={editable} value={bank} onChangeText={setBank} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Chave</Text>

                    <Input placeholder='Chave' editable={editable} value={key} onChangeText={setKey} />
                </View>


                <View style={styles.formControlPublic}>
                    <Switch
                        trackColor={{ false: colors.switch.backOff, true: colors.switch.backOff }}
                        thumbColor={is_public ? colors.switch.btnOn : colors.switch.btnOff}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={is_public}
                    />
                    <Text>Pública</Text>
                </View>
                <Button title='Salvar' onPress={handleUpdate} inProgress={isProcessing}></Button>
            </View>)}
        </View>
    )
}