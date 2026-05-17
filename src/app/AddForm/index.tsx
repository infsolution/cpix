import { usePixDatabase } from '@/database/usePixDatabase';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from "react-hook-form";
import { View, Alert, Text } from "react-native";
import { KeyCreate } from '../Type/types';
import { yupResolver } from "@hookform/resolvers/yup"
import { useAuthContext } from "@/context/auth.context";
import { schema } from './schema';
import { styles } from './styles';
import { FormInput } from '@/components/FormInput';
import { FormButton } from "@/components/FormButton";
import { useEffect } from 'react';
import { Checkbox } from 'expo-checkbox';
import { ErrorMessage } from '@/components/ErrorMessage';
type Params = {
    id?: string | undefined
    own?: number
}
export const AddForm = ({ id, own }: Params) => {
    const pixDatabase = usePixDatabase();
    const navigation = useNavigation();
    const { user } = useAuthContext();
    const { control, handleSubmit, formState: { isSubmitting }, setValue } = useForm<KeyCreate>({
        defaultValues: {
            id: id,
            user_id: user?.id || "",
            name: own === 1 ? user?.name || "" : "",
            bank: "",
            key: "",
            is_public: false,
            own: own
        },
        resolver: yupResolver(schema)
    });


    async function onSubmit(data: KeyCreate) {
        const message = id ? "Chave atualizada com sucesso" : "Chave adicionada com sucesso.";
        try {
            await pixDatabase.createOrUodate(data);
            Alert.alert("Sucesso", message, [{ text: " OK", onPress: () => navigation.navigate("home") }]);
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Erro ao tentar adicionar sua chave");
        }
    }

    async function fetchKey() {
        try {
            if (id) {
                const response = await pixDatabase.getKey(id);
                if (!response) {
                    Alert.alert("Atenção", "Não encontramos essa chave.", [{ text: "Voltar para Home", onPress: () => navigation.navigate("home") }]);
                } else {
                    setValue("name", response.name);
                    setValue("bank", response.bank);
                    setValue("key", response.key);
                    setValue("is_public", response.is_public);
                }
            }
        } catch (error) {
            Alert.alert("Error", "Error fetching keys");
            console.error("Error fetching keys:", error);
        }
    }

    useEffect(() => {
        if (id) {
            fetchKey();
        }
    }, [id])
    return (
        <View style={styles.formContainer}>
            <FormInput control={control} name="name" label="Nome" placeholder="Nome" editable={own === 0} />
            <FormInput control={control} name="bank" label="Banco" placeholder="Banco" />
            <FormInput control={control} name="key" label="Chave" placeholder="Chave" />
            {
                own === 1 && (
                    <Controller
                        control={control}
                        name="is_public"
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <View style={styles.formControl}>
                                <View style={styles.termContainer}>
                                    <Checkbox
                                        color="#AED9DA"
                                        style={styles.checkbox}
                                        onValueChange={onChange}
                                        value={value}
                                    />
                                    <Text>Compartilhar com suas conexões</Text>
                                </View>
                                {error && <ErrorMessage>{error.message}</ErrorMessage>}
                            </View>
                        )}
                    />
                )
            }
            <FormButton onPress={handleSubmit(onSubmit)} inProgress={isSubmitting} >
                {id ? "Atualizar Chave" : "Adicionar Chave"}
            </FormButton>
        </View>
    )
}