import { default as sqlite3 } from "sqlite3";
import { default as DBG } from "debug";

const debug = DBG("notes:account-sqlite3");
const error = DBG("notes:error-sqlite3");

const defaultDBName = "accounts.sqlite3";

export let db;

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
