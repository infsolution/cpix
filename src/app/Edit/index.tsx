import { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { styles } from "./styles";
import { StackRouterProps } from '@/routes/StackRoutes';
import { TabGoBack } from '@/components/TabGoBack';
import Feather from '@expo/vector-icons/Feather';

import { usePixDatabase } from '@/database/usePixDatabase';
import dayjs from "dayjs"
import { Loading } from '@/components/Loading';

import { DismissKeiboardview } from '@/components/DismissKeyboardView';
import { AddForm } from '../AddForm';

export function Edit({ route }: StackRouterProps<"edit">) {
    const pixDatabase = usePixDatabase();
    const [isFetching, setIsFetching] = useState(true);
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
                setCreatedAt(response.created_at);
            }
            console.log("Response", response);
        } catch (error) {
            Alert.alert("Error", "Error fetching keys");
            console.error("Error fetching keys:", error);
        }
    }



    useEffect(() => {
        fetchKey();
    }, [route.params.id]);

    if (isFetching) {
        return <Loading />
    }

    return (
        <DismissKeiboardview>
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
                {editable && (
                    <>
                        <Text style={styles.title}>Editar chave PIX</Text>
                        <AddForm id={route.params.id} />
                    </>

                )}
            </View>
        </DismissKeiboardview>
    )
}