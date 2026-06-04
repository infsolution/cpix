import axios from "axios";
import { Platform } from "react-native";
import { AppError } from "../helpers/AppError";

const baseURL = Platform.select({
  ios: "https://clsdev.com.br/api/v1/",
  android: "https://clsdev.com.br/api/v1/",
});

export const cPixApi = axios.create({
  baseURL,
});

cPixApi.interceptors.response.use(
  (config) => config,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(new AppError("Falha na requisição"));
    }
  },
);
