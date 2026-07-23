import { File } from "expo-file-system";
import * as SQLite from "expo-sqlite";
import Papa from "papaparse";
import { Asset } from "expo-asset";
import { Bank, DbCount } from "@/app/Type/types";

// Initialize your database connection
const db = SQLite.openDatabaseSync("cpix.db");

export const seedDatabaseFromCSV = async () => {
  try {
    const asset = Asset.fromModule(require("@/assets/banks.csv"));
    await asset.downloadAsync();

    if (asset?.localUri) {
      const content = await new File(asset.localUri).text();
      const totalLines = content
        .split(/\r?\n/)
        .filter((line) => line.trim() !== "").length;
      const result = db.getFirstSync<DbCount>(
        "SELECT COUNT(*) as count FROM banks;",
      );

      if (result?.count && result.count >= totalLines) {
        return;
      }
      await db.execAsync("DELETE FROM banks;");
      await db.execAsync("DELETE FROM sqlite_sequence WHERE name='banks';");
      Papa.parse<string>(content, {
        header: false,
        skipEmptyLines: true,
        complete: async (results) => {
          const rows = results.data;
          db.withTransactionSync(() => {
            const statement = db.prepareSync(
              "INSERT INTO banks (name, code) VALUES (?, ?);",
            );
            try {
              for (const row of rows) {
                if (row[0] && row[1]) {
                  statement.executeSync([row[0], row[1]]);
                }
              }
            } finally {
              statement.finalizeSync();
            }
          });
        },
        error: (error: Error) => {
          console.error("Error parsing CSV file:", error);
        },
      });
    }
  } catch (error) {
    console.error("Failed to seed database:", error);
  }
};
