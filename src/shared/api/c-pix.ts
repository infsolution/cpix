import axios from "axios";
import { Platform } from "react-native";

const baseURL = Platform.select({
    ios:"https://clsdev.com.br/api/v1/",
    android: "https://clsdev.com.br/api/v1/"
})

export const cPixApi = axios.create({
    baseURL,
})