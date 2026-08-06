import { useForm } from "react-hook-form";
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
import { useTranslation } from "react-i18next";
import { useState } from "react";
export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
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
      player_id: "",
    },
    resolver: yupResolver(schema),
  });
  const { user, setUser, handleLogin } = useAuthContext();
  const { handleError } = useErrorHandler();
  const { t } = useTranslation();
  const onSubmit = async (data: FormLoginParams) => {
    setIsLoading(true);
    try {
      const loggedUser = await handleLogin(data);
      if (loggedUser?.universal_uuid) {
        const localUser = await userDatabase.getUserByUuid(
          loggedUser.universal_uuid,
        );
        if (!localUser) {
          const newUser = {
            name: loggedUser.name,
            user_name: loggedUser.user_name,
            email: loggedUser.email,
            universal_uuid: loggedUser.universal_uuid,
            termChecked: loggedUser.is_public,
            image: loggedUser.image,
          };
          await userDatabase.create(newUser);
        }
        setUser(loggedUser);
      }
    } catch (error) {
      handleError(error, "Falha ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <FormInput
        control={control}
        name="email"
        label={t("forms.email")}
        placeholder={t("forms.email")}
      />
      <FormInput
        control={control}
        name="password"
        label={t("forms.password")}
        placeholder={t("forms.password")}
        secureTextEntry
      />

      <FormButton
        mode="fill"
        onPress={handleSubmit(onSubmit)}
        inProgress={isLoading}
      >
        {t("forms.login")}
      </FormButton>

      <TouchableOpacity
        style={styles.forgotContainer}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("recovery")}
      >
        <Text style={styles.forgot}>{t("forms.forgotPassword")}</Text>
      </TouchableOpacity>
      <Text>
        {t("forms.itsNew")}{" "}
        <Text
          style={styles.linkSignin}
          onPress={() => navigation.navigate("signIn")}
        >
          {t("forms.signUp")}
        </Text>
      </Text>
    </View>
  );
};
