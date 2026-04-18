import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';

import { StackRouterProps } from '@/routes/StackRoutes';
import { styles } from "./styles";
import { AppBar } from '@/components/AppBar';
import { TabBar } from '@/components/TabBar';
import { ItemPix } from '@/app/Type/types';
import { Item } from '@/components/Item';
import { ITEMS } from '../Type/mock';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from '@/theme/colors';
import { Header } from '@/components/Header';


export function Home({route}:StackRouterProps<"home">) {

  const navigation = useNavigation();
  const [listItemsId, setListItemsId] = useState<string[]>([]);
  const [listItems, setListItems] = useState<ItemPix[]>(ITEMS);
  const [showActions, setShowActions] = useState(false);

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

    if(listItemsId.length > 0){
      setShowActions(true);
    }else{
      setShowActions(false);
    }
    console.log("Lista", listItemsId);
  }
  return (
    <AppBar>
        <Header />
      <View style={styles.container}>
        
        
        <View style={styles.formContainer}>
          
 
          <View style={styles.headerList}>
            { !showActions && (<TouchableOpacity onPress={()=> navigation.navigate("add")} style={{alignItems:"center", flexDirection:"row", gap:6}}>
              <MaterialIcons name="format-list-bulleted-add" size={20} color={colors.text.titles} />
              <Text  style={{color:colors.text.titles}}>Adicionar Chave</Text>
            </TouchableOpacity>)}
          {
            showActions &&(
            <TouchableOpacity style={{alignItems:"center", flexDirection:"row"}}>
              <Feather name="trash-2" size={20} color={colors.red.delete} />
            <Text style={{color:colors.red.delete}}>Excluir chaves</Text>
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
            />

          </View>
        </View>
      </View>
      </AppBar>
  );
}

