import { Text, View } from "react-native";
import { styles } from "./styles";
import { TabGoBack } from "@/components/TabGoBack";
import { DismissKeiboardview } from "@/components/DismissKeyboardView";
import { StackRouterProps } from "@/routes/StackRoutes";
import { AppBar } from "@/components/AppBar";
import { Header } from "@/components/Header";

export function Friends({ route }: StackRouterProps<"friends">) {
  return (
    <AppBar keys={[]} currentRoute={"friends"}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Suas conexões</Text>
      </View>
    </AppBar>
  );
}
