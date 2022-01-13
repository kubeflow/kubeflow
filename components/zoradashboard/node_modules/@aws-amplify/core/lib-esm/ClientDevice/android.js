/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
import { Platform, Dimensions } from 'react-native';
import { ConsoleLogger as Logger } from '../Logger';
var logger = new Logger('DeviceInfo');
export var clientInfo = function () {
    var dim = Dimensions.get('screen');
    logger.debug(Platform, dim);
    var OS = 'android';
    var Version = Platform.Version;
    return {
        platform: OS,
        version: String(Version),
        appVersion: [OS, String(Version)].join('/'),
    };
};
//# sourceMappingURL=android.js.map