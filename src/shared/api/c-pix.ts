import axios from "axios";
import { Platform } from "react-native";

const baseUrl = Platform.select({
    ios: "http://localhost:3333",
    android: "http://10.0.2.2:3333"
})

export const cPix = axios.create({
    baseURL: baseUrl
})