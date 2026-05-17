import * as yup from "yup"

export const schema = yup.object().shape({
    user_id: yup.string().required("O ID do usuário é obrigatório"),
    name: yup.string().min(6, "O nome deve ter seis caracteres").required("O nome é obrigatório"),
    bank: yup.string().min(6, "O banco deve ter seis caracteres").required("O banco é obrigatório"),
    key: yup.string().min(6, "A chave deve ter seis caracteres").required("A chave é obrigatória"),
    is_public: yup.boolean().required("O campo is_public é obrigatório"),
    own: yup.number().default(0).required()
})