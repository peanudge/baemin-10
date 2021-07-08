const _account_isAgreeTerms = Symbol("isAgreeTerms");
const _account_phoneNumber = Symbol("phoneNumber");

export class RegisterInfo {
  constructor() {
    this[_account_isAgreeTerms] = false;
    this[_account_phoneNumber] = null;
  }
  get isAgreeTerms() {
    return this[_account_isAgreeTerms];
  }
  get phoneNumber() {
    return this[_account_phoneNumber];
  }
  set isAgreeTerms(agree) {
    this[_account_isAgreeTerms] = Boolean(agree);
  }
  set phoneNumber(phoneNumber) {
    this[_account_phoneNumber] = phoneNumber;
  }
}
