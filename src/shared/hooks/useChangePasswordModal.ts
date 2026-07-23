import { useModalStore } from "../store/modal-store";
import { createElement } from "react";
import { FormChangePasswordModals } from "@/components/Modals/FormChangePasswordModals";

export const useChangePasswordModal = () => {
  const { open, close } = useModalStore();

  const showForm = () => {
    open(createElement(FormChangePasswordModals, { close } as any));
  };
  return { showForm };
};
