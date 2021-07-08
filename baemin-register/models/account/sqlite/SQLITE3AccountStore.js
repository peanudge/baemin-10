import { AbstractAccountStore } from "../AbstractAccountStore.js";
import { Account } from "../Account.js";

import { db, connectDB } from "./account-sqlite3.js";

export class SQLITE3AccountStore extends AbstractAccountStore {
  async close() {
    const _db = db;
    db = undefined;
    return _db
      ? new Promise((resolve, reject) => {
          _db.close((err) => {
            if (err) reject(err);
            else resolve();
          });
        })
      : undefined;
  }

  async create(id, password, phonenumber, nickname, dateOfBirth) {
    const db = await connectDB();
    // TODO: Add Hashing password using bcrypt.
    const account = new Account(
      id,
      password,
      phonenumber,
      nickname,
      dateOfBirth
    );

    await new Promise((resolve, reject) => {
      db.run(
        "INSERT INTO accounts ( id, password, phoneNumber, dateOfBirth, nickname) " +
          "VALUES ( ?, ? , ?, ?, ? );",
        [id, password, phonenumber, dateOfBirth, nickname],
        (err) => {
          if (err) return reject(err);
          resolve(account);
        }
      );
    });

    return account;
  }

  /**
   *
   * @param {String} id
   * @returns if find account, function returns Account Object, otherwise returns null.
   */
  async retrieve(id) {
    const db = await connectDB();
    const account = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM accounts WHERE id = ?", [id], (err, row) => {
        if (err) return reject(err);
        if (row) {
          const { id, password, phoneNumber, nickname, dateOfBirth } = row;
          const account = new Account(
            id,
            password,
            phoneNumber,
            nickname,
            dateOfBirth
          );
          resolve(account);
        } else {
          resolve(null);
        }
      });
    });
    return account;
  }
}
