var Query = require('./queries');
var Operator = require('./operators');

var NUMBERS = /[0-9]/;
var LETTERS = /[a-z|\-]/i;
var WHITESPACE = /\s/;
var COLON = /:/;
var COMMA = /,/;
var AND = /and$/;
var AT = /@/;

function tokenizer(input) {
  var current = 0;
  var tokens = [];

  while (current < input.length) {
    var char = input[current];

    if (AT.test(char)) {
      char = input[++current];
      while (LETTERS.test(char) && char !== undefined) {
        char = input[++current];
      }
    }

    if (WHITESPACE.test(char) || char === ')' || char === '(') {
      current++;
      continue;
    }

    if (COLON.test(char) || COMMA.test(char)) {
      current++;
      tokens.push({ type: 'operator', value: char });
      continue;
    }

    if (NUMBERS.test(char)) {
      var value = '';
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: 'number', value: value });
      continue;
    }

    if (LETTERS.test(char)) {
      var value = '';
      while (LETTERS.test(char) && char !== undefined) {
        value += char;
        char = input[++current];
      }
      if (AND.test(value)) {
        tokens.push({ type: 'operator', value: value });
      } else {
        tokens.push({ type: 'literal', value: value });
      }

      continue;
    }

    throw new TypeError(
      'Tokenizer: I dont know what this character is: ' + char
    );
  }

  return tokens;
}

function parser(tokens) {
  var output = [];
  var stack = [];

  while (tokens.length > 0) {
    var token = tokens.shift();

    if (token.type === 'number' || token.type === 'literal') {
      output.push(token);
      continue;
    }

    if (token.type === 'operator') {
      if (COLON.test(token.value)) {
        token = { type: 'query', key: output.pop(), value: tokens.shift() };
        output.push(token);
        continue;
      }

      while (stack.length > 0) {
        output.unshift(stack.pop());
      }
      stack.push(token);
    }
  }

  while (stack.length > 0) {
    output.unshift(stack.pop());
  }

  function walk() {
    var head = output.shift();

    if (head.type === 'number') {
      return parseInt(head.value);
    }

    if (head.type === 'literal') {
      return head.value;
    }

    if (head.type === 'operator') {
      var l = walk();
      var r = walk();

      return Operator(head.value, l, r);
    }

    if (head.type === 'query') {
      var l = head.key.value;
      var r = head.value.value;

      return Query(l, r);
    }
  }

  return walk();
}

module.exports = {
  parse: function(query) {
    var tokens = tokenizer(query);
    var ast = parser(tokens);
    return ast;
  }
};
