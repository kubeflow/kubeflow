import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import useTreeItem from './useTreeItem';
/**
 * @ignore - internal component.
 */

import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var TreeItemContent = /*#__PURE__*/React.forwardRef(function TreeItemContent(props, ref) {
  var classes = props.classes,
      className = props.className,
      displayIcon = props.displayIcon,
      expansionIcon = props.expansionIcon,
      iconProp = props.icon,
      label = props.label,
      nodeId = props.nodeId,
      onClick = props.onClick,
      onMouseDown = props.onMouseDown,
      other = _objectWithoutProperties(props, ["classes", "className", "displayIcon", "expansionIcon", "icon", "label", "nodeId", "onClick", "onMouseDown"]);

  var _useTreeItem = useTreeItem(nodeId),
      disabled = _useTreeItem.disabled,
      expanded = _useTreeItem.expanded,
      selected = _useTreeItem.selected,
      focused = _useTreeItem.focused,
      handleExpansion = _useTreeItem.handleExpansion,
      handleSelection = _useTreeItem.handleSelection,
      preventSelection = _useTreeItem.preventSelection;

  var icon = iconProp || expansionIcon || displayIcon;

  var handleMouseDown = function handleMouseDown(event) {
    preventSelection(event);

    if (onMouseDown) {
      onMouseDown(event);
    }
  };

  var handleClick = function handleClick(event) {
    handleExpansion(event);
    handleSelection(event);

    if (onClick) {
      onClick(event);
    }
  };

  return (
    /*#__PURE__*/

    /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions -- Key event is handled by the TreeView */
    _jsxs("div", _extends({
      className: clsx(className, classes.root, expanded && classes.expanded, selected && classes.selected, focused && classes.focused, disabled && classes.disabled),
      onClick: handleClick,
      onMouseDown: handleMouseDown,
      ref: ref
    }, other, {
      children: [/*#__PURE__*/_jsx("div", {
        className: classes.iconContainer,
        children: icon
      }), /*#__PURE__*/_jsx("div", {
        className: classes.label,
        children: label
      })]
    }))
  );
});
process.env.NODE_ENV !== "production" ? TreeItemContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * className applied to the root element.
   */
  className: PropTypes.string,

  /**
   * The icon to display next to the tree node's label. Either a parent or end icon.
   */
  displayIcon: PropTypes.node,

  /**
   * The icon to display next to the tree node's label. Either an expansion or collapse icon.
   */
  expansionIcon: PropTypes.node,

  /**
   * The icon to display next to the tree node's label.
   */
  icon: PropTypes.node,

  /**
   * The tree node label.
   */
  label: PropTypes.node,

  /**
   * The id of the node.
   */
  nodeId: PropTypes.string.isRequired,

  /**
   * @ignore
   */
  onClick: PropTypes.func,

  /**
   * @ignore
   */
  onMouseDown: PropTypes.func
} : void 0;
export default TreeItemContent;