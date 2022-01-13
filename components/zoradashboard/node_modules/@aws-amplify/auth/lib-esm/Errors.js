/*
 * Copyright 2019-2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { ConsoleLogger as Logger } from '@aws-amplify/core';
import { AuthErrorStrings } from './common/AuthErrorStrings';
var logger = new Logger('AuthError');
var AuthError = /** @class */ (function (_super) {
    __extends(AuthError, _super);
    function AuthError(type) {
        var _this = this;
        var _a = authErrorMessages[type], message = _a.message, log = _a.log;
        _this = _super.call(this, message) || this;
        // Hack for making the custom error class work when transpiled to es5
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        _this.constructor = AuthError;
        Object.setPrototypeOf(_this, AuthError.prototype);
        _this.name = 'AuthError';
        _this.log = log || message;
        logger.error(_this.log);
        return _this;
    }
    return AuthError;
}(Error));
export { AuthError };
var NoUserPoolError = /** @class */ (function (_super) {
    __extends(NoUserPoolError, _super);
    function NoUserPoolError(type) {
        var _this = _super.call(this, type) || this;
        // Hack for making the custom error class work when transpiled to es5
        // TODO: Delete the following 2 lines after we change the build target to >= es2015
        _this.constructor = NoUserPoolError;
        Object.setPrototypeOf(_this, NoUserPoolError.prototype);
        _this.name = 'NoUserPoolError';
        return _this;
    }
    return NoUserPoolError;
}(AuthError));
export { NoUserPoolError };
export var authErrorMessages = {
    noConfig: {
        message: AuthErrorStrings.DEFAULT_MSG,
        log: "\n            Error: Amplify has not been configured correctly.\n            This error is typically caused by one of the following scenarios:\n\n            1. Make sure you're passing the awsconfig object to Amplify.configure() in your app's entry point\n                See https://aws-amplify.github.io/docs/js/authentication#configure-your-app for more information\n            \n            2. There might be multiple conflicting versions of amplify packages in your node_modules.\n\t\t\t\tRefer to our docs site for help upgrading Amplify packages (https://docs.amplify.aws/lib/troubleshooting/upgrading/q/platform/js)\n        ",
    },
    missingAuthConfig: {
        message: AuthErrorStrings.DEFAULT_MSG,
        log: "\n            Error: Amplify has not been configured correctly. \n            The configuration object is missing required auth properties.\n            This error is typically caused by one of the following scenarios:\n\n            1. Did you run `amplify push` after adding auth via `amplify add auth`?\n                See https://aws-amplify.github.io/docs/js/authentication#amplify-project-setup for more information\n\n            2. This could also be caused by multiple conflicting versions of amplify packages, see (https://docs.amplify.aws/lib/troubleshooting/upgrading/q/platform/js) for help upgrading Amplify packages.\n        ",
    },
    emptyUsername: {
        message: AuthErrorStrings.EMPTY_USERNAME,
    },
    // TODO: should include a list of valid sign-in types
    invalidUsername: {
        message: AuthErrorStrings.INVALID_USERNAME,
    },
    emptyPassword: {
        message: AuthErrorStrings.EMPTY_PASSWORD,
    },
    emptyCode: {
        message: AuthErrorStrings.EMPTY_CODE,
    },
    signUpError: {
        message: AuthErrorStrings.SIGN_UP_ERROR,
        log: 'The first parameter should either be non-null string or object',
    },
    noMFA: {
        message: AuthErrorStrings.NO_MFA,
    },
    invalidMFA: {
        message: AuthErrorStrings.INVALID_MFA,
    },
    emptyChallengeResponse: {
        message: AuthErrorStrings.EMPTY_CHALLENGE,
    },
    noUserSession: {
        message: AuthErrorStrings.NO_USER_SESSION,
    },
    deviceConfig: {
        message: AuthErrorStrings.DEVICE_CONFIG,
    },
    networkError: {
        message: AuthErrorStrings.NETWORK_ERROR,
    },
    default: {
        message: AuthErrorStrings.DEFAULT_MSG,
    },
};
//# sourceMappingURL=Errors.js.map