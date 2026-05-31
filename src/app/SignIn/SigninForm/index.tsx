import { useUserDatabase } from '@/database/useUserDatabase';
import { FormSigninParams } from "@/app/Type/interfaces";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from "@/context/auth.context";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { FormButton } from "@/components/FormButton";
import { FormInput } from "@/components/FormInput";
import { View, Text } from "react-native";
import * as Crypto from 'expo-crypto';
import Checkbox from "expo-checkbox";
import { styles } from "../styles";
import { schema } from "./schema";

export const SigninForm = () => {
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<FormSigninParams>({
        defaultValues: {
            name: "",
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            termChecked: false
        },
        resolver: yupResolver(schema)
    });
    const userDatabase = useUserDatabase();
    const { handleSignin } = useAuthContext();

    const onSubmit = async (data: FormSigninParams) => {
        try {
            const uuid = Crypto.randomUUID();
            data.uuid = uuid;
            const code = await handleSignin(data);

            if(code == "201"){
                const localUser = {
                    name: data.name,
                    user_name: data.userName,
                    email: data.email,
                    universal_uuid: data.uuid,
                    termChecked: data.termChecked,
                }
                await userDatabase.create(localUser);

            }else{
                throw new Error("Error to saving new user");
            }

        } catch (error) {
            console.log("Error creating user", error);

        }
    }

    return (
        <View style={styles.formContainer}>
            <FormInput
                control={control}
                name="name"
                label="Nome"
                placeholder="Nome"
            />
            <FormInput
                control={control}
                name="userName"
                label="Nome de Usuário"
                placeholder="@username"
            />
            <FormInput
                control={control}
                name="email"
                label="Email"
                placeholder="Email"
            />
            <FormInput
                control={control}
                name="password"
                label="Senha"
                placeholder="Senha"
                secureTextEntry
            />
            <FormInput
                control={control}
                name="confirmPassword"
                label="Confirmar Senha"
                placeholder="Confirmar Senha"
                secureTextEntry
            />

            <Controller
                control={control}
                name="termChecked"
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <View style={styles.formControl}>
                        <View style={styles.termContainer}>
                            <Checkbox
                                color="#AED9DA"
                                style={styles.checkbox}
                                onValueChange={onChange}
                                value={value}
                            />
                            <Text>Concordo com os termos e condições</Text>
                        </View>
                        {error && <ErrorMessage>{error.message}</ErrorMessage>}
                    </View>
                )}
            />

            <FormButton onPress={handleSubmit(onSubmit)} inProgress={isSubmitting}>Cadastrar</FormButton>
            <Text >Já tem conta? <Text style={styles.linkLogin} onPress={() => navigation.navigate("login")}>Fazer Login</Text></Text>
        </View>
    )
}
