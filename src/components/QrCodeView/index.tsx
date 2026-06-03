import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Button } from "@/components/Button";

export const QrCodeView = () => {
  return (
    <View style={styles.container}>
      <Text>Gere o QR Code da sua chave</Text>

      <Text>Valor cobrado</Text>
      <View style={styles.formQR}>
        <TextInput
          style={styles.textInput}
          placeholder="R$"
          keyboardType="number-pad"
        />
        <TouchableOpacity style={styles.button} activeOpacity={0.8}>
          <Text style={styles.buttonText}>Gerar QR Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
