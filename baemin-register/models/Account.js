const _account_id = Symbol("email");
const _account_password = Symbol("password");
const _account_phonenumber = Symbol("phonenumber");
const _account_nickname = Symbol("nickname");
const _account_dateOfBirth = Symbol("dateOfBirth");

export class Account {
  constructor(id, password, phonenumber, nickname, dateOfBirth) {
    this[_account_id] = id;
    this[_account_password] = password;
    this[_account_phonenumber] = phonenumber;
    this[_account_nickname] = nickname;
    this[_account_dateOfBirth] = dateOfBirth;
  }

  get id() {
    return this[_account_id];
  }
  get password() {
    return this[_account_password];
  }
  get phonenumber() {
    return this[_account_phonenumber];
  }
  get nickname() {
    return this[_account_nickname];
  }
  get dateOfBirth() {
    return this[_account_dateOfBirth];
  }

  set id(id) {
    this[_account_id] = id;
  }
  set phonenumber(phonenumber) {
    this[_account_phonenumber] = phonenumber;
  }
  set nickname(nickname) {
    this[_account_nickname] = nickname;
  }
  set dateOfBirth(dateOfBirth) {
    this[_account_dateOfBirth] = dateOfBirth;
  }
}
