import { useUserDatabase } from "@/database/useUserDatabase";
import { FormSigninParams } from "@/app/Type/interfaces";
import { ErrorMessage } from "@/components/ErrorMessage";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "@/context/auth.context";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { FormButton } from "@/components/FormButton";
import { FormInput } from "@/components/FormInput";
import { View, Text } from "react-native";
import * as Crypto from "expo-crypto";
import Checkbox from "expo-checkbox";
import { styles } from "../styles";
import { schema } from "./schema";
import { useTranslation } from "react-i18next";
import { FormInputSearch } from "@/components/FormInputSearch";
import { checkUserName } from "@/shared/services/c-pix/users.service";
import { AppError } from "@/shared/helpers/AppError";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";

export const SigninForm = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
    clearErrors,
  } = useForm<FormSigninParams>({
    defaultValues: {
      name: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      termChecked: false,
    },
    resolver: yupResolver(schema),
  });
  const userDatabase = useUserDatabase();
  const { handleSignin, setUser } = useAuthContext();
  const { handleError } = useErrorHandler();
  const onSubmit = async (data: FormSigninParams) => {
    try {
      const uuid = Crypto.randomUUID();
      data.uuid = uuid;
      const newUser = await handleSignin(data);

      if (newUser) {
        const localUser = {
          name: data.name,
          user_name: data.userName,
          email: data.email,
          universal_uuid: data.uuid,
          termChecked: data.termChecked,
        };
        await userDatabase.create(localUser);
        setUser(newUser);
      } else {
        throw new AppError(t("error.createUser"));
      }
    } catch (error) {
      handleError(error, t("error.upload"));
    }
  };

  async function searchUser(term: string) {
    if (term.length < 3) {
      clearErrors("userName");
      return;
    }

    try {
      const queryString = `?user_name=${term}`;
      const { message, confirm } = await checkUserName(queryString);
      if (!confirm) {
        setError("userName", {
          type: "manual",
          message: t("error.userNameAlreadyExists"),
        });
      } else {
        clearErrors("userName");
      }
    } catch (error) {
      handleError(error, t("error.searchUserName"));
    }
  }

  return (
    <View style={styles.formContainer}>
      <FormInput
        control={control}
        name="name"
        label={t("forms.name")}
        placeholder={t("forms.name")}
      />
      <FormInputSearch
        control={control}
        name="userName"
        label={t("forms.userName")}
        placeholder={t("forms.userNamePlaceholder")}
        onSearch={searchUser}
      />
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
      <FormInput
        control={control}
        name="confirmPassword"
        label={t("forms.confirmPassword")}
        placeholder={t("forms.confirmPassword")}
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
              <Text>{t("forms.confirmTerm")}</Text>
            </View>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </View>
        )}
      />

      <FormButton onPress={handleSubmit(onSubmit)} inProgress={isSubmitting}>
        {t("forms.toSignUp")}
      </FormButton>
      <Text>
        {t("forms.haveAnAccount")}{" "}
        <Text
          style={styles.linkLogin}
          onPress={() => navigation.navigate("login")}
        >
          {t("forms.login")}
        </Text>
      </Text>
    </View>
  );
};
