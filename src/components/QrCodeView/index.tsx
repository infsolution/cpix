import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import CurrencyInput from "react-native-currency-input";
import { useState } from "react";
import { Loading } from "@/components/Loading";
import { colors } from "@/theme/colors";
import { generatePixPayload } from "@/utils/pix";
import QRCode from "react-native-qrcode-svg";

type KeyProps = {
  keyPix: string;
  userName: string;
};

type PayloadData = {
  pixKey: string;
  merchantName: string;
  merchantCity: string;
  amount?: number;
  txid?: string;
};
type CityError = {
  status: boolean;
  message: string;
};
export const QrCodeView = ({ keyPix, userName }: KeyProps) => {
  const [value, setValue] = useState<number | null>(0);
  const [city, setCity] = useState<string>("");
  const [citeError, setCityError] = useState<CityError | null>(null);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<string>("");
  const qrcodeGenerate = () => {
    try {
      setLoading(true);
      if (city.length < 3) {
        setCityError({
          status: true,
          message: "Cidade inválida",
        });
        return;
      }
      setCityError(null);
      console.log(`Gerar QR para a chave ${keyPix} e o valor ${value}`);
      const data: PayloadData = {
        pixKey: keyPix,
        merchantName: userName,
        merchantCity: city,
      };
      if (value) {
        const txid = userName.split(" ");
        data["amount"] = value;
        data["txid"] = `${txid[0].toLocaleUpperCase()}123`;
      }
      const text = generatePixPayload(data);
      console.log(text);
      setPayload(text);
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
          <TextInput
            style={styles.textInput}
            value={city}
            onChangeText={setCity}
          />
          {citeError?.status && (
            <Text style={styles.textError}>{citeError.message}</Text>
          )}
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
      {payload && (
        <View style={styles.qrcode}>
          <QRCode value={payload} size={250} />
        </View>
      )}
      {payload && (
        <View style={styles.copy}>
          <Text>Copiar</Text>
          <Text>{payload}</Text>
        </View>
      )}
    </View>
  );
};
