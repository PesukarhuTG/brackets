module.exports = function check(str, bracketsConfig) {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') {
      stack.push(str[i]);
    } else if (str[i] === ')') {
      if (!stack.pop()) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
