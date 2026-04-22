import { Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { StackRouterProps } from '@/routes/StackRoutes';
import { styles } from "./styles";
import { AppBar } from '@/components/AppBar';
import { TabBar } from '@/components/TabBar';
import { ItemPix } from '@/app/Type/types';
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


export function Home({ route }: StackRouterProps<"home">) {
  const pixDatabase = usePixDatabase();
  const navigation = useNavigation();
  const [listItemsId, setListItemsId] = useState<string[]>([]);
  const [listItems, setListItems] = useState<ItemPix[]>([]);
  const [showActions, setShowActions] = useState(false);

  const copyItem = (id: string) => {
    console.log(id);
  }
  /**
   * Select or deselect item in list
   * @param id 
   * @param selected 
   */
  const onMarkItem = (id: string, selected: boolean | null) => {
    if (!selected) {
      listItemsId.push(id)
      setListItemsId([...listItemsId])
    } else {
      const index = listItemsId.indexOf(id);
      if (index > -1) {
        listItemsId.splice(index, 1);
      }
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

  async function getKeys() {
    try {
      const response = await pixDatabase.listKeys();
      setListItems(response)
    } catch (error) {
      Alert.alert("Error", "Error fetching keys");
      console.error("Error fetching keys:", error);
    }
  }

  function remove() {
    deleteKey();
  }

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

  function hideActions() {
    setListItemsId([])
    setShowActions(false);
    getKeys()
  }
  useFocusEffect(
    useCallback(() => {
      getKeys();
    }, [])
  )
  return (
    <AppBar>
      <Header />
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.headerList}>
            {!showActions && (<TouchableOpacity onPress={() => navigation.navigate("add")} style={{ alignItems: "center", flexDirection: "row", gap: 6 }}>
              <MaterialIcons name="format-list-bulleted-add" size={20} color={colors.text.titles} />
              <Text style={{ color: colors.text.titles }}>Adicionar Chave</Text>
            </TouchableOpacity>)}
            {
              showActions && (
                <TouchableOpacity
                  style={{ alignItems: "center", flexDirection: "row" }}
                  onPress={() => Alert.alert("Excluir?", "Tem certeza que vai excluir todas as chaves selecionadas? \nNão tem mais volta.", [
                    { text: "Não", style: "cancel" },
                    { text: "Sim", onPress: remove },
                  ])}>
                  <Feather name="trash-2" size={20} color={colors.red.delete} />
                  <Text style={{ color: colors.red.delete }}>Excluir chaves</Text>
                </TouchableOpacity>
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
                <Item id={item.id} name={item.name} bank={item.bank} selected={item.selected} onCopyItem={() => copyItem(item.id)} onMarkItem={() => onMarkItem(item.id, item.selected)} />
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

