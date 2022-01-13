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

import { Call } from './call-stream';
import { Channel } from './channel';
import { BaseFilter, Filter, FilterFactory } from './filter';
import { Metadata } from './metadata';
import { Status } from './constants';
import { splitHostPort } from './uri-parser';
import { ServiceError } from './call';

export class CallCredentialsFilter extends BaseFilter implements Filter {
  private serviceUrl: string;
  constructor(
    private readonly channel: Channel,
    private readonly stream: Call
  ) {
    super();
    this.channel = channel;
    this.stream = stream;
    const splitPath: string[] = stream.getMethod().split('/');
    let serviceName = '';
    /* The standard path format is "/{serviceName}/{methodName}", so if we split
     * by '/', the first item should be empty and the second should be the
     * service name */
    if (splitPath.length >= 2) {
      serviceName = splitPath[1];
    }
    const hostname = splitHostPort(stream.getHost())?.host ?? 'localhost';
    /* Currently, call credentials are only allowed on HTTPS connections, so we
     * can assume that the scheme is "https" */
    this.serviceUrl = `https://${hostname}/${serviceName}`;
  }

  async sendMetadata(metadata: Promise<Metadata>): Promise<Metadata> {
    const credentials = this.stream.getCredentials();
    const credsMetadata = credentials.generateMetadata({
      service_url: this.serviceUrl,
    });
    const resultMetadata = await metadata;
    try {
      resultMetadata.merge(await credsMetadata);
    } catch (error) {
      this.stream.cancelWithStatus(
        Status.UNAUTHENTICATED,
        `Failed to retrieve auth metadata with error: ${error.message}`
      );
      return Promise.reject<Metadata>('Failed to retrieve auth metadata');
    }
    if (resultMetadata.get('authorization').length > 1) {
      this.stream.cancelWithStatus(
        Status.INTERNAL,
        '"authorization" metadata cannot have multiple values'
      );
      return Promise.reject<Metadata>('"authorization" metadata cannot have multiple values');
    }
    return resultMetadata;
  }
}

export class CallCredentialsFilterFactory
  implements FilterFactory<CallCredentialsFilter> {
  constructor(private readonly channel: Channel) {
    this.channel = channel;
  }

  createFilter(callStream: Call): CallCredentialsFilter {
    return new CallCredentialsFilter(this.channel, callStream);
  }
}
