import _toArray from "@babel/runtime/helpers/esm/toArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Collapse from '../Collapse';
import Paper from '../Paper';
import AccordionContext from './AccordionContext';
import useControlled from '../utils/useControlled';
import accordionClasses, { getAccordionUtilityClass } from './accordionClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      square = styleProps.square,
      expanded = styleProps.expanded,
      disabled = styleProps.disabled,
      disableGutters = styleProps.disableGutters;
  var slots = {
    root: ['root', !square && 'rounded', expanded && 'expanded', disabled && 'disabled', !disableGutters && 'gutters'],
    region: ['region']
  };
  return composeClasses(slots, getAccordionUtilityClass, classes);
};

var AccordionRoot = styled(Paper, {
  name: 'MuiAccordion',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [_defineProperty({}, "& .".concat(accordionClasses.region), styles.region), styles.root, !styleProps.square && styles.rounded, !styleProps.disableGutters && styles.gutters];
  }
})(function (_ref2) {
  var _ref3;

  var theme = _ref2.theme;
  var transition = {
    duration: theme.transitions.duration.shortest
  };
  return _ref3 = {
    position: 'relative',
    transition: theme.transitions.create(['margin'], transition),
    overflowAnchor: 'none',
    // Keep the same scrolling position
    '&:before': {
      position: 'absolute',
      left: 0,
      top: -1,
      right: 0,
      height: 1,
      content: '""',
      opacity: 1,
      backgroundColor: theme.palette.divider,
      transition: theme.transitions.create(['opacity', 'background-color'], transition)
    },
    '&:first-of-type': {
      '&:before': {
        display: 'none'
      }
    }
  }, _defineProperty(_ref3, "&.".concat(accordionClasses.expanded), {
    '&:before': {
      opacity: 0
    },
    '&:first-of-type': {
      marginTop: 0
    },
    '&:last-of-type': {
      marginBottom: 0
    },
    '& + &': {
      '&:before': {
        display: 'none'
      }
    }
  }), _defineProperty(_ref3, "&.".concat(accordionClasses.disabled), {
    backgroundColor: theme.palette.action.disabledBackground
  }), _ref3;
}, function (_ref4) {
  var theme = _ref4.theme,
      styleProps = _ref4.styleProps;
  return _extends({}, !styleProps.square && {
    borderRadius: 0,
    '&:first-of-type': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius
    },
    '&:last-of-type': {
      borderBottomLeftRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
      // Fix a rendering issue on Edge
      '@supports (-ms-ime-align: auto)': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      }
    }
  }, !styleProps.disableGutters && _defineProperty({}, "&.".concat(accordionClasses.expanded), {
    margin: '16px 0'
  }));
});
var Accordion = /*#__PURE__*/React.forwardRef(function Accordion(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiAccordion'
  });

  var childrenProp = props.children,
      className = props.className,
      _props$defaultExpande = props.defaultExpanded,
      defaultExpanded = _props$defaultExpande === void 0 ? false : _props$defaultExpande,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableGutters = props.disableGutters,
      disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
      expandedProp = props.expanded,
      onChange = props.onChange,
      _props$square = props.square,
      square = _props$square === void 0 ? false : _props$square,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? Collapse : _props$TransitionComp,
      TransitionProps = props.TransitionProps,
      other = _objectWithoutProperties(props, ["children", "className", "defaultExpanded", "disabled", "disableGutters", "expanded", "onChange", "square", "TransitionComponent", "TransitionProps"]);

  var _useControlled = useControlled({
    controlled: expandedProp,
    default: defaultExpanded,
    name: 'Accordion',
    state: 'expanded'
  }),
      _useControlled2 = _slicedToArray(_useControlled, 2),
      expanded = _useControlled2[0],
      setExpandedState = _useControlled2[1];

  var handleChange = React.useCallback(function (event) {
    setExpandedState(!expanded);

    if (onChange) {
      onChange(event, !expanded);
    }
  }, [expanded, onChange, setExpandedState]);

  var _React$Children$toArr = React.Children.toArray(childrenProp),
      _React$Children$toArr2 = _toArray(_React$Children$toArr),
      summary = _React$Children$toArr2[0],
      children = _React$Children$toArr2.slice(1);

  var contextValue = React.useMemo(function () {
    return {
      expanded: expanded,
      disabled: disabled,
      disableGutters: disableGutters,
      toggle: handleChange
    };
  }, [expanded, disabled, disableGutters, handleChange]);

  var styleProps = _extends({}, props, {
    square: square,
    disabled: disabled,
    disableGutters: disableGutters,
    expanded: expanded
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsxs(AccordionRoot, _extends({
    className: clsx(classes.root, className),
    ref: ref,
    styleProps: styleProps,
    square: square
  }, other, {
    children: [/*#__PURE__*/_jsx(AccordionContext.Provider, {
      value: contextValue,
      children: summary
    }), /*#__PURE__*/_jsx(TransitionComponent, _extends({
      in: expanded,
      timeout: "auto"
    }, TransitionProps, {
      children: /*#__PURE__*/_jsx("div", {
        "aria-labelledby": summary.props.id,
        id: summary.props['aria-controls'],
        role: "region",
        className: classes.region,
        children: children
      })
    }))]
  }));
});
process.env.NODE_ENV !== "production" ? Accordion.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: chainPropTypes(PropTypes.node.isRequired, function (props) {
    var summary = React.Children.toArray(props.children)[0];

    if (isFragment(summary)) {
      return new Error("Material-UI: The Accordion doesn't accept a Fragment as a child. " + 'Consider providing an array instead.');
    }

    if (! /*#__PURE__*/React.isValidElement(summary)) {
      return new Error('Material-UI: Expected the first child of Accordion to be a valid element.');
    }

    return null;
  }),

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * If `true`, expands the accordion by default.
   * @default false
   */
  defaultExpanded: PropTypes.bool,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, it removes the margin between two expanded accordion items and the increase of height.
   * @default false
   */
  disableGutters: PropTypes.bool,

  /**
   * If `true`, expands the accordion, otherwise collapse it.
   * Setting this prop enables control over the accordion.
   */
  expanded: PropTypes.bool,

  /**
   * Callback fired when the expand/collapse state is changed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {boolean} expanded The `expanded` state of the accordion.
   */
  onChange: PropTypes.func,

  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  TransitionComponent: PropTypes.elementType,

  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps: PropTypes.object
} : void 0;
export default Accordion;