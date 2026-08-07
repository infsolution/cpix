import {
  ItemSearch,
  KeyCreate,
  KeyResponse,
  KeysToBackup,
  KeyUpdate,
  TypeKey,
} from "@/app/Type/types";
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

  async function listKeys(own: number, uuid: string) {
    const data = await database.getAllAsync<KeyResponse>(
      `SELECT keys.*, null AS selected, key AS keyPix, banks.code AS bank, 
      banks.name AS nameBank FROM keys LEFT JOIN banks 
      ON keys.bank = banks.code LEFT JOIN users AS u ON u.universal_uuid = keys.universal_uuid
      WHERE own = ${own} AND u.universal_uuid = '${uuid}'`,
    );
    return data;
  }

  function getKey(id: string) {
    const response = database.getFirstAsync<TypeKey>(
      `SELECT keys.*, banks.code AS bank, banks.name AS nameBank FROM keys LEFT JOIN banks ON keys.bank = banks.code WHERE keys.id = '${id}'`,
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

  //Search
  function searchKeys(term: string) {
    const data = database.getAllAsync<ItemSearch>(
      `SELECT keys.id, keys.name, keys.key AS keyPix, banks.name AS nameBank FROM keys 
      LEFT JOIN banks ON keys.bank = banks.code WHERE keys.name LIKE '%${term}%' OR keyPix LIKE '%${term}%' OR nameBank LIKE '%${term}%'`,
    );
    return data;
  }

  return {
    listKeys,
    create,
    getKey,
    updateKey,
    deleteKey,
    createOrUpdate,
    searchKeys,
  };
}
