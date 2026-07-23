import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import { colors } from "@/theme/colors";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../ErrorMessage";

type InputProps = TextInputProps & {
  setTerm: (term: string) => void;
  term: string;
  secureTextEntry: boolean;
  error: string;
};

export function Input({
  term,
  setTerm,
  secureTextEntry,
  error,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(secureTextEntry);
  const handleSearch = (term: string) => {
    setTerm(term);
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          value={term}
          onChangeText={handleSearch}
          secureTextEntry={showPassword}
          {...rest}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPassword((value) => !value)}>
            <Entypo
              name={showPassword ? "eye-with-line" : "eye"}
              color={colors.visibilityPassword}
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </View>
  );
}
