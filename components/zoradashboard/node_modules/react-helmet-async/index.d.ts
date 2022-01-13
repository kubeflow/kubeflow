declare module 'react-helmet-async' {
  import * as React from 'react';

  interface OtherElementAttributes {
    [key: string]: string | number | boolean | null | undefined;
  }

  type HtmlProps = JSX.IntrinsicElements['html'] & OtherElementAttributes;

  type BodyProps = JSX.IntrinsicElements['body'] & OtherElementAttributes;

  type LinkProps = JSX.IntrinsicElements['link'];

  type MetaProps = JSX.IntrinsicElements['meta'];

  export interface HelmetTags {
    baseTag: Array<any>;
    linkTags: Array<HTMLLinkElement>;
    metaTags: Array<HTMLMetaElement>;
    noscriptTags: Array<any>;
    scriptTags: Array<HTMLScriptElement>;
    styleTags: Array<HTMLStyleElement>;
  }

  export interface HelmetProps {
    async?: boolean;
    base?: any;
    bodyAttributes?: BodyProps;
    defaultTitle?: string;
    defer?: boolean;
    encodeSpecialCharacters?: boolean;
    htmlAttributes?: HtmlProps;
    onChangeClientState?: (newState: any, addedTags: HelmetTags, removedTags: HelmetTags) => void;
    link?: LinkProps[];
    meta?: MetaProps[];
    noscript?: Array<any>;
    script?: Array<any>;
    style?: Array<any>;
    title?: string;
    titleAttributes?: Object;
    titleTemplate?: string;
  }

  export class Helmet extends React.Component<HelmetProps> {
  }
  
  export interface HelmetData {
    base: HelmetDatum;
    bodyAttributes: HelmetHTMLBodyDatum;
    htmlAttributes: HelmetHTMLElementDatum;
    link: HelmetDatum;
    meta: HelmetDatum;
    noscript: HelmetDatum;
    script: HelmetDatum;
    style: HelmetDatum;
    title: HelmetDatum;
    titleAttributes: HelmetDatum;
  }

  export interface HelmetDatum {
    toString(): string;
    toComponent(): React.Component<any>;
  }

  export interface HelmetHTMLBodyDatum {
    toString(): string;
    toComponent(): React.HTMLAttributes<HTMLBodyElement>;
  }

  export interface HelmetHTMLElementDatum {
    toString(): string;
    toComponent(): React.HTMLAttributes<HTMLHtmlElement>;
  }

  export interface FilledContext {
    helmet: HelmetData;
  }

  interface ProviderProps {
    context?: {};
  }

  export class HelmetProvider extends React.Component<ProviderProps> {
    static canUseDOM: boolean;
  }
}
