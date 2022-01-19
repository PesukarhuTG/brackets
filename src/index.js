module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const brackets = {
    ')': '(',
    ']': '[',
    '}': '{',
  }

  //выведем массив всех закрывающих скобок
  const closeBrackets = Object.keys(brackets);

  //пробежимся по каждому символу входящей строки
  for (let i = 0; i < str.length; i++) {
    //если массив закр. скобок содержит букву строки
    if (closeBrackets.indexOf(str[i]) > -1) {
      //если в паре ключ-значение, значение открывающей скобки не равно последнему символу в стеке, то проверка не выполнена
      if (brackets[str[i]] !== stack.pop()) {
        return false;
      }
    } else {
      //т.е. скобка открывающая, добавляем в стек
      stack.push(str[i]);
    }
  }
  return stack.length === 0;
}
