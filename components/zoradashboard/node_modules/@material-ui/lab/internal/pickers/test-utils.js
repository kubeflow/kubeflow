import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["locale"];
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
export class AdapterClassToUse extends AdapterDateFns {
  date(value) {
    if (typeof value === 'string') {
      return parseISO(value);
    }

    return super.date(value);
  }

}
export const adapterToUse = new AdapterClassToUse();
export const FakeTransitionComponent = /*#__PURE__*/React.forwardRef(function FakeTransitionComponent({
  children
}, ref) {
  // set tabIndex in case it is used as a child of <TrapFocus />
  return /*#__PURE__*/_jsx("div", {
    ref: ref,
    tabIndex: -1,
    children: children
  });
});
export function wrapPickerMount(mount) {
  return node => mount( /*#__PURE__*/_jsx(LocalizationProvider, {
    dateAdapter: AdapterClassToUse,
    children: node
  }));
}
export function createPickerRender(_ref = {}) {
  let {
    locale
  } = _ref,
      renderOptions = _objectWithoutPropertiesLoose(_ref, _excluded);

  const clientRender = createClientRender(renderOptions);

  function Wrapper({
    children
  }) {
    return /*#__PURE__*/_jsx(LocalizationProvider, {
      locale: locale,
      dateAdapter: AdapterClassToUse,
      children: children
    });
  }

  return (node, options) => clientRender(node, _extends({}, options, {
    wrapper: Wrapper
  }));
}
export const queryByMuiTest = queryHelpers.queryByAttribute.bind(null, 'data-mui-test');
export const queryAllByMuiTest = queryHelpers.queryAllByAttribute.bind(null, 'data-mui-test');
export function getAllByMuiTest(id, container = document.body, options) {
  const els = queryAllByMuiTest(container, id, options);

  if (!els.length) {
    throw queryHelpers.getElementError(`Unable to find an element by: [data-mui-test="${id}"]`, container);
  }

  return els;
}
export function getByMuiTest(...args) {
  const result = getAllByMuiTest(...args);

  if (result.length > 0) {
    return result[0];
  }

  throw queryHelpers.getElementError(`Unable to find an element by: [data-mui-test="${args[0]}"]`, document.body);
}
export function openMobilePicker() {
  fireEvent.click(screen.getByRole('textbox'));
}