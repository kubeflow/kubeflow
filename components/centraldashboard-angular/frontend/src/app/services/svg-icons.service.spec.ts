import { TestBed } from '@angular/core/testing';

import { SvgIconsService } from './svg-icons.service';

describe('SvgIconsService', () => {
  let service: SvgIconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SvgIconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
