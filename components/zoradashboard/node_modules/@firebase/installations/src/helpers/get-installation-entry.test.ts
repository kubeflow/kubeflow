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

import { AssertionError, expect } from 'chai';
import { SinonFakeTimers, SinonStub, stub, useFakeTimers } from 'sinon';
import * as createInstallationRequestModule from '../api/create-installation-request';
import { AppConfig } from '../interfaces/app-config';
import {
  InProgressInstallationEntry,
  RegisteredInstallationEntry,
  RequestStatus,
  UnregisteredInstallationEntry
} from '../interfaces/installation-entry';
import { getFakeAppConfig } from '../testing/fake-generators';
import '../testing/setup';
import { ERROR_FACTORY, ErrorCode } from '../util/errors';
import { sleep } from '../util/sleep';
import * as generateFidModule from './generate-fid';
import { getInstallationEntry } from './get-installation-entry';
import { get, set } from './idb-manager';

const FID = 'cry-of-the-black-birds';

describe('getInstallationEntry', () => {
  let clock: SinonFakeTimers;
  let appConfig: AppConfig;
  let createInstallationRequestSpy: SinonStub<
    [AppConfig, InProgressInstallationEntry],
    Promise<RegisteredInstallationEntry>
  >;

  beforeEach(() => {
    clock = useFakeTimers({ now: 1_000_000 });
    appConfig = getFakeAppConfig();
    createInstallationRequestSpy = stub(
      createInstallationRequestModule,
      'createInstallationRequest'
    ).callsFake(
      async (_, installationEntry): Promise<RegisteredInstallationEntry> => {
        await sleep(500); // Request would take some time
        const registeredInstallationEntry: RegisteredInstallationEntry = {
          // Returns new FID if client FID is invalid.
          fid: installationEntry.fid || FID,
          registrationStatus: RequestStatus.COMPLETED,
          refreshToken: 'refreshToken',
          authToken: {
            requestStatus: RequestStatus.COMPLETED,
            creationTime: Date.now(),
            token: 'token',
            expiresIn: 1_000_000_000
          }
        };
        return registeredInstallationEntry;
      }
    );
  });

  afterEach(() => {
    // Clean up all pending requests.
    clock.runAll();
  });

  it('saves the InstallationEntry in the database before returning it', async () => {
    const oldDbEntry = await get(appConfig);
    expect(oldDbEntry).to.be.undefined;

    const { installationEntry } = await getInstallationEntry(appConfig);

    const newDbEntry = await get(appConfig);
    expect(newDbEntry).to.deep.equal(installationEntry);
  });

  it('saves the InstallationEntry in the database if app is offline', async () => {
    stub(navigator, 'onLine').value(false);

    const oldDbEntry = await get(appConfig);
    expect(oldDbEntry).to.be.undefined;

    const { installationEntry } = await getInstallationEntry(appConfig);

    const newDbEntry = await get(appConfig);
    expect(newDbEntry).to.deep.equal(installationEntry);
  });

  it('saves the InstallationEntry in the database when registration completes', async () => {
    const {
      installationEntry,
      registrationPromise
    } = await getInstallationEntry(appConfig);
    expect(installationEntry.registrationStatus).to.equal(
      RequestStatus.IN_PROGRESS
    );
    expect(registrationPromise).to.be.an.instanceOf(Promise);

    const oldDbEntry = await get(appConfig);
    expect(oldDbEntry).to.deep.equal(installationEntry);

    clock.next(); // Finish registration request.
    await expect(registrationPromise).to.be.fulfilled;

    const newDbEntry = await get(appConfig);
    expect(newDbEntry!.registrationStatus).to.equal(RequestStatus.COMPLETED);
  });

  it('saves the InstallationEntry in the database when registration fails', async () => {
    createInstallationRequestSpy.callsFake(async () => {
      await sleep(500); // Request would take some time
      throw ERROR_FACTORY.create(ErrorCode.REQUEST_FAILED, {
        requestName: 'Create Installation',
        serverCode: 500,
        serverStatus: 'INTERNAL',
        serverMessage: 'Internal server error.'
      });
    });

    const {
      installationEntry,
      registrationPromise
    } = await getInstallationEntry(appConfig);
    expect(installationEntry.registrationStatus).to.equal(
      RequestStatus.IN_PROGRESS
    );
    expect(registrationPromise).to.be.an.instanceOf(Promise);

    const oldDbEntry = await get(appConfig);
    expect(oldDbEntry).to.deep.equal(installationEntry);

    clock.next(); // Finish registration request.
    await expect(registrationPromise).to.be.rejected;

    const newDbEntry = await get(appConfig);
    expect(newDbEntry!.registrationStatus).to.equal(RequestStatus.NOT_STARTED);
  });

  it('removes the InstallationEntry from the database when registration fails with 409', async () => {
    createInstallationRequestSpy.callsFake(async () => {
      await sleep(500); // Request would take some time
      throw ERROR_FACTORY.create(ErrorCode.REQUEST_FAILED, {
        requestName: 'Create Installation',
        serverCode: 409,
        serverStatus: 'INVALID_ARGUMENT',
        serverMessage: 'FID can not be used.'
      });
    });

    const {
      installationEntry,
      registrationPromise
    } = await getInstallationEntry(appConfig);
    expect(installationEntry.registrationStatus).to.equal(
      RequestStatus.IN_PROGRESS
    );

    const oldDbEntry = await get(appConfig);
    expect(oldDbEntry).to.deep.equal(installationEntry);

    clock.next(); // Finish registration request.
    await expect(registrationPromise).to.be.rejected;

    const newDbEntry = await get(appConfig);
    expect(newDbEntry).to.be.undefined;
  });

  it('returns the same FID on subsequent calls', async () => {
    const { installationEntry: entry1 } = await getInstallationEntry(appConfig);
    const { installationEntry: entry2 } = await getInstallationEntry(appConfig);
    expect(entry1.fid).to.equal(entry2.fid);
  });

  describe('when there is no InstallationEntry in database', () => {
    let generateInstallationEntrySpy: SinonStub<[], string>;

    beforeEach(() => {
      generateInstallationEntrySpy = stub(
        generateFidModule,
        'generateFid'
      ).returns(FID);
    });

    it('returns a new pending InstallationEntry and triggers createInstallation', async () => {
      const {
        installationEntry,
        registrationPromise
      } = await getInstallationEntry(appConfig);

      if (installationEntry.registrationStatus !== RequestStatus.IN_PROGRESS) {
        throw new AssertionError('InstallationEntry is not IN_PROGRESS.');
      }

      expect(registrationPromise).to.be.an.instanceOf(Promise);
      expect(installationEntry).to.deep.equal({
        fid: FID,
        registrationStatus: RequestStatus.IN_PROGRESS,

        // https://github.com/chaijs/chai/issues/644
        registrationTime: installationEntry.registrationTime
      });
      expect(generateInstallationEntrySpy).to.be.called;
      expect(createInstallationRequestSpy).to.be.called;
    });

    it('returns a new unregistered InstallationEntry if app is offline', async () => {
      stub(navigator, 'onLine').value(false);

      const { installationEntry } = await getInstallationEntry(appConfig);

      expect(installationEntry).to.deep.equal({
        fid: FID,
        registrationStatus: RequestStatus.NOT_STARTED
      });
      expect(generateInstallationEntrySpy).to.be.called;
      expect(createInstallationRequestSpy).not.to.be.called;
    });

    it('does not trigger createInstallation REST call on subsequent calls', async () => {
      await getInstallationEntry(appConfig);
      await getInstallationEntry(appConfig);

      expect(createInstallationRequestSpy).to.be.calledOnce;
    });

    it('returns a registrationPromise on subsequent calls before initial promise resolves', async () => {
      const { registrationPromise: promise1 } = await getInstallationEntry(
        appConfig
      );
      const { registrationPromise: promise2 } = await getInstallationEntry(
        appConfig
      );

      expect(createInstallationRequestSpy).to.be.calledOnce;
      expect(promise1).to.be.an.instanceOf(Promise);
      expect(promise2).to.be.an.instanceOf(Promise);
    });

    it('does not return a registrationPromise on subsequent calls after initial promise resolves', async () => {
      const { registrationPromise: promise1 } = await getInstallationEntry(
        appConfig
      );
      expect(promise1).to.be.an.instanceOf(Promise);

      clock.next(); // Finish registration request.
      await expect(promise1).to.be.fulfilled;

      const { registrationPromise: promise2 } = await getInstallationEntry(
        appConfig
      );
      expect(promise2).to.be.undefined;

      expect(createInstallationRequestSpy).to.be.calledOnce;
    });

    it('waits for the FID from the server if FID generation fails', async () => {
      clock.restore();
      clock = useFakeTimers({
        now: 1_000_000,
        shouldAdvanceTime: true /* Needed to allow the createInstallation request to complete. */
      });

      // FID generation fails.
      generateInstallationEntrySpy.returns(generateFidModule.INVALID_FID);

      const getInstallationEntryPromise = getInstallationEntry(appConfig);

      const {
        installationEntry,
        registrationPromise
      } = await getInstallationEntryPromise;

      expect(installationEntry.fid).to.equal(FID);
      expect(registrationPromise).to.be.undefined;
    });
  });

  describe('when there is an unregistered InstallationEntry in the database', () => {
    beforeEach(async () => {
      const unregisteredInstallationEntry: UnregisteredInstallationEntry = {
        fid: FID,
        registrationStatus: RequestStatus.NOT_STARTED
      };
      await set(appConfig, unregisteredInstallationEntry);
    });

    it('returns a pending InstallationEntry and triggers createInstallation', async () => {
      const {
        installationEntry,
        registrationPromise
      } = await getInstallationEntry(appConfig);

      if (installationEntry.registrationStatus !== RequestStatus.IN_PROGRESS) {
        throw new AssertionError('InstallationEntry is not IN_PROGRESS.');
      }

      expect(registrationPromise).to.be.an.instanceOf(Promise);
      expect(installationEntry).to.deep.equal({
        fid: FID,
        registrationStatus: RequestStatus.IN_PROGRESS,
        // https://github.com/chaijs/chai/issues/644
        registrationTime: installationEntry.registrationTime
      });
      expect(createInstallationRequestSpy).to.be.calledOnce;
    });

    it('returns the same InstallationEntry if the app is offline', async () => {
      stub(navigator, 'onLine').value(false);

      const { installationEntry } = await getInstallationEntry(appConfig);

      expect(installationEntry).to.deep.equal({
        fid: FID,
        registrationStatus: RequestStatus.NOT_STARTED
      });
      expect(createInstallationRequestSpy).not.to.be.called;
    });
  });

  describe('when there is a pending InstallationEntry in the database', () => {
    beforeEach(async () => {
      const inProgressInstallationEntry: InProgressInstallationEntry = {
        fid: FID,
        registrationStatus: RequestStatus.IN_PROGRESS,
        registrationTime: 1_000_000
      };
      await set(appConfig, inProgressInstallationEntry);
    });

    it("returns the same InstallationEntry if the request hasn't timed out", async () => {
      clock.now = 1_001_000; // One second after the request was initiated.

      const { installationEntry } = await getInstallationEntry(appConfig);

      expect(installationEntry).to.deep.equal({
        fid: FID,
        registrationStatus: RequestStatus.IN_PROGRESS,
        registrationTime: 1_000_000
      });
      expect(createInstallationRequestSpy).not.to.be.called;
    });

    it('updates the InstallationEntry and triggers createInstallation if the request fails', async () => {
      clock.restore();
      clock = useFakeTimers({
        now: 1_001_000 /* One second after the request was initiated. */,
        shouldAdvanceTime: true /* Needed to allow the createInstallation request to complete. */
      });

      const installationEntryPromise = getInstallationEntry(appConfig);

      // The pending request fails after a while.
      clock.tick(3000);
      await set(appConfig, {
        fid: FID,
        registrationStatus: RequestStatus.NOT_STARTED
      });

      const { registrationPromise } = await installationEntryPromise;

      // Let the new getInstallationEntry process start.
      await sleep(250);

      const tokenDetails = (await get(
        appConfig
      )) as InProgressInstallationEntry;
      expect(tokenDetails.registrationTime).to.be.at.least(
        /* When the first pending request failed. */ 1_004_000
      );
      expect(tokenDetails).to.deep.equal({
        fid: FID,
        registrationStatus: RequestStatus.IN_PROGRESS,
        // Ignore registrationTime as we already checked it.
        registrationTime: tokenDetails.registrationTime
      });

      expect(registrationPromise).to.be.an.instanceOf(Promise);
      await registrationPromise;
      expect(createInstallationRequestSpy).to.be.calledOnce;
    });

    it('updates the InstallationEntry if the request fails and the app is offline', async () => {
      stub(navigator, 'onLine').value(false);

      clock.restore();
      clock = useFakeTimers({
        now: 1_001_000 /* One second after the request was initiated. */,
        shouldAdvanceTime: true /* Needed to allow the createInstallation request to complete. */
      });

      const installationEntryPromise = getInstallationEntry(appConfig);

      // The pending request fails after a while.
      clock.tick(3000);
      await set(appConfig, {
        fid: FID,
        registrationStatus: RequestStatus.NOT_STARTED
      });

      const { registrationPromise } = await installationEntryPromise;

      // Let the new getInstallationEntry process start.
      await sleep(250);

      expect(await get(appConfig)).to.deep.equal({
        fid: FID,
        registrationStatus: RequestStatus.NOT_STARTED
      });

      expect(registrationPromise).to.be.an.instanceOf(Promise);
      await expect(registrationPromise).to.be.rejectedWith(
        'Application offline'
      );
      expect(createInstallationRequestSpy).not.to.be.called;
    });

    it('returns a new pending InstallationEntry and triggers createInstallation if the request had already timed out', async () => {
      clock.now = 1_015_000; // Fifteen seconds after the request was initiated.

      const { installationEntry } = await getInstallationEntry(appConfig);

      expect(installationEntry).to.deep.equal({
        fid: FID,
        registrationStatus: RequestStatus.IN_PROGRESS,
        registrationTime: 1_015_000
      });
      expect(createInstallationRequestSpy).to.be.calledOnce;
    });

    it('returns a new unregistered InstallationEntry if the request had already timed out and the app is offline', async () => {
      stub(navigator, 'onLine').value(false);
      clock.now = 1_015_000; // Fifteen seconds after the request was initiated.

      const { installationEntry } = await getInstallationEntry(appConfig);

      expect(installationEntry).to.deep.equal({
        fid: FID,
        registrationStatus: RequestStatus.NOT_STARTED
      });
      expect(createInstallationRequestSpy).not.to.be.called;
    });
  });

  describe('when there is a registered InstallationEntry in the database', () => {
    beforeEach(async () => {
      const registeredInstallationEntry: RegisteredInstallationEntry = {
        fid: FID,
        registrationStatus: RequestStatus.COMPLETED,
        refreshToken: 'refreshToken',
        authToken: { requestStatus: RequestStatus.NOT_STARTED }
      };
      await set(appConfig, registeredInstallationEntry);
    });

    it('returns the InstallationEntry from the database', async () => {
      const { installationEntry } = await getInstallationEntry(appConfig);

      expect(installationEntry).to.deep.equal({
        fid: FID,
        registrationStatus: RequestStatus.COMPLETED,
        refreshToken: 'refreshToken',
        authToken: { requestStatus: RequestStatus.NOT_STARTED }
      });
      expect(createInstallationRequestSpy).not.to.be.called;
    });
  });
});
