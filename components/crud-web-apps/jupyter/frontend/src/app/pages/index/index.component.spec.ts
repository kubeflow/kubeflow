import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterTestingModule } from '@angular/router/testing';
import { BackendService } from 'kubeflow';
import { Observable, of } from 'rxjs';
import { IndexDefaultModule } from './index-default/index-default.module';
import { IndexRokModule } from './index-rok/index-rok.module';

import { IndexComponent } from './index.component';

const MockBackendService: Partial<BackendService> = {
  getNamespaces(): Observable<string[]> {
    return of([]);
  },
};

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [IndexComponent],
        imports: [
          CommonModule,
          IndexRokModule,
          IndexDefaultModule,
          MatIconModule,
          MatTooltipModule,
          MatInputModule,
          MatSnackBarModule,
          RouterTestingModule,
        ],
        providers: [{ provide: BackendService, useValue: MockBackendService }],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
