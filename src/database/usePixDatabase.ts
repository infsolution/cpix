import { KeyCreate, KeyResponse, KeyUpdate, TypeKey } from "@/app/Type/types";
import { useSQLiteContext } from "expo-sqlite";

export function usePixDatabase() {
  const database = useSQLiteContext();

  async function create(data: KeyCreate) {
    const statement = await database.prepareAsync(
      `INSERT INTO keys (universal_uuid, name, key, bank, is_public) VALUES ($universal_uuid, $name, $key, $bank, $is_public)`,
    );

    await statement.executeAsync({
      $universal_uuid: data.universal_uuid,
      $name: data.name,
      $key: data.key,
      $bank: data.bank,
      $is_public: data.is_public,
    });
  }

  function listKeys(own: number) {
    const data = database.getAllAsync<KeyResponse>(
      `SELECT keys.*, null AS selected, key AS keyPix, banks.name AS bank FROM keys LEFT JOIN banks ON keys.bank = banks.code WHERE own = ${own}`,
    );
    return data;
  }

  function getKey(id: string) {
    const response = database.getFirstAsync<TypeKey>(
      `SELECT keys.*, banks.name AS bank FROM keys LEFT JOIN banks ON keys.bank = banks.code WHERE keys.id = '${id}'`,
      {
        $id: id,
      },
    );
    return response;
  }

  //Updates

  async function updateKey(data: KeyUpdate) {
    const statement = await database.prepareAsync(`UPDATE keys SET 
            name = $name, 
            key = $key, 
            bank = $bank,
            is_public = $is_public,
            updated_at = CURRENT_TIMESTAMP
            WHERE id = $id`);
    await statement.executeAsync({
      $id: data.id,
      $name: data.name,
      $key: data.key,
      $bank: data.bank,
      $is_public: data.is_public,
    });
  }

  //Deletes

  async function deleteKey(keys: string[]) {
    const placeholders = keys.map(() => "?").join(",");
    await database.runAsync(
      `DELETE FROM keys WHERE id IN  (${placeholders})`,
      keys,
    );
  }

  async function createOrUpdate(date: KeyCreate) {
    if (date.id) {
      await updateKey({
        id: date.id,
        name: date.name,
        key: date.key,
        bank: date.bank,
        is_public: date.is_public,
      });
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
    createOrUpdate,
  };
}
