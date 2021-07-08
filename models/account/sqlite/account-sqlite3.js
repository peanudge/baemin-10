import { default as sqlite3 } from "sqlite3";

import fs from "fs";

const defaultDBName = "accounts.sqlite3";

export let db;

/**
 * Create Account Table. this method is only used with InMemoryDB.
 */
export async function createAccountTable() {
  const createAccountTableQuery = fs
    .readFileSync("models/account/sqlite/schema/account-schema-sqlite3.sql")
    .toString();

  const database = await connectDB();
  await new Promise((resolve, reject) => {
    database.run(createAccountTableQuery, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

export async function connectDB() {
  if (db) return db;
  const dbfile = process.env.SQLITE_FILE || defaultDBName;

  await new Promise((resolve, reject) => {
    db = new sqlite3.Database(
      dbfile,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) return reject(err);
        resolve(db);
      }
    );
  });
  return db;
}
