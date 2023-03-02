import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorModule } from 'kubeflow';

import { YamlComponent } from './yaml.component';

describe('YamlComponent', () => {
  let component: YamlComponent;
  let fixture: ComponentFixture<YamlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YamlComponent],
      imports: [EditorModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YamlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
