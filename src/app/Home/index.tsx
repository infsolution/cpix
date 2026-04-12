import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { styles } from "./styles";
import { Input } from '@/components/Input';
import { AppBar } from '@/components/AppBar';
import { TabBar } from '@/components/TabBar';
import { ItemPix } from '@/app/Type/types';
import { Item } from '@/components/Item';
import { ITEMS } from '../Type/mock';
import { useState } from 'react';

export function Home() {
  //const ITEMSS: ItemPix[] = ITEMS
  const [listItemsId, setListItemsId] = useState<string[]>([]);
  const [listItems, setListItems] = useState<ItemPix[]>(ITEMS);

  const copyItem = (id: string) => {
    console.log(id);
  }

  const onMarkItem = (id: string, selected: boolean) => {
    if (!selected) {
      listItemsId.push(id)
      console.log("Add");
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
    console.log("Lista", listItemsId);
  }
  return (
    <AppBar>
      <View style={styles.container}>
        <Input placeholder='Buscar chave...' />
        <View style={styles.formContainer}>
          <View style={styles.formControl}>
            <TabBar />
          </View>
          <View style={styles.headerList}>
            <Text>Chaves Cadastradas</Text>
            <TouchableOpacity>
              <Text>Adicionar Chave</Text>
            </TouchableOpacity>
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
            />

          </View>
        </View>


      </View>
      <View style={{ borderColor: "black", borderWidth: 1, width: "100%", height: 56, alignItems: "center", justifyContent: "center", backgroundColor: "gray" }}>
        <Text>ADS</Text>
      </View>
    </AppBar>
  );
}

