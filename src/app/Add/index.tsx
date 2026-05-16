import { Text, View } from 'react-native';
import { styles } from "./styles";
import { TabGoBack } from '@/components/TabGoBack';
import { AddForm } from '../AddForm';
import { DismissKeiboardview } from '@/components/DismissKeyboardView';

export function Add() {
    return (
        <DismissKeiboardview>
            <View style={styles.container}>
                <TabGoBack />
                <Text style={styles.title}>Adicionar chave PIX</Text>
                <AddForm />
            </View>
        </DismissKeiboardview>
    )
}