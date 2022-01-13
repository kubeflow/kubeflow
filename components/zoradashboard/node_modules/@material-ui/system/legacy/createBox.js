import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styled from '@material-ui/styled-engine';
import styleFunctionSx, { extendSxProp } from './styleFunctionSx';
import useTheme from './useTheme';
import { jsx as _jsx } from "react/jsx-runtime";
export default function createBox() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultTheme = options.defaultTheme;
  var BoxRoot = styled('div')(styleFunctionSx);
  var Box = /*#__PURE__*/React.forwardRef(function Box(inProps, ref) {
    var theme = useTheme(defaultTheme);

    var _extendSxProp = extendSxProp(inProps),
        className = _extendSxProp.className,
        _extendSxProp$compone = _extendSxProp.component,
        component = _extendSxProp$compone === void 0 ? 'div' : _extendSxProp$compone,
        other = _objectWithoutProperties(_extendSxProp, ["className", "component"]);

    return /*#__PURE__*/_jsx(BoxRoot, _extends({
      as: component,
      ref: ref,
      className: clsx(className, 'MuiBox-root'),
      theme: theme
    }, other));
  });
  process.env.NODE_ENV !== "production" ? Box.propTypes
  /* remove-proptypes */
  = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------

    /**
     * @ignore
     */
    children: PropTypes.node,

    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: PropTypes.elementType,

    /**
     * @ignore
     */
    sx: PropTypes.object
  } : void 0;
  return Box;
}