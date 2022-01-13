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
var AuthenticationDetails = /*#__PURE__*/function () {
  /**
   * Constructs a new AuthenticationDetails object
   * @param {object=} data Creation options.
   * @param {string} data.Username User being authenticated.
   * @param {string} data.Password Plain-text password to authenticate with.
   * @param {(AttributeArg[])?} data.ValidationData Application extra metadata.
   * @param {(AttributeArg[])?} data.AuthParamaters Authentication paramaters for custom auth.
   */
  function AuthenticationDetails(data) {
    var _ref = data || {},
        ValidationData = _ref.ValidationData,
        Username = _ref.Username,
        Password = _ref.Password,
        AuthParameters = _ref.AuthParameters,
        ClientMetadata = _ref.ClientMetadata;

    this.validationData = ValidationData || {};
    this.authParameters = AuthParameters || {};
    this.clientMetadata = ClientMetadata || {};
    this.username = Username;
    this.password = Password;
  }
  /**
   * @returns {string} the record's username
   */


  var _proto = AuthenticationDetails.prototype;

  _proto.getUsername = function getUsername() {
    return this.username;
  }
  /**
   * @returns {string} the record's password
   */
  ;

  _proto.getPassword = function getPassword() {
    return this.password;
  }
  /**
   * @returns {Array} the record's validationData
   */
  ;

  _proto.getValidationData = function getValidationData() {
    return this.validationData;
  }
  /**
   * @returns {Array} the record's authParameters
   */
  ;

  _proto.getAuthParameters = function getAuthParameters() {
    return this.authParameters;
  }
  /**
   * @returns {ClientMetadata} the clientMetadata for a Lambda trigger
   */
  ;

  _proto.getClientMetadata = function getClientMetadata() {
    return this.clientMetadata;
  };

  return AuthenticationDetails;
}();

exports["default"] = AuthenticationDetails;