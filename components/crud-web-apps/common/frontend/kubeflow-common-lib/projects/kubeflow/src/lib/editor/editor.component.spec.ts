import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('a new editor should be defined after initEditor() and new values should pass from the component to its editor', (done: DoneFn) => {
    component.monacoInitState.subscribe(ready => {
      if (ready) {
        const prvEditor = 'prvEditor';
        expect(component[prvEditor]).toBeDefined();
        const newEditor = component.monacoEditor;
        expect(newEditor).toBeDefined();
        component.text = 'hey hi';
        component.language = 'yaml';
        const changes = {
          text: new SimpleChange(null, component.text, true),
          readOnly: new SimpleChange(null, component.readOnly, true),
          language: new SimpleChange(null, component.language, true),
          width: new SimpleChange(null, component.width, true),
          height: new SimpleChange(null, component.height, true),
        };
        component.ngOnChanges(changes);
        fixture.detectChanges();
        expect(component[prvEditor].getModel().getValue()).toBe(component.text);
        expect(component[prvEditor].getModel().getLanguageId()).toBe(
          component.language,
        );

        done();
      }
    });
  });
});
