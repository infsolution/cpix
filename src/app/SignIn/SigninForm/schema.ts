import * as yup from "yup"


export const schema = yup.object().shape({
    name: yup.string().min(6, "O nome deve ter seis caracteres").required("O nome é obrigatório"),
    email: yup.string().email("Email inválido").required("O email é obrigatório"),
    password: yup.string().min(6, "A senha deve ter seis caracteres").required("A senha é obrigatória"),
    confirmPassword: yup.string().oneOf([yup.ref("password")], "As senhas não coincidem").required("A confirmação de senha é obrigatória"),
    termChecked: yup.boolean().oneOf([true], "Você deve aceitar os termos e condições").required("Você deve aceitar os termos e condições")
})