import { TestBed } from '@angular/core/testing';

import { TWABackendService } from './backend.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { KubeflowModule } from 'kubeflow';
import { MatRadioModule } from '@angular/material/radio';

describe('TWABackendService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        KubeflowModule,
        HttpClientModule,
        MatSnackBarModule,
        MatRadioModule,
      ],
    }),
  );

  it('should be created', () => {
    const service: TWABackendService = TestBed.inject(TWABackendService);
    expect(service).toBeTruthy();
  });
});
