import { ResizeObserver } from '../ResizeObserver';
import { ResizeObserverEntry } from '../ResizeObserverEntry';
import { ResizeObserverSize } from '../ResizeObserverSize';
declare type IsomorphicWindow = Window & {
    ResizeObserver?: typeof ResizeObserver;
    ResizeObserverEntry?: typeof ResizeObserverEntry;
    ResizeObserverSize?: typeof ResizeObserverSize;
};
export declare const global: IsomorphicWindow;
export {};
