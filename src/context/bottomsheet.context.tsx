import React, {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { TouchableWithoutFeedback, View } from "react-native";
import { styles } from "./styles";
interface BottomSheetContextType {
  openBottomSheet: (content: React.ReactNode, index: number) => void;
  closeBottomSheet: () => void;
}

export const BottomSheetContext = createContext({} as BottomSheetContextType);

export const BottomSheetProvider: FC<PropsWithChildren> = ({ children }) => {
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const [index, setIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["70%", "90%"];
  const openBottomSheet = useCallback(
    (content: React.ReactNode, index: number) => {
      setIndex(index);
      setContent(content);
      setIsOpen(true);
      requestAnimationFrame(() => {
        bottomSheetRef.current?.snapToIndex(index);
      });
    },
    [],
  );

  const closeBottomSheet = useCallback(() => {
    setIsOpen(false);
    setContent(null);
    setIndex(-1);
    bottomSheetRef.current?.close();
  }, []);
  return (
    <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
      {children}
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        style={{ zIndez: 2 }}
        index={index}
      >
        {isOpen && (
          <TouchableWithoutFeedback onPress={closeBottomSheet}>
            <View style={styles.viewClose} />
          </TouchableWithoutFeedback>
        )}
        <BottomSheetScrollView>{content}</BottomSheetScrollView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheetContext = () => {
  return useContext(BottomSheetContext);
};
