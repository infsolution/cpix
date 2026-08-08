import { identifyInput } from "@/utils/validateKey";
import * as yup from "yup";

export const schema = yup.object().shape({
  universal_uuid: yup.string().required("O ID do usuário é obrigatório"),
  name: yup
    .string()
    .min(6, "O nome deve ter seis caracteres")
    .required("O nome é obrigatório"),
  bank: yup.string().required("O banco é obrigatório"),
  key: yup
    .string()
    .min(6, "A chave deve ter seis caracteres")
    .required("A chave é obrigatória")
    .test("valid-key", "Informe uma chave PIX válida", (value) => {
      if (!value) return false;
      return identifyInput(value) !== "Chave inválida";
    }),
  is_public: yup.boolean().required("O campo is_public é obrigatório"),
});
