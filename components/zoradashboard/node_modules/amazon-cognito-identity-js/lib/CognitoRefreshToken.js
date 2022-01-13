"use strict";

exports.__esModule = true;
exports["default"] = void 0;

/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */

/** @class */
var CognitoRefreshToken = /*#__PURE__*/function () {
  /**
   * Constructs a new CognitoRefreshToken object
   * @param {string=} RefreshToken The JWT refresh token.
   */
  function CognitoRefreshToken(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        RefreshToken = _ref.RefreshToken;

    // Assign object
    this.token = RefreshToken || '';
  }
  /**
   * @returns {string} the record's token.
   */


  var _proto = CognitoRefreshToken.prototype;

  _proto.getToken = function getToken() {
    return this.token;
  };

  return CognitoRefreshToken;
}();

exports["default"] = CognitoRefreshToken;