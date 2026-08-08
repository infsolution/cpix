import { Text, View, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./styles";
import { KeysToShare } from "@/app/Type/types";
import { useState, useCallback } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "@/theme/colors";
import { useFocusEffect } from "@react-navigation/native";
import { copyText } from "@/utils/structure";
import * as keyService from "@/shared/services/c-pix/keys.service";
import { Loading } from "../Loading";
import { FriendListItem } from "../FriendListItem";
import { KeysFriend } from "@/shared/interfaces/key-interface";
import { FriendEmptyKeyList } from "../FriendEmptyKeyList";
type ListProps = {
  id: string;
  friendName: string;
  keysToShare: KeysToShare[];
  setKeysToShare: (keys: KeysToShare[]) => void;
};
export const FriendPixList = ({
  id,
  friendName,
  keysToShare,
  setKeysToShare,
}: ListProps) => {
  const [listItemsId, setListItemsId] = useState<string[]>([]);
  const [listItems, setListItems] = useState<KeysFriend[]>([]);
  const [showActions, setShowActions] = useState(false);
  const [listType, setListType] = useState("own");
  const [loadingList, setLoadingList] = useState(false);
  const copyItem = async (id: string) => {
    const item = listItems.find((key) => key.id === id);
    if (item && item.keyPix) {
      copyText(item.keyPix);
    }
  };
  /**
   * Select or deselect item in list
   * @param id
   * @param selected
   */
  const onMarkItem = (id: string, selected: boolean | null) => {
    if (!selected) {
      listItemsId.push(id);
      setListItemsId([...listItemsId]);
      const item = listItems.find((key) => key.id === id);
      if (item) {
        keysToShare.push({ id: item.id, name: item.name, keyPix: item.keyPix });
        setKeysToShare([...keysToShare]);
      }
    } else {
      const index = listItemsId.indexOf(id);
      if (index > -1) {
        listItemsId.splice(index, 1);
      }

      const filteredKeys = keysToShare.filter((key) => key.id !== id);
      setKeysToShare(filteredKeys);
    }

    setListItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    );

    if (listItemsId.length > 0) {
      setShowActions(true);
    } else {
      setShowActions(false);
    }
  };

  const fetchFriendKeys = async () => {
    setLoadingList(true);
    try {
      const { message, code, data } = await keyService.getFriendKeys(id);
      if (data.length > 0) {
        setListItems(data);
      } else {
        setListItems([]);
      }
    } catch (error) {
      setLoadingList(false);
    } finally {
      setLoadingList(false);
    }
  };

  async function getKeys() {
    try {
      fetchFriendKeys();
    } catch (error) {
      Alert.alert("Error", "Error fetching own keys");
    }
  }

  function hideActions() {
    setListItemsId([]);
    setKeysToShare([]);
    setShowActions(false);
    getKeys();
  }

  useFocusEffect(
    useCallback(() => {
      getKeys();
      hideActions();
    }, [listType]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.headerList}>
          {showActions && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={hideActions}
                style={{ alignItems: "center", flexDirection: "row", gap: 6 }}
              >
                <MaterialIcons
                  name="filter-list-off"
                  size={20}
                  color={colors.callAction.main}
                />
                <Text style={{ color: colors.text.titles }}>
                  Limpar Seleção
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.listItem}>
          {loadingList && (
            <View
              style={{
                flex: 1,
                marginTop: 120,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loading />
            </View>
          )}
          {!loadingList && (
            <FlatList
              data={listItems}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <FriendListItem
                  id={item.id}
                  name={item.name}
                  bank={item.bank}
                  nameBank={item.nameBank}
                  keyPix={item.keyPix}
                  selected={item.selected}
                  onCopyItem={() => copyItem(item.id)}
                  onMarkItem={() => onMarkItem(item.id, item.selected)}
                />
              )}
              ItemSeparatorComponent={() => <View style={styles.separators} />}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <FriendEmptyKeyList friendName={friendName} friendId={id} />
              }
            />
          )}
        </View>
      </View>
    </View>
  );
};
