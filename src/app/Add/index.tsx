import { Text, View } from 'react-native';
import { styles } from "./styles";
import { TabGoBack } from '@/components/TabGoBack';
import { AddForm } from '../AddForm';
import { DismissKeiboardview } from '@/components/DismissKeyboardView';
import { StackRouterProps } from '@/routes/StackRoutes';

export function Add({ route }: StackRouterProps<"add">) {
    return (
        <DismissKeiboardview>
            <View style={styles.container}>
                <TabGoBack />
                <Text style={styles.title}>Adicionar chave PIX</Text>
                <AddForm own={route.params.own} />
            </View>
        </DismissKeiboardview>
    )
}
