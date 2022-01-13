import { resizeObservers } from '../utils/resizeObservers';
var hasSkippedObservations = function () {
    return resizeObservers.some(function (ro) { return ro.skippedTargets.length > 0; });
};
export { hasSkippedObservations };
