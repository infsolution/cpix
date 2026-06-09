import { TextInput, TextInputProps } from "react-native";
import { styles } from "./styles";

type InputProps = TextInputProps & {
  setTerm: (term: string) => void;
  term: string;
};

export function Input({ term, setTerm, ...rest }: InputProps) {
  const handleSearch = (term: string) => {
    setTerm(term);
  };
  return (
    <TextInput
      style={styles.container}
      value={term}
      onChangeText={handleSearch}
      {...rest}
    />
  );
}
