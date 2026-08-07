import { type SQLiteDatabase } from "expo-sqlite";
import { seedDatabaseFromCSV } from "./bankSeeder";

export const DATABASE_NAME = "cpix.db";

export async function migrate(db: SQLiteDatabase) {
  await db.execAsync(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            user_name TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            universal_uuid TEXT NOT NULL UNIQUE,
            is_public BOOLEAN NOT NULL DEFAULT 0, 
            image TEXT,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS keys(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            universal_uuid TEXT NOT NULL,
            name TEXT NOT NULL,
            key TEXT NOT NULL UNIQUE,
            bank TEXT NOT NULL,
            is_public BOOLEAN NOT NULL DEFAULT 0,
            own INTEGER NOT NULL DEFAULT 0,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (universal_uuid) REFERENCES users(universal_uuid) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS banks(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            code TEXT NOT NULL UNIQUE
        );
        `);

  await seedDatabaseFromCSV();
}
