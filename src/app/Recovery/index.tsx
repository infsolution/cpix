import { Text, View } from "react-native";
import { styles } from "./styles";
import { DismissKeiboardview } from "@/components/DismissKeyboardView";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { CleanHeader } from "@/components/CleanHeader";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { FormRecoveryParams } from "../Type/interfaces";
import { useTranslation } from "react-i18next";
import { FormInput } from "@/components/FormInput";
import { FormButton } from "@/components/FormButton";
import { useState } from "react";
import { recoveryPassword } from "@/shared/services/c-pix/users.service";
import { AppError } from "@/shared/helpers/AppError";
import { useSnackbarContext } from "@/context/snackbar.context";
export function Recovery() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { handleError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState(false);
  const { notify } = useSnackbarContext();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormRecoveryParams>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (dataRecovery: FormRecoveryParams) => {
    setIsLoading(true);
    try {
      const { message, code, data } = await recoveryPassword(
        dataRecovery.email,
      );
      if (code != "200") {
        throw new AppError(t("error.recoveringPassword"));
      }
      notify({
        message: t("success.recoverySended") + `'${data.email}'`,
        messageType: "SUCCESS",
      });
      navigation.navigate("login");
    } catch (error) {
      handleError(error, t("error.recovery"));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <DismissKeiboardview>
      <View style={styles.container}>
        <CleanHeader />
        <Text style={styles.title}>{t("forms.recoveryTitle")}</Text>
        <Text style={styles.subTitle}>{t("forms.recoverySubTitle")}</Text>
        <View style={styles.formContainer}>
          <FormInput
            control={control}
            name="email"
            label={t("forms.email")}
            placeholder={t("forms.email")}
          />
          <FormButton
            mode="fill"
            onPress={handleSubmit(onSubmit)}
            inProgress={isLoading}
          >
            {t("forms.login")}
          </FormButton>
        </View>
      </View>
    </DismissKeiboardview>
  );
}
