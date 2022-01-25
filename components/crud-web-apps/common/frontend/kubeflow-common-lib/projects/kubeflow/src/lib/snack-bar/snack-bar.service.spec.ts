import { TestBed } from '@angular/core/testing';
import { SnackBarService } from './snack-bar.service';
import { MatSnackBar } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';

export class MockSnackBarService {
  public close() {}
  public open() {}
}

describe('SnackBarService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [MatSnackBar, Overlay],
    }),
  );

  it('should be created', () => {
    const service: SnackBarService = TestBed.get(SnackBarService);
    expect(service).toBeTruthy();
  });
});
