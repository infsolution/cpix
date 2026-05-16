import { useForm } from "react-hook-form";
import { useState } from "react";
import { Text, View, Linking, TouchableOpacity, Alert } from 'react-native';
import { styles } from "./styles";
import { FormInput } from "@/components/FormInput";
import { FormButton } from "@/components/FormButton";
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "./schema";
import { FormLoginParams } from "@/app/Type/interfaces";
import { useUserDatabase } from '@/database/useUserDatabase';
import { useAuthContext } from "@/context/auth.context";
import { setStorageUser } from "@/shared/storage/service/user";

export const LoginForm = () => {
    const navigation = useNavigation();
    const userDatabase = useUserDatabase();
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<FormLoginParams>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: yupResolver(schema)
    });
    const { setUser } = useAuthContext();
    const onSubmit = async (data: FormLoginParams) => {
        try {
            const response = await userDatabase.login(data);
            if (response) {
                setUser(response);
                await setStorageUser("userLoged", response);
            }
            navigation.navigate("home")
        } catch (error) {
            console.log("Error login user", error);
        }
    }

    return (
        <View style={styles.formContainer}>
            <FormInput control={control} name="email" label="Email" placeholder="Email" />
            <FormInput control={control} name="password" label="Senha" placeholder="Senha" secureTextEntry />

            <FormButton mode="fill" onPress={handleSubmit(onSubmit)}>Entrar</FormButton>

            <TouchableOpacity style={styles.forgotContainer} activeOpacity={0.8} onPress={() => console.log("forgot password")}>
                <Text style={styles.forgot}>Esqueci minha senha</Text>
            </TouchableOpacity>
            <Text >É novo por aqui? <Text style={styles.linkSignin} onPress={() => navigation.navigate("signIn")}>Cadastre-se</Text></Text>

        </View>

    )
}