"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useViews = useViews;

var React = _interopRequireWildcard(require("react"));

var _utils = require("@material-ui/core/utils");

var _utils2 = require("../utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useViews({
  onChange,
  onViewChange,
  openTo,
  view,
  views
}) {
  var _views, _views2;

  const [openView, setOpenView] = (0, _utils.useControlled)({
    name: 'Picker',
    state: 'view',
    controlled: view,
    default: openTo && (0, _utils2.arrayIncludes)(views, openTo) ? openTo : views[0]
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