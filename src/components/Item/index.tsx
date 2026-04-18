import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import Feather from '@expo/vector-icons/Feather';
import { Checkbox } from "expo-checkbox";
import { ItemPix } from "@/app/Type/types";
import { useNavigation } from '@react-navigation/native';
import { ItemCircle } from "../ItemCircle";
import { colors } from "@/theme/colors";

type Props = ItemPix & {
    onMarkItem: (id: string, selected: boolean) => void,
    onCopyItem: () => void,
}
export function Item({ id, name, bank, selected, onCopyItem, onMarkItem }: Props) {
    const itemNavigation = useNavigation();
    return (
        <View style={styles.container} key={id}>
            {
                
                selected &&<Checkbox color={colors.list.captular} style={styles.checkbox} value={selected} onValueChange={() => onMarkItem(id, selected)} />
            }
            {
                !selected && <ItemCircle name={name} onMarkItem={onMarkItem} />
            }
            <TouchableOpacity style={styles.texts} activeOpacity={0.8} onPress={() => itemNavigation.navigate("edit", {id})}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.text}>{bank}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => onCopyItem()}>
                <Feather name="copy" size={24} color={colors.list.captular}  />
            </TouchableOpacity>

        </View>
    )
}