import { DomSanitizer } from '@angular/platform-browser';
import { SafePipe } from './safe.pipe';

describe('SafePipe', () => {
  it('create an instance', () => {
    const sanitizer = {} as DomSanitizer;
    const pipe = new SafePipe(sanitizer);
    expect(pipe).toBeTruthy();
  });
});
