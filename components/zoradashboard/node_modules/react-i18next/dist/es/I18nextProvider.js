import { createElement, useMemo } from 'react';
import { I18nContext } from './context';
export function I18nextProvider(_ref) {
  var i18n = _ref.i18n,
      defaultNS = _ref.defaultNS,
      children = _ref.children;
  var value = useMemo(function () {
    return {
      i18n: i18n,
      defaultNS: defaultNS
    };
  }, [i18n, defaultNS]);
  return createElement(I18nContext.Provider, {
    value: value
  }, children);
}