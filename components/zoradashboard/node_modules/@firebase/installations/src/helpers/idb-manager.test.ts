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

import { expect } from 'chai';
import { stub } from 'sinon';
import { AppConfig } from '../interfaces/app-config';
import {
  InstallationEntry,
  RequestStatus
} from '../interfaces/installation-entry';
import { getFakeAppConfig } from '../testing/fake-generators';
import '../testing/setup';
import { clear, get, remove, set, update } from './idb-manager';
import * as fidChangedModule from './fid-changed';

const VALUE_A: InstallationEntry = {
  fid: 'VALUE_A',
  registrationStatus: RequestStatus.NOT_STARTED
};
const VALUE_B: InstallationEntry = {
  fid: 'VALUE_B',
  registrationStatus: RequestStatus.NOT_STARTED
};

describe('idb manager', () => {
  let appConfig: AppConfig;

  beforeEach(() => {
    appConfig = { ...getFakeAppConfig(), appName: 'appName1' };
  });

  describe('get / set', () => {
    it('sets a value and then gets the same value back', async () => {
      await set(appConfig, VALUE_A);
      const value = await get(appConfig);
      expect(value).to.deep.equal(VALUE_A);
    });

    it('gets undefined for a key that does not exist', async () => {
      const value = await get(appConfig);
      expect(value).to.be.undefined;
    });

    it('sets and gets multiple values with different keys', async () => {
      const appConfig2: AppConfig = {
        ...getFakeAppConfig(),
        appName: 'appName2'
      };

      await set(appConfig, VALUE_A);
      await set(appConfig2, VALUE_B);
      expect(await get(appConfig)).to.deep.equal(VALUE_A);
      expect(await get(appConfig2)).to.deep.equal(VALUE_B);
    });

    it('overwrites a value', async () => {
      await set(appConfig, VALUE_A);
      await set(appConfig, VALUE_B);
      expect(await get(appConfig)).to.deep.equal(VALUE_B);
    });

    it('calls fidChanged when a new FID is generated', async () => {
      const fidChangedStub = stub(fidChangedModule, 'fidChanged');
      await set(appConfig, VALUE_A);

      expect(fidChangedStub).to.have.been.calledOnceWith(
        appConfig,
        VALUE_A.fid
      );
    });

    it('calls fidChanged when the FID changes', async () => {
      await set(appConfig, VALUE_A);

      const fidChangedStub = stub(fidChangedModule, 'fidChanged');
      await set(appConfig, VALUE_B);

      expect(fidChangedStub).to.have.been.calledOnceWith(
        appConfig,
        VALUE_B.fid
      );
    });

    it('does not call fidChanged when the FID is the same', async () => {
      await set(appConfig, VALUE_A);

      const fidChangedStub = stub(fidChangedModule, 'fidChanged');
      await set(appConfig, /* Same value */ VALUE_A);

      expect(fidChangedStub).not.to.have.been.called;
    });
  });

  describe('remove', () => {
    it('deletes a key', async () => {
      await set(appConfig, VALUE_A);
      await remove(appConfig);
      expect(await get(appConfig)).to.be.undefined;
    });

    it('does not throw if key does not exist', async () => {
      await remove(appConfig);
      expect(await get(appConfig)).to.be.undefined;
    });
  });

  describe('clear', () => {
    it('deletes all keys', async () => {
      const appConfig2: AppConfig = {
        ...getFakeAppConfig(),
        appName: 'appName2'
      };

      await set(appConfig, VALUE_A);
      await set(appConfig2, VALUE_B);
      await clear();
      expect(await get(appConfig)).to.be.undefined;
      expect(await get(appConfig2)).to.be.undefined;
    });
  });

  describe('update', () => {
    it('gets and sets a value atomically, returns the new value', async () => {
      let isGetCalled = false;

      await set(appConfig, VALUE_A);

      const resultPromise = update(appConfig, oldValue => {
        // get is already called for the same key, but it will only complete
        // after update transaction finishes, at which point it will return the
        // new value.
        expect(isGetCalled).to.be.true;

        expect(oldValue).to.deep.equal(VALUE_A);
        return VALUE_B;
      });

      // Called immediately after update, but before update completed.
      const getPromise = get(appConfig);
      isGetCalled = true;

      // Update returns the new value
      expect(await resultPromise).to.deep.equal(VALUE_B);

      // If update weren't atomic, this would return the old value.
      expect(await getPromise).to.deep.equal(VALUE_B);
    });

    it('calls fidChanged when a new FID is generated', async () => {
      const fidChangedStub = stub(fidChangedModule, 'fidChanged');
      await update(appConfig, () => VALUE_A);

      expect(fidChangedStub).to.have.been.calledOnceWith(
        appConfig,
        VALUE_A.fid
      );
    });

    it('calls fidChanged when the FID changes', async () => {
      await set(appConfig, VALUE_A);

      const fidChangedStub = stub(fidChangedModule, 'fidChanged');
      await update(appConfig, () => VALUE_B);

      expect(fidChangedStub).to.have.been.calledOnceWith(
        appConfig,
        VALUE_B.fid
      );
    });

    it('does not call fidChanged when the FID is the same', async () => {
      await set(appConfig, VALUE_A);

      const fidChangedStub = stub(fidChangedModule, 'fidChanged');
      await update(appConfig, () => /* Same value */ VALUE_A);

      expect(fidChangedStub).not.to.have.been.called;
    });
  });
});
