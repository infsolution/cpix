
import { KeyCreate, KeyResponse, KeyUpdate, TypeKey, UserCrete, UserLoged } from "@/app/Type/types"
import { useSQLiteContext } from "expo-sqlite"

export function usePixDatabase() {
    const database = useSQLiteContext()

    //Creates
    async function create(data: UserCrete) {
        const statement = await database.prepareAsync(`INSERT INTO users (name, email, password) VALUES ($name, $email, $password)`);

        await statement.executeAsync({
            $name: data.name,
            $email: data.email,
            $password: data.password
        })
    }

    async function addKey(data: KeyCreate) {
        const statement = await database.prepareAsync(`INSERT INTO keys (user_id, name, key, bank, is_public) VALUES ($user_id, $name, $key, $bank, $is_public)`);

        await statement.executeAsync({
            $user_id: data.user_id,
            $name: data.name,
            $key: data.key,
            $bank: data.bank,
            $is_public: data.is_public,
        })
    }

    //Gets
    function login(data: { email: string, password: string }) {
        const response = database.getFirstAsync<UserLoged>(`SELECT * FROM users WHERE email = '${data.email}' AND password = '${data.password}'`, {
            $email: data.email,
            $password: data.password
        })
        return response;
    }


    function listKeys() {
        const data = database.getAllAsync<KeyResponse>(`SELECT *, null AS selected FROM keys`)
        return data;
    }

    function getKey(id: string) {
        const response = database.getFirstAsync<TypeKey>(`SELECT * FROM keys WHERE id = '${id}'`, {
            $id: id,
        })
        return response;
    }

    //Updates

    async function updateKey(data: KeyUpdate) {
        const statement = await database.prepareAsync(`UPDATE keys SET 
            name = $name, 
            key = $key, 
            bank = $bank,
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $id`);
        await statement.executeAsync({
            $id: data.id,
            $name: data.name,
            $key: data.key,
            $bank: data.bank,
        })
    }

    //Deletes

    async function deleteKey(keys: string[]) {
        const placeholders = keys.map(() => '?').join(',');
        await database.runAsync(`DELETE FROM keys WHERE id IN  (${placeholders})`, keys)
    }

    return {
        create,
        login,
        listKeys,
        addKey,
        getKey,
        updateKey,
        deleteKey
    }
}