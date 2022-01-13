import { ResizeObserverBoxOptions } from '../ResizeObserverBoxOptions';
import { ResizeObserverSize } from '../ResizeObserverSize';
import { DOMRectReadOnly } from '../DOMRectReadOnly';
interface ResizeObserverSizeCollection {
    devicePixelContentBoxSize: ResizeObserverSize;
    borderBoxSize: ResizeObserverSize;
    contentBoxSize: ResizeObserverSize;
    contentRect: DOMRectReadOnly;
}
declare const calculateBoxSizes: (target: Element, forceRecalculation?: boolean) => ResizeObserverSizeCollection;
declare const calculateBoxSize: (target: Element, observedBox: ResizeObserverBoxOptions, forceRecalculation?: boolean | undefined) => ResizeObserverSize;
export { calculateBoxSize, calculateBoxSizes };
