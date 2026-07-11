import { View, Text } from "react-native";
import { styles } from "./styles";
import { FormInput } from "../FormInput";
import { FormButton } from "../FormButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { FormResetPasswordParams } from "@/app/Type/interfaces";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Input } from "../Input";
import { Loading } from "../Loading";
import {
  checkPassword,
  updatePassword,
} from "@/shared/services/c-pix/users.service";
import { AppError } from "@/shared/helpers/AppError";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackbarContext } from "@/context/snackbar.context";

export interface ResetPasswordFormProps {
  close: () => void;
}
export const ResetPasswordForm = ({ close }: ResetPasswordFormProps) => {
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { handleError } = useErrorHandler();
  const { notify } = useSnackbarContext();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormResetPasswordParams>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });
  const { t } = useTranslation();

  const handleConfirmPassword = async () => {
    setIsLoading(true);
    try {
      if (oldPassword.length === 0) {
        setPasswordError(t("forms.mandatoryPassword"));
        return;
      }
      const { message, code, confirm } = await checkPassword(oldPassword);
      if (code != "200") {
        throw new AppError(message);
      }
      if (confirm) {
        setConfirmed(true);
      } else {
        setPasswordError(t("forms.invalidPassword"));
      }
    } catch (error) {
      handleError(error, t("error.checkingPassword"));
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = async (formData: FormResetPasswordParams) => {
    setIsLoading(true);
    try {
      const { message, code, confirm } = await updatePassword(
        oldPassword,
        formData,
      );
      if (code != "200") {
        throw new AppError(message);
      }
      notify({
        message: t("success.passwordUpdated"),
        messageType: "SUCCESS",
      });
    } catch (error) {
      handleError(error, t("error.updatingPassword"));
    } finally {
      setIsLoading(false);
      close();
    }
  };
  return (
    <View style={styles.formContainer}>
      <Text>{t("forms.changePassword")}</Text>
      {isLoading && <Loading />}
      {confirmed ? (
        <>
          {!isLoading && (
            <>
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

              <FormButton mode="fill" onPress={handleSubmit(onSubmit)}>
                {t("forms.login")}
              </FormButton>
            </>
          )}
        </>
      ) : (
        !isLoading && (
          <>
            <Input
              term={oldPassword}
              setTerm={setOldPassword}
              placeholder={t("forms.oldPassword")}
              secureTextEntry
              error={passwordError}
            />
            <FormButton mode="fill" onPress={handleConfirmPassword}>
              {t("forms.login")}
            </FormButton>
          </>
        )
      )}
    </View>
  );
};
