import { Ionicons } from "@expo/vector-icons";
import { useModalStore } from "../store/modal-store";
import { createElement } from "react";
import {
  SelectionModal,
  SelectionModalProps,
} from "@/components/Modals/SelectionModals";

export interface SelectionOptions {
  text: string;
  onPres: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  variant: "primary" | "secondary" | "danger";
}

export const useAppModal = () => {
  const { open, close } = useModalStore();
  const showSelection = ({
    options,
    title,
    message,
  }: {
    title: string;
    message: string;
    options: SelectionOptions[];
  }) => {
    open(
      createElement(SelectionModal, {
        options,
        title,
        message,
      } as SelectionModalProps),
    );
  };
  return { showSelection };
};
