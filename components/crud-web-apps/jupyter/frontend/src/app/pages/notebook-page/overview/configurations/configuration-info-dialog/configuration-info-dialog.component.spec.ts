import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditorModule, HeadingSubheadingRowModule } from 'kubeflow';

import {
  ConfigurationInfoDialogComponent,
  DialogData,
} from './configuration-info-dialog.component';
const data: DialogData = {
  config: {},
};

describe('ConfigurationInfoDialogComponent', () => {
  let component: ConfigurationInfoDialogComponent;
  let fixture: ComponentFixture<ConfigurationInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigurationInfoDialogComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: data }],
      imports: [EditorModule, HeadingSubheadingRowModule, MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });
});
