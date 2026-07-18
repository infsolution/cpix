import { useSnackbarContext } from "@/context/snackbar.context";

type UseNotifyProp = {
  message: string;
  type: "ERROR" | "SUCCESS";
};
export const useNotify = ({ message, type }: UseNotifyProp) => {
  const { notify } = useSnackbarContext();
  return notify({
    message: message,
    messageType: type,
  });
};
