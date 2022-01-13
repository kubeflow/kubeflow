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
import '../testing/setup';
import { compareHeaders } from './compare-headers';

describe('compareHeaders', () => {
  it("doesn't fail if headers contain the same entries", () => {
    const headers1 = new Headers({ a: '123', b: '456' });
    const headers2 = new Headers({ a: '123', b: '456' });
    compareHeaders(headers1, headers2);
  });

  it('fails if headers contain different keys', () => {
    const headers1 = new Headers({ a: '123', b: '456', extraKey: '789' });
    const headers2 = new Headers({ a: '123', b: '456' });
    expect(() => {
      compareHeaders(headers1, headers2);
    }).to.throw(AssertionError);
  });

  it('fails if headers contain different values', () => {
    const headers1 = new Headers({ a: '123', b: '456' });
    const headers2 = new Headers({ a: '123', b: 'differentValue' });
    expect(() => {
      compareHeaders(headers1, headers2);
    }).to.throw(AssertionError);
  });
});
