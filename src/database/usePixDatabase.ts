
import { KeyCreate, KeyResponse, KeyUpdate, TypeKey, UserCreate, UserLoged } from "@/app/Type/types"
import { useSQLiteContext } from "expo-sqlite"

export function usePixDatabase() {
    const database = useSQLiteContext()

    async function create(data: KeyCreate) {
        const statement = await database.prepareAsync(`INSERT INTO keys (user_id, name, key, bank, is_public, own) VALUES ($user_id, $name, $key, $bank, $is_public, $own)`);

        await statement.executeAsync({
            $user_id: data.user_id,
            $name: data.name,
            $key: data.key,
            $bank: data.bank,
            $is_public: data.is_public,
            $own: data.own
        })
    }

    function listKeys(own: number) {
        const data = database.getAllAsync<KeyResponse>(`SELECT *, null AS selected, key AS keyPix FROM keys WHERE own = ${own}`)
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
            is_public = $is_public,
            own = $own,
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $id`);
        await statement.executeAsync({
            $id: data.id,
            $name: data.name,
            $key: data.key,
            $bank: data.bank,
            $is_public: data.is_public,
            $own: data.own
        })
    }

    //Deletes

    async function deleteKey(keys: string[]) {
        const placeholders = keys.map(() => '?').join(',');
        await database.runAsync(`DELETE FROM keys WHERE id IN  (${placeholders})`, keys)
    }

    async function createOrUodate(date: KeyCreate) {
        if (date.id) {
            await updateKey({
                id: date.id,
                name: date.name,
                key: date.key,
                bank: date.bank,
                is_public: date.is_public,
                own: date.own
            })
        } else {
            await create(date);
        }
    }

    return {
        listKeys,
        create,
        getKey,
        updateKey,
        deleteKey,
        createOrUodate
    }
}