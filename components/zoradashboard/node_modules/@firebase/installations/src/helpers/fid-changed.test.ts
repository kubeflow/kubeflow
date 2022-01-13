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
import '../testing/setup';
import { AppConfig } from '../interfaces/app-config';
import {
  fidChanged,
  addCallback,
  removeCallback
} from '../helpers/fid-changed';
import { getFakeAppConfig } from '../testing/fake-generators';

const FID = 'evil-lies-in-every-man';

describe('onIdChange', () => {
  describe('with single app', () => {
    let appConfig: AppConfig;

    beforeEach(() => {
      appConfig = getFakeAppConfig();
    });

    it('calls the provided callback when FID changes', () => {
      const stubFn = stub();
      addCallback(appConfig, stubFn);

      fidChanged(appConfig, FID);

      expect(stubFn).to.have.been.calledOnceWith(FID);
    });

    it('calls multiple callbacks', () => {
      const stubA = stub();
      addCallback(appConfig, stubA);
      const stubB = stub();
      addCallback(appConfig, stubB);

      fidChanged(appConfig, FID);

      expect(stubA).to.have.been.calledOnceWith(FID);
      expect(stubB).to.have.been.calledOnceWith(FID);
    });

    it('does not call removed callbacks', () => {
      const stubFn = stub();
      addCallback(appConfig, stubFn);

      removeCallback(appConfig, stubFn);
      fidChanged(appConfig, FID);

      expect(stubFn).not.to.have.been.called;
    });

    it('does not throw when removeCallback is called multiple times', () => {
      const stubFn = stub();
      addCallback(appConfig, stubFn);

      removeCallback(appConfig, stubFn);
      removeCallback(appConfig, stubFn);
      fidChanged(appConfig, FID);

      expect(stubFn).not.to.have.been.called;
    });
  });

  describe('with multiple apps', () => {
    let appConfigA: AppConfig;
    let appConfigB: AppConfig;

    beforeEach(() => {
      appConfigA = getFakeAppConfig();
      appConfigB = getFakeAppConfig({ appName: 'differentAppName' });
    });

    it('calls the correct callback when FID changes', () => {
      const stubA = stub();
      addCallback(appConfigA, stubA);
      const stubB = stub();
      addCallback(appConfigB, stubB);

      fidChanged(appConfigA, FID);

      expect(stubA).to.have.been.calledOnceWith(FID);
      expect(stubB).not.to.have.been.called;
    });
  });
});
