import Purchases, {
  CustomerInfo,
  PurchasesOfferings,
  PurchasesPackage,
  PURCHASES_ERROR_CODE,
} from "react-native-purchases";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { StackRouterProps } from "@/routes/StackRoutes";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@/components/Button";
import { Header } from "@/components/Header";
import { colors } from "@/theme/colors";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { updatePlan } from "@/shared/services/c-pix/users.service";
import { formateDateToDatabase } from "@/utils/utilDates";
import { FormEditPlanParams } from "@/shared/interfaces/user-interface";
import { useSnackbarContext } from "@/context/snackbar.context";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "@/context/auth.context";
import { removeItem, setStorageUser } from "@/shared/storage/service/user";
export function Subscription({ route }: StackRouterProps<"subscription">) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { setUser } = useAuthContext();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>();
  const [offerings, setOfferings] = useState<PurchasesOfferings>();

  const { notify } = useSnackbarContext();

  const getCustomerInfo = async () => {
    const info = await Purchases.getCustomerInfo();
    setCustomerInfo(info);
  };

  const getOfferings = async () => {
    const offerings = await Purchases.getOfferings();

    setOfferings(offerings);
  };

  const onSubscribe = async (pkg: PurchasesPackage) => {
    try {
      let { customerInfo } = await Purchases.purchasePackage(pkg);
      if (customerInfo) {
        if (
          typeof customerInfo.entitlements.active["Xavex Pro"] !== "undefined"
        ) {
          console.log(customerInfo.entitlements.active);
          const formPlan = {
            last_payment: formateDateToDatabase(new Date()),
            renewal: customerInfo.entitlements.active[
              "Xavex Pro"
            ].expirationDate
              ?.slice(0, 19)
              .replace("T", " "),
            plan_id: 2,
          } as FormEditPlanParams;
          const { message, code, data } = await updatePlan(formPlan);
          if (code != "200") {
            throw new Error(message);
          }
          setUser(data);
          removeItem("user-data");
          setStorageUser("user-data", data);
          notify({
            message: "Plano atualizado com sucesso.",
            messageType: "SUCCESS",
          });
          navigation.goBack();
        }
      }
    } catch (error: any) {
      if (error.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
        notify({
          message: "Pagamento cancelado",
          messageType: "ERROR",
        });
        return;
      }

      notify({
        message: "Houve um erro com seu pagamento.",
        messageType: "ERROR",
      });
    }
  };

  useEffect(() => {
    getOfferings();
  }, []);
  return (
    <>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false}>
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
              <FontAwesome6
                name="whatsapp"
                size={18}
                color={colors.green.btn}
              />
              <Text style={styles.benefitText}>Suporte pelo Whatsapp</Text>
            </View>
            <View style={styles.benefitItem}>
              <FontAwesome6
                name="infinity"
                size={18}
                color={colors.green.btn}
              />
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

            {offerings?.current?.availablePackages.map((pkg) => (
              <LinearGradient
                colors={[colors.header.max, colors.header.min]}
                style={styles.cardPlan}
                key={pkg.identifier}
              >
                <View style={styles.viewPeriod}>
                  <Text style={styles.cardPeriod}>
                    {t("words." + pkg.packageType)}
                  </Text>
                  {/* <TouchableOpacity
                activeOpacity={0.8}
                onPress={changeCurrentPeriod}
              >
                <Text style={styles.cardPeriodChange}>
                  Trocar para {planPeriodChange}
                </Text>
              </TouchableOpacity> */}
                </View>
                <Text style={styles.cardValue}>{pkg.product.priceString}</Text>
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
                  onPress={() => onSubscribe(pkg)}
                />
              </LinearGradient>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}
