import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { colors } from "@/theme/colors";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { useAuthContext } from "@/context/auth.context";
import { FC, useEffect } from "react";

interface Props {
    setLoading: (value:boolean)=>void;
}
export const  Loading: FC<Props>= ({setLoading})=>{
    const {restoreUserSession, handleLogout}= useAuthContext();

    useEffect(()=>{
        (
            async ()=>{
                try {
                    const user = await restoreUserSession();
                    if(!user){
                        await handleLogout();
                    }
                } catch (error) {
                    await handleLogout();
                }finally{
                    // setLoading(false);
                }
            }
        )();
    },[])
    return(
        <SafeAreaView style={styles.container}>
            <>
                <FontAwesome6 name="pix" size={92} color={colors.green.btn} />
                <Text style={styles.text}>Estamos carregando suas informações</Text>
                <ActivityIndicator/>
            </>
        </SafeAreaView>
    )
}