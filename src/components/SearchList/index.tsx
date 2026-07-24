import { FlatList, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import { colors } from "@/theme/colors";
import { useEffect, useState } from "react";
import { SearchListItem } from "../SearchListItem";
import { EmptyList } from "../EmptyList";
import { ItemSearch } from "@/app/Type/types";
import { usePixDatabase } from "@/database/usePixDatabase";
import { getUsers } from "@/shared/services/c-pix/users.service";
import { SUser } from "@/shared/interfaces/user-interface";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { SearchEmptyList } from "../SearchEmptyList";
export const SearchList = () => {
  const [term, setTerm] = useState("");
  const [listItems, setListItems] = useState<ItemSearch[] | SUser[]>([]);
  const usePix = usePixDatabase();
  const { handleError } = useErrorHandler();
  const search = async () => {
    if (term.length > 3) {
      try {
        if (term.startsWith("@", 0)) {
          const { data } = await getUsers({ term });
          if (data.length > 0) {
            setListItems(data);
          } else {
            setListItems([]);
          }
        } else {
          const localData = await usePix.searchKeys(term);
          if (localData.length > 0) {
            setListItems(localData);
          } else {
            setListItems([]);
          }
        }
      } catch (error) {
        handleError(error, "Erro ao buscar usuários");
      }
    } else {
      setListItems([]);
    }
  };

  useEffect(() => {
    search();
  }, [term]);
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="Buscar chave ou @conexão"
        placeholderTextColor={colors.text.tab}
        setTerm={setTerm}
        term={term}
        secureTextEntry={false}
        error=""
      />
      <ScrollView>
        {listItems &&
          listItems.length > 0 &&
          listItems.map((item) => (
            <SearchListItem itemPix={item} key={item.id} />
          ))}
        {listItems && listItems.length == 0 && <SearchEmptyList />}
      </ScrollView>
    </View>
  );
};
