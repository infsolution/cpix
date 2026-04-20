
import { userCrete, userLoged } from "@/app/Type/types"
import { useSQLiteContext } from "expo-sqlite"

export function usePixDatabase() {
    const database = useSQLiteContext()
    async function create(data: userCrete) {
        const statement = await database.prepareAsync(`INSERT INTO users (name, email, password) VALUES ($name, $email, $password)`);

        statement.executeAsync({
            $name: data.name,
            $email: data.email,
            $password: data.password
        })
    }

    async function login(data: { email: string, password: string }) {
        const response = database.getFirstAsync<userLoged>(`SELECT * FROM users WHERE email = '${data.email}' AND password = '${data.password}'`, {
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