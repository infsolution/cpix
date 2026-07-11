import { FormEditProfileParams } from "@/shared/interfaces/user-interface";
import { UseFormClearErrors, UseFormSetError } from "react-hook-form";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useTranslation } from "react-i18next";
import { checkUserName } from "@/shared/services/c-pix/users.service";

interface SearchUserProps {
  term: string;
  clearErrors: UseFormClearErrors<FormEditProfileParams>;
  setError: UseFormSetError<FormEditProfileParams>;
}
export async function searchUser({
  term,
  clearErrors,
  setError,
}: SearchUserProps) {
  const { handleError } = useErrorHandler();
  const { t } = useTranslation();
  if (term.length < 3) {
    clearErrors("userName");
    return;
  }

  try {
    const { message, confirm } = await checkUserName(term);
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
