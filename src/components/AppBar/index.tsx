import { View, TouchableOpacity } from 'react-native';
import { styles } from "./styles";
import { ReactNode } from 'react';
import { Feather } from "@expo/vector-icons"
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
    children: ReactNode;
}
export function AppBar({ children }: Props) {
    return (
        <View style={styles.container}>
            {children}
            <View style={styles.appBar}>
                <TouchableOpacity activeOpacity={0.8} disabled>
                    <Feather name="home" size={48} color="white" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}>
                    <Feather name="share-2" size={48} color="white" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}>
                    <Ionicons name="person-circle-outline" size={48} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}