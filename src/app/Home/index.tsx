import { Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { StackRouterProps } from '@/routes/StackRoutes';
import { styles } from "./styles";
import { AppBar } from '@/components/AppBar';
import { TabBar } from '@/components/TabBar';
import { ItemPix, KeysToShare } from '@/app/Type/types';
import { Item } from '@/components/Item';
import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '@/theme/colors';
import { Header } from '@/components/Header';
import { usePixDatabase } from '@/database/usePixDatabase';
import { useFocusEffect } from '@react-navigation/native';
import { EmptyList } from '@/components/EmptyList';
import { copyText } from '@/utils/structure'

/**
 * Home component displays the saved PIX keys, handles navigation to add new keys,
 * manages item selection for sharing or deletion, and renders the key list.
 *
 * @param route - navigation route props for the home screen.
 * @returns JSX.Element
 */

export function Home({ route }: StackRouterProps<"home">) {
  const pixDatabase = usePixDatabase();
  const navigation = useNavigation();
  const [listItemsId, setListItemsId] = useState<string[]>([]);
  const [listItems, setListItems] = useState<ItemPix[]>([]);
  const [keysToShare, setKeysToShare] = useState<KeysToShare[]>([]);
  const [showActions, setShowActions] = useState(false);

  /**
   * Copies the PIX key text for the given item id to the clipboard.
   *
   * @param id - The id of the item whose keyPix should be copied.
   * @returns Promise<void> resolved when the copy operation completes.
   */
  const copyItem = async (id: string) => {
    const item = listItems.find(key => key.id === id);
    if (item && item.keyPix) {
      copyText(item.keyPix)
    }
  }
  /**
   * Selects or deselects an item in the list and updates related state.
   *
   * @param id - The id of the item to mark or unmark.
   * @param selected - Current selection state of the item. If false or null, the item will be selected.
   * @returns void
   */
  const onMarkItem = (id: string, selected: boolean | null) => {
    if (!selected) {
      listItemsId.push(id)
      setListItemsId([...listItemsId])
      const item = listItems.find(key => key.id === id);
      if (item) {
        keysToShare.push({ id: item.id, name: item.name, keyPix: item.keyPix })
        setKeysToShare([...keysToShare])
      }
    } else {
      const index = listItemsId.indexOf(id);
      if (index > -1) {
        listItemsId.splice(index, 1);
      }

      const filteredKeys = keysToShare.filter(key => key.id !== id);
      setKeysToShare(filteredKeys)

    }

    setListItems(prev =>
      prev.map((item) =>
        item.id === id
          ? { ...item, selected: !item.selected }
          : item
      )
    );

    if (listItemsId.length > 0) {
      setShowActions(true);
    } else {
      setShowActions(false);
    }

  }

  /**
   * Fetches the list of PIX keys from the database and updates component state.
   *
   * @returns Promise<void> resolved after the keys are loaded or an error is handled.
   */
  async function getKeys() {
    try {
      const response = await pixDatabase.listKeys(0);
      setListItems(response)
    } catch (error) {
      Alert.alert("Error", "Error fetching keys");
      console.error("Error fetching keys:", error);
    }
  }

  /**
 * Initiates deletion of the currently selected keys.
 *
 * @returns void
 */
  function remove() {
    deleteKey();
  }

  /**
 * Deletes the selected keys from the database, hides action controls, and shows a result alert.
 *
 * @returns Promise<void> resolved after deletion is attempted and state is updated.
 */
  async function deleteKey() {
    try {
      await pixDatabase.deleteKey(listItemsId);
      hideActions()
      Alert.alert("Excluidos", "Chaves Excluídas com sucesso.");
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Erro ao tentar excluir as chaves");
    }
  }
  /**
   * Clears all selection state, hides action controls, resets share data, and reloads the keys list.
   *
   * @returns void
   */
  function hideActions() {
    setListItemsId([])
    setKeysToShare([]);
    setShowActions(false);
    getKeys()
  }
  useFocusEffect(
    useCallback(() => {
      getKeys();
    }, [])
  )
  return (
    <AppBar keys={keysToShare} currentRoute={'home'}>
      <Header />
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.headerList}>
            {!showActions && (<TouchableOpacity onPress={() => navigation.navigate("add", { own: 0 })} style={{ alignItems: "center", flexDirection: "row", gap: 6 }}>
              <MaterialIcons name="format-list-bulleted-add" size={20} color={colors.text.titles} />
              <Text style={{ color: colors.text.titles }}>Adicionar Chave</Text>
            </TouchableOpacity>)}
            {
              showActions && (
                <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                  <TouchableOpacity onPress={hideActions} style={{ alignItems: "center", flexDirection: "row", gap: 6 }}>
                    <MaterialIcons name="filter-list-off" size={20} color={colors.text.titles} />
                    <Text style={{ color: colors.text.titles }}>Limpar Seleção</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ alignItems: "center", flexDirection: "row" }}
                    onPress={() => Alert.alert("Excluir?", "Tem certeza que vai excluir todas as chaves selecionadas? \nNão tem mais volta.", [
                      { text: "Não", style: "cancel" },
                      { text: "Sim", onPress: remove },
                    ])}>
                    <Feather name="trash-2" size={20} color={colors.red.delete} />
                    <Text style={{ color: colors.red.delete }}>Excluir chaves</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
          <View style={styles.formControl}>
            <TabBar />
          </View>

          <View style={styles.listItem}>
            <FlatList
              data={listItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Item id={item.id} name={item.name} bank={item.bank} keyPix={item.keyPix} selected={item.selected} onCopyItem={() => copyItem(item.id)} onMarkItem={() => onMarkItem(item.id, item.selected)} />
              )}
              ItemSeparatorComponent={() => <View style={styles.separators} />}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<EmptyList />}
            />


          </View>
        </View>
      </View>
    </AppBar>
  );
}

