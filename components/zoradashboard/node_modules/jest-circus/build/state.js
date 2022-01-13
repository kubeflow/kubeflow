'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.addEventHandler = exports.dispatchSync = exports.dispatch = exports.setState = exports.getState = exports.ROOT_DESCRIBE_BLOCK_NAME = void 0;

var _types = require('./types');

var _utils = require('./utils');

var _eventHandler = _interopRequireDefault(require('./eventHandler'));

var _formatNodeAssertErrors = _interopRequireDefault(
  require('./formatNodeAssertErrors')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const eventHandlers = [_eventHandler.default, _formatNodeAssertErrors.default];
const ROOT_DESCRIBE_BLOCK_NAME = 'ROOT_DESCRIBE_BLOCK';
exports.ROOT_DESCRIBE_BLOCK_NAME = ROOT_DESCRIBE_BLOCK_NAME;
const ROOT_DESCRIBE_BLOCK = (0, _utils.makeDescribe)(ROOT_DESCRIBE_BLOCK_NAME);
const INITIAL_STATE = {
  currentDescribeBlock: ROOT_DESCRIBE_BLOCK,
  currentlyRunningTest: null,
  expand: undefined,
  hasFocusedTests: false,
  hasStarted: false,
  includeTestLocationInResult: false,
  parentProcess: null,
  rootDescribeBlock: ROOT_DESCRIBE_BLOCK,
  testNamePattern: null,
  testTimeout: 5000,
  unhandledErrors: []
};
global[_types.STATE_SYM] = INITIAL_STATE;

const getState = () => global[_types.STATE_SYM];

exports.getState = getState;

const setState = state => (global[_types.STATE_SYM] = state);

exports.setState = setState;

const dispatch = async event => {
  for (const handler of eventHandlers) {
    await handler(event, getState());
  }
};

exports.dispatch = dispatch;

const dispatchSync = event => {
  for (const handler of eventHandlers) {
    handler(event, getState());
  }
};

exports.dispatchSync = dispatchSync;

const addEventHandler = handler => {
  eventHandlers.push(handler);
};

exports.addEventHandler = addEventHandler;
