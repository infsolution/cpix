import { Text, View } from "react-native";
import { styles } from "./styles";
import { AddForm } from "../AddForm";
import { DismissKeiboardview } from "@/components/DismissKeyboardView";
import { StackRouterProps } from "@/routes/StackRoutes";
import { Header } from "@/components/Header";
import { Banner } from "@/ads/Banner";

export function Add({ route }: StackRouterProps<"add">) {
  return (
    <>
      <DismissKeiboardview>
        <Header />
        <View style={styles.container}>
          <Text style={styles.title}>Adicionar chave PIX</Text>
          <AddForm own={route.params.own} />
        </View>
      </DismissKeiboardview>
      <Banner custom={{ position: "absolute", bottom: "52" }} />
    </>
  );
}
