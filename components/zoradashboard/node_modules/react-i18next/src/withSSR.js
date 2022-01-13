import React from 'react';
import { useSSR } from './useSSR';
import { composeInitialProps } from './context';
import { getDisplayName } from './utils';

export function withSSR() {
  return function Extend(WrappedComponent) {
    function I18nextWithSSR({ initialI18nStore, initialLanguage, ...rest }) {
      useSSR(initialI18nStore, initialLanguage);

      return React.createElement(WrappedComponent, {
        ...rest,
      });
    }

    I18nextWithSSR.getInitialProps = composeInitialProps(WrappedComponent);
    I18nextWithSSR.displayName = `withI18nextSSR(${getDisplayName(WrappedComponent)})`;
    I18nextWithSSR.WrappedComponent = WrappedComponent;

    return I18nextWithSSR;
  };
}
