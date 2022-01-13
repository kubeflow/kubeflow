import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ListContext from './ListContext';
import { getListUtilityClass } from './listClasses';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      disablePadding = styleProps.disablePadding,
      dense = styleProps.dense,
      subheader = styleProps.subheader;
  var slots = {
    root: ['root', !disablePadding && 'padding', dense && 'dense', subheader && 'subheader']
  };
  return composeClasses(slots, getListUtilityClass, classes);
};

var ListRoot = styled('ul', {
  name: 'MuiList',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.root, !styleProps.disablePadding && styles.padding, styleProps.dense && styles.dense, styleProps.subheader && styles.subheader];
  }
})(function (_ref) {
  var styleProps = _ref.styleProps;
  return _extends({
    listStyle: 'none',
    margin: 0,
    padding: 0,
    position: 'relative'
  }, !styleProps.disablePadding && {
    paddingTop: 8,
    paddingBottom: 8
  }, styleProps.subheader && {
    paddingTop: 0
  });
});
var List = /*#__PURE__*/React.forwardRef(function List(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiList'
  });

  var children = props.children,
      className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? 'ul' : _props$component,
      _props$dense = props.dense,
      dense = _props$dense === void 0 ? false : _props$dense,
      _props$disablePadding = props.disablePadding,
      disablePadding = _props$disablePadding === void 0 ? false : _props$disablePadding,
      subheader = props.subheader,
      other = _objectWithoutProperties(props, ["children", "className", "component", "dense", "disablePadding", "subheader"]);

  var context = React.useMemo(function () {
    return {
      dense: dense
    };
  }, [dense]);

  var styleProps = _extends({}, props, {
    component: component,
    dense: dense,
    disablePadding: disablePadding
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsx(ListContext.Provider, {
    value: context,
    children: /*#__PURE__*/_jsxs(ListRoot, _extends({
      as: component,
      className: clsx(classes.root, className),
      ref: ref,
      styleProps: styleProps
    }, other, {
      children: [subheader, children]
    }))
  });
});
process.env.NODE_ENV !== "production" ? List.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: PropTypes.bool,

  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: PropTypes.bool,

  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: PropTypes.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object
} : void 0;
export default List;