const EMAIL_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
const PHONE_REGEX = /^[0][1][0-9]-\d{4}-\d{4}$/;
const PASSWORD_REGEX = /^[0-9a-zA-Z]${10-}/;
const BIRTHDAY_REGEX = /^(19|20)\d{2}.(0[1-9]|1[0-2]).(0[1-9]|1[0-9]|3[0-1])$/;

const testRegex = (regex) => (string) => {
  return regex.test(string);
}

const checkRegex = {
  email: testRegex(EMAIL_REGEX),
  phone: testRegex(PHONE_REGEX),
  password: testRegex(PASSWORD_REGEX),
  birthday: testRegex(BIRTHDAY_REGEX),
}

export default checkRegex;
