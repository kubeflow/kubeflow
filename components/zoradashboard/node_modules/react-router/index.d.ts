import * as React from 'react';
import PropTypes from 'prop-types';
import { Action, Blocker, History, InitialEntry, Location, PartialLocation, Path, State, To } from 'history';
/**
 * A Navigator is a "location changer"; it's how you get to different locations.
 *
 * Every history instance conforms to the Navigator interface, but the
 * distinction is useful primarily when it comes to the low-level <Router> API
 * where both the location and a navigator must be provided separately in order
 * to avoid "tearing" that may occur in a suspense-enabled app if the action
 * and/or location were to be read directly from the history instance.
 */
export declare type Navigator = Omit<History, 'action' | 'location' | 'back' | 'forward' | 'listen'>;
/**
 * A <Router> that stores all entries in memory.
 *
 * @see https://reactrouter.com/api/MemoryRouter
 */
export declare function MemoryRouter({ children, initialEntries, initialIndex }: MemoryRouterProps): React.ReactElement;
export declare namespace MemoryRouter {
    var displayName: string;
    var propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        initialEntries: PropTypes.Requireable<(string | PropTypes.InferProps<{
            pathname: PropTypes.Requireable<string>;
            search: PropTypes.Requireable<string>;
            hash: PropTypes.Requireable<string>;
            state: PropTypes.Requireable<object>;
            key: PropTypes.Requireable<string>;
        }> | null | undefined)[]>;
        initialIndex: PropTypes.Requireable<number>;
    };
}
export interface MemoryRouterProps {
    children?: React.ReactNode;
    initialEntries?: InitialEntry[];
    initialIndex?: number;
}
/**
 * Changes the current location.
 *
 * Note: This API is mostly useful in React.Component subclasses that are not
 * able to use hooks. In functional components, we recommend you use the
 * `useNavigate` hook instead.
 *
 * @see https://reactrouter.com/api/Navigate
 */
export declare function Navigate({ to, replace, state }: NavigateProps): null;
export declare namespace Navigate {
    var displayName: string;
    var propTypes: {
        to: PropTypes.Validator<string | PropTypes.InferProps<{
            pathname: PropTypes.Requireable<string>;
            search: PropTypes.Requireable<string>;
            hash: PropTypes.Requireable<string>;
        }>>;
        replace: PropTypes.Requireable<boolean>;
        state: PropTypes.Requireable<object>;
    };
}
export interface NavigateProps {
    to: To;
    replace?: boolean;
    state?: State;
}
/**
 * Renders the child route's element, if there is one.
 *
 * @see https://reactrouter.com/api/Outlet
 */
export declare function Outlet(): React.ReactElement | null;
export declare namespace Outlet {
    var displayName: string;
    var propTypes: {};
}
export interface OutletProps {
}
/**
 * Declares an element that should be rendered at a certain URL path.
 *
 * @see https://reactrouter.com/api/Route
 */
export declare function Route({ element }: RouteProps): React.ReactElement | null;
export declare namespace Route {
    var displayName: string;
    var propTypes: {
        caseSensitive: PropTypes.Requireable<boolean>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        element: PropTypes.Requireable<PropTypes.ReactElementLike>;
        path: PropTypes.Requireable<string>;
    };
}
export interface RouteProps {
    caseSensitive?: boolean;
    children?: React.ReactNode;
    element?: React.ReactElement | null;
    path?: string;
}
/**
 * Provides location context for the rest of the app.
 *
 * Note: You usually won't render a <Router> directly. Instead, you'll render a
 * router that is more specific to your environment such as a <BrowserRouter>
 * in web browsers or a <StaticRouter> for server rendering.
 *
 * @see https://reactrouter.com/api/Router
 */
export declare function Router({ children, action, location, navigator, static: staticProp }: RouterProps): React.ReactElement;
export declare namespace Router {
    var displayName: string;
    var propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        action: PropTypes.Requireable<string>;
        location: PropTypes.Validator<object>;
        navigator: PropTypes.Validator<PropTypes.InferProps<{
            createHref: PropTypes.Validator<(...args: any[]) => any>;
            push: PropTypes.Validator<(...args: any[]) => any>;
            replace: PropTypes.Validator<(...args: any[]) => any>;
            go: PropTypes.Validator<(...args: any[]) => any>;
            block: PropTypes.Validator<(...args: any[]) => any>;
        }>>;
        static: PropTypes.Requireable<boolean>;
    };
}
export interface RouterProps {
    action?: Action;
    children?: React.ReactNode;
    location: Location;
    navigator: Navigator;
    static?: boolean;
}
/**
 * A container for a nested tree of <Route> elements that renders the branch
 * that best matches the current location.
 *
 * @see https://reactrouter.com/api/Routes
 */
export declare function Routes({ basename, children }: RoutesProps): React.ReactElement | null;
export declare namespace Routes {
    var displayName: string;
    var propTypes: {
        basename: PropTypes.Requireable<string>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
}
export interface RoutesProps {
    basename?: string;
    children?: React.ReactNode;
}
/**
 * Blocks all navigation attempts. This is useful for preventing the page from
 * changing until some condition is met, like saving form data.
 *
 * @see https://reactrouter.com/api/useBlocker
 */
export declare function useBlocker(blocker: Blocker, when?: boolean): void;
/**
 * Returns the full href for the given "to" value. This is useful for building
 * custom links that are also accessible and preserve right-click behavior.
 *
 * @see https://reactrouter.com/api/useHref
 */
export declare function useHref(to: To): string;
/**
 * Returns true if this component is a descendant of a <Router>.
 *
 * @see https://reactrouter.com/api/useInRouterContext
 */
export declare function useInRouterContext(): boolean;
/**
 * Returns the current location object, which represents the current URL in web
 * browsers.
 *
 * Note: If you're using this it may mean you're doing some of your own
 * "routing" in your app, and we'd like to know what your use case is. We may
 * be able to provide something higher-level to better suit your needs.
 *
 * @see https://reactrouter.com/api/useLocation
 */
export declare function useLocation(): Location;
/**
 * Returns true if the URL for the given "to" value matches the current URL.
 * This is useful for components that need to know "active" state, e.g.
 * <NavLink>.
 *
 * @see https://reactrouter.com/api/useMatch
 */
export declare function useMatch(pattern: PathPattern): PathMatch | null;
declare type PathPattern = string | {
    path: string;
    caseSensitive?: boolean;
    end?: boolean;
};
/**
 * The interface for the navigate() function returned from useNavigate().
 */
export interface NavigateFunction {
    (to: To, options?: {
        replace?: boolean;
        state?: State;
    }): void;
    (delta: number): void;
}
/**
 * Returns an imperative method for changing the location. Used by <Link>s, but
 * may also be used by other elements to change the location.
 *
 * @see https://reactrouter.com/api/useNavigate
 */
export declare function useNavigate(): NavigateFunction;
/**
 * Returns the element for the child route at this level of the route
 * hierarchy. Used internally by <Outlet> to render child routes.
 *
 * @see https://reactrouter.com/api/useOutlet
 */
export declare function useOutlet(): React.ReactElement | null;
/**
 * Returns an object of key/value pairs of the dynamic params from the current
 * URL that were matched by the route path.
 *
 * @see https://reactrouter.com/api/useParams
 */
export declare function useParams(): Params;
/**
 * Resolves the pathname of the given `to` value against the current location.
 *
 * @see https://reactrouter.com/api/useResolvedPath
 */
export declare function useResolvedPath(to: To): Path;
/**
 * Returns the element of the route that matched the current location, prepared
 * with the correct context to render the remainder of the route tree. Route
 * elements in the tree must render an <Outlet> to render their child route's
 * element.
 *
 * @see https://reactrouter.com/api/useRoutes
 */
export declare function useRoutes(partialRoutes: PartialRouteObject[], basename?: string): React.ReactElement | null;
/**
 * Creates a route config from an array of JavaScript objects. Used internally
 * by `useRoutes` to normalize the route config.
 *
 * @see https://reactrouter.com/api/createRoutesFromArray
 */
export declare function createRoutesFromArray(array: PartialRouteObject[]): RouteObject[];
/**
 * Creates a route config from a React "children" object, which is usually
 * either a `<Route>` element or an array of them. Used internally by
 * `<Routes>` to create a route config from its children.
 *
 * @see https://reactrouter.com/api/createRoutesFromChildren
 */
export declare function createRoutesFromChildren(children: React.ReactNode): RouteObject[];
/**
 * The parameters that were parsed from the URL path.
 */
export declare type Params = Record<string, string>;
/**
 * A route object represents a logical route, with (optionally) its child
 * routes organized in a tree-like structure.
 */
export interface RouteObject {
    caseSensitive: boolean;
    children?: RouteObject[];
    element: React.ReactNode;
    path: string;
}
/**
 * A "partial route" object is usually supplied by the user and may omit
 * certain properties of a real route object such as `path` and `element`,
 * which have reasonable defaults.
 */
export interface PartialRouteObject {
    caseSensitive?: boolean;
    children?: PartialRouteObject[];
    element?: React.ReactNode;
    path?: string;
}
/**
 * Returns a path with params interpolated.
 *
 * @see https://reactrouter.com/api/generatePath
 */
export declare function generatePath(path: string, params?: Params): string;
/**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/api/matchRoutes
 */
export declare function matchRoutes(routes: RouteObject[], location: string | PartialLocation, basename?: string): RouteMatch[] | null;
export interface RouteMatch {
    route: RouteObject;
    pathname: string;
    params: Params;
}
/**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @see https://reactrouter.com/api/matchPath
 */
export declare function matchPath(pattern: PathPattern, pathname: string): PathMatch | null;
export interface PathMatch {
    path: string;
    pathname: string;
    params: Params;
}
/**
 * Returns a resolved path object relative to the given pathname.
 *
 * @see https://reactrouter.com/api/resolvePath
 */
export declare function resolvePath(to: To, fromPathname?: string): Path;
export {};
