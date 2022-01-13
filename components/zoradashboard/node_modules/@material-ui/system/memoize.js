"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = memoize;

function memoize(fn) {
  const cache = {};
  return arg => {
    if (cache[arg] === undefined) {
      cache[arg] = fn(arg);
    }

    return cache[arg];
  };
}