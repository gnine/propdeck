import { openDB } from "idb";

const DB_NAME = "tripdeck-local";
const DB_VERSION = 1;

export const storeNames = ["clients", "products", "proposals", "settings", "rep", "emailLogs"];

export async function getDb() {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      for (const name of storeNames) {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, { keyPath: "id" });
        }
      }
    },
  });
}

export async function getAll(storeName) {
  return (await getDb()).getAll(storeName);
}

export async function getOne(storeName, id) {
  return (await getDb()).get(storeName, id);
}

export async function putOne(storeName, value) {
  return (await getDb()).put(storeName, { ...value, updatedAt: new Date().toISOString() });
}

export async function deleteOne(storeName, id) {
  return (await getDb()).delete(storeName, id);
}
