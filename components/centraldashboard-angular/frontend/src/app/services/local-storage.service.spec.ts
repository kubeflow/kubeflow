import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

const KEY = '/namespace/test';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let mockStorage: Storage;
  let setItemSpy: jasmine.Spy<(key: string, value: string) => void>;
  let getItemSpy: jasmine.Spy<(key: string) => string | null>;
  let removeItemSpy: jasmine.Spy<(key: string) => void>;
  let clearSpy: jasmine.Spy<() => void>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    spyOn(console, 'error');
  });

  beforeEach(() => {
    mockStorage = {} as Storage;
    const localStorage = service['window'].localStorage;
    setItemSpy = spyOn(localStorage, 'setItem').and.callFake((name, data) => {
      mockStorage[name] = data;
    });
    getItemSpy = spyOn(localStorage, 'getItem').and.callFake(name => {
      if (mockStorage[name]) {
        return mockStorage[name];
      }
      return null;
    });
    removeItemSpy = spyOn(localStorage, 'removeItem').and.callFake(name => {
      delete mockStorage[name];
    });
    clearSpy = spyOn(localStorage, 'clear').and.callFake(() => {
      mockStorage = {} as Storage;
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should localStorage.setItem to have been called', () => {
    service.set(KEY, 'test');
    expect(setItemSpy).toHaveBeenCalled();
    service.set(KEY, undefined);
    expect(setItemSpy.calls.count()).toEqual(2);
  });

  it('should localStorage.getItem to have been called', () => {
    service.get(KEY);
    expect(getItemSpy).toHaveBeenCalled();
  });

  it('should localStorage.removeItem to have been called', () => {
    service.remove(KEY);
    expect(removeItemSpy).toHaveBeenCalled();
  });

  it('should localStorage.clear to have been called', () => {
    getItemSpy.and.returnValue('');
    service.get(KEY);
    expect(getItemSpy).toHaveBeenCalled();
    expect(clearSpy).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
  });

  it('should localStorage.setItem to have been called', () => {
    service.set(KEY, undefined);
    expect(setItemSpy).toHaveBeenCalled();
  });
});
