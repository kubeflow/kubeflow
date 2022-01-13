"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _transition = require("./transition");

Object.keys(_transition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _transition[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _transition[key];
    }
  });
});