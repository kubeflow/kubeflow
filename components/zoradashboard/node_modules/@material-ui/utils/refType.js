"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

const refType = _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object]);

var _default = refType;
exports.default = _default;