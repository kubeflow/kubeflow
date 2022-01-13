import * as React from 'react';

interface RifmArgs {
  value: string;
  onChange: (str: string) => void;
  format: (str: string) => string;
  replace?: (str: string) => string;
  append?: (str: string) => string;
  mask?: boolean;
  accept?: RegExp;
}

interface RifmRenderArgs<E> {
  value: string;
  onChange: React.ChangeEventHandler<E>;
}

interface RifmProps<E> extends RifmArgs {
  children: (args: RifmRenderArgs<E>) => React.ReactNode;
}

declare function useRifm<E = HTMLInputElement>(
  args: RifmArgs
): RifmRenderArgs<E>;

declare class Rifm<E = HTMLInputElement> extends React.Component<
  RifmProps<E>
> {}

export { useRifm, Rifm };
