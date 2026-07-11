import { ImagePickerOptions } from "expo-image-picker";
import { useAppModal } from "@/shared/hooks/useAppModal";
import { useCamera } from "@/shared/hooks/useCamera";
import { useGallery } from "@/shared/hooks/useGallery";
import { useModalStore } from "../store/modal-store";

interface UseImageParams extends ImagePickerOptions {
  callback: (uri: string | null) => void;
}
export const useImage = ({ callback, ...pickerOptions }: UseImageParams) => {
  const modals = useAppModal();
  const { openCamera, isLoading: cameraLoading } = useCamera(pickerOptions);
  const { openGallery, isLoading: galleryLoading } = useGallery(pickerOptions);
  const loading = Boolean(cameraLoading || galleryLoading);

  const { close } = useModalStore();

  const handleCallback = (uri: string | null) => {
    close();
    callback(uri);
  };

  const handleSelectImage = () => {
    modals.showSelection({
      title: "Selecione uma foto",
      message: "Escolha uma opção:",
      options: [
        {
          text: "Galeria",
          icon: "images",
          variant: "primary",
          onPres: async () => {
            const imageUri = await openGallery();
            handleCallback(imageUri);
          },
        },
        {
          text: "Câmera",
          icon: "camera",
          variant: "primary",
          onPres: async () => {
            const imageUri = await openCamera();
            handleCallback(imageUri);
          },
        },
      ],
    });
  };

  return {
    handleSelectImage,
    loading,
  };
};
