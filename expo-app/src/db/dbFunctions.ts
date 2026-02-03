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

const getTemperaturesFromDB = async () => {};
const setCurrentTemperatureFromDB = async (currentTemperature: number) => {
  const db = await SQLite.openDatabaseAsync("myAppDatabase.db");
  try {
    await db.execAsync(
      `UPDATE thermostats SET value = ${currentTemperature} WHERE id = ${AsyncStorageKeysEnum.BackendCurrentTemperature};`,
    );
  } catch {}
};
const setTargetTemperatureFromDB = async (targetTemperature: number) => {
  const db = await SQLite.openDatabaseAsync("myAppDatabase.db");
  try {
    await db.execAsync(
      `UPDATE thermostats SET value = ${targetTemperature} WHERE id = ${AsyncStorageKeysEnum.BackendTargetTemperature};`,
    );
  } catch {}
};

export {
  initDatabase,
  getTemperaturesFromDB,
  setCurrentTemperatureFromDB,
  setTargetTemperatureFromDB,
};
