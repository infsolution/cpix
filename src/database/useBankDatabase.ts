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

  function listBanks(own: number) {
    const data = database.getAllAsync<KeyResponse>(`SELECT * FROM banks`);
    return data;
  }

  function getBank(code: string) {
    const response = database.getFirstAsync<TypeKey>(
      `SELECT * FROM banks WHERE code = '${code}'`,
      {
        $code: code,
      },
    );
    return response;
  }

  return {
    listBanks,
    getBank,
  };
}
