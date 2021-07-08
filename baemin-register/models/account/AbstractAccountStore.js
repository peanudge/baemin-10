export class AbstractAccountStore {
  async close() {}
  async create(id, password, phonenumber, nickname, dateOfBirth) {}
  async retrieve(id) {}
}
