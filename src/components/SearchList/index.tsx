import { FlatList, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import { Input } from "@/components/Input";
import { colors } from "@/theme/colors";
import { useEffect, useState } from "react";
import { SearchListItem } from "../SearchListItem";
import { EmptyList } from "../EmptyList";
import { ItemSearch } from "@/app/Type/types";
import { usePixDatabase } from "@/database/usePixDatabase";
export const SearchList = () => {
  const [term, setTerm] = useState("");
  const [listItems, setListItems] = useState<ItemSearch[]>([]);
  const usePix = usePixDatabase();
  const search = async () => {
    if (term.length > 3) {
      if (term.startsWith("@", 0)) {
        console.log(term);
      } else {
        const localData = await usePix.searchKeys(term);
        if (localData.length > 0) {
          setListItems(localData);
        } else {
          setListItems([]);
        }
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
      />
      <ScrollView>
        {listItems &&
          listItems.length > 0 &&
          listItems.map((item) => (
            <SearchListItem itemPix={item} key={item.id} />
          ))}
        {listItems && listItems.length == 0 && <EmptyList />}
      </ScrollView>
    </View>
  );
};
