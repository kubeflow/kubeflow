import * as React from 'react';
import { useControlled } from '@material-ui/core/utils';
import { arrayIncludes } from '../utils';
export function useViews({
  onChange,
  onViewChange,
  openTo,
  view,
  views
}) {
  var _views, _views2;

  const [openView, setOpenView] = useControlled({
    name: 'Picker',
    state: 'view',
    controlled: view,
    default: openTo && arrayIncludes(views, openTo) ? openTo : views[0]
  });
  const previousView = (_views = views[views.indexOf(openView) - 1]) != null ? _views : null;
  const nextView = (_views2 = views[views.indexOf(openView) + 1]) != null ? _views2 : null;
  const changeView = React.useCallback(newView => {
    setOpenView(newView);

    if (onViewChange) {
      onViewChange(newView);
    }
  }, [setOpenView, onViewChange]);
  const openNext = React.useCallback(() => {
    if (nextView) {
      changeView(nextView);
    }
  }, [nextView, changeView]);
  const handleChangeAndOpenNext = React.useCallback((date, currentViewSelectionState) => {
    const isSelectionFinishedOnCurrentView = currentViewSelectionState === 'finish';
    const globalSelectionState = isSelectionFinishedOnCurrentView && Boolean(nextView) ? 'partial' : currentViewSelectionState;
    onChange(date, globalSelectionState);

    if (isSelectionFinishedOnCurrentView) {
      openNext();
    }
  }, [nextView, onChange, openNext]);
  return {
    handleChangeAndOpenNext,
    nextView,
    previousView,
    openNext,
    openView,
    setOpenView: changeView
  };
}