import * as SQLite from "expo-sqlite";
import { AsyncStorageKeysEnum } from "@/constants/AsyncStorageKeysEnum";

const initDatabase = async () => {
  try {
    // Open (or create) the database file
    const db = await SQLite.openDatabaseAsync("myAppDatabase.db");

    // Execute the setup script
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS thermostats (
        id TEXT PRIMARY KEY NOT NULL,
        value TEXT NOT NULL UNIQUE,
      );

      INSERT INTO thermostats (id, value) VALUES (${AsyncStorageKeysEnum.BackendCurrentTemperature}, '45');
      INSERT INTO thermostats (id, value) VALUES (${AsyncStorageKeysEnum.BackendTargetTemperature}, '10');
    `);

    console.log("Database initialized successfully");
    return db;
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

export { initDatabase };
