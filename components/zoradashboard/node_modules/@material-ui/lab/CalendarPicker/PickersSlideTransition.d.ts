import * as React from 'react';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';
export declare type SlideDirection = 'right' | 'left';
export interface SlideTransitionProps extends Omit<CSSTransitionProps, 'timeout'> {
    children: React.ReactElement;
    className?: string;
    reduceAnimations: boolean;
    slideDirection: SlideDirection;
    transKey: React.Key;
}
export declare const slideAnimationDuration = 350;
/**
 * @ignore - do not document.
 */
declare const PickersSlideTransition: ({ children, className, reduceAnimations, slideDirection, transKey, ...other }: SlideTransitionProps) => JSX.Element;
export default PickersSlideTransition;
