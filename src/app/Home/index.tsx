import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { StackRouterProps } from "@/routes/StackRoutes";
import { styles } from "./styles";
import { AppBar } from "@/components/AppBar";
import { TabBar } from "@/components/TabBar";
import { ItemPix, KeysToShare } from "@/app/Type/types";
import { Item } from "@/components/Item";
import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "@/theme/colors";
import { Header } from "@/components/Header";
import { usePixDatabase } from "@/database/usePixDatabase";
import { useFocusEffect } from "@react-navigation/native";
import { EmptyList } from "@/components/EmptyList";
import { copyText } from "@/utils/structure";
import { PixList } from "@/components/PixList";

/**
 * Home component displays the saved PIX keys, handles navigation to add new keys,
 * manages item selection for sharing or deletion, and renders the key list.
 *
 * @param route - navigation route props for the home screen.
 * @returns JSX.Element
 */

/**
 * Copies the PIX key text for the given item id to the clipboard.
 *
 * @param id - The id of the item whose keyPix should be copied.
 * @returns Promise<void> resolved when the copy operation completes.
 */

/**
 * Selects or deselects an item in the list and updates related state.
 *
 * @param id - The id of the item to mark or unmark.
 * @param selected - Current selection state of the item. If false or null, the item will be selected.
 * @returns void
 */

/**
 * Fetches the list of PIX keys from the database and updates component state.
 *
 * @returns Promise<void> resolved after the keys are loaded or an error is handled.
 */

/**
 * Initiates deletion of the currently selected keys.
 *
 * @returns void
 */

/**
 * Deletes the selected keys from the database, hides action controls, and shows a result alert.
 *
 * @returns Promise<void> resolved after deletion is attempted and state is updated.
 */

/**
 * Clears all selection state, hides action controls, resets share data, and reloads the keys list.
 *
 * @returns void
 */
export function Home({ route }: StackRouterProps<"home">) {
  const [keysToShare, setKeysToShare] = useState<KeysToShare[]>([]);
  return (
    <AppBar keys={keysToShare} currentRoute={"home"}>
      <Header />
      <PixList
        own={0}
        keysToShare={keysToShare}
        setKeysToShare={setKeysToShare}
      />
    </AppBar>
  );
}
