/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import type { Circus } from '@jest/types';
import type { TestFileEvent } from 'jest-runner';
declare const testCaseReportHandler: (testPath: string, sendMessageToJest: TestFileEvent) => (event: Circus.Event) => void;
export default testCaseReportHandler;
