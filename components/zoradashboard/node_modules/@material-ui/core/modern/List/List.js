import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
const _excluded = ["children", "className", "component", "dense", "disablePadding", "subheader"];
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

const useUtilityClasses = styleProps => {
  const {
    classes,
    disablePadding,
    dense,
    subheader
  } = styleProps;
  const slots = {
    root: ['root', !disablePadding && 'padding', dense && 'dense', subheader && 'subheader']
  };
  return composeClasses(slots, getListUtilityClass, classes);
};

const ListRoot = styled('ul', {
  name: 'MuiList',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return [styles.root, !styleProps.disablePadding && styles.padding, styleProps.dense && styles.dense, styleProps.subheader && styles.subheader];
  }
})(({
  styleProps
}) => _extends({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  position: 'relative'
}, !styleProps.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, styleProps.subheader && {
  paddingTop: 0
}));
const List = /*#__PURE__*/React.forwardRef(function List(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiList'
  });

  const {
    children,
    className,
    component = 'ul',
    dense = false,
    disablePadding = false,
    subheader
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const context = React.useMemo(() => ({
    dense
  }), [dense]);

  const styleProps = _extends({}, props, {
    component,
    dense,
    disablePadding
  });

  const classes = useUtilityClasses(styleProps);
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