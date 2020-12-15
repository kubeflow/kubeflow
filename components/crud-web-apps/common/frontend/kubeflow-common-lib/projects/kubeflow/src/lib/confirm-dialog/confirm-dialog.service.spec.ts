import { TestBed } from '@angular/core/testing';

import { ConfirmDialogService } from './confirm-dialog.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogModule } from './confirm-dialog.module';

describe('ConfirmDialogService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [ConfirmDialogModule],
      providers: [MatDialog],
    }),
  );

  it('should be created', () => {
    const service: ConfirmDialogService = TestBed.get(ConfirmDialogService);
    expect(service).toBeTruthy();
  });
});
