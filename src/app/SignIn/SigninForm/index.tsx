import { Controller, useForm } from "react-hook-form";
import { styles } from "../styles";
import { View, Text } from "react-native";
import { FormInput } from "@/components/FormInput";
import { FormButton } from "@/components/FormButton";
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "./schema";
import { FormSigninParams } from "@/app/Type/interfaces";
import { useUserDatabase } from '@/database/useUserDatabase';
import { useAuthContext } from "@/context/auth.context";
import Checkbox from "expo-checkbox";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useNavigation } from '@react-navigation/native';


export const SigninForm = () => {
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<FormSigninParams>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            termChecked: false
        },
        resolver: yupResolver(schema)
    });
    const userDatabase = useUserDatabase();
    const { setUser } = useAuthContext();

    const onSubmit = async (data: FormSigninParams) => {
        try {
            const user = await userDatabase.create(data);
            setUser(user);
            navigation.navigate("home")
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
