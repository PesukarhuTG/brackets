module.exports = function check(str, bracketsConfig) {
  let stack = [];
  let brackets = {};
  let equalSymbol = [];

  //из входящего массива заберем пары символов открытие/закрытие
  for (let item of bracketsConfig) {
    //в каждом подмассиве
    for (let i = 0; i < item.length; i += 2) {
      //если символ открытия == символу закрытия, выносим в отдельный массив
      if (item[i] === item[i + 1]) {
        equalSymbol.push(item[i]);
      } else {
        //иначе заносим в объект в виде 'символ закрытия': 'символ открытия'
        brackets[item[i + 1]] = item[i];
      }
    }
  }

  //отдельно сохраним в массив все закрывающие символы из сформированного объекта
  let closeBrackets = Object.keys(brackets);

  //пробежимся по каждому символу входящей строки
  for (let i = 0; i < str.length; i++) {
    //если встретили символ, у которого открытие и закрытие одинаково
    for (let item of equalSymbol) {
      if (str[i] === item) {
        //и если этого символа нет в нашем объекте
        if (brackets.hasOwnProperty('str[i]') === false) {
          //добавляем в объект новую пару ключ-значение
          brackets[[str[i]]] = str[i];
        }
      }
    }

    //если массив закрывающих символов содержит символ строки
    if (closeBrackets.indexOf(str[i]) > -1) {
      //и если в паре ключ-значение, значение открывающего символа не равно последнему символу в стеке, то проверка не выполнена
      if (brackets[str[i]] !== stack.pop()) return false;

      //если встретили |, 7, 8... в закрытии, то теперь их нужно удалить из основного объекта
      //т.к. если далее символы встретятся снова, то на первой проверке выдаст true и логика потеряется
      for (let item of equalSymbol) {
        if (str[i] === item) {
          delete brackets[[str[i]]];
        }
      }
    } else {
      //т.е. символ открывающий, добавляем в стек
      stack.push(str[i]);
    }

    //обновляем массив ключей в конце функции, иначе |/7/8 попадет в стек сразу проверка пойдет на эти символы
    closeBrackets = Object.keys(brackets);
  }
  return stack.length === 0;
}
