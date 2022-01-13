import { ResizeObserverSize } from './ResizeObserverSize';
import { ResizeObserverBoxOptions } from './ResizeObserverBoxOptions';
declare class ResizeObservation {
    target: Element;
    observedBox: ResizeObserverBoxOptions;
    lastReportedSize: ResizeObserverSize;
    constructor(target: Element, observedBox?: ResizeObserverBoxOptions);
    isActive(): boolean;
}
export { ResizeObservation };
