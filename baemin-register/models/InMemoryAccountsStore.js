import { AbstractAccountsStore } from "./AbstractAccountsStore.js";
import { Account } from "./Account.js";

const accounts = {};

const mockAccount = new Account(
  "temp@woowaha.com",
  "123",
  "010-8888-8888",
  "woowa",
  new Date()
);

accounts[mockAccount.id] = mockAccount;

export class InMemoryAccountsStore extends AbstractAccountsStore {
  async close() {}

  async create(id, password, phonenumber, nickname, dateOfBirth) {
    accounts[id] = new Account(
      id,
      password,
      phonenumber,
      nickname,
      dateOfBirth
    );
    return accounts[id];
  }

  async retrieve(id) {
    if (accounts[id]) return accounts[id];
    else throw new Error(`Account ${id} does not exist`);
  }
}
