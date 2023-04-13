import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

import { CDBNamespaceService } from './namespace.service';
import { Namespace } from '../types/namespace';
import { Router } from '@angular/router';

describe('NamespaceService', () => {
  let service: CDBNamespaceService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(CDBNamespaceService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate Namespace properly', () => {
    let namespace: Namespace = {
      namespace: service.ALL_NAMESPACES,
      disabled: true,
    };
    expect(service['validateSelectedNamespaces'](namespace)).toEqual(false);

    namespace.disabled = false;
    expect(service['validateSelectedNamespaces'](namespace)).toEqual(true);

    namespace.namespace = 'test';
    expect(service['validateSelectedNamespaces'](namespace)).toEqual(true);
  });

  it('should update query parameters with namespace', () => {
    const spy = spyOn(router, 'navigate').and.stub();
    spyOnProperty(router, 'url', 'get').and.returnValue(
      '/_/path?qs=queryParam#fragment',
    );

    service['updateQueryParams']('test-namespace');
    expect(spy.calls.first().args[1].queryParams.ns).toContain(
      'test-namespace',
    );
  });
});
