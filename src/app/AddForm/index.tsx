import { usePixDatabase } from '@/database/usePixDatabase';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from "react-hook-form";
import { View, Alert } from "react-native";
import { KeyCreate } from '../Type/types';
import { yupResolver } from "@hookform/resolvers/yup"
import { useAuthContext } from "@/context/auth.context";
import { schema } from './schema';
import { styles } from './styles';
import { FormInput } from '@/components/FormInput';
import { FormButton } from "@/components/FormButton";
export const AddForm = () => {
    const pixDatabase = usePixDatabase();
    const navigation = useNavigation();
    const { user } = useAuthContext();
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<KeyCreate>({
        defaultValues: {
            user_id: user?.id || "",
            name: "",
            bank: "",
            key: "",
            is_public: false
        },
        resolver: yupResolver(schema)
    });


    async function onSubmit(data: KeyCreate) {
        try {
            await pixDatabase.create(data);
            Alert.alert("Sucesso", "Chave adicionada com sucesso", [{ text: " OK", onPress: () => navigation.navigate("home") }]);

        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Erro ao tentar adicionar sua chave");
        }
    }
    return (
        <View style={styles.formContainer}>
            <FormInput control={control} name="name" label="Nome" placeholder="Nome" />
            <FormInput control={control} name="bank" label="Banco" placeholder="Banco" />
            <FormInput control={control} name="key" label="Chave" placeholder="Chave" />
            <FormButton onPress={handleSubmit(onSubmit)} inProgress={isSubmitting} >Adicionar</FormButton>
        </View>
    )
}