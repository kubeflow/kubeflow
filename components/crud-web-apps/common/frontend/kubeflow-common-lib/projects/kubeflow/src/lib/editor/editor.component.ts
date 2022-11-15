// tslint:disable-next-line
/// <reference path="interfaces/monaco.ts" />
import {
  Component,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
  ElementRef,
  SimpleChanges,
  OnChanges,
  NgZone,
} from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EditorLoaderService } from '../services/frontend/editor-loader.service';

interface MonacoOptions {
  readOnly?: boolean;
  language?: string;
  width?: number;
  height?: number;
}

@Component({
  selector: 'lib-monaco-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements AfterViewInit, OnDestroy, OnChanges {
  private prvEditor: monaco.editor.IStandaloneCodeEditor;

  @Input() text = '';
  @Output() textChange = new EventEmitter<string>();
  @Input() language = '';
  @Input() readOnly = false;
  @Input() height = 500;
  @Input() width = 800;

  text$ = new BehaviorSubject<string>('');
  options$ = new BehaviorSubject<MonacoOptions>({});
  monacoInitState: BehaviorSubject<boolean>;
  subscriptions = new Subscription();

  @ViewChild('monacoEditor', { static: true }) monacoEditor: ElementRef;

  constructor(
    private editorLoader: EditorLoaderService,
    private ngZone: NgZone,
  ) {}

  initEditor() {
    const options: monaco.editor.IStandaloneEditorConstructionOptions = {
      value: this.text,
      language: this.language,
      readOnly: this.readOnly,
      // Width may not affect the layout when auomaticLayout=true
      dimension: { width: this.width, height: this.height },
      automaticLayout: true,
      scrollBeyondLastLine: false,
      contextmenu: false,
      minimap: { enabled: false },
      fontSize: 12,
      wordWrap: 'on',
      lineNumbersMinChars: 0,
      scrollbar: {
        alwaysConsumeMouseWheel: false,
      },
    };

    this.prvEditor = window.monaco.editor.create(
      this.monacoEditor.nativeElement,
      options,
    );

    this.prvEditor.onDidChangeModelContent(() => {
      if (this.editorLoader.monacoHasInitiated) {
        this.ngZone.run(() => {
          const yaml = this.prvEditor.getModel().getValue();
          this.textChange.emit(yaml);
        });
      }
    });

    this.subscriptions.add(
      this.text$.subscribe(text => {
        if (text !== this.prvEditor.getModel().getValue()) {
          this.prvEditor.getModel().setValue(text);
        }
      }),
    );

    this.subscriptions.add(
      this.options$.subscribe(newOptions => {
        if (newOptions.readOnly === true || newOptions.readOnly === false) {
          this.prvEditor.updateOptions({
            readOnly: newOptions.readOnly,
          });
        }
        if (newOptions.language) {
          monaco.editor.setModelLanguage(
            this.prvEditor.getModel(),
            newOptions.language,
          );
        }
        if (newOptions.width && newOptions.height) {
          this.prvEditor.layout({
            width: newOptions.width,
            height: newOptions.height,
          });
        }
      }),
    );

    return this.prvEditor;
  }

  ngOnChanges(changes: SimpleChanges) {
    /* Update the monaco editor when there are changes to input values.
    We use behaviour subjects in order to keep the code clean and the
    update logic inside the editor's initialization.
     */
    if (changes.text) {
      this.text$.next(changes.text?.currentValue ?? this.text);
    }

    const options: MonacoOptions = {};

    if (changes.readOnly) {
      options.readOnly = changes.readOnly?.currentValue ?? this.readOnly;
    }
    if (changes.language) {
      options.language = changes.language?.currentValue ?? this.language;
    }
    if (changes.width) {
      options.width = changes.width?.currentValue ?? this.width;
    }
    if (changes.height) {
      options.height = changes.height?.currentValue ?? this.height;
    }

    this.options$.next(options);
  }

  ngAfterViewInit() {
    this.monacoInitState = this.editorLoader.monacoInitState;
    this.subscriptions.add(
      this.editorLoader.monacoInitState.subscribe(ready => {
        if (ready) {
          this.initEditor();
        }
      }),
    );
  }

  ngOnDestroy() {
    if (this.prvEditor) {
      this.prvEditor.dispose();
    }

    this.subscriptions.unsubscribe();
  }
}
