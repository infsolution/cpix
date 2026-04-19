import { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { styles } from "./styles";
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { AppBar } from '@/components/AppBar';
import { StackRouterProps } from '@/routes/StackRoutes';
import { TabGoBack } from '@/components/TabGoBack';
import { Switch } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { colors } from '@/theme/colors';

export function Edit({ route }: StackRouterProps<"edit">) {
    const [checked, setChecked] = useState(false);
    const toggleSwitch = () => setChecked(!checked);
    const [editable, setEditable] = useState(false);

    return (
        <View style={styles.container}>
            <TabGoBack />
            {
                !editable && (
                    <View style={styles.readyOnlyContainer}>
                        <View style={styles.readOnlyTitleConteiner}>
                            <Text style={styles.readyOnlyTitle}>Bos {route.params?.id}</Text>
                            <TouchableOpacity onPress={() => setEditable(true)}>
                                <Feather name="edit-2" size={20} color="black" />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.readyOnlyText}>Nu pagamentos IP</Text>
                        <Text style={styles.readyOnlyText}>bgjssiuos-easdadadhdd-ddsds-dddvsfsfs</Text>
                    </View>
                )
            }
            {editable && (<View style={styles.formContainer}>
                <Text style={styles.title}>Editar chave PIX</Text>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Nome {route.params?.id}</Text>
                    <Input placeholder='Nome' editable={false} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Banco</Text>
                    <Input placeholder='Banco' editable={false} />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Chave</Text>

                    <Input placeholder='Chave' editable={false} />
                </View>


                <View style={styles.formControlPublic}>
                    <Switch
                        trackColor={{ false: colors.switch.backOff, true: colors.switch.backOff }}
                        thumbColor={checked ? colors.switch.btnOn : colors.switch.btnOff}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={checked}
                    />
                    <Text>Pública</Text>
                </View>
                <Button title='Salvar'></Button>
            </View>)}
        </View>
    )
}