import * as goober from 'goober';
import { Theme } from '../src/core/types';

declare module 'goober' {
  interface Context {
    resource: any;
  }
  function keyframes(
    tag: CSSAttribute | TemplateStringsArray | string,
    ...props: Array<string | number>
  ): string;
}
