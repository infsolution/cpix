import Entypo from '@expo/vector-icons/Entypo';
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { TextInputProps, View, Text, TouchableOpacity, TextInput } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { colors } from "@/theme/colors";
import { ErrorMessage } from '../ErrorMessage';

interface FormInputParams<T extends FieldValues> extends TextInputProps {
    control: Control<T>;
    name: Path<T>;
    label: string;
}

export const FormInput = <T extends FieldValues>({ control, name, label, secureTextEntry, ...rest }: FormInputParams<T>) => {
    const [showPassword, setShowPasswod] = useState(secureTextEntry)
    return <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
            return <View style={styles.container}>
                {label && <Text style={styles.label}>{label}</Text>}

                <View style={styles.input}>
                    <TextInput {...rest}
                        style={styles.textInput}
                        value={value}
                        onChangeText={onChange}
                        placeholderTextColor={colors.text.placeholder}
                        secureTextEntry={showPassword}
                    />
                    {
                        secureTextEntry && (
                            <TouchableOpacity onPress={() => setShowPasswod((value) => !value)}>
                                <Entypo
                                    name={showPassword ? "eye-with-line" : "eye"}
                                    color={colors.visibilityPassword}
                                    size={24}
                                />
                            </TouchableOpacity>
                        )
                    }

                </View>
                {error && <ErrorMessage>{error.message}</ErrorMessage>}
            </View>
        }} />
}