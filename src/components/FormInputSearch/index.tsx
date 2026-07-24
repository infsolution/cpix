import Entypo from "@expo/vector-icons/Entypo";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useWatch,
} from "react-hook-form";
import {
  TextInputProps,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { colors } from "@/theme/colors";
import { ErrorMessage } from "../ErrorMessage";

interface FormInputParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  label: string;
  onSearch?: (value: string) => Promise<void> | void;
  debounceTime?: number;
  info?: string;
}

export const FormInputSearch = <T extends FieldValues>({
  control,
  name,
  label,
  secureTextEntry,
  onSearch,
  debounceTime = 500,
  info,
  ...rest
}: FormInputParams<T>) => {
  const [showPassword, setShowPassword] = useState(secureTextEntry);
  const value = useWatch({
    control,
    name,
  });

  useEffect(() => {
    if (!onSearch) return;

    const timeout = setTimeout(() => {
      onSearch(value ?? "");
    }, debounceTime);

    return () => clearTimeout(timeout);
  }, [value, onSearch, debounceTime]);
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.input}>
              <TextInput
                {...rest}
                style={styles.textInput}
                value={value}
                onChangeText={onChange}
                placeholderTextColor={colors.text.placeholder}
                secureTextEntry={showPassword}
              />
              {secureTextEntry && (
                <TouchableOpacity
                  onPress={() => setShowPassword((value) => !value)}
                >
                  <Entypo
                    name={showPassword ? "eye-with-line" : "eye"}
                    color={colors.visibilityPassword}
                    size={24}
                  />
                </TouchableOpacity>
              )}
            </View>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            {info && !error && (
              <Text style={styles.textInfo}>{"Tipo: " + info}</Text>
            )}
          </View>
        );
      }}
    />
  );
};
