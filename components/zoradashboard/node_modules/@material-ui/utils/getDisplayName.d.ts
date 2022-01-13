import * as React from 'react';
export declare function getFunctionName(fn: Function): string;
/**
 * cherry-pick from
 * https://github.com/facebook/react/blob/769b1f270e1251d9dbdce0fcbd9e92e502d059b8/packages/shared/getComponentName.js
 * originally forked from recompose/getDisplayName with added IE11 support
 */
export default function getDisplayName(Component: React.ElementType): string | undefined;
