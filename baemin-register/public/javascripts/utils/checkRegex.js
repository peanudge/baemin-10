function checkRegex(type) {
  let regex = null;

  if (type === 'email') {
    regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  }
  if (type === 'phone') {
    regex = /^[0][1][0-9]-\d{4}-\d{4}$/;
  }
  if (type === 'password') {
    regex = /^[0-9a-zA-Z]${10-}/
  }
  if (type === 'birthday') {
    regex = /^(19|20)\d{2}.(0[1-9]|1[0-2]).(0[1-9]|1[0-9]|3[0-1])$/;
  }

  function testRegex(string) {
    return regex.test(string);
  }

  return testRegex;
}

export default checkRegex;
