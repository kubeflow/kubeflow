import { ResizeObserver } from './ResizeObserver';
import { ResizeObserverCallback } from './ResizeObserverCallback';
import { ResizeObserverOptions } from './ResizeObserverOptions';
declare class ResizeObserverController {
    static connect(resizeObserver: ResizeObserver, callback: ResizeObserverCallback): void;
    static observe(resizeObserver: ResizeObserver, target: Element, options?: ResizeObserverOptions): void;
    static unobserve(resizeObserver: ResizeObserver, target: Element): void;
    static disconnect(resizeObserver: ResizeObserver): void;
}
export { ResizeObserverController };
