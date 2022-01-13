import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import useTheme from '../styles/useTheme';
import debounce from '../utils/debounce';
import ownerWindow from '../utils/ownerWindow';
import { getNormalizedScrollLeft, detectScrollType } from '../utils/scrollLeft';
import animate from '../internal/animate';
import ScrollbarSize from './ScrollbarSize';
import TabScrollButton from '../TabScrollButton';
import useEventCallback from '../utils/useEventCallback';
import tabsClasses, { getTabsUtilityClass } from './tabsClasses';
import ownerDocument from '../utils/ownerDocument';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var nextItem = function nextItem(list, item) {
  if (list === item) {
    return list.firstChild;
  }

  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }

  return list.firstChild;
};

var previousItem = function previousItem(list, item) {
  if (list === item) {
    return list.lastChild;
  }

  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }

  return list.lastChild;
};

var moveFocus = function moveFocus(list, currentFocus, traversalFunction) {
  var wrappedOnce = false;
  var nextFocus = traversalFunction(list, currentFocus);

  while (nextFocus) {
    // Prevent infinite loop.
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) {
        return;
      }

      wrappedOnce = true;
    } // Same logic as useAutocomplete.js


    var nextFocusDisabled = nextFocus.disabled || nextFocus.getAttribute('aria-disabled') === 'true';

    if (!nextFocus.hasAttribute('tabindex') || nextFocusDisabled) {
      // Move to the next element.
      nextFocus = traversalFunction(list, nextFocus);
    } else {
      nextFocus.focus();
      return;
    }
  }
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var vertical = styleProps.vertical,
      fixed = styleProps.fixed,
      hideScrollbar = styleProps.hideScrollbar,
      scrollableX = styleProps.scrollableX,
      scrollableY = styleProps.scrollableY,
      centered = styleProps.centered,
      scrollButtonsHideMobile = styleProps.scrollButtonsHideMobile,
      classes = styleProps.classes;
  var slots = {
    root: ['root', vertical && 'vertical'],
    scroller: ['scroller', fixed && 'fixed', hideScrollbar && 'hideScrollbar', scrollableX && 'scrollableX', scrollableY && 'scrollableY'],
    flexContainer: ['flexContainer', vertical && 'flexContainerVertical', centered && 'centered'],
    indicator: ['indicator'],
    scrollButtons: ['scrollButtons', scrollButtonsHideMobile && 'scrollButtonsHideMobile'],
    scrollableX: [scrollableX && 'scrollableX'],
    hideScrollbar: [hideScrollbar && 'hideScrollbar']
  };
  return composeClasses(slots, getTabsUtilityClass, classes);
};

var TabsRoot = styled('div', {
  name: 'MuiTabs',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [_defineProperty({}, "& .".concat(tabsClasses.scrollButtons), styles.scrollButtons), _defineProperty({}, "& .".concat(tabsClasses.scrollButtons), styleProps.scrollButtonsHideMobile && styles.scrollButtonsHideMobile), styles.root, styleProps.vertical && styles.vertical];
  }
})(function (_ref3) {
  var styleProps = _ref3.styleProps,
      theme = _ref3.theme;
  return _extends({
    overflow: 'hidden',
    minHeight: 48,
    // Add iOS momentum scrolling for iOS < 13.0
    WebkitOverflowScrolling: 'touch',
    display: 'flex'
  }, styleProps.vertical && {
    flexDirection: 'column'
  }, styleProps.scrollButtonsHideMobile && _defineProperty({}, "& .".concat(tabsClasses.scrollButtons), _defineProperty({}, theme.breakpoints.down('sm'), {
    display: 'none'
  })));
});
var TabsScroller = styled('div', {
  name: 'MuiTabs',
  slot: 'Scroller',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.scroller, styleProps.fixed && styles.fixed, styleProps.hideScrollbar && styles.hideScrollbar, styleProps.scrollableX && styles.scrollableX, styleProps.scrollableY && styles.scrollableY];
  }
})(function (_ref5) {
  var styleProps = _ref5.styleProps;
  return _extends({
    position: 'relative',
    display: 'inline-block',
    flex: '1 1 auto',
    whiteSpace: 'nowrap'
  }, styleProps.fixed && {
    overflowX: 'hidden',
    width: '100%'
  }, styleProps.hideScrollbar && {
    // Hide dimensionless scrollbar on MacOS
    scrollbarWidth: 'none',
    // Firefox
    '&::-webkit-scrollbar': {
      display: 'none' // Safari + Chrome

    }
  }, styleProps.scrollableX && {
    overflowX: 'auto',
    overflowY: 'hidden'
  }, styleProps.scrollableY && {
    overflowY: 'auto',
    overflowX: 'hidden'
  });
});
var FlexContainer = styled('div', {
  name: 'MuiTabs',
  slot: 'FlexContainer',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return [styles.flexContainer, styleProps.vertical && styles.flexContainerVertical, styleProps.centered && styles.centered];
  }
})(function (_ref6) {
  var styleProps = _ref6.styleProps;
  return _extends({
    display: 'flex'
  }, styleProps.vertical && {
    flexDirection: 'column'
  }, styleProps.centered && {
    justifyContent: 'center'
  });
});
var TabsIndicator = styled('span', {
  name: 'MuiTabs',
  slot: 'Indicator',
  overridesResolver: function overridesResolver(props, styles) {
    return styles.indicator;
  }
})(function (_ref7) {
  var styleProps = _ref7.styleProps,
      theme = _ref7.theme;
  return _extends({
    position: 'absolute',
    height: 2,
    bottom: 0,
    width: '100%',
    transition: theme.transitions.create()
  }, styleProps.indicatorColor === 'primary' && {
    backgroundColor: theme.palette.primary.main
  }, styleProps.indicatorColor === 'secondary' && {
    backgroundColor: theme.palette.secondary.main
  }, styleProps.vertical && {
    height: '100%',
    width: 2,
    right: 0
  });
});
var TabsScrollbarSize = styled(ScrollbarSize, {
  name: 'MuiTabs',
  slot: 'ScrollbarSize'
})({
  overflowX: 'auto',
  overflowY: 'hidden',
  // Hide dimensionless scrollbar on MacOS
  scrollbarWidth: 'none',
  // Firefox
  '&::-webkit-scrollbar': {
    display: 'none' // Safari + Chrome

  }
});
var defaultIndicatorStyle = {};
var warnedOnceTabPresent = false;
var Tabs = /*#__PURE__*/React.forwardRef(function Tabs(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiTabs'
  });
  var theme = useTheme();
  var isRtl = theme.direction === 'rtl';

  var ariaLabel = props['aria-label'],
      ariaLabelledBy = props['aria-labelledby'],
      action = props.action,
      _props$centered = props.centered,
      centered = _props$centered === void 0 ? false : _props$centered,
      childrenProp = props.children,
      className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? 'div' : _props$component,
      _props$allowScrollBut = props.allowScrollButtonsMobile,
      allowScrollButtonsMobile = _props$allowScrollBut === void 0 ? false : _props$allowScrollBut,
      _props$indicatorColor = props.indicatorColor,
      indicatorColor = _props$indicatorColor === void 0 ? 'primary' : _props$indicatorColor,
      onChange = props.onChange,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
      _props$ScrollButtonCo = props.ScrollButtonComponent,
      ScrollButtonComponent = _props$ScrollButtonCo === void 0 ? TabScrollButton : _props$ScrollButtonCo,
      _props$scrollButtons = props.scrollButtons,
      scrollButtons = _props$scrollButtons === void 0 ? 'auto' : _props$scrollButtons,
      selectionFollowsFocus = props.selectionFollowsFocus,
      _props$TabIndicatorPr = props.TabIndicatorProps,
      TabIndicatorProps = _props$TabIndicatorPr === void 0 ? {} : _props$TabIndicatorPr,
      _props$TabScrollButto = props.TabScrollButtonProps,
      TabScrollButtonProps = _props$TabScrollButto === void 0 ? {} : _props$TabScrollButto,
      _props$textColor = props.textColor,
      textColor = _props$textColor === void 0 ? 'primary' : _props$textColor,
      value = props.value,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'standard' : _props$variant,
      _props$visibleScrollb = props.visibleScrollbar,
      visibleScrollbar = _props$visibleScrollb === void 0 ? false : _props$visibleScrollb,
      other = _objectWithoutProperties(props, ["aria-label", "aria-labelledby", "action", "centered", "children", "className", "component", "allowScrollButtonsMobile", "indicatorColor", "onChange", "orientation", "ScrollButtonComponent", "scrollButtons", "selectionFollowsFocus", "TabIndicatorProps", "TabScrollButtonProps", "textColor", "value", "variant", "visibleScrollbar"]);

  var scrollable = variant === 'scrollable';
  var vertical = orientation === 'vertical';
  var scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
  var start = vertical ? 'top' : 'left';
  var end = vertical ? 'bottom' : 'right';
  var clientSize = vertical ? 'clientHeight' : 'clientWidth';
  var size = vertical ? 'height' : 'width';

  var styleProps = _extends({}, props, {
    component: component,
    allowScrollButtonsMobile: allowScrollButtonsMobile,
    indicatorColor: indicatorColor,
    orientation: orientation,
    vertical: vertical,
    scrollButtons: scrollButtons,
    textColor: textColor,
    variant: variant,
    visibleScrollbar: visibleScrollbar,
    fixed: !scrollable,
    hideScrollbar: scrollable && !visibleScrollbar,
    scrollableX: scrollable && !vertical,
    scrollableY: scrollable && vertical,
    centered: centered && !scrollable,
    scrollButtonsHideMobile: !allowScrollButtonsMobile
  });

  var classes = useUtilityClasses(styleProps);

  if (process.env.NODE_ENV !== 'production') {
    if (centered && scrollable) {
      console.error('Material-UI: You can not use the `centered={true}` and `variant="scrollable"` properties ' + 'at the same time on a `Tabs` component.');
    }
  }

  var _React$useState = React.useState(false),
      mounted = _React$useState[0],
      setMounted = _React$useState[1];

  var _React$useState2 = React.useState(defaultIndicatorStyle),
      indicatorStyle = _React$useState2[0],
      setIndicatorStyle = _React$useState2[1];

  var _React$useState3 = React.useState({
    start: false,
    end: false
  }),
      displayScroll = _React$useState3[0],
      setDisplayScroll = _React$useState3[1];

  var _React$useState4 = React.useState({
    overflow: 'hidden',
    scrollbarWidth: 0
  }),
      scrollerStyle = _React$useState4[0],
      setScrollerStyle = _React$useState4[1];

  var valueToIndex = new Map();
  var tabsRef = React.useRef(null);
  var tabListRef = React.useRef(null);

  var getTabsMeta = function getTabsMeta() {
    var tabsNode = tabsRef.current;
    var tabsMeta;

    if (tabsNode) {
      var rect = tabsNode.getBoundingClientRect(); // create a new object with ClientRect class props + scrollLeft

      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollTop: tabsNode.scrollTop,
        scrollLeftNormalized: getNormalizedScrollLeft(tabsNode, theme.direction),
        scrollWidth: tabsNode.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right
      };
    }

    var tabMeta;

    if (tabsNode && value !== false) {
      var _children = tabListRef.current.children;

      if (_children.length > 0) {
        var tab = _children[valueToIndex.get(value)];

        if (process.env.NODE_ENV !== 'production') {
          if (!tab) {
            console.error(["Material-UI: The value provided to the Tabs component is invalid.", "None of the Tabs' children match with `".concat(value, "`."), valueToIndex.keys ? "You can provide one of the following values: ".concat(Array.from(valueToIndex.keys()).join(', '), ".") : null].join('\n'));
          }
        }

        tabMeta = tab ? tab.getBoundingClientRect() : null;

        if (process.env.NODE_ENV !== 'production') {
          if (process.env.NODE_ENV !== 'test' && !warnedOnceTabPresent && tabMeta && tabMeta.width === 0 && tabMeta.height === 0) {
            tabsMeta = null;
            console.error(['Material-UI: The value provided to the Tabs component is invalid.', "The Tab with this value (`".concat(value, "`) is not part of the document layout."), "Make sure the tab item is present in the document or that it's not display none."].join('\n'));
            warnedOnceTabPresent = true;
          }
        }
      }
    }

    return {
      tabsMeta: tabsMeta,
      tabMeta: tabMeta
    };
  };

  var updateIndicatorState = useEventCallback(function () {
    var _newIndicatorStyle;

    var _getTabsMeta = getTabsMeta(),
        tabsMeta = _getTabsMeta.tabsMeta,
        tabMeta = _getTabsMeta.tabMeta;

    var startValue = 0;
    var startIndicator;

    if (vertical) {
      startIndicator = 'top';

      if (tabMeta && tabsMeta) {
        startValue = tabMeta.top - tabsMeta.top + tabsMeta.scrollTop;
      }
    } else {
      startIndicator = isRtl ? 'right' : 'left';

      if (tabMeta && tabsMeta) {
        var correction = isRtl ? tabsMeta.scrollLeftNormalized + tabsMeta.clientWidth - tabsMeta.scrollWidth : tabsMeta.scrollLeft;
        startValue = (isRtl ? -1 : 1) * (tabMeta[startIndicator] - tabsMeta[startIndicator] + correction);
      }
    }

    var newIndicatorStyle = (_newIndicatorStyle = {}, _defineProperty(_newIndicatorStyle, startIndicator, startValue), _defineProperty(_newIndicatorStyle, size, tabMeta ? tabMeta[size] : 0), _newIndicatorStyle); // IE11 support, replace with Number.isNaN
    // eslint-disable-next-line no-restricted-globals

    if (isNaN(indicatorStyle[startIndicator]) || isNaN(indicatorStyle[size])) {
      setIndicatorStyle(newIndicatorStyle);
    } else {
      var dStart = Math.abs(indicatorStyle[startIndicator] - newIndicatorStyle[startIndicator]);
      var dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);

      if (dStart >= 1 || dSize >= 1) {
        setIndicatorStyle(newIndicatorStyle);
      }
    }
  });

  var scroll = function scroll(scrollValue) {
    var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref8$animation = _ref8.animation,
        animation = _ref8$animation === void 0 ? true : _ref8$animation;

    if (animation) {
      animate(scrollStart, tabsRef.current, scrollValue, {
        duration: theme.transitions.duration.standard
      });
    } else {
      tabsRef.current[scrollStart] = scrollValue;
    }
  };

  var moveTabsScroll = function moveTabsScroll(delta) {
    var scrollValue = tabsRef.current[scrollStart];

    if (vertical) {
      scrollValue += delta;
    } else {
      scrollValue += delta * (isRtl ? -1 : 1); // Fix for Edge

      scrollValue *= isRtl && detectScrollType() === 'reverse' ? -1 : 1;
    }

    scroll(scrollValue);
  };

  var getScrollSize = function getScrollSize() {
    var containerSize = tabsRef.current[clientSize];
    var totalSize = 0;
    var children = Array.from(tabListRef.current.children);

    for (var i = 0; i < children.length; i += 1) {
      var tab = children[i];

      if (totalSize + tab[clientSize] > containerSize) {
        break;
      }

      totalSize += tab[clientSize];
    }

    return totalSize;
  };

  var handleStartScrollClick = function handleStartScrollClick() {
    moveTabsScroll(-1 * getScrollSize());
  };

  var handleEndScrollClick = function handleEndScrollClick() {
    moveTabsScroll(getScrollSize());
  }; // TODO Remove <ScrollbarSize /> as browser support for hidding the scrollbar
  // with CSS improves.


  var handleScrollbarSizeChange = React.useCallback(function (scrollbarWidth) {
    setScrollerStyle({
      overflow: null,
      scrollbarWidth: scrollbarWidth
    });
  }, []);

  var getConditionalElements = function getConditionalElements() {
    var conditionalElements = {};
    conditionalElements.scrollbarSizeListener = scrollable ? /*#__PURE__*/_jsx(TabsScrollbarSize, {
      onChange: handleScrollbarSizeChange,
      className: clsx(classes.scrollableX, classes.hideScrollbar)
    }) : null;
    var scrollButtonsActive = displayScroll.start || displayScroll.end;
    var showScrollButtons = scrollable && (scrollButtons === 'auto' && scrollButtonsActive || scrollButtons === true);
    conditionalElements.scrollButtonStart = showScrollButtons ? /*#__PURE__*/_jsx(ScrollButtonComponent, _extends({
      orientation: orientation,
      direction: isRtl ? 'right' : 'left',
      onClick: handleStartScrollClick,
      disabled: !displayScroll.start
    }, TabScrollButtonProps, {
      className: clsx(classes.scrollButtons, TabScrollButtonProps.className)
    })) : null;
    conditionalElements.scrollButtonEnd = showScrollButtons ? /*#__PURE__*/_jsx(ScrollButtonComponent, _extends({
      orientation: orientation,
      direction: isRtl ? 'left' : 'right',
      onClick: handleEndScrollClick,
      disabled: !displayScroll.end
    }, TabScrollButtonProps, {
      className: clsx(classes.scrollButtons, TabScrollButtonProps.className)
    })) : null;
    return conditionalElements;
  };

  var scrollSelectedIntoView = useEventCallback(function (animation) {
    var _getTabsMeta2 = getTabsMeta(),
        tabsMeta = _getTabsMeta2.tabsMeta,
        tabMeta = _getTabsMeta2.tabMeta;

    if (!tabMeta || !tabsMeta) {
      return;
    }

    if (tabMeta[start] < tabsMeta[start]) {
      // left side of button is out of view
      var nextScrollStart = tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]);
      scroll(nextScrollStart, {
        animation: animation
      });
    } else if (tabMeta[end] > tabsMeta[end]) {
      // right side of button is out of view
      var _nextScrollStart = tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]);

      scroll(_nextScrollStart, {
        animation: animation
      });
    }
  });
  var updateScrollButtonState = useEventCallback(function () {
    if (scrollable && scrollButtons !== false) {
      var _tabsRef$current = tabsRef.current,
          scrollTop = _tabsRef$current.scrollTop,
          scrollHeight = _tabsRef$current.scrollHeight,
          clientHeight = _tabsRef$current.clientHeight,
          scrollWidth = _tabsRef$current.scrollWidth,
          clientWidth = _tabsRef$current.clientWidth;
      var showStartScroll;
      var showEndScroll;

      if (vertical) {
        showStartScroll = scrollTop > 1;
        showEndScroll = scrollTop < scrollHeight - clientHeight - 1;
      } else {
        var scrollLeft = getNormalizedScrollLeft(tabsRef.current, theme.direction); // use 1 for the potential rounding error with browser zooms.

        showStartScroll = isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
        showEndScroll = !isRtl ? scrollLeft < scrollWidth - clientWidth - 1 : scrollLeft > 1;
      }

      if (showStartScroll !== displayScroll.start || showEndScroll !== displayScroll.end) {
        setDisplayScroll({
          start: showStartScroll,
          end: showEndScroll
        });
      }
    }
  });
  React.useEffect(function () {
    var handleResize = debounce(function () {
      updateIndicatorState();
      updateScrollButtonState();
    });
    var win = ownerWindow(tabsRef.current);
    win.addEventListener('resize', handleResize);
    return function () {
      handleResize.clear();
      win.removeEventListener('resize', handleResize);
    };
  }, [updateIndicatorState, updateScrollButtonState]);
  var handleTabsScroll = React.useMemo(function () {
    return debounce(function () {
      updateScrollButtonState();
    });
  }, [updateScrollButtonState]);
  React.useEffect(function () {
    return function () {
      handleTabsScroll.clear();
    };
  }, [handleTabsScroll]);
  React.useEffect(function () {
    setMounted(true);
  }, []);
  React.useEffect(function () {
    updateIndicatorState();
    updateScrollButtonState();
  });
  React.useEffect(function () {
    // Don't animate on the first render.
    scrollSelectedIntoView(defaultIndicatorStyle !== indicatorStyle);
  }, [scrollSelectedIntoView, indicatorStyle]);
  React.useImperativeHandle(action, function () {
    return {
      updateIndicator: updateIndicatorState,
      updateScrollButtons: updateScrollButtonState
    };
  }, [updateIndicatorState, updateScrollButtonState]);

  var indicator = /*#__PURE__*/_jsx(TabsIndicator, _extends({}, TabIndicatorProps, {
    className: clsx(classes.indicator, TabIndicatorProps.className),
    styleProps: styleProps,
    style: _extends({}, indicatorStyle, TabIndicatorProps.style)
  }));

  var childIndex = 0;
  var children = React.Children.map(childrenProp, function (child) {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return null;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(["Material-UI: The Tabs component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    var childValue = child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex);
    var selected = childValue === value;
    childIndex += 1;
    return /*#__PURE__*/React.cloneElement(child, _extends({
      fullWidth: variant === 'fullWidth',
      indicator: selected && !mounted && indicator,
      selected: selected,
      selectionFollowsFocus: selectionFollowsFocus,
      onChange: onChange,
      textColor: textColor,
      value: childValue
    }, childIndex === 1 && value === false && !child.props.tabIndex ? {
      tabIndex: 0
    } : {}));
  });

  var handleKeyDown = function handleKeyDown(event) {
    var list = tabListRef.current;
    var currentFocus = ownerDocument(list).activeElement; // Keyboard navigation assumes that [role="tab"] are siblings
    // though we might warn in the future about nested, interactive elements
    // as a a11y violation

    var role = currentFocus.getAttribute('role');

    if (role !== 'tab') {
      return;
    }

    var previousItemKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    var nextItemKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';

    if (orientation === 'horizontal' && isRtl) {
      // swap previousItemKey with nextItemKey
      previousItemKey = 'ArrowRight';
      nextItemKey = 'ArrowLeft';
    }

    switch (event.key) {
      case previousItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, previousItem);
        break;

      case nextItemKey:
        event.preventDefault();
        moveFocus(list, currentFocus, nextItem);
        break;

      case 'Home':
        event.preventDefault();
        moveFocus(list, null, nextItem);
        break;

      case 'End':
        event.preventDefault();
        moveFocus(list, null, previousItem);
        break;

      default:
        break;
    }
  };

  var conditionalElements = getConditionalElements();
  return /*#__PURE__*/_jsxs(TabsRoot, _extends({
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref,
    as: component
  }, other, {
    children: [conditionalElements.scrollButtonStart, conditionalElements.scrollbarSizeListener, /*#__PURE__*/_jsxs(TabsScroller, {
      className: classes.scroller,
      styleProps: styleProps,
      style: _defineProperty({
        overflow: scrollerStyle.overflow
      }, vertical ? "margin".concat(isRtl ? 'Left' : 'Right') : 'marginBottom', visibleScrollbar ? undefined : -scrollerStyle.scrollbarWidth),
      ref: tabsRef,
      onScroll: handleTabsScroll,
      children: [/*#__PURE__*/_jsx(FlexContainer, {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        "aria-orientation": orientation === 'vertical' ? 'vertical' : null,
        className: classes.flexContainer,
        styleProps: styleProps,
        onKeyDown: handleKeyDown,
        ref: tabListRef,
        role: "tablist",
        children: children
      }), mounted && indicator]
    }), conditionalElements.scrollButtonEnd]
  }));
});
process.env.NODE_ENV !== "production" ? Tabs.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It supports two actions: `updateIndicator()` and `updateScrollButtons()`
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action: refType,

  /**
   * If `true`, the scroll buttons aren't forced hidden on mobile.
   * By default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.
   * @default false
   */
  allowScrollButtonsMobile: PropTypes.bool,

  /**
   * The label for the Tabs as a string.
   */
  'aria-label': PropTypes.string,

  /**
   * An id or list of ids separated by a space that label the Tabs.
   */
  'aria-labelledby': PropTypes.string,

  /**
   * If `true`, the tabs are centered.
   * This prop is intended for large views.
   * @default false
   */
  centered: PropTypes.bool,

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
   * Determines the color of the indicator.
   * @default 'primary'
   */
  indicatorColor: PropTypes.oneOf(['primary', 'secondary']),

  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {any} value We default to the index of the child (number)
   */
  onChange: PropTypes.func,

  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * The component used to render the scroll buttons.
   * @default TabScrollButton
   */
  ScrollButtonComponent: PropTypes.elementType,

  /**
   * Determine behavior of scroll buttons when tabs are set to scroll:
   *
   * - `auto` will only present them when not all the items are visible.
   * - `true` will always present them.
   * - `false` will never present them.
   *
   * By default the scroll buttons are hidden on mobile.
   * This behavior can be disabled with `allowScrollButtonsMobile`.
   * @default 'auto'
   */
  scrollButtons: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOf(['auto', false, true]),

  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * Props applied to the tab indicator element.
   * @default  {}
   */
  TabIndicatorProps: PropTypes.object,

  /**
   * Props applied to the [`TabScrollButton`](/api/tab-scroll-button/) element.
   * @default {}
   */
  TabScrollButtonProps: PropTypes.object,

  /**
   * Determines the color of the `Tab`.
   * @default 'primary'
   */
  textColor: PropTypes.oneOf(['inherit', 'primary', 'secondary']),

  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value: PropTypes.any,

  /**
   * Determines additional display behavior of the tabs:
   *
   *  - `scrollable` will invoke scrolling properties and allow for horizontally
   *  scrolling (or swiping) of the tab bar.
   *  -`fullWidth` will make the tabs grow to use all the available space,
   *  which should be used for small views, like on mobile.
   *  - `standard` will render the default state.
   * @default 'standard'
   */
  variant: PropTypes.oneOf(['fullWidth', 'scrollable', 'standard']),

  /**
   * If `true`, the scrollbar is visible. It can be useful when displaying
   * a long vertical list of tabs.
   * @default false
   */
  visibleScrollbar: PropTypes.bool
} : void 0;
export default Tabs;