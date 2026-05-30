import { FormSigninParams } from "@/app/Type/interfaces";
import { UserCreate } from "@/app/Type/types";
import { IUser } from "@/shared/interfaces/user-interface";
import { useSQLiteContext } from "expo-sqlite"
export function useUserDatabase() {
    const database = useSQLiteContext();

    async function create(data: UserCreate): Promise<IUser | null> {
        const statement = await database.prepareAsync(`INSERT INTO users (name, email, universal_uuid, password, is_public) VALUES ($name, $email, $universal_uuid, $password, $is_public)`);

        const { lastInsertRowId } = await statement.executeAsync({
            $name: data.name,
            $email: data.email,
            $universal_uuid: data.universal_uuid,
            $password: data.password,
            $is_public: data.termChecked,
        })
        return getUserById(lastInsertRowId.toString()) as Promise<IUser | null>;
    }
    function login(data: { email: string, password: string }) {
        const response = database.getFirstAsync<IUser>(`SELECT * FROM users WHERE email = '${data.email}' AND password = '${data.password}'`, {
            $email: data.email,
            $password: data.password
        })
        return response;
    }

    async function getUserById(id: string): Promise<IUser | null> {
        const response = await database.getFirstAsync<IUser>(`SELECT * FROM users WHERE id = ${id}`);
        return response;
    }

    return {
        create,
        login,
    }
}