import {NextFunction, Request} from 'express';

import {attachUser} from './attach_user_middleware';

describe('Attach User Middleware', () => {
  const header = 'X-User-Email';
  const prefix = '';
  const middleware = attachUser(header, prefix);

  let mockRequest: jasmine.SpyObj<Request>;
  let mockNextFunction: jasmine.Spy;

  beforeEach(() => {
    mockRequest = jasmine.createSpyObj<Request>('mockRequest', ['header']);
    mockNextFunction = jasmine.createSpy();
  });

  it('Should extract a User from the request headers when present', () => {
    const email = 'user@domain.com';
    mockRequest.header.withArgs(header).and.returnValue(email);

    middleware(mockRequest, null, mockNextFunction);

    expect(mockRequest.user).toEqual({
      auth: {[header]: 'user@domain.com'},
      domain: 'domain.com',
      email,
      hasAuth: true,
      username: 'user',
    });
    expect(mockNextFunction).toHaveBeenCalled();
  });

  it('Should extract a default User when no user header is present in request', () => {
    const email = 'anonymous@kubeflow.org';
    mockRequest.header.withArgs(header).and.returnValue(null);

    middleware(mockRequest, null, mockNextFunction);

    expect(mockRequest.user).toEqual({
      auth: undefined,
      domain: 'kubeflow.org',
      email,
      hasAuth: false,
      username: 'anonymous',
    });
    expect(mockNextFunction).toHaveBeenCalled();
  });

  it('Should extract a default User when no userid header was passed in', () => {
    const email = 'anonymous@kubeflow.org';
    mockRequest.header.withArgs(header).and.returnValue(null);
    const noHeaderMiddleware = attachUser('', '');
    noHeaderMiddleware(mockRequest, null, mockNextFunction);

    expect(mockRequest.user).toEqual({
      auth: undefined,
      domain: 'kubeflow.org',
      email,
      hasAuth: false,
      username: 'anonymous',
    });
    expect(mockNextFunction).toHaveBeenCalled();
  });
});
