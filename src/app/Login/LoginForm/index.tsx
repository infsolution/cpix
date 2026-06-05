import { set, useForm } from "react-hook-form";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { FormInput } from "@/components/FormInput";
import { FormButton } from "@/components/FormButton";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { FormLoginParams } from "@/app/Type/interfaces";
import { useUserDatabase } from "@/database/useUserDatabase";
import { useAuthContext } from "@/context/auth.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

export const LoginForm = () => {
  const navigation = useNavigation();
  const userDatabase = useUserDatabase();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormLoginParams>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const { user, setUser, handleLogin } = useAuthContext();
  const { handleError } = useErrorHandler();
  const onSubmit = async (data: FormLoginParams) => {
    try {
      const loggedUser = await handleLogin(data);
      if (loggedUser?.universal_uuid) {
        const localUser = await userDatabase.getUserByUuid(
          loggedUser.universal_uuid,
        );
        console.log("Local user:", localUser);
        if (!localUser) {
          const newUser = {
            name: loggedUser.name,
            user_name: loggedUser.user_name,
            email: loggedUser.email,
            universal_uuid: loggedUser.universal_uuid,
            termChecked: loggedUser.is_public,
          };
          await userDatabase.create(newUser);
        }
        setUser(loggedUser);
      }
    } catch (error) {
      handleError(error, "Falha ao fazer login");
    }
  };

  return (
    <View style={styles.formContainer}>
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

      <FormButton mode="fill" onPress={handleSubmit(onSubmit)}>
        Entrar
      </FormButton>

      <TouchableOpacity
        style={styles.forgotContainer}
        activeOpacity={0.8}
        onPress={() => console.log("forgot password")}
      >
        <Text style={styles.forgot}>Esqueci minha senha</Text>
      </TouchableOpacity>
      <Text>
        É novo por aqui?{" "}
        <Text
          style={styles.linkSignin}
          onPress={() => navigation.navigate("signIn")}
        >
          Cadastre-se
        </Text>
      </Text>
    </View>
  );
};
