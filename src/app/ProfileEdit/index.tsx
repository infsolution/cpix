import { Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme/colors";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/auth.context";
import { Header } from "@/components/Header";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { FormInput } from "@/components/FormInput";
import Checkbox from "expo-checkbox";
import { ErrorMessage } from "@/components/ErrorMessage";
import { FormButton } from "@/components/FormButton";
import {
  checkUserName,
  updateUser,
} from "@/shared/services/c-pix/users.service";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";
import { AppError } from "@/shared/helpers/AppError";
import { FormEditProfileParams } from "@/shared/interfaces/user-interface";
import { useUserDatabase } from "@/database/useUserDatabase";
import { DismissKeiboardview } from "@/components/DismissKeyboardView";
import { ProfileImage } from "@/components/ProfileImage";
import { useTranslation } from "react-i18next";
import { useChangePasswordModal } from "@/shared/hooks/useChangePasswordModal";
import { FormInputSearch } from "@/components/FormInputSearch";
import { searchUser } from "@/utils/user";
export function ProfileEdit() {
  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();
  const { user, setUser } = useAuthContext();
  const userDatabase = useUserDatabase();
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    clearErrors,
    setError,
  } = useForm<FormEditProfileParams>({
    defaultValues: {
      id: "",
      name: "",
      userName: "",
      email: "",
      termChecked: false,
    },
    resolver: yupResolver(schema),
  });
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const onSubmit = async (userData: FormEditProfileParams) => {
    try {
      const { message, code, data } = await updateUser(userData);
      console.log("DATA=> ", data);
      console.log("USER DATA=> ", userData);
      if (code != "200") {
        throw new AppError(message);
      }
      userDatabase.updateUser(userData);
      setUser(data);
      notify({
        message: "Perfil atualizado com sucesso!",
        messageType: "SUCCESS",
      });
    } catch (error) {
      handleError(error, "Erro ao atualizar o perfil.");
    }
  };
  const getUserValues = async () => {
    setValue("id", user?.id ? String(user.id) : "");
    setValue("name", user?.name ?? "");
    setValue("email", user?.email ?? "");
    setValue("userName", user?.user_name ?? "");
    setValue("termChecked", user?.is_public ?? false);
  };

  const { showForm } = useChangePasswordModal();

  const handleChangePassword = async () => {
    showForm();
  };

  useEffect(() => {
    getUserValues();
  }, [user]);

  async function searchUser(term: string) {
    if (term.length < 3) {
      clearErrors("userName");
      return;
    }

    try {
      const { message, confirm } = await checkUserName(term, user?.id);
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
    <DismissKeiboardview>
      <Header />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t("forms.editProfile")}</Text>
        <TouchableOpacity
          style={styles.changePassword}
          activeOpacity={0.8}
          onPress={handleChangePassword}
        >
          <Text style={{ color: colors.white }}>
            {t("forms.changePassword")}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        <Text>{t("forms.changeImage")}</Text>
        <ProfileImage
          path={user?.image ?? ""}
          avatarUri={avatarUri}
          setAvatarUri={setAvatarUri}
        />

        <FormInput
          control={control}
          name="name"
          label="Nome"
          placeholder="Nome"
          value={user?.name}
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
          label="Email"
          placeholder="Email"
          value={user?.email}
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
                <Text>Compartilhar com conexões</Text>
              </View>
              {error && <ErrorMessage>{error.message}</ErrorMessage>}
            </View>
          )}
        />

        <FormButton onPress={handleSubmit(onSubmit)} inProgress={isSubmitting}>
          Salvar
        </FormButton>
      </View>
    </DismissKeiboardview>
  );
}
