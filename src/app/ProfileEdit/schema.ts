import * as yup from "yup";

export const schema = yup.object().shape({
  id: yup.string().required("O id é obrigatório"),
  name: yup
    .string()
    .min(6, "O nome deve ter seis caracteres")
    .required("O nome é obrigatório"),
  userName: yup
    .string()
    .min(6, "O nome de usuário deve ter seis caracteres")
    .required("O nome de usuário é obrigatório"),
  email: yup.string().email("Email inválido").required("O email é obrigatório"),
  termChecked: yup.boolean().required(),
});
