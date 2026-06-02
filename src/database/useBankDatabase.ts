import { Bank } from "@/app/Type/types";
import { useSQLiteContext } from "expo-sqlite";

export function useBankDatabase() {
  const database = useSQLiteContext();

  function listBanks() {
    return database.getAllAsync<Bank>(
      `SELECT id, name, code FROM banks ORDER BY name COLLATE NOCASE ASC`,
    );
  }

  function getBank(code: string) {
    return database.getFirstAsync<Bank>(
      `SELECT id, name, code FROM banks WHERE code = $code`,
      { $code: code },
    );
  }

  return {
    listBanks,
    getBank,
  };
}
