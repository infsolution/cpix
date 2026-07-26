import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { usePixDatabase } from "@/database/usePixDatabase";
import { useNavigation } from "@react-navigation/native";
import { StackRouterProps } from "@/routes/StackRoutes";
import Feather from "@expo/vector-icons/Feather";
import { Loading } from "@/components/Loading";
import { useState, useEffect } from "react";
import { AddForm } from "../AddForm";
import { styles } from "./styles";
import { getKey } from "@/shared/services/c-pix/keys.service";
import { copyText } from "@/utils/structure";
import { QrCodeView } from "@/components/QrCodeView";
import { Header } from "@/components/Header";
import { Banner } from "@/ads/Banner";
import { DismissKeiboardview } from "@/components/DismissKeyboardView";

export function Edit({ route }: StackRouterProps<"edit">) {
  const pixDatabase = usePixDatabase();
  const [isFetching, setIsFetching] = useState(true);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [key, setKey] = useState("");

  const navigation = useNavigation();
  async function fetchKey() {
    try {
      if (route.params.own === 1) {
        const serverResponse = await getRemoteKey(route.params.id);
        if (serverResponse) {
          setName(serverResponse.name);
          setBank(serverResponse.nameBank);
          setKey(serverResponse.key);
        }
      } else {
        const response = await pixDatabase.getKey(route.params.id);
        if (response) {
          setName(response.name);
          setBank(response.nameBank);
          setKey(response.key);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Error fetching keys");
    } finally {
      setIsFetching(false);
    }
  }

  async function getRemoteKey(id: string) {
    try {
      const { data } = await getKey(id);
      return data;
    } catch (error) {
      Alert.alert("Error", "Error fetching in key in server");
    }
  }

  async function copyToClipboard() {
    try {
      await copyText(key);
    } catch (error) {
      Alert.alert("Error", "Error copying key to clipboard");
    }
  }

  useEffect(() => {
    fetchKey();
  }, [route.params.id]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <DismissKeiboardview>
      <Header />
      <ScrollView>
        <View style={styles.container}>
          {!editable && (
            <View style={styles.readyOnlyContainer}>
              <Banner custom={{ position: "absolute", top: "0", left: 24 }} />
              <View style={styles.readOnlyTitleConteiner}>
                <Text style={styles.readyOnlyTitle}>{name}</Text>
                <TouchableOpacity onPress={() => setEditable(true)}>
                  <Feather name="edit-2" size={20} color="black" />
                </TouchableOpacity>
              </View>
              <Text style={styles.readyOnlyText}>{bank}</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={copyToClipboard}>
                <Text style={styles.readyOnlyTextkey}>{key}</Text>
              </TouchableOpacity>

              <QrCodeView keyPix={key} userName={name} />
            </View>
          )}
          {editable && (
            <>
              <Banner custom={{ position: "absolute", top: "0" }} />
              <Text style={styles.title}>Editar chave PIX</Text>
              <AddForm id={route.params.id} own={route.params.own} />
            </>
          )}
        </View>
      </ScrollView>
    </DismissKeiboardview>
  );
}
