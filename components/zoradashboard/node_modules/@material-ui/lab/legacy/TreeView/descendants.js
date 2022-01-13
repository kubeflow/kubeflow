import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@material-ui/core/utils';
/** Credit: https://github.com/reach/reach-ui/blob/86a046f54d53b6420e392b3fa56dd991d9d4e458/packages/descendants/README.md
 *  Modified slightly to suit our purposes.
 */
// To replace with .findIndex() once we stop IE11 support.

import { jsx as _jsx } from "react/jsx-runtime";

function findIndex(array, comp) {
  for (var i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }

  return -1;
}

function binaryFindElement(array, element) {
  var start = 0;
  var end = array.length - 1;

  while (start <= end) {
    var middle = Math.floor((start + end) / 2);

    if (array[middle].element === element) {
      return middle;
    } // eslint-disable-next-line no-bitwise


    if (array[middle].element.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }

  return start;
}

var DescendantContext = /*#__PURE__*/React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  DescendantContext.displayName = 'DescendantContext';
}

function usePrevious(value) {
  var ref = React.useRef(null);
  React.useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
}

var noop = function noop() {};
/**
 * This hook registers our descendant by passing it into an array. We can then
 * search that array by to find its index when registering it in the component.
 * We use this for focus management, keyboard navigation, and typeahead
 * functionality for some components.
 *
 * The hook accepts the element node
 *
 * Our main goals with this are:
 *   1) maximum composability,
 *   2) minimal API friction
 *   3) SSR compatibility*
 *   4) concurrent safe
 *   5) index always up-to-date with the tree despite changes
 *   6) works with memoization of any component in the tree (hopefully)
 *
 * * As for SSR, the good news is that we don't actually need the index on the
 * server for most use-cases, as we are only using it to determine the order of
 * composed descendants for keyboard navigation.
 */


export function useDescendant(descendant) {
  var _React$useState = React.useState(),
      forceUpdate = _React$useState[1];

  var _React$useContext = React.useContext(DescendantContext),
      _React$useContext$reg = _React$useContext.registerDescendant,
      registerDescendant = _React$useContext$reg === void 0 ? noop : _React$useContext$reg,
      _React$useContext$unr = _React$useContext.unregisterDescendant,
      unregisterDescendant = _React$useContext$unr === void 0 ? noop : _React$useContext$unr,
      _React$useContext$des = _React$useContext.descendants,
      descendants = _React$useContext$des === void 0 ? [] : _React$useContext$des,
      _React$useContext$par = _React$useContext.parentId,
      parentId = _React$useContext$par === void 0 ? null : _React$useContext$par; // This will initially return -1 because we haven't registered the descendant
  // on the first render. After we register, this will then return the correct
  // index on the following render and we will re-register descendants
  // so that everything is up-to-date before the user interacts with a
  // collection.


  var index = findIndex(descendants, function (item) {
    return item.element === descendant.element;
  });
  var previousDescendants = usePrevious(descendants); // We also need to re-register descendants any time ANY of the other
  // descendants have changed. My brain was melting when I wrote this and it
  // feels a little off, but checking in render and using the result in the
  // effect's dependency array works well enough.

  var someDescendantsHaveChanged = descendants.some(function (newDescendant, position) {
    return previousDescendants && previousDescendants[position] && previousDescendants[position].element !== newDescendant.element;
  }); // Prevent any flashing

  useEnhancedEffect(function () {
    if (descendant.element) {
      registerDescendant(_extends({}, descendant, {
        index: index
      }));
      return function () {
        unregisterDescendant(descendant.element);
      };
    }

    forceUpdate({});
    return undefined;
  }, [registerDescendant, unregisterDescendant, index, someDescendantsHaveChanged, descendant]);
  return {
    parentId: parentId,
    index: index
  };
}
export function DescendantProvider(props) {
  var children = props.children,
      id = props.id;

  var _React$useState2 = React.useState([]),
      items = _React$useState2[0],
      set = _React$useState2[1];

  var registerDescendant = React.useCallback(function (_ref) {
    var element = _ref.element,
        other = _objectWithoutProperties(_ref, ["element"]);

    set(function (oldItems) {
      var newItems;

      if (oldItems.length === 0) {
        // If there are no items, register at index 0 and bail.
        return [_extends({}, other, {
          element: element,
          index: 0
        })];
      }

      var index = binaryFindElement(oldItems, element);

      if (oldItems[index] && oldItems[index].element === element) {
        // If the element is already registered, just use the same array
        newItems = oldItems;
      } else {
        // When registering a descendant, we need to make sure we insert in
        // into the array in the same order that it appears in the DOM. So as
        // new descendants are added or maybe some are removed, we always know
        // that the array is up-to-date and correct.
        //
        // So here we look at our registered descendants and see if the new
        // element we are adding appears earlier than an existing descendant's
        // DOM node via `node.compareDocumentPosition`. If it does, we insert
        // the new element at this index. Because `registerDescendant` will be
        // called in an effect every time the descendants state value changes,
        // we should be sure that this index is accurate when descendent
        // elements come or go from our component.
        var newItem = _extends({}, other, {
          element: element,
          index: index
        }); // If an index is not found we will push the element to the end.


        newItems = oldItems.slice();
        newItems.splice(index, 0, newItem);
      }

      newItems.forEach(function (item, position) {
        item.index = position;
      });
      return newItems;
    });
  }, []);
  var unregisterDescendant = React.useCallback(function (element) {
    set(function (oldItems) {
      return oldItems.filter(function (item) {
        return element !== item.element;
      });
    });
  }, []);
  var value = React.useMemo(function () {
    return {
      descendants: items,
      registerDescendant: registerDescendant,
      unregisterDescendant: unregisterDescendant,
      parentId: id
    };
  }, [items, registerDescendant, unregisterDescendant, id]);
  return /*#__PURE__*/_jsx(DescendantContext.Provider, {
    value: value,
    children: children
  });
}
process.env.NODE_ENV !== "production" ? DescendantProvider.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string
} : void 0;