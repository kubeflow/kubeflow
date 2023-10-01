import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [ErrorInterceptor],
    }),
  );

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
