import * as React from 'react';
export interface StaticWrapperProps {
    children?: React.ReactNode;
    /**
     * Force static wrapper inner components to be rendered in mobile or desktop mode.
     */
    displayStaticWrapperAs: 'desktop' | 'mobile';
}
declare function StaticWrapper(props: StaticWrapperProps): JSX.Element;
export default StaticWrapper;
