import * as React from 'react';
import PropTypes from 'prop-types';
import { State, To } from 'history';
import { MemoryRouter, Navigate, Outlet, Route, Router, Routes, useBlocker, useHref, useInRouterContext, useLocation, useMatch, useNavigate, useOutlet, useParams, useResolvedPath, useRoutes, createRoutesFromArray, createRoutesFromChildren, generatePath, matchRoutes, matchPath, resolvePath } from 'react-router';
export { MemoryRouter, Navigate, Outlet, Route, Router, Routes, createRoutesFromArray, createRoutesFromChildren, generatePath, matchRoutes, matchPath, resolvePath, useBlocker, useHref, useInRouterContext, useLocation, useMatch, useNavigate, useOutlet, useParams, useResolvedPath, useRoutes };
/**
 * A <Router> for use in web browsers. Provides the cleanest URLs.
 */
export declare function BrowserRouter({ children, window }: BrowserRouterProps): JSX.Element;
export declare namespace BrowserRouter {
    var displayName: string;
    var propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        window: PropTypes.Requireable<object>;
    };
}
export interface BrowserRouterProps {
    children?: React.ReactNode;
    window?: Window;
}
/**
 * A <Router> for use in web browsers. Stores the location in the hash
 * portion of the URL so it is not sent to the server.
 */
export declare function HashRouter({ children, window }: HashRouterProps): JSX.Element;
export declare namespace HashRouter {
    var displayName: string;
    var propTypes: {
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
        window: PropTypes.Requireable<object>;
    };
}
export interface HashRouterProps {
    children?: React.ReactNode;
    window?: Window;
}
/**
 * The public API for rendering a history-aware <a>.
 */
export declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;
export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
    replace?: boolean;
    state?: State;
    to: To;
}
/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
export declare const NavLink: React.ForwardRefExoticComponent<NavLinkProps & React.RefAttributes<HTMLAnchorElement>>;
export interface NavLinkProps extends LinkProps {
    activeClassName?: string;
    activeStyle?: object;
    caseSensitive?: boolean;
    end?: boolean;
}
/**
 * A declarative interface for showing a window.confirm dialog with the given
 * message when the user tries to navigate away from the current page.
 *
 * This also serves as a reference implementation for anyone who wants to
 * create their own custom prompt component.
 */
export declare function Prompt({ message, when }: PromptProps): null;
export declare namespace Prompt {
    var displayName: string;
    var propTypes: {
        message: PropTypes.Requireable<string>;
        when: PropTypes.Requireable<boolean>;
    };
}
export interface PromptProps {
    message: string;
    when?: boolean;
}
/**
 * Prevents navigation away from the current page using a window.confirm prompt
 * with the given message.
 */
export declare function usePrompt(message: string, when?: boolean): void;
/**
 * A convenient wrapper for reading and writing search parameters via the
 * URLSearchParams interface.
 */
export declare function useSearchParams(defaultInit?: URLSearchParamsInit): readonly [URLSearchParams, (nextInit: URLSearchParamsInit, navigateOptions?: {
    replace?: boolean | undefined;
    state?: object | null | undefined;
} | undefined) => void];
/**
 * Creates a URLSearchParams object using the given initializer.
 *
 * This is identical to `new URLSearchParams(init)` except it also
 * supports arrays as values in the object form of the initializer
 * instead of just strings. This is convenient when you need multiple
 * values for a given key, but don't want to use an array initializer.
 *
 * For example, instead of:
 *
 *   let searchParams = new URLSearchParams([
 *     ['sort', 'name'],
 *     ['sort', 'price']
 *   ]);
 *
 * you can do:
 *
 *   let searchParams = createSearchParams({
 *     sort: ['name', 'price']
 *   });
 */
export declare function createSearchParams(init?: URLSearchParamsInit): URLSearchParams;
export declare type ParamKeyValuePair = [string, string];
export declare type URLSearchParamsInit = string | ParamKeyValuePair[] | Record<string, string | string[]> | URLSearchParams;
