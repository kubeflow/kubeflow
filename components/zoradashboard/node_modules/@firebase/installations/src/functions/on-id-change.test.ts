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
import { onIdChange } from './on-id-change';
import * as FidChangedModule from '../helpers/fid-changed';
import { getFakeDependencies } from '../testing/fake-generators';
import { FirebaseDependencies } from '../interfaces/firebase-dependencies';

describe('onIdChange', () => {
  let dependencies: FirebaseDependencies;

  beforeEach(() => {
    dependencies = getFakeDependencies();
    stub(FidChangedModule);
  });

  it('calls addCallback with the given callback and app key when called', () => {
    const callback = stub();
    onIdChange(dependencies, callback);
    expect(FidChangedModule.addCallback).to.have.been.calledOnceWith(
      dependencies.appConfig,
      callback
    );
  });

  it('calls removeCallback with the given callback and app key when unsubscribe is called', () => {
    const callback = stub();
    const unsubscribe = onIdChange(dependencies, callback);
    unsubscribe();
    expect(FidChangedModule.removeCallback).to.have.been.calledOnceWith(
      dependencies.appConfig,
      callback
    );
  });
});
