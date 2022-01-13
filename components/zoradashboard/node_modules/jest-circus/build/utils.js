'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.invariant = invariant;
exports.parseSingleTestResult = exports.addErrorToEachTestUnderDescribe = exports.getTestID = exports.makeSingleTestResult = exports.makeRunResult = exports.getTestDuration = exports.callAsyncCircusFn = exports.describeBlockHasTests = exports.getEachHooksForTest = exports.getAllHooksForDescribe = exports.makeTest = exports.makeDescribe = void 0;

var path = _interopRequireWildcard(require('path'));

var _jestUtil = require('jest-util');

var _isGeneratorFn = _interopRequireDefault(require('is-generator-fn'));

var _co = _interopRequireDefault(require('co'));

var _dedent = _interopRequireDefault(require('dedent'));

var _stackUtils = _interopRequireDefault(require('stack-utils'));

var _prettyFormat = _interopRequireDefault(require('pretty-format'));

var _state = require('./state');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function () {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return {default: obj};
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj.default = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
var jestNow = global[Symbol.for('jest-native-now')] || global.Date.now;
var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
var Promise = global[Symbol.for('jest-native-promise')] || global.Promise;
const stackUtils = new _stackUtils.default({
  cwd: 'A path that does not exist'
});
const jestEachBuildDir = path.dirname(require.resolve('jest-each'));

const makeDescribe = (name, parent, mode) => {
  let _mode = mode;

  if (parent && !mode) {
    // If not set explicitly, inherit from the parent describe.
    _mode = parent.mode;
  }

  return {
    type: 'describeBlock',
    // eslint-disable-next-line sort-keys
    children: [],
    hooks: [],
    mode: _mode,
    name: (0, _jestUtil.convertDescriptorToString)(name),
    parent,
    tests: []
  };
};

exports.makeDescribe = makeDescribe;

const makeTest = (fn, mode, name, parent, timeout, asyncError) => ({
  type: 'test',
  // eslint-disable-next-line sort-keys
  asyncError,
  duration: null,
  errors: [],
  fn,
  invocations: 0,
  mode,
  name: (0, _jestUtil.convertDescriptorToString)(name),
  parent,
  startedAt: null,
  status: null,
  timeout
}); // Traverse the tree of describe blocks and return true if at least one describe
// block has an enabled test.

exports.makeTest = makeTest;

const hasEnabledTest = describeBlock => {
  const {hasFocusedTests, testNamePattern} = (0, _state.getState)();
  return describeBlock.children.some(child =>
    child.type === 'describeBlock'
      ? hasEnabledTest(child)
      : !(
          child.mode === 'skip' ||
          (hasFocusedTests && child.mode !== 'only') ||
          (testNamePattern && !testNamePattern.test(getTestID(child)))
        )
  );
};

const getAllHooksForDescribe = describe => {
  const result = {
    afterAll: [],
    beforeAll: []
  };

  if (hasEnabledTest(describe)) {
    for (const hook of describe.hooks) {
      switch (hook.type) {
        case 'beforeAll':
          result.beforeAll.push(hook);
          break;

        case 'afterAll':
          result.afterAll.push(hook);
          break;
      }
    }
  }

  return result;
};

exports.getAllHooksForDescribe = getAllHooksForDescribe;

const getEachHooksForTest = test => {
  const result = {
    afterEach: [],
    beforeEach: []
  };
  let block = test.parent;

  do {
    const beforeEachForCurrentBlock = []; // TODO: inline after https://github.com/microsoft/TypeScript/pull/34840 is released

    let hook;

    for (hook of block.hooks) {
      switch (hook.type) {
        case 'beforeEach':
          beforeEachForCurrentBlock.push(hook);
          break;

        case 'afterEach':
          result.afterEach.push(hook);
          break;
      }
    } // 'beforeEach' hooks are executed from top to bottom, the opposite of the
    // way we traversed it.

    result.beforeEach = [...beforeEachForCurrentBlock, ...result.beforeEach];
  } while ((block = block.parent));

  return result;
};

exports.getEachHooksForTest = getEachHooksForTest;

const describeBlockHasTests = describe =>
  describe.children.some(
    child => child.type === 'test' || describeBlockHasTests(child)
  );

exports.describeBlockHasTests = describeBlockHasTests;

const _makeTimeoutMessage = (timeout, isHook) =>
  `Exceeded timeout of ${(0, _jestUtil.formatTime)(timeout)} for a ${
    isHook ? 'hook' : 'test'
  }.\nUse jest.setTimeout(newTimeout) to increase the timeout value, if this is a long-running test.`; // Global values can be overwritten by mocks or tests. We'll capture
// the original values in the variables before we require any files.

const {setTimeout, clearTimeout} = global;

function checkIsError(error) {
  return !!(error && error.message && error.stack);
}

const callAsyncCircusFn = (testOrHook, testContext, {isHook, timeout}) => {
  let timeoutID;
  let completed = false;
  const {fn, asyncError} = testOrHook;
  return new Promise((resolve, reject) => {
    timeoutID = setTimeout(
      () => reject(_makeTimeoutMessage(timeout, isHook)),
      timeout
    ); // If this fn accepts `done` callback we return a promise that fulfills as
    // soon as `done` called.

    if (fn.length) {
      let returnedValue = undefined;

      const done = reason => {
        // We need to keep a stack here before the promise tick
        const errorAtDone = new _jestUtil.ErrorWithStack(undefined, done); // Use `Promise.resolve` to allow the event loop to go a single tick in case `done` is called synchronously

        Promise.resolve().then(() => {
          if (returnedValue !== undefined) {
            asyncError.message = (0, _dedent.default)`
      Test functions cannot both take a 'done' callback and return something. Either use a 'done' callback, or return a promise.
      Returned value: ${(0, _prettyFormat.default)(returnedValue, {
        maxDepth: 3
      })}
      `;
            return reject(asyncError);
          }

          let errorAsErrorObject;

          if (checkIsError(reason)) {
            errorAsErrorObject = reason;
          } else {
            errorAsErrorObject = errorAtDone;
            errorAtDone.message = `Failed: ${(0, _prettyFormat.default)(
              reason,
              {
                maxDepth: 3
              }
            )}`;
          } // Consider always throwing, regardless if `reason` is set or not

          if (completed && reason) {
            errorAsErrorObject.message =
              'Caught error after test environment was torn down\n\n' +
              errorAsErrorObject.message;
            throw errorAsErrorObject;
          }

          return reason ? reject(errorAsErrorObject) : resolve();
        });
      };

      returnedValue = fn.call(testContext, done);
      return;
    }

    let returnedValue;

    if ((0, _isGeneratorFn.default)(fn)) {
      returnedValue = _co.default.wrap(fn).call({});
    } else {
      try {
        returnedValue = fn.call(testContext);
      } catch (error) {
        reject(error);
        return;
      }
    } // If it's a Promise, return it. Test for an object with a `then` function
    // to support custom Promise implementations.

    if (
      typeof returnedValue === 'object' &&
      returnedValue !== null &&
      typeof returnedValue.then === 'function'
    ) {
      returnedValue.then(resolve, reject);
      return;
    }

    if (!isHook && returnedValue !== undefined) {
      reject(
        new Error((0, _dedent.default)`
      test functions can only return Promise or undefined.
      Returned value: ${(0, _prettyFormat.default)(returnedValue, {
        maxDepth: 3
      })}
      `)
      );
      return;
    } // Otherwise this test is synchronous, and if it didn't throw it means
    // it passed.

    resolve();
  })
    .then(() => {
      completed = true; // If timeout is not cleared/unrefed the node process won't exit until
      // it's resolved.

      timeoutID.unref && timeoutID.unref();
      clearTimeout(timeoutID);
    })
    .catch(error => {
      completed = true;
      timeoutID.unref && timeoutID.unref();
      clearTimeout(timeoutID);
      throw error;
    });
};

exports.callAsyncCircusFn = callAsyncCircusFn;

const getTestDuration = test => {
  const {startedAt} = test;
  return typeof startedAt === 'number' ? jestNow() - startedAt : null;
};

exports.getTestDuration = getTestDuration;

const makeRunResult = (describeBlock, unhandledErrors) => ({
  testResults: makeTestResults(describeBlock),
  unhandledErrors: unhandledErrors.map(_getError).map(getErrorStack)
});

exports.makeRunResult = makeRunResult;

const makeSingleTestResult = test => {
  const {includeTestLocationInResult} = (0, _state.getState)();
  const testPath = [];
  let parent = test;
  const {status} = test;
  invariant(status, 'Status should be present after tests are run.');

  do {
    testPath.unshift(parent.name);
  } while ((parent = parent.parent));

  let location = null;

  if (includeTestLocationInResult) {
    var _parsedLine, _parsedLine$file;

    const stackLines = test.asyncError.stack.split('\n');
    const stackLine = stackLines[1];
    let parsedLine = stackUtils.parseLine(stackLine);

    if (
      (_parsedLine = parsedLine) === null || _parsedLine === void 0
        ? void 0
        : (_parsedLine$file = _parsedLine.file) === null ||
          _parsedLine$file === void 0
        ? void 0
        : _parsedLine$file.startsWith(jestEachBuildDir)
    ) {
      const stackLine = stackLines[4];
      parsedLine = stackUtils.parseLine(stackLine);
    }

    if (
      parsedLine &&
      typeof parsedLine.column === 'number' &&
      typeof parsedLine.line === 'number'
    ) {
      location = {
        column: parsedLine.column,
        line: parsedLine.line
      };
    }
  }

  const errorsDetailed = test.errors.map(_getError);
  return {
    duration: test.duration,
    errors: errorsDetailed.map(getErrorStack),
    errorsDetailed,
    invocations: test.invocations,
    location,
    status,
    testPath: Array.from(testPath)
  };
};

exports.makeSingleTestResult = makeSingleTestResult;

const makeTestResults = describeBlock => {
  const testResults = [];

  for (const child of describeBlock.children) {
    switch (child.type) {
      case 'describeBlock': {
        testResults.push(...makeTestResults(child));
        break;
      }

      case 'test': {
        testResults.push(makeSingleTestResult(child));
        break;
      }
    }
  }

  return testResults;
}; // Return a string that identifies the test (concat of parent describe block
// names + test title)

const getTestID = test => {
  const titles = [];
  let parent = test;

  do {
    titles.unshift(parent.name);
  } while ((parent = parent.parent));

  titles.shift(); // remove TOP_DESCRIBE_BLOCK_NAME

  return titles.join(' ');
};

exports.getTestID = getTestID;

const _getError = errors => {
  let error;
  let asyncError;

  if (Array.isArray(errors)) {
    error = errors[0];
    asyncError = errors[1];
  } else {
    error = errors;
    asyncError = new Error();
  }

  if (error && (error.stack || error.message)) {
    return error;
  }

  asyncError.message = `thrown: ${(0, _prettyFormat.default)(error, {
    maxDepth: 3
  })}`;
  return asyncError;
};

const getErrorStack = error => error.stack || error.message;

const addErrorToEachTestUnderDescribe = (describeBlock, error, asyncError) => {
  for (const child of describeBlock.children) {
    switch (child.type) {
      case 'describeBlock':
        addErrorToEachTestUnderDescribe(child, error, asyncError);
        break;

      case 'test':
        child.errors.push([error, asyncError]);
        break;
    }
  }
};

exports.addErrorToEachTestUnderDescribe = addErrorToEachTestUnderDescribe;

function invariant(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const parseSingleTestResult = testResult => {
  let status;

  if (testResult.status === 'skip') {
    status = 'pending';
  } else if (testResult.status === 'todo') {
    status = 'todo';
  } else if (testResult.errors.length > 0) {
    status = 'failed';
  } else {
    status = 'passed';
  }

  const ancestorTitles = testResult.testPath.filter(
    name => name !== _state.ROOT_DESCRIBE_BLOCK_NAME
  );
  const title = ancestorTitles.pop();
  return {
    ancestorTitles,
    duration: testResult.duration,
    failureDetails: testResult.errorsDetailed,
    failureMessages: Array.from(testResult.errors),
    fullName: title
      ? ancestorTitles.concat(title).join(' ')
      : ancestorTitles.join(' '),
    invocations: testResult.invocations,
    location: testResult.location,
    numPassingAsserts: 0,
    status,
    title: testResult.testPath[testResult.testPath.length - 1]
  };
};

exports.parseSingleTestResult = parseSingleTestResult;
