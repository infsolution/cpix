import { Form, useForm } from "react-hook-form";
import { styles } from "../styles";
import { View } from "react-native";
import { FormInput } from "@/components/FormInput";
import { FormButton } from "@/components/FormButton";
import { yupResolver } from "@hookform/resolvers/yup"
import { schema } from "./schema";
import { FormSigninParams } from "@/app/Type/interfaces";
import { useUserDatabase } from '@/database/useUserDatabase';
import { useAuthContext } from "@/context/auth.context";


export const SigninForm = () => {
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
            console.log("Creating user", data);
            const user = await userDatabase.create(data);
            setUser(user);
        } catch (error) {
            console.log("Error creating user", error);

        }
    }

    return (
        <View style={styles.container}>
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

            <FormButton onPress={handleSubmit(onSubmit)} inProgress={isSubmitting}>Cadastrar</FormButton>
        </View>
    )
}