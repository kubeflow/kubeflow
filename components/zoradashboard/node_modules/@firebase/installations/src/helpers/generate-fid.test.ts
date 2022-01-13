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
import { generateFid, VALID_FID_PATTERN } from './generate-fid';

/** A few random values to generate a FID from. */
// prettier-ignore
const MOCK_RANDOM_VALUES = [
  [14, 107, 44, 183, 190, 84, 253, 45, 219, 233, 43, 190, 240, 152, 195, 222, 237],
  [184, 251, 91, 157, 125, 225, 209, 15, 116, 66, 46, 113, 194, 126, 16, 13, 226],
  [197, 123, 13, 142, 239, 129, 252, 139, 156, 36, 219, 192, 153, 52, 182, 231, 177],
  [69, 154, 197, 91, 156, 196, 125, 111, 3, 67, 212, 132, 169, 11, 14, 254, 125],
  [193, 102, 58, 19, 244, 69, 36, 135, 170, 106, 98, 216, 246, 209, 24, 155, 149],
  [252, 59, 222, 160, 82, 160, 82, 186, 14, 172, 196, 114, 146, 191, 196, 194, 146],
  [64, 147, 153, 236, 225, 142, 235, 109, 184, 249, 174, 127, 33, 238, 227, 172, 111],
  [129, 137, 136, 120, 248, 206, 253, 78, 159, 201, 216, 15, 246, 80, 118, 185, 211],
  [117, 150, 2, 180, 116, 230, 45, 188, 183, 43, 152, 100, 50, 255, 101, 175, 190],
  [156, 129, 30, 101, 58, 137, 217, 249, 12, 227, 235, 80, 248, 81, 191, 2, 5],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255],
];

/** The FIDs that should be generated based on MOCK_RANDOM_VALUES. */
const EXPECTED_FIDS = [
  'fmsst75U_S3b6Su-8JjD3u',
  'ePtbnX3h0Q90Qi5xwn4QDe',
  'dXsNju-B_IucJNvAmTS257',
  'dZrFW5zEfW8DQ9SEqQsO_n',
  'cWY6E_RFJIeqamLY9tEYm5',
  'fDveoFKgUroOrMRykr_Ewp',
  'cJOZ7OGO6224-a5_Ie7jrG',
  'cYmIePjO_U6fydgP9lB2ud',
  'dZYCtHTmLby3K5hkMv9lr7',
  'fIEeZTqJ2fkM4-tQ-FG_Ag',
  'cAAAAAAAAAAAAAAAAAAAAA',
  'f_____________________'
];

describe('generateFid', () => {
  it('deterministically generates FIDs based on crypto.getRandomValues', () => {
    let randomValueIndex = 0;
    stub(crypto, 'getRandomValues').callsFake(array => {
      if (!(array instanceof Uint8Array)) {
        throw new Error('what');
      }
      const values = MOCK_RANDOM_VALUES[randomValueIndex++];
      for (let i = 0; i < array.length; i++) {
        array[i] = values[i];
      }
      return array;
    });

    for (const expectedFid of EXPECTED_FIDS) {
      expect(generateFid()).to.deep.equal(expectedFid);
    }
  });

  it('generates valid FIDs', () => {
    for (let i = 0; i < 1000; i++) {
      const fid = generateFid();
      expect(VALID_FID_PATTERN.test(fid)).to.equal(
        true,
        `${fid} is not a valid FID`
      );
    }
  });

  it('generates FIDs where each character is equally likely to appear in each location', () => {
    const numTries = 200000;

    const charOccurrencesMapList: Array<Map<string, number>> = new Array(22);
    for (let i = 0; i < charOccurrencesMapList.length; i++) {
      charOccurrencesMapList[i] = new Map();
    }

    for (let i = 0; i < numTries; i++) {
      const fid = generateFid();

      Array.from(fid).forEach((char, location) => {
        const map = charOccurrencesMapList[location];
        map.set(char, (map.get(char) || 0) + 1);
      });
    }

    for (let i = 0; i < charOccurrencesMapList.length; i++) {
      const map = charOccurrencesMapList[i];
      if (i === 0) {
        // In the first location only 4 characters (c, d, e, f) are valid.
        expect(map.size).to.equal(4);
      } else {
        // In locations other than the first, all 64 characters are valid.
        expect(map.size).to.equal(64);
      }

      Array.from(map.entries()).forEach(([_, occurrence]) => {
        const expectedOccurrence = numTries / map.size;

        // 10% margin of error
        expect(occurrence).to.be.above(expectedOccurrence * 0.9);
        expect(occurrence).to.be.below(expectedOccurrence * 1.1);
      });
    }
  }).timeout(30000);

  it('returns an empty string if FID generation fails', () => {
    stub(crypto, 'getRandomValues').throws();

    const fid = generateFid();
    expect(fid).to.equal('');
  });
});
