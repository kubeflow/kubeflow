import * as React from 'react';
import TreeViewContext from '../TreeView/TreeViewContext';
export default function useTreeItem(nodeId) {
  var _React$useContext = React.useContext(TreeViewContext),
      focus = _React$useContext.focus,
      isExpanded = _React$useContext.isExpanded,
      isExpandable = _React$useContext.isExpandable,
      isFocused = _React$useContext.isFocused,
      isDisabled = _React$useContext.isDisabled,
      isSelected = _React$useContext.isSelected,
      multiSelect = _React$useContext.multiSelect,
      selectNode = _React$useContext.selectNode,
      selectRange = _React$useContext.selectRange,
      toggleExpansion = _React$useContext.toggleExpansion;

  var expandable = isExpandable ? isExpandable(nodeId) : false;
  var expanded = isExpanded ? isExpanded(nodeId) : false;
  var focused = isFocused ? isFocused(nodeId) : false;
  var disabled = isDisabled ? isDisabled(nodeId) : false;
  var selected = isSelected ? isSelected(nodeId) : false;

  var handleExpansion = function handleExpansion(event) {
    if (!disabled) {
      if (!focused) {
        focus(event, nodeId);
      }

      var multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey); // If already expanded and trying to toggle selection don't close

      if (expandable && !(multiple && isExpanded(nodeId))) {
        toggleExpansion(event, nodeId);
      }
    }
  };

  var handleSelection = function handleSelection(event) {
    if (!disabled) {
      if (!focused) {
        focus(event, nodeId);
      }

      var multiple = multiSelect && (event.shiftKey || event.ctrlKey || event.metaKey);

      if (multiple) {
        if (event.shiftKey) {
          selectRange(event, {
            end: nodeId
          });
        } else {
          selectNode(event, nodeId, true);
        }
      } else {
        selectNode(event, nodeId);
      }
    }
  };

  var preventSelection = function preventSelection(event) {
    if (event.shiftKey || event.ctrlKey || event.metaKey || disabled) {
      // Prevent text selection
      event.preventDefault();
    }
  };

  return {
    disabled: disabled,
    expanded: expanded,
    selected: selected,
    focused: focused,
    handleExpansion: handleExpansion,
    handleSelection: handleSelection,
    preventSelection: preventSelection
  };
}