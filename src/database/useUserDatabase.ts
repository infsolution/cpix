import { UserCrete, UserLoged } from "@/app/Type/types"
import { useSQLiteContext } from "expo-sqlite"
export function useUserDatabase() {
    const database = useSQLiteContext();

    async function create(data: UserCrete) {
        const statement = await database.prepareAsync(`INSERT INTO users (name, email, password) VALUES ($name, $email, $password)`);

        await statement.executeAsync({
            $name: data.name,
            $email: data.email,
            $password: data.password
        })
    }
    function login(data: { email: string, password: string }) {
        const response = database.getFirstAsync<UserLoged>(`SELECT * FROM users WHERE email = '${data.email}' AND password = '${data.password}'`, {
            $email: data.email,
            $password: data.password
        })
        return response;
    }

    return {
        create,
        login,
    }
}