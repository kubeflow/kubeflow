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
  const [openView, setOpenView] = useControlled({
    name: 'Picker',
    state: 'view',
    controlled: view,
    default: openTo && arrayIncludes(views, openTo) ? openTo : views[0]
  });
  const previousView = views[views.indexOf(openView) - 1] ?? null;
  const nextView = views[views.indexOf(openView) + 1] ?? null;
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