"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _styles = require("@material-ui/core/styles");

var _dimensions = require("../constants/dimensions");

var _WrapperVariantContext = require("./WrapperVariantContext");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const StaticWrapperRoot = (0, _styles.styled)('div', {
  skipSx: true
})(({
  theme
}) => ({
  overflow: 'hidden',
  minWidth: _dimensions.DIALOG_WIDTH,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper
}));

function StaticWrapper(props) {
  const {
    displayStaticWrapperAs,
    children
  } = props;
  const isStatic = true;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_WrapperVariantContext.IsStaticVariantContext.Provider, {
    value: isStatic,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_WrapperVariantContext.WrapperVariantContext.Provider, {
      value: displayStaticWrapperAs,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(StaticWrapperRoot, {
        children: children
      })
    })
  });
}

var _default = StaticWrapper;
exports.default = _default;