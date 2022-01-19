module.exports = function check(str, bracketsConfig) {
  let stack = [];
  let brackets = {
    ')': '(',
    ']': '[',
    '}': '{',
  }

  //выведем массив всех закрывающих символов
  let closeBrackets = Object.keys(brackets);

  //пробежимся по каждому символу входящей строки
  for (let i = 0; i < str.length; i++) {

    //если встретили символ |
    if (str[i] === '|') {
      //если этого символа нет в объектк скобок
      if (brackets.hasOwnProperty('str[i]') === false) {
        //добавляем в объект новую пару
        brackets[[str[i]]] = str[i];
      }
    }

    //если массив закр. символов содержит букву строки
    if (closeBrackets.indexOf(str[i]) > -1) {
      //если в паре ключ-значение, значение открывающей скобки не равно последнему символу в стеке, то проверка не выполнена
      if (brackets[str[i]] !== stack.pop()) {
        return false;
      }

      //если символ | нашли в закрытии, то теперь его нужно удалить из основного объекта
      //т.к. если далее он встретится снова, то на первой проверке выдаст true и логика потеряется
      if (str[i] === '|') delete brackets[[str[i]]];


    } else {
      //т.е. скобка (символ) открывающая, добавляем в стек
      stack.push(str[i]);
    }

    //обновляем массив ключей в конце, иначе | попадет в стек сразу проверка на него пойдет
    closeBrackets = Object.keys(brackets);
  }
  return stack.length === 0;
}
