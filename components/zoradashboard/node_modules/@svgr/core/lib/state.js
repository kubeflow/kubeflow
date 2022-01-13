"use strict";

exports.__esModule = true;
exports.expandState = expandState;

var _path = _interopRequireDefault(require("path"));

var _camelcase = _interopRequireDefault(require("camelcase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validCharacters = /[^a-zA-Z0-9_-]/g;

function getComponentName(state) {
  if (!state.filePath) return 'SvgComponent';
  const pascalCaseFileName = (0, _camelcase.default)(_path.default.parse(state.filePath).name.replace(validCharacters, ''), {
    pascalCase: true
  });
  return `Svg${pascalCaseFileName}`;
}

function expandState(state) {
  return {
    componentName: state.componentName || getComponentName(state),
    ...state
  };
}