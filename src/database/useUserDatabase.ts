import { UserCreate, UserLoged } from "@/app/Type/types"
import { useSQLiteContext } from "expo-sqlite"
export function useUserDatabase() {
    const database = useSQLiteContext();

    async function create(data: UserCreate): Promise<UserLoged | null> {
        const statement = await database.prepareAsync(`INSERT INTO users (name, email, password) VALUES ($name, $email, $password)`);

        const { lastInsertRowId } = await statement.executeAsync({
            $name: data.name,
            $email: data.email,
            $password: data.password
        })
        return getUserById(lastInsertRowId.toString()) as Promise<UserLoged | null>;
    }
    function login(data: { email: string, password: string }) {
        const response = database.getFirstAsync<UserLoged>(`SELECT * FROM users WHERE email = '${data.email}' AND password = '${data.password}'`, {
            $email: data.email,
            $password: data.password
        })
        return response;
    }

    async function getUserById(id: string): Promise<UserLoged | null> {
        const response = await database.getFirstAsync<UserLoged>(`SELECT * FROM users WHERE id = ${id}`);
        return response;
    }

    return {
        create,
        login,
    }
}