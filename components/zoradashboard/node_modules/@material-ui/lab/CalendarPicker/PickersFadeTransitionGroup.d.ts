import * as React from 'react';
interface FadeTransitionProps {
    children: React.ReactElement;
    className?: string;
    reduceAnimations: boolean;
    transKey: React.Key;
}
/**
 * @ignore - do not document.
 */
declare const PickersFadeTransitionGroup: ({ children, className, reduceAnimations, transKey, }: FadeTransitionProps) => JSX.Element;
export default PickersFadeTransitionGroup;
