import { Text, View, TouchableOpacity, FlatList, Alert } from "react-native";

import { styles } from "./styles";
import { TabBar } from "@/components/TabBar";
import { ItemPix, KeysToShare } from "@/app/Type/types";
import { Item } from "@/components/Item";
import { useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "@/theme/colors";
import { usePixDatabase } from "@/database/usePixDatabase";
import { useFocusEffect } from "@react-navigation/native";
import { EmptyList } from "@/components/EmptyList";
import { copyText } from "@/utils/structure";
import * as keyService from "@/shared/services/c-pix/keys.service";
import { Loading } from "../Loading";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useTranslation } from "react-i18next";
import { useSnackbarContext } from "@/context/snackbar.context";
import { useAuthContext } from "@/context/auth.context";

import { useKeysBackup } from "@/shared/hooks/useKeysBackup";

type ListProps = {
  own: number;
  keysToShare: KeysToShare[];
  setKeysToShare: (keys: KeysToShare[]) => void;
};
export const PixList = ({ own, keysToShare, setKeysToShare }: ListProps) => {
  const { t } = useTranslation();
  const { notify } = useSnackbarContext();
  const { handleError } = useErrorHandler();
  const pixDatabase = usePixDatabase();
  const navigation = useNavigation();
  const [listItemsId, setListItemsId] = useState<string[]>([]);
  const [listItems, setListItems] = useState<ItemPix[]>([]);
  const [showActions, setShowActions] = useState(false);
  const [listType, setListType] = useState("own");
  const [loadingList, setLoadingList] = useState(false);
  const [styleDeleteButton, setStyleDeleteButton] = useState(colors.red.delete);
  const [disableDeleteButton, setDisableDeleteButton] = useState(false);
  const copyItem = async (id: string) => {
    const item = listItems.find((key) => key.id === id);
    if (item && item.keyPix) {
      copyText(item.keyPix);
    }
  };

  const { user } = useAuthContext();

  //TODO Remove
  const { updateOrCreateBackup } = useKeysBackup();
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

  async function getKeys() {
    setLoadingList(true);
    try {
      if (own === 0) {
        setStyleDeleteButton(colors.red.delete);
        setDisableDeleteButton(false);
        if (listType === "own") {
          await getLocalKeys();
        } else {
          setStyleDeleteButton(colors.switch.btnOff);
          setDisableDeleteButton(true);
          await getSharedKeys();
        }
      } else {
        await getOwnKeys();
      }
    } catch (error) {
      setLoadingList(false);
    } finally {
      setLoadingList(false);
    }
  }

  async function getLocalKeys() {
    try {
      if (user) {
        const response = await pixDatabase.listKeys(own, user?.universal_uuid);
        if (response.length > 0) {
          setListItems(response);
        } else {
          setListItems([]);
        }
      }
      // await updateOrCreateBackup();
    } catch (error) {
      handleError(error, t("error.errorGetKeys"));
    }
  }

  async function getSharedKeys() {
    try {
      const { message, code, data } = await keyService.getKeys();
      if (data.length > 0) {
        setListItems(data);
      } else {
        setListItems([]);
      }
    } catch (error) {
      handleError(error, t("error.errorGetKeys"));
    }
  }

  async function getOwnKeys() {
    try {
      const { data } = await keyService.getUserKeys();
      if (data.length > 0) {
        setListItems(data);
      } else {
        setListItems([]);
      }
    } catch (error) {
      handleError(error, t("error.errorGetKeys"));
    }
  }

  function remove() {
    if (own === 1) {
      removeUserKeys();
    } else {
      deleteKey();
    }
  }

  async function deleteKey() {
    try {
      await pixDatabase.deleteKey(listItemsId);
      hideActions();
      notify({
        message: t("success.deleteKeys"),
        messageType: "SUCCESS",
      });
    } catch (error) {
      handleError(error, t("error.deleteKeys"));
    }
  }

  async function removeUserKeys() {
    try {
      await keyService.deleteKeys(listItemsId);
      hideActions();
      notify({
        message: t("success.deleteKeys"),
        messageType: "SUCCESS",
      });
    } catch (error) {
      handleError(error, t("error.deleteKeys"));
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
          {!showActions && (
            <TouchableOpacity
              onPress={() => navigation.navigate("add", { own: own })}
              style={{ alignItems: "center", flexDirection: "row", gap: 6 }}
            >
              <MaterialIcons
                name="format-list-bulleted-add"
                size={20}
                color={colors.text.titles}
              />
              <Text style={{ color: colors.text.titles }}>Adicionar Chave</Text>
            </TouchableOpacity>
          )}
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
                  color={colors.text.titles}
                />
                <Text style={{ color: colors.text.titles }}>
                  Limpar Seleção
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignItems: "center", flexDirection: "row" }}
                onPress={() =>
                  Alert.alert(
                    "Excluir?",
                    "Tem certeza que vai excluir todas as chaves selecionadas? \nNão tem mais volta.",
                    [
                      { text: "Não", style: "cancel" },
                      { text: "Sim", onPress: remove },
                    ],
                  )
                }
                disabled={disableDeleteButton}
              >
                <Feather name="trash-2" size={20} color={styleDeleteButton} />
                <Text style={{ color: styleDeleteButton }}>Excluir chaves</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {own === 0 && (
          <View style={styles.formControl}>
            <TabBar setListType={setListType} listType={listType} />
          </View>
        )}

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
                <Item
                  id={item.id}
                  name={item.name}
                  bank={item.bank}
                  nameBank={item.nameBank}
                  keyPix={item.keyPix}
                  selected={item.selected}
                  onCopyItem={() => copyItem(item.id)}
                  onMarkItem={() => onMarkItem(item.id, item.selected)}
                  own={own}
                  listType={listType}
                />
              )}
              ItemSeparatorComponent={() => <View style={styles.separators} />}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<EmptyList own={own} />}
            />
          )}
        </View>
      </View>
    </View>
  );
};
