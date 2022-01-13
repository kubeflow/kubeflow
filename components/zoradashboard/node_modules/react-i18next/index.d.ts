import i18next, { ReactOptions, i18n, ThirdPartyModule, WithT, TFunction, Resource } from 'i18next';
import * as React from 'react';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T extends K, K> = Omit<T, keyof K>;

export type Namespace = string | string[];

export function setDefaults(options: ReactOptions): void;
export function getDefaults(): ReactOptions;
export function setI18n(instance: i18n): void;
export function getI18n(): i18n;
export const initReactI18next: ThirdPartyModule;
export function composeInitialProps(ForComponent: any): (ctx: unknown) => Promise<any>;
export function getInitialProps(): {
  initialI18nStore: {
    [ns: string]: {};
  };
  initialLanguage: string;
};

export interface ReportNamespaces {
  addUsedNamespaces(namespaces: Namespace[]): void;
  getUsedNamespaces(): string[];
}

declare module 'i18next' {
  interface i18n {
    reportNamespaces: ReportNamespaces;
  }
}

export interface TransProps<E extends Element = HTMLDivElement>
  extends React.HTMLProps<E>,
    Partial<WithT> {
  children?: React.ReactNode;
  components?: readonly React.ReactNode[] | { readonly [tagName: string]: React.ReactNode };
  count?: number;
  defaults?: string;
  i18n?: i18n;
  i18nKey?: string;
  ns?: Namespace;
  parent?: string | React.ComponentType<any> | null; // used in React.createElement if not null
  tOptions?: {};
  values?: {};
  t?: TFunction;
}
export function Trans<E extends Element = HTMLDivElement>(props: TransProps<E>): React.ReactElement;

export function useSSR(initialI18nStore: Resource, initialLanguage: string): void;

export interface UseTranslationOptions {
  i18n?: i18n;
  useSuspense?: boolean;
}
export type UseTranslationResponse = [TFunction, i18n, boolean] & {
  t: TFunction;
  i18n: i18n;
  ready: boolean;
};
export function useTranslation(
  ns?: Namespace,
  options?: UseTranslationOptions,
): UseTranslationResponse;

// Need to see usage to improve this
export function withSSR(): <Props>(
  WrappedComponent: React.ComponentType<Props>,
) => {
  ({
    initialI18nStore,
    initialLanguage,
    ...rest
  }: {
    initialI18nStore: Resource;
    initialLanguage: string;
  } & Props): React.FunctionComponentElement<Props>;
  getInitialProps: (ctx: unknown) => Promise<any>;
};

export interface WithTranslation extends WithT {
  i18n: i18n;
  tReady: boolean;
}

export interface WithTranslationProps {
  i18n?: i18n;
  useSuspense?: boolean;
}

export function withTranslation(
  ns?: Namespace,
  options?: {
    withRef?: boolean;
  },
): <
  C extends React.ComponentType<React.ComponentProps<C> & WithTranslationProps>,
  ResolvedProps = JSX.LibraryManagedAttributes<
    C,
    Subtract<React.ComponentProps<C>, WithTranslationProps>
  >
>(
  component: C,
) => React.ComponentType<Omit<ResolvedProps, keyof WithTranslation> & WithTranslationProps>;

export interface I18nextProviderProps {
  i18n: i18n;
  defaultNS?: string;
}

export const I18nextProvider: React.FunctionComponent<I18nextProviderProps>;
export const I18nContext: React.Context<{ i18n: i18n }>;

export interface TranslationProps {
  children: (
    t: TFunction,
    options: {
      i18n: i18n;
      lng: string;
    },
    ready: boolean,
  ) => React.ReactNode;
  ns?: Namespace;
  i18n?: i18n;
  useSuspense?: boolean;
}

export function Translation(props: TranslationProps): any;
