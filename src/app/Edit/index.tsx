import { DismissKeiboardview } from "@/components/DismissKeyboardView";
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
import { TabGoBack } from "@/components/TabGoBack";
import Feather from "@expo/vector-icons/Feather";
import { Loading } from "@/components/Loading";
import { useState, useEffect } from "react";
import { AddForm } from "../AddForm";
import { styles } from "./styles";
import { getKey } from "@/shared/services/c-pix/keys.service";
import { copyText } from "@/utils/structure";
import { QrCodeView } from "@/components/QrCodeView";

export function Edit({ route }: StackRouterProps<"edit">) {
  const pixDatabase = usePixDatabase();
  const [isFetching, setIsFetching] = useState(true);
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [key, setKey] = useState("");
  //   const [createdAt, setCreatedAt] = useState("");
  const navigation = useNavigation();
  async function fetchKey() {
    try {
      if (route.params.own === 1) {
        const serverResponse = await getRemoteKey(route.params.id);
        if (serverResponse) {
          setName(serverResponse.name);
          setBank(serverResponse.nameBank);
          setKey(serverResponse.key);
          // setIsPublic(serverResponse.is_public);
        }
      } else {
        const response = await pixDatabase.getKey(route.params.id);
        if (response) {
          setName(response.name);
          setBank(response.nameBank);
          setKey(response.key);
          //   setCreatedAt(response.created_at);
        }
      }
      //   if (!response) {
      //     Alert.alert("Atenção", "Não encontramos essa chave.", [
      //       {
      //         text: "Voltar para Home",
      //         onPress: () => navigation.navigate("home"),
      //       },
      //     ]);
      //   }
    } catch (error) {
      Alert.alert("Error", "Error fetching keys");
      console.error("Error fetching keys:", error);
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
      console.error("Error fetching keys:", error);
    }
  }

  async function copyToClipboard() {
    try {
      await copyText(key);
    } catch (error) {
      Alert.alert("Error", "Error copying key to clipboard");
      console.error("Error copying key to clipboard:", error);
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
      <TabGoBack />
      <ScrollView>
        <View style={styles.container}>
          {!editable && (
            <View style={styles.readyOnlyContainer}>
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
              <Text style={styles.title}>Editar chave PIX</Text>
              <AddForm id={route.params.id} own={route.params.own} />
            </>
          )}
        </View>
      </ScrollView>
    </DismissKeiboardview>
  );
}
