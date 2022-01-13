import { ResizeObserverBoxOptions } from './ResizeObserverBoxOptions';
interface ResizeObserverOptions {
    box?: 'content-box' | 'border-box' | 'device-pixel-content-box' | ResizeObserverBoxOptions;
}
export { ResizeObserverOptions };
