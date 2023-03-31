import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IframeGuard } from './iframe.guard';

describe('IframeGuard', () => {
  let guard: IframeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(IframeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
