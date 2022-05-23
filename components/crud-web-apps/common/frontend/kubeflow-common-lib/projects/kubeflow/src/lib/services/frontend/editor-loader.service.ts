import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

declare global {
  interface Window {
    require: any;
  }
}
let monacoHasInitiated = false;
let monacoInitializing = false;
const monacoInitState = new BehaviorSubject<boolean>(false);

@Injectable({
  providedIn: 'root',
})
export class EditorLoaderService {
  readonly monacoPath = 'static/assets/monaco-editor/min/vs';

  constructor() {
    this.loadMonaco();
  }

  get monacoHasInitiated() {
    return monacoHasInitiated;
  }

  get monacoInitState() {
    return monacoInitState;
  }

  loadMonaco() {
    const onGotAmdLoader = () => {
      const vsPath = this.monacoPath;
      window.require.config({ paths: { vs: vsPath } });

      // Load monaco
      window.require(
        ['vs/editor/editor.main'],
        () => {
          monacoHasInitiated = true;
          monacoInitializing = false;
          monacoInitState.next(true);
        },
        (error: any) => console.error('Error loading monaco-editor: ', error),
      );
    };

    if (!monacoHasInitiated && !monacoInitializing) {
      monacoInitializing = true;
      const loaderScript: HTMLScriptElement = document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = `${this.monacoPath}/loader.js`;
      loaderScript.addEventListener('load', () => {
        onGotAmdLoader();
      });
      loaderScript.id = 'kf-editor-loader-script';
      document.body.appendChild(loaderScript);
    }
  }
}
