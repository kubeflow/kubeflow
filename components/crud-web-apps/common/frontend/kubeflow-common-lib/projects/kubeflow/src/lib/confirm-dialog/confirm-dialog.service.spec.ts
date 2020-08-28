import { TestBed } from '@angular/core/testing';

import { ConfirmDialogService } from './confirm-dialog.service';

describe('ConfirmDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmDialogService = TestBed.get(ConfirmDialogService);
    expect(service).toBeTruthy();
  });
});
