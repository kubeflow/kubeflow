import * as React from 'react';
export declare const reflow: (node: Element) => number;
interface ComponentProps {
    easing: string | {
        enter?: string;
        exit?: string;
    } | undefined;
    style: React.CSSProperties | undefined;
    timeout: number | {
        enter?: number;
        exit?: number;
    };
}
interface Options {
    mode: 'enter' | 'exit';
}
interface TransitionProps {
    duration: string | number;
    easing: string | undefined;
    delay: string | undefined;
}
export declare function getTransitionProps(props: ComponentProps, options: Options): TransitionProps;
export {};
