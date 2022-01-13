export { Trans } from './Trans';
export { useTranslation } from './useTranslation';
export { withTranslation } from './withTranslation';
export { Translation } from './Translation';
export { I18nextProvider } from './I18nextProvider';
export { withSSR } from './withSSR';
export { useSSR } from './useSSR';

export {
  I18nContext,
  initReactI18next,
  setDefaults,
  getDefaults,
  setI18n,
  getI18n,
  composeInitialProps,
  getInitialProps,
} from './context';

// dummy functions for icu.macro support

export const date = () => '';
export const time = () => '';
export const number = () => '';
export const select = () => '';
export const plural = () => '';
export const selectOrdinal = () => '';
