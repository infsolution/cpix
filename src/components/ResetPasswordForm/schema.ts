import * as yup from "yup";

export const schema = yup.object().shape({
  password: yup
    .string()
    .min(6, "A senha deve ter seis caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("A confirmação de senha é obrigatória"),
});
