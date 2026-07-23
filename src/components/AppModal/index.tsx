import { useModalStore } from "@/shared/store/modal-store";
import { Modal, TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./styles";

export const AppModal = () => {
  const { isOpen, config, content, close } = useModalStore();

  if (!isOpen || !content) {
    return null;
  }
  return (
    <Modal
      visible={isOpen}
      animationType={config.animationType}
      transparent={config.transparent}
      statusBarTranslucent={config.statusBarTranslucent}
      onRequestClose={close}
    >
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => {}}>
            {content}
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
