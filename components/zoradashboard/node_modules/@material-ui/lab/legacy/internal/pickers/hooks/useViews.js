import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import * as React from 'react';
import { useControlled } from '@material-ui/core/utils';
import { arrayIncludes } from '../utils';
export function useViews(_ref) {
  var _views, _views2;

  var onChange = _ref.onChange,
      onViewChange = _ref.onViewChange,
      openTo = _ref.openTo,
      view = _ref.view,
      views = _ref.views;

  var _useControlled = useControlled({
    name: 'Picker',
    state: 'view',
    controlled: view,
    default: openTo && arrayIncludes(views, openTo) ? openTo : views[0]
  }),
      _useControlled2 = _slicedToArray(_useControlled, 2),
      openView = _useControlled2[0],
      setOpenView = _useControlled2[1];

  var previousView = (_views = views[views.indexOf(openView) - 1]) != null ? _views : null;
  var nextView = (_views2 = views[views.indexOf(openView) + 1]) != null ? _views2 : null;
  var changeView = React.useCallback(function (newView) {
    setOpenView(newView);

    if (onViewChange) {
      onViewChange(newView);
    }
  }, [setOpenView, onViewChange]);
  var openNext = React.useCallback(function () {
    if (nextView) {
      changeView(nextView);
    }
  }, [nextView, changeView]);
  var handleChangeAndOpenNext = React.useCallback(function (date, currentViewSelectionState) {
    var isSelectionFinishedOnCurrentView = currentViewSelectionState === 'finish';
    var globalSelectionState = isSelectionFinishedOnCurrentView && Boolean(nextView) ? 'partial' : currentViewSelectionState;
    onChange(date, globalSelectionState);

    if (isSelectionFinishedOnCurrentView) {
      openNext();
    }
  }, [nextView, onChange, openNext]);
  return {
    handleChangeAndOpenNext: handleChangeAndOpenNext,
    nextView: nextView,
    previousView: previousView,
    openNext: openNext,
    openView: openView,
    setOpenView: changeView
  };
}