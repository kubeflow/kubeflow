import React from 'react';
import { useTranslation } from './useTranslation';
import { getDisplayName } from './utils';

export function withTranslation(ns, options = {}) {
  return function Extend(WrappedComponent) {
    function I18nextWithTranslation({ forwardedRef, ...rest }) {
      const [t, i18n, ready] = useTranslation(ns, rest);

      const passDownProps = {
        ...rest,
        t,
        i18n,
        tReady: ready,
      };
      if (options.withRef && forwardedRef) {
        passDownProps.ref = forwardedRef;
      } else if (!options.withRef && forwardedRef) {
        passDownProps.forwardedRef = forwardedRef;
      }
      return React.createElement(WrappedComponent, passDownProps);
    }

    I18nextWithTranslation.displayName = `withI18nextTranslation(${getDisplayName(
      WrappedComponent,
    )})`;

    I18nextWithTranslation.WrappedComponent = WrappedComponent;

    const forwardRef = (props, ref) =>
      React.createElement(I18nextWithTranslation, Object.assign({}, props, { forwardedRef: ref }));

    return options.withRef ? React.forwardRef(forwardRef) : I18nextWithTranslation;
  };
}
