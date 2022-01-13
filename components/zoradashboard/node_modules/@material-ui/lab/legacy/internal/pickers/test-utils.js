import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _get from "@babel/runtime/helpers/esm/get";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import * as React from 'react';
import { parseISO } from 'date-fns';
import { createClientRender, fireEvent, screen } from 'test/utils';
import { queryHelpers } from '@testing-library/react/pure';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider'; // TODO make possible to pass here any utils using cli

/**
 * Wrapper around `@date-io/date-fns` that resolves https://github.com/dmtrKovalenko/date-io/issues/479.
 * We're not using `adapter.date` in the implementation which means the implementation is safe.
 * But we do use it in tests where usage of ISO dates without timezone is problematic
 */

import { jsx as _jsx } from "react/jsx-runtime";
export var AdapterClassToUse = /*#__PURE__*/function (_AdapterDateFns) {
  _inherits(AdapterClassToUse, _AdapterDateFns);

  var _super = _createSuper(AdapterClassToUse);

  function AdapterClassToUse() {
    _classCallCheck(this, AdapterClassToUse);

    return _super.apply(this, arguments);
  }

  _createClass(AdapterClassToUse, [{
    key: "date",
    value: function date(value) {
      if (typeof value === 'string') {
        return parseISO(value);
      }

      return _get(_getPrototypeOf(AdapterClassToUse.prototype), "date", this).call(this, value);
    }
  }]);

  return AdapterClassToUse;
}(AdapterDateFns);
export var adapterToUse = new AdapterClassToUse();
export var FakeTransitionComponent = /*#__PURE__*/React.forwardRef(function FakeTransitionComponent(_ref, ref) {
  var children = _ref.children;
  // set tabIndex in case it is used as a child of <TrapFocus />
  return /*#__PURE__*/_jsx("div", {
    ref: ref,
    tabIndex: -1,
    children: children
  });
});
export function wrapPickerMount(mount) {
  return function (node) {
    return mount( /*#__PURE__*/_jsx(LocalizationProvider, {
      dateAdapter: AdapterClassToUse,
      children: node
    }));
  };
}
export function createPickerRender() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var locale = _ref2.locale,
      renderOptions = _objectWithoutProperties(_ref2, ["locale"]);

  var clientRender = createClientRender(renderOptions);

  function Wrapper(_ref3) {
    var children = _ref3.children;
    return /*#__PURE__*/_jsx(LocalizationProvider, {
      locale: locale,
      dateAdapter: AdapterClassToUse,
      children: children
    });
  }

  return function (node, options) {
    return clientRender(node, _extends({}, options, {
      wrapper: Wrapper
    }));
  };
}
export var queryByMuiTest = queryHelpers.queryByAttribute.bind(null, 'data-mui-test');
export var queryAllByMuiTest = queryHelpers.queryAllByAttribute.bind(null, 'data-mui-test');
export function getAllByMuiTest(id) {
  var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
  var options = arguments.length > 2 ? arguments[2] : undefined;
  var els = queryAllByMuiTest(container, id, options);

  if (!els.length) {
    throw queryHelpers.getElementError("Unable to find an element by: [data-mui-test=\"".concat(id, "\"]"), container);
  }

  return els;
}
export function getByMuiTest() {
  var result = getAllByMuiTest.apply(void 0, arguments);

  if (result.length > 0) {
    return result[0];
  }

  throw queryHelpers.getElementError("Unable to find an element by: [data-mui-test=\"".concat(arguments.length <= 0 ? undefined : arguments[0], "\"]"), document.body);
}
export function openMobilePicker() {
  fireEvent.click(screen.getByRole('textbox'));
}