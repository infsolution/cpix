export type ItemPix = {
    id: string,
    name: string,
    bank: string,
    keyPix: string,
    selected: boolean | null
}

export type UserCreate = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    termChecked: boolean
}

export type UserLoged = {
    id: string,
    name: string,
    email: string,
    isLoged: boolean,
}

export type KeyResponse = {
    id: string,
    user_id: string,
    name: string,
    keyPix: string,
    bank: string,
    own: number,
    selected: boolean | null
}

export type KeyCreate = {
    id?: string,
    user_id: string,
    name: string,
    key: string,
    bank: string,
    is_public: boolean,
    own: number,
}

export type TypeKey = {
    user_id: string,
    name: string,
    key: string,
    bank: string,
    is_public: boolean,
    created_at: string
}

export type KeyUpdate = {
    id: string,
    name: string,
    key: string,
    bank: string,
    is_public: boolean,
    own: number,
}

export type KeysToShare = {
    id: string,
    name: string,
    keyPix: string,
}