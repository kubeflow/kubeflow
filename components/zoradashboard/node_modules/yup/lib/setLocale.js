"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setLocale;

var _locale = _interopRequireDefault(require("./locale"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setLocale(custom) {
  Object.keys(custom).forEach(type => {
    Object.keys(custom[type]).forEach(method => {
      _locale.default[type][method] = custom[type][method];
    });
  });
}