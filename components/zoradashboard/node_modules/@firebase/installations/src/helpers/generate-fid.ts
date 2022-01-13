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

import { bufferToBase64UrlSafe } from './buffer-to-base64-url-safe';

export const VALID_FID_PATTERN = /^[cdef][\w-]{21}$/;
export const INVALID_FID = '';

/**
 * Generates a new FID using random values from Web Crypto API.
 * Returns an empty string if FID generation fails for any reason.
 */
export function generateFid(): string {
  try {
    // A valid FID has exactly 22 base64 characters, which is 132 bits, or 16.5
    // bytes. our implementation generates a 17 byte array instead.
    const fidByteArray = new Uint8Array(17);
    const crypto =
      self.crypto || ((self as unknown) as { msCrypto: Crypto }).msCrypto;
    crypto.getRandomValues(fidByteArray);

    // Replace the first 4 random bits with the constant FID header of 0b0111.
    fidByteArray[0] = 0b01110000 + (fidByteArray[0] % 0b00010000);

    const fid = encode(fidByteArray);

    return VALID_FID_PATTERN.test(fid) ? fid : INVALID_FID;
  } catch {
    // FID generation errored
    return INVALID_FID;
  }
}

/** Converts a FID Uint8Array to a base64 string representation. */
function encode(fidByteArray: Uint8Array): string {
  const b64String = bufferToBase64UrlSafe(fidByteArray);

  // Remove the 23rd character that was added because of the extra 4 bits at the
  // end of our 17 byte array, and the '=' padding.
  return b64String.substr(0, 22);
}
