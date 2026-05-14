import * as yup from "yup"


export const schema = yup.object().shape({
    email: yup.string().email("Email inválido").required("O email é obriatório"),
    password: yup.string().min(6, "A senha deve ter seis caracteres").required()
})