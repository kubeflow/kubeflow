import React from 'react';
import SimpleBarJS from 'simplebar';

export as namespace SimpleBar;
export = SimpleBar;

declare namespace SimpleBar {
    interface ChildrenProps {
        scrollableNodeRef: React.MutableRefObject<SimpleBar>;
        contentNodeRef: React.MutableRefObject<SimpleBar>;
    }

    interface Props extends SimpleBarJS.Options, React.HTMLAttributes<HTMLElement> {
        scrollableNodeProps?: object;
        children?: React.ReactNode | ((props: ChildrenProps) => React.ReactNode);
    }
}

declare class SimpleBar extends React.Component<SimpleBar.Props> {
  static removeObserver(): void;
    static instances: Pick<WeakMap<HTMLElement, SimpleBar>, 'get' | 'has'>;

    recalculate(): void;
    getScrollElement(): HTMLElement;
    getContentElement(): HTMLElement;

    el: HTMLElement;
}
