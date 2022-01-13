/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { FirebaseError } from '@firebase/util';
import { expect } from 'chai';
import { SinonStub, stub } from 'sinon';
import { CreateInstallationResponse } from '../interfaces/api-response';
import { AppConfig } from '../interfaces/app-config';
import {
  InProgressInstallationEntry,
  RequestStatus
} from '../interfaces/installation-entry';
import { compareHeaders } from '../testing/compare-headers';
import { getFakeAppConfig } from '../testing/fake-generators';
import '../testing/setup';
import {
  INSTALLATIONS_API_URL,
  INTERNAL_AUTH_VERSION,
  PACKAGE_VERSION
} from '../util/constants';
import { ErrorResponse } from './common';
import { createInstallationRequest } from './create-installation-request';

const FID = 'defenders-of-the-faith';

describe('createInstallationRequest', () => {
  let appConfig: AppConfig;
  let fetchSpy: SinonStub<[RequestInfo, RequestInit?], Promise<Response>>;
  let inProgressInstallationEntry: InProgressInstallationEntry;
  let response: CreateInstallationResponse;

  beforeEach(() => {
    appConfig = getFakeAppConfig();

    inProgressInstallationEntry = {
      fid: FID,
      registrationStatus: RequestStatus.IN_PROGRESS,
      registrationTime: Date.now()
    };

    response = {
      refreshToken: 'refreshToken',
      authToken: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        expiresIn: '604800s'
      },
      fid: FID
    };
    fetchSpy = stub(self, 'fetch');
  });

  describe('successful request', () => {
    beforeEach(() => {
      fetchSpy.resolves(new Response(JSON.stringify(response)));
    });

    it('registers a pending InstallationEntry', async () => {
      const registeredInstallationEntry = await createInstallationRequest(
        appConfig,
        inProgressInstallationEntry
      );
      expect(registeredInstallationEntry.registrationStatus).to.equal(
        RequestStatus.COMPLETED
      );
    });

    it('calls the createInstallation server API with correct parameters', async () => {
      const expectedHeaders = new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-goog-api-key': 'apiKey'
      });
      const expectedBody = {
        fid: FID,
        authVersion: INTERNAL_AUTH_VERSION,
        appId: appConfig.appId,
        sdkVersion: PACKAGE_VERSION
      };
      const expectedRequest: RequestInit = {
        method: 'POST',
        headers: expectedHeaders,
        body: JSON.stringify(expectedBody)
      };
      const expectedEndpoint = `${INSTALLATIONS_API_URL}/projects/projectId/installations`;

      await createInstallationRequest(appConfig, inProgressInstallationEntry);
      expect(fetchSpy).to.be.calledOnceWith(expectedEndpoint, expectedRequest);
      const actualHeaders = fetchSpy.lastCall.lastArg.headers;
      compareHeaders(expectedHeaders, actualHeaders);
    });
  });

  it('returns the FID from the request if the response does not contain one', async () => {
    response = {
      refreshToken: 'refreshToken',
      authToken: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        expiresIn: '604800s'
      }
    };
    fetchSpy.resolves(new Response(JSON.stringify(response)));

    const registeredInstallationEntry = await createInstallationRequest(
      appConfig,
      inProgressInstallationEntry
    );
    expect(registeredInstallationEntry.fid).to.equal(FID);
  });

  describe('failed request', () => {
    it('throws a FirebaseError with the error information from the server', async () => {
      const errorResponse: ErrorResponse = {
        error: {
          code: 409,
          message: 'Requested entity already exists',
          status: 'ALREADY_EXISTS'
        }
      };

      fetchSpy.resolves(
        new Response(JSON.stringify(errorResponse), { status: 409 })
      );

      await expect(
        createInstallationRequest(appConfig, inProgressInstallationEntry)
      ).to.be.rejectedWith(FirebaseError);
    });

    it('retries once if the server returns a 5xx error', async () => {
      const errorResponse: ErrorResponse = {
        error: {
          code: 500,
          message: 'Internal server error',
          status: 'SERVER_ERROR'
        }
      };

      fetchSpy
        .onCall(0)
        .resolves(new Response(JSON.stringify(errorResponse), { status: 500 }));
      fetchSpy.onCall(1).resolves(new Response(JSON.stringify(response)));

      await expect(
        createInstallationRequest(appConfig, inProgressInstallationEntry)
      ).to.be.fulfilled;
      expect(fetchSpy).to.be.calledTwice;
    });
  });
});
