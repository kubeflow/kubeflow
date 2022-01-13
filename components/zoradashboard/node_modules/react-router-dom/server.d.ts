import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PartialLocation } from 'history';
/**
 * A <Router> that may not transition to any other location. This is useful
 * on the server where there is no stateful UI.
 */
export declare function StaticRouter({ children, location: loc }: StaticRouterProps): JSX.Element;
export declare namespace StaticRouter {
    var displayName: string;
    var propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        location: PropTypes.Requireable<string | PropTypes.InferProps<{
            pathname: PropTypes.Requireable<string>;
            search: PropTypes.Requireable<string>;
            hash: PropTypes.Requireable<string>;
            state: PropTypes.Requireable<object>;
            key: PropTypes.Requireable<string>;
        }>>;
    };
}
export interface StaticRouterProps {
    children?: React.ReactNode;
    location?: string | PartialLocation;
}
