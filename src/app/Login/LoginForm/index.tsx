import { useForm } from "react-hook-form";
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
    const { user, handleLogin } = useAuthContext();
    const onSubmit = async (data: FormLoginParams) => {
        try {
            await handleLogin(data)
            if(user?.universal_uuid){
                const localUser = await userDatabase.getUserByUuid(user.universal_uuid);
                if(!localUser){
                    const newUser = {
                    name: user.name,
                    user_name: user.user_name,
                    email: user.email,
                    universal_uuid: user.universal_uuid,
                    termChecked: user.is_public,
                }
                await userDatabase.create(newUser);
                }
            }
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