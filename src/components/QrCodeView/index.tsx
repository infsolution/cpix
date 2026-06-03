import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import CurrencyInput from "react-native-currency-input";
import { useState } from "react";
import { Loading } from "@/components/Loading";
import { colors } from "@/theme/colors";

type KeyProps = {
  keyPix: string;
};
export const QrCodeView = ({ keyPix }: KeyProps) => {
  const [value, setValue] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);
  const qrcodeGenerate = () => {
    try {
      console.log(`Gerar QR para a chave ${keyPix} e o valor ${value}`);
      setLoading(true);
    } catch (error) {
      console.log(`Error to generate QR Code from `);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gere o QR Code da sua chave</Text>

      <View style={styles.formQR}>
        <View style={styles.formInput}>
          <Text style={styles.label}>Valor cobrado</Text>
          <CurrencyInput
            value={value}
            onChangeValue={setValue}
            placeholder="R$"
            keyboardType="number-pad"
            style={styles.textInput}
            prefix="R$"
          />
        </View>
        <View style={styles.formInput}>
          <Text style={styles.label}>Cidade</Text>
          <TextInput style={styles.textInput} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={qrcodeGenerate}
      >
        {loading && <Loading color={colors.white} />}
        {!loading && <Text style={styles.buttonText}>Gerar QR Code</Text>}
      </TouchableOpacity>
    </View>
  );
};
