"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class ESLintError extends Error {
  /**
   * @param {string=} messages
   */
  constructor(messages) {
    super(messages);
    this.name = 'ESLintError';
    this.stack = '';
  }

}

var _default = ESLintError;
exports.default = _default;