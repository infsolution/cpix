import { Text, View } from "react-native";
import { styles } from "./styles";
import { StackRouterProps } from "@/routes/StackRoutes";
import { Header } from "@/components/Header";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { colors } from "@/theme/colors";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/Button";
export function Subscription({ route }: StackRouterProps<"subscription">) {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Assinar Plano Pro</Text>
        <Text style={styles.subTitle}>
          Com o pro você garante mais liberdade:
        </Text>
        <View style={styles.benefitBlock}>
          <Text style={styles.benefitTitle}>O que você vai receber:</Text>
          <View style={styles.benefitItem}>
            <FontAwesome6 name="pix" size={18} color={colors.green.btn} />
            <Text style={styles.benefitText}>100 chaves compartilháveis</Text>
          </View>
          <View style={styles.benefitItem}>
            <MaterialIcons name="backup" size={18} color={colors.green.btn} />
            <Text style={styles.benefitText}>
              Backup diário das chaves locais
            </Text>
          </View>
          {/* <View style={styles.benefitItem}>
            <MaterialCommunityIcons
              name="invoice-send"
              size={18}
              color={colors.green.btn}
            />
            <Text style={styles.benefitText}>
              Envio automático de cobranças
            </Text>
          </View> */}
          <View style={styles.benefitItem}>
            <FontAwesome6 name="whatsapp" size={18} color={colors.green.btn} />
            <Text style={styles.benefitText}>Suporte pelo Whatsapp</Text>
          </View>
          <View style={styles.benefitItem}>
            <FontAwesome6 name="infinity" size={18} color={colors.green.btn} />
            <Text style={styles.benefitText}>
              Em breve novas funcionalidades
            </Text>
          </View>
          {/* <View style={styles.benefitItem}>
            <MaterialIcons
              name="dashboard"
              size={18}
              color={colors.green.btn}
            />
            <Text style={styles.benefitText}>Dashboard profissional</Text>
          </View> */}

          <LinearGradient
            colors={[colors.header.max, colors.header.min]}
            style={styles.cardPlan}
          >
            <View>
              <Text style={styles.cardPeriod}>Mensal</Text>
            </View>
            <Text style={styles.cardValue}>R$ 6.99 /mês</Text>
            <View style={styles.cardItem}>
              <FontAwesome5
                name="check-circle"
                size={14}
                color={colors.white}
              />
              <Text style={styles.textCard}>
                Compartilhe até 100 chaves com suas conexões
              </Text>
            </View>
            <View style={styles.cardItem}>
              <FontAwesome5
                name="check-circle"
                size={14}
                color={colors.white}
              />
              <Text style={styles.textCard}>
                Backup automático de suas chaves locais
              </Text>
            </View>
            <View style={styles.cardItem}>
              <FontAwesome5
                name="check-circle"
                size={14}
                color={colors.white}
              />
              <Text style={styles.textCard}>
                Todas as funcionalidade futuras
              </Text>
            </View>
            <Button
              customStyle={{
                width: "100%",
                backgroundColor: colors.callAction.tertiary,
                marginTop: 12,
              }}
              inProgress={false}
              title="Assinar"
              onPress={() => {}}
            />
          </LinearGradient>
        </View>
      </View>
    </>
  );
}
