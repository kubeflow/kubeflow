import { queueMicroTask } from './queueMicroTask';
var queueResizeObserver = function (cb) {
    queueMicroTask(function ResizeObserver() {
        requestAnimationFrame(cb);
    });
};
export { queueResizeObserver };
