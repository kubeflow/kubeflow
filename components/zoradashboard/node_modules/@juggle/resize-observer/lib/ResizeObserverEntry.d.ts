import { DOMRectReadOnly } from './DOMRectReadOnly';
import { ResizeObserverSize } from './ResizeObserverSize';
declare class ResizeObserverEntry {
    target: Element;
    contentRect: DOMRectReadOnly;
    borderBoxSize: readonly ResizeObserverSize[];
    contentBoxSize: readonly ResizeObserverSize[];
    devicePixelContentBoxSize: readonly ResizeObserverSize[];
    constructor(target: Element);
}
export { ResizeObserverEntry };
