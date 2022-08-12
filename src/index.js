module.exports = function check(str, bracketsConfig) {
  let stack = [];
  function getType(elem, bracketsConfig) {
    for (let pair of bracketsConfig) {
      if (pair.includes(elem)) {
        if (pair[0] == pair[1]) {
          return "open_close";
        } else if (pair.indexOf(elem) === 0) {
          return "open";
        } else {
          return "close";
        }
      }
    }
    return "notIncluded";
  }

  function isInSamePair(open, close) {
    for (let pair of bracketsConfig) {
      if (pair.includes(open) && pair.includes(close)) {
        return pair.indexOf(open) === 0 && pair.indexOf(close) === 1
          ? true
          : false;
      }
    }
  }

  for (let i = 0; i < str.length; i++) {
    let current = str[i];

    let typeCurrent = getType(current, bracketsConfig);

    if (typeCurrent === "notIncluded") {
      continue;
    } else if (typeCurrent === "open_close") {
      if (stack[stack.length - 1] == current) {
        stack.pop();
      } else {
        stack.push(current);
      }
    } else if (typeCurrent === "open") {
      stack.push(current);
    } else if (typeCurrent === "close") {
      if (stack.length === 0) {
        return false;
      }
      let lastElement = stack[stack.length - 1];
      if (isInSamePair(lastElement, current)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
};
