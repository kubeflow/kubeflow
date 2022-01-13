import React from 'react';
import { Namespace, DefaultNamespace, TFuncKey, Trans } from '.';
import { i18n } from 'i18next';

export { Trans };

declare module 'react-i18next/icu.macro' {
  export interface PluralSubProps<
    K extends TFuncKey<N> extends infer A ? A : never,
    N extends Namespace = DefaultNamespace
  > {
    children?: never;
    i18nKey?: K;
    i18n?: i18n;
    ns?: N;
    count: number;
    zero?: string | React.ReactElement;
    one?: string | React.ReactElement;
    two?: string | React.ReactElement;
    few?: string | React.ReactElement;
    many?: string | React.ReactElement;
    other: string | React.ReactElement;
  }

  type PluralProps<
    T,
    K extends TFuncKey<N> extends infer A ? A : never,
    N extends Namespace = DefaultNamespace
  > = {
    [P in keyof T]: P extends keyof PluralSubProps<K, N>
      ? // support the standard properties of Plural
        PluralSubProps<K, N>[P]
      : // this supports infinite $0={..} or $123={..}
      // technically it also supports $-1={..} and $2.3={..} but we don't need to
      // worry since that's invalid syntax.
      P extends `$${number}`
      ? string | React.ReactElement
      : never;
  };

  interface SelectSubProps {
    [key: string]: string | React.ReactElement;
  }

  interface NoChildren {
    children?: never;
  }

  interface SelectRequiredProps<
    K extends TFuncKey<N> extends infer A ? A : never,
    N extends Namespace = DefaultNamespace
  > extends NoChildren {
    i18nKey?: K;
    i18n?: i18n;
    ns?: N;
    other: string | React.ReactElement;
  }

  // defining it this way ensures that `other` is always defined, but allows
  // unlimited other select types.
  type SelectProps<
    K extends TFuncKey<N> extends infer A ? A : never,
    N extends Namespace = DefaultNamespace
  > = SelectSubProps & SelectRequiredProps<K, N>;

  function Plural<
    T,
    K extends TFuncKey<N> extends infer A ? A : never,
    N extends Namespace = DefaultNamespace
  >(props: PluralProps<T, K, N> & NoChildren): React.ReactElement;

  function SelectOrdinal<
    T,
    K extends TFuncKey<N> extends infer A ? A : never,
    N extends Namespace = DefaultNamespace
  >(props: PluralProps<T, K, N> & NoChildren): React.ReactElement;

  function Select<
    K extends TFuncKey<N> extends infer A ? A : never,
    N extends Namespace = DefaultNamespace
  >(props: SelectProps<K, N>): React.ReactElement;

  function date(strings: TemplateStringsArray, variable: Date): string;
  function time(strings: TemplateStringsArray, variable: Date): string;
  function number(strings: TemplateStringsArray, variable: number): string;

  type ValidInterpolations = React.ReactElement | string;

  function plural(
    strings: TemplateStringsArray,
    variable: number,
    ...args: ValidInterpolations[]
  ): string;
  function selectOrdinal(
    strings: TemplateStringsArray,
    variable: number,
    ...args: ValidInterpolations[]
  ): string;
  function select(
    strings: TemplateStringsArray,
    variable: string,
    ...args: ValidInterpolations[]
  ): string;
}
