/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

/* This file implements gRFC A2 and the service config spec:
 * https://github.com/grpc/proposal/blob/master/A2-service-configs-in-dns.md
 * https://github.com/grpc/grpc/blob/master/doc/service_config.md. Each
 * function here takes an object with unknown structure and returns its
 * specific object type if the input has the right structure, and throws an
 * error otherwise. */

/* The any type is purposely used here. All functions validate their input at
 * runtime */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as os from 'os';
import { LoadBalancingConfig, validateLoadBalancingConfig } from './load-balancer';

export interface MethodConfigName {
  service: string;
  method?: string;
}

export interface MethodConfig {
  name: MethodConfigName[];
  waitForReady?: boolean;
  timeout?: string;
  maxRequestBytes?: number;
  maxResponseBytes?: number;
}

export interface ServiceConfig {
  loadBalancingPolicy?: string;
  loadBalancingConfig: LoadBalancingConfig[];
  methodConfig: MethodConfig[];
}

export interface ServiceConfigCanaryConfig {
  clientLanguage?: string[];
  percentage?: number;
  clientHostname?: string[];
  serviceConfig: ServiceConfig;
}

/**
 * Recognizes a number with up to 9 digits after the decimal point, followed by
 * an "s", representing a number of seconds.
 */
const TIMEOUT_REGEX = /^\d+(\.\d{1,9})?s$/;

/**
 * Client language name used for determining whether this client matches a
 * `ServiceConfigCanaryConfig`'s `clientLanguage` list.
 */
const CLIENT_LANGUAGE_STRING = 'node';

function validateName(obj: any): MethodConfigName {
  if (!('service' in obj) || typeof obj.service !== 'string') {
    throw new Error('Invalid method config name: invalid service');
  }
  const result: MethodConfigName = {
    service: obj.service,
  };
  if ('method' in obj) {
    if (typeof obj.method === 'string') {
      result.method = obj.method;
    } else {
      throw new Error('Invalid method config name: invalid method');
    }
  }
  return result;
}

function validateMethodConfig(obj: any): MethodConfig {
  const result: MethodConfig = {
    name: [],
  };
  if (!('name' in obj) || !Array.isArray(obj.name)) {
    throw new Error('Invalid method config: invalid name array');
  }
  for (const name of obj.name) {
    result.name.push(validateName(name));
  }
  if ('waitForReady' in obj) {
    if (typeof obj.waitForReady !== 'boolean') {
      throw new Error('Invalid method config: invalid waitForReady');
    }
    result.waitForReady = obj.waitForReady;
  }
  if ('timeout' in obj) {
    if (
      !(typeof obj.timeout === 'string') ||
      !TIMEOUT_REGEX.test(obj.timeout)
    ) {
      throw new Error('Invalid method config: invalid timeout');
    }
    result.timeout = obj.timeout;
  }
  if ('maxRequestBytes' in obj) {
    if (typeof obj.maxRequestBytes !== 'number') {
      throw new Error('Invalid method config: invalid maxRequestBytes');
    }
    result.maxRequestBytes = obj.maxRequestBytes;
  }
  if ('maxResponseBytes' in obj) {
    if (typeof obj.maxResponseBytes !== 'number') {
      throw new Error('Invalid method config: invalid maxRequestBytes');
    }
    result.maxResponseBytes = obj.maxResponseBytes;
  }
  return result;
}

export function validateServiceConfig(obj: any): ServiceConfig {
  const result: ServiceConfig = {
    loadBalancingConfig: [],
    methodConfig: [],
  };
  if ('loadBalancingPolicy' in obj) {
    if (typeof obj.loadBalancingPolicy === 'string') {
      result.loadBalancingPolicy = obj.loadBalancingPolicy;
    } else {
      throw new Error('Invalid service config: invalid loadBalancingPolicy');
    }
  }
  if ('loadBalancingConfig' in obj) {
    if (Array.isArray(obj.loadBalancingConfig)) {
      for (const config of obj.loadBalancingConfig) {
        result.loadBalancingConfig.push(validateLoadBalancingConfig(config));
      }
    } else {
      throw new Error('Invalid service config: invalid loadBalancingConfig');
    }
  }
  if ('methodConfig' in obj) {
    if (Array.isArray(obj.methodConfig)) {
      for (const methodConfig of obj.methodConfig) {
        result.methodConfig.push(validateMethodConfig(methodConfig));
      }
    }
  }
  // Validate method name uniqueness
  const seenMethodNames: MethodConfigName[] = [];
  for (const methodConfig of result.methodConfig) {
    for (const name of methodConfig.name) {
      for (const seenName of seenMethodNames) {
        if (
          name.service === seenName.service &&
          name.method === seenName.method
        ) {
          throw new Error(
            `Invalid service config: duplicate name ${name.service}/${name.method}`
          );
        }
      }
      seenMethodNames.push(name);
    }
  }
  return result;
}

function validateCanaryConfig(obj: any): ServiceConfigCanaryConfig {
  if (!('serviceConfig' in obj)) {
    throw new Error('Invalid service config choice: missing service config');
  }
  const result: ServiceConfigCanaryConfig = {
    serviceConfig: validateServiceConfig(obj.serviceConfig),
  };
  if ('clientLanguage' in obj) {
    if (Array.isArray(obj.clientLanguage)) {
      result.clientLanguage = [];
      for (const lang of obj.clientLanguage) {
        if (typeof lang === 'string') {
          result.clientLanguage.push(lang);
        } else {
          throw new Error(
            'Invalid service config choice: invalid clientLanguage'
          );
        }
      }
    } else {
      throw new Error('Invalid service config choice: invalid clientLanguage');
    }
  }
  if ('clientHostname' in obj) {
    if (Array.isArray(obj.clientHostname)) {
      result.clientHostname = [];
      for (const lang of obj.clientHostname) {
        if (typeof lang === 'string') {
          result.clientHostname.push(lang);
        } else {
          throw new Error(
            'Invalid service config choice: invalid clientHostname'
          );
        }
      }
    } else {
      throw new Error('Invalid service config choice: invalid clientHostname');
    }
  }
  if ('percentage' in obj) {
    if (
      typeof obj.percentage === 'number' &&
      0 <= obj.percentage &&
      obj.percentage <= 100
    ) {
      result.percentage = obj.percentage;
    } else {
      throw new Error('Invalid service config choice: invalid percentage');
    }
  }
  // Validate that no unexpected fields are present
  const allowedFields = [
    'clientLanguage',
    'percentage',
    'clientHostname',
    'serviceConfig',
  ];
  for (const field in obj) {
    if (!allowedFields.includes(field)) {
      throw new Error(
        `Invalid service config choice: unexpected field ${field}`
      );
    }
  }
  return result;
}

function validateAndSelectCanaryConfig(
  obj: any,
  percentage: number
): ServiceConfig {
  if (!Array.isArray(obj)) {
    throw new Error('Invalid service config list');
  }
  for (const config of obj) {
    const validatedConfig = validateCanaryConfig(config);
    /* For each field, we check if it is present, then only discard the
     * config if the field value does not match the current client */
    if (
      typeof validatedConfig.percentage === 'number' &&
      percentage > validatedConfig.percentage
    ) {
      continue;
    }
    if (Array.isArray(validatedConfig.clientHostname)) {
      let hostnameMatched = false;
      for (const hostname of validatedConfig.clientHostname) {
        if (hostname === os.hostname()) {
          hostnameMatched = true;
        }
      }
      if (!hostnameMatched) {
        continue;
      }
    }
    if (Array.isArray(validatedConfig.clientLanguage)) {
      let languageMatched = false;
      for (const language of validatedConfig.clientLanguage) {
        if (language === CLIENT_LANGUAGE_STRING) {
          languageMatched = true;
        }
      }
      if (!languageMatched) {
        continue;
      }
    }
    return validatedConfig.serviceConfig;
  }
  throw new Error('No matching service config found');
}

/**
 * Find the "grpc_config" record among the TXT records, parse its value as JSON, validate its contents,
 * and select a service config with selection fields that all match this client. Most of these steps
 * can fail with an error; the caller must handle any errors thrown this way.
 * @param txtRecord The TXT record array that is output from a successful call to dns.resolveTxt
 * @param percentage A number chosen from the range [0, 100) that is used to select which config to use
 * @return The service configuration to use, given the percentage value, or null if the service config
 *     data has a valid format but none of the options match the current client.
 */
export function extractAndSelectServiceConfig(
  txtRecord: string[][],
  percentage: number
): ServiceConfig | null {
  for (const record of txtRecord) {
    if (record.length > 0 && record[0].startsWith('grpc_config=')) {
      /* Treat the list of strings in this record as a single string and remove
       * "grpc_config=" from the beginning. The rest should be a JSON string */
      const recordString = record.join('').substring('grpc_config='.length);
      const recordJson: any = JSON.parse(recordString);
      return validateAndSelectCanaryConfig(recordJson, percentage);
    }
  }
  return null;
}
