import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type Props={
    name: string,
     onMarkItem: (id: string, selected: boolean) => void,
}
export function ItemCircle({ name, onMarkItem }: Props) {
    const capt = name.charAt(0).toUpperCase();
    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={() => onMarkItem(name, true)}>
            <Text style={styles.text}>{capt}</Text>

        </TouchableOpacity>
    )
}