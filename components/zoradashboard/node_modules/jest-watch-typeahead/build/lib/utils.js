"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeTrimmingDots = exports.formatTestNameByPattern = exports.highlight = exports.getTerminalWidth = exports.trimAndFormatPath = void 0;

var _path = _interopRequireDefault(require("path"));

var _chalk = _interopRequireDefault(require("chalk"));

var _slash = _interopRequireDefault(require("slash"));

var _stripAnsi = _interopRequireDefault(require("strip-ansi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-param-reassign */
const TRIMMING_DOTS = '...';
const ENTER = '⏎';

const relativePath = (config, testPath) => {
  testPath = _path.default.relative(config.cwd || config.rootDir, testPath);

  const dirname = _path.default.dirname(testPath);

  const basename = _path.default.basename(testPath);

  return {
    basename,
    dirname
  };
};

const colorize = (str, start, end) => _chalk.default.dim(str.slice(0, start)) + _chalk.default.reset(str.slice(start, end)) + _chalk.default.dim(str.slice(end));

const trimAndFormatPath = (pad, config, testPath, columns) => {
  const maxLength = columns - pad;
  const relative = relativePath(config, testPath);
  const basename = relative.basename;
  let dirname = relative.dirname; // length is ok

  if ((dirname + _path.default.sep + basename).length <= maxLength) {
    return (0, _slash.default)(_chalk.default.dim(dirname + _path.default.sep) + _chalk.default.bold(basename));
  } // we can fit trimmed dirname and full basename


  const basenameLength = basename.length;

  if (basenameLength + 4 < maxLength) {
    const dirnameLength = maxLength - 4 - basenameLength;
    dirname = `${TRIMMING_DOTS}${dirname.slice(dirname.length - dirnameLength, dirname.length)}`;
    return (0, _slash.default)(_chalk.default.dim(dirname + _path.default.sep) + _chalk.default.bold(basename));
  }

  if (basenameLength + 4 === maxLength) {
    return (0, _slash.default)(_chalk.default.dim(`${TRIMMING_DOTS}${_path.default.sep}`) + _chalk.default.bold(basename));
  } // can't fit dirname, but can fit trimmed basename


  return (0, _slash.default)(_chalk.default.bold(`${TRIMMING_DOTS}${basename.slice(-maxLength + 3)}`));
};

exports.trimAndFormatPath = trimAndFormatPath;

const getTerminalWidth = (pipe = process.stdout) => pipe.columns;

exports.getTerminalWidth = getTerminalWidth;

const highlight = (rawPath, filePath, pattern, rootDir) => {
  const relativePathHead = './';
  let regexp;

  try {
    regexp = new RegExp(pattern, 'i');
  } catch (e) {
    return _chalk.default.dim(filePath);
  }

  rawPath = (0, _stripAnsi.default)(rawPath);
  filePath = (0, _stripAnsi.default)(filePath);
  const match = rawPath.match(regexp);

  if (!match) {
    return _chalk.default.dim(filePath);
  }

  let offset;
  let trimLength;

  if (filePath.startsWith(TRIMMING_DOTS)) {
    offset = rawPath.length - filePath.length;
    trimLength = TRIMMING_DOTS.length;
  } else if (filePath.startsWith(relativePathHead)) {
    offset = rawPath.length - filePath.length;
    trimLength = relativePathHead.length;
  } else {
    offset = rootDir.length + _path.default.sep.length;
    trimLength = 0;
  }

  const start = match.index - offset;
  const end = start + match[0].length;
  return colorize(filePath, Math.max(start, 0), Math.max(end, trimLength));
};

exports.highlight = highlight;

const formatTestNameByPattern = (testName, pattern, width) => {
  const inlineTestName = testName.replace(/(\r\n|\n|\r)/gm, ENTER);
  let regexp;

  try {
    regexp = new RegExp(pattern, 'i');
  } catch (e) {
    return _chalk.default.dim(inlineTestName);
  }

  const match = inlineTestName.match(regexp);

  if (!match) {
    return _chalk.default.dim(inlineTestName);
  } // $FlowFixMe


  const startPatternIndex = Math.max(match.index, 0);
  const endPatternIndex = startPatternIndex + match[0].length;
  const testNameFitsInTerminal = inlineTestName.length <= width;

  if (testNameFitsInTerminal) {
    return colorize(inlineTestName, startPatternIndex, endPatternIndex);
  }

  const numberOfTruncatedChars = TRIMMING_DOTS.length + inlineTestName.length - width;
  const end = Math.max(endPatternIndex - numberOfTruncatedChars, 0);
  const truncatedTestName = inlineTestName.slice(numberOfTruncatedChars);
  const shouldHighlightDots = startPatternIndex <= numberOfTruncatedChars;

  if (shouldHighlightDots) {
    return colorize(TRIMMING_DOTS + truncatedTestName, 0, end + TRIMMING_DOTS.length);
  }

  const start = startPatternIndex - numberOfTruncatedChars;
  return colorize(TRIMMING_DOTS + truncatedTestName, start + TRIMMING_DOTS.length, end + TRIMMING_DOTS.length);
};

exports.formatTestNameByPattern = formatTestNameByPattern;

const removeTrimmingDots = value => {
  if (value.startsWith(TRIMMING_DOTS)) {
    return value.slice(TRIMMING_DOTS.length);
  }

  return value;
};

exports.removeTrimmingDots = removeTrimmingDots;