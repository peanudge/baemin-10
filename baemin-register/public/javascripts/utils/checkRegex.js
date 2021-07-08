const EMAIL_REGEX = {
  regex: '^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*' +
  '@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$',
  flag: 'i',
  isMatch: true,
} 
const PHONE_REGEX = {
  regex: '^[0][1][0-9]-\\d{4}-\\d{4}$',
  isMath: true,
}
const PASSWORD_COMBINATION_REGEX = {
  regex: '^(((?=.*[a-z])(?=.*[A-Z]))' +
    '|((?=.*[a-zA-Z])(?=.*[0-9]))|((?=.*[0-9])' +
    '(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]))|((?=.*[a-z])' +
    '(?=.*[A-Z])|(?=.*[a-zA-Z])(?=.*[$`~!@$!%*#^?&\\' +
    '(\\)\\-_=+]))).{10,}',
  isMatch: true,
}
const PASSWORD_SEQUENCE_REGEX = {
  regex: '012|123|234|345|456|567|678|789|987' +
    '|876|765|654|543|432|321|210|([0-9])\\1\\1',
  isMatch: false,
}
const BIRTHDAY_REGEX = {
  regex: '^(19|20)\\d{2}.(0[1-9]|1[0-2]).(0[1-9]|1' +
    '[0-9]|2[0-9]|3[0-1])$',
  flag: 'g',
  isMatch: true,
}

const testRegex = (regexList) => (string) => {
  const isPassedAll = regexList.reduce((result, regexObject) => {
    const {regex, flag, isMatch} = regexObject;
    console.log(new RegExp(regex, flag));
    const isOk = new RegExp(regex, flag).test(string);

    return result && (isOk === isMatch);
  }, true);
  
  return isPassedAll;
}

const checkRegex = {
  email: testRegex([EMAIL_REGEX]),
  phone: testRegex([PHONE_REGEX]),
  password: testRegex([
    PASSWORD_COMBINATION_REGEX,
    PASSWORD_SEQUENCE_REGEX,
  ]),
  birthday: testRegex([BIRTHDAY_REGEX]),
}

export default checkRegex;
