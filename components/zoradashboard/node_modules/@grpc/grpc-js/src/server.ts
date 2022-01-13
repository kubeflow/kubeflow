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

import * as http2 from 'http2';
import { AddressInfo } from 'net';

import { ServiceError } from './call';
import { Status, LogVerbosity } from './constants';
import { Deserialize, Serialize, ServiceDefinition } from './make-client';
import { Metadata } from './metadata';
import {
  BidiStreamingHandler,
  ClientStreamingHandler,
  HandleCall,
  Handler,
  HandlerType,
  Http2ServerCallStream,
  sendUnaryData,
  ServerDuplexStream,
  ServerDuplexStreamImpl,
  ServerReadableStream,
  ServerReadableStreamImpl,
  ServerStreamingHandler,
  ServerUnaryCall,
  ServerUnaryCallImpl,
  ServerWritableStream,
  ServerWritableStreamImpl,
  UnaryHandler,
  ServerErrorResponse,
  ServerStatusResponse,
} from './server-call';
import { ServerCredentials } from './server-credentials';
import { ChannelOptions } from './channel-options';
import {
  createResolver,
  ResolverListener,
  mapUriDefaultScheme,
} from './resolver';
import * as logging from './logging';
import {
  SubchannelAddress,
  TcpSubchannelAddress,
  isTcpSubchannelAddress,
  subchannelAddressToString,
} from './subchannel';
import { parseUri } from './uri-parser';

const TRACER_NAME = 'server';

function trace(text: string): void {
  logging.trace(LogVerbosity.DEBUG, TRACER_NAME, text);
}

interface BindResult {
  port: number;
  count: number;
}

function noop(): void {}

function getUnimplementedStatusResponse(
  methodName: string
): Partial<ServiceError> {
  return {
    code: Status.UNIMPLEMENTED,
    details: `The server does not implement the method ${methodName}`,
    metadata: new Metadata(),
  };
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type UntypedUnaryHandler = UnaryHandler<any, any>;
type UntypedClientStreamingHandler = ClientStreamingHandler<any, any>;
type UntypedServerStreamingHandler = ServerStreamingHandler<any, any>;
type UntypedBidiStreamingHandler = BidiStreamingHandler<any, any>;
export type UntypedHandleCall = HandleCall<any, any>;
type UntypedHandler = Handler<any, any>;
export interface UntypedServiceImplementation {
  [name: string]: UntypedHandleCall;
}

function getDefaultHandler(handlerType: HandlerType, methodName: string) {
  const unimplementedStatusResponse = getUnimplementedStatusResponse(
    methodName
  );
  switch (handlerType) {
    case 'unary':
      return (
        call: ServerUnaryCall<any, any>,
        callback: sendUnaryData<any>
      ) => {
        callback(unimplementedStatusResponse as ServiceError, null);
      };
    case 'clientStream':
      return (
        call: ServerReadableStream<any, any>,
        callback: sendUnaryData<any>
      ) => {
        callback(unimplementedStatusResponse as ServiceError, null);
      };
    case 'serverStream':
      return (call: ServerWritableStream<any, any>) => {
        call.emit('error', unimplementedStatusResponse);
      };
    case 'bidi':
      return (call: ServerDuplexStream<any, any>) => {
        call.emit('error', unimplementedStatusResponse);
      };
    default:
      throw new Error(`Invalid handlerType ${handlerType}`);
  }
}

export class Server {
  private http2ServerList: (http2.Http2Server | http2.Http2SecureServer)[] = [];

  private handlers: Map<string, UntypedHandler> = new Map<
    string,
    UntypedHandler
  >();
  private sessions = new Set<http2.ServerHttp2Session>();
  private started = false;
  private options: ChannelOptions;

  constructor(options?: ChannelOptions) {
    this.options = options ?? {};
  }

  addProtoService(): void {
    throw new Error('Not implemented. Use addService() instead');
  }

  addService(
    service: ServiceDefinition,
    implementation: UntypedServiceImplementation
  ): void {
    if (
      service === null ||
      typeof service !== 'object' ||
      implementation === null ||
      typeof implementation !== 'object'
    ) {
      throw new Error('addService() requires two objects as arguments');
    }

    const serviceKeys = Object.keys(service);

    if (serviceKeys.length === 0) {
      throw new Error('Cannot add an empty service to a server');
    }

    serviceKeys.forEach((name) => {
      const attrs = service[name];
      let methodType: HandlerType;

      if (attrs.requestStream) {
        if (attrs.responseStream) {
          methodType = 'bidi';
        } else {
          methodType = 'clientStream';
        }
      } else {
        if (attrs.responseStream) {
          methodType = 'serverStream';
        } else {
          methodType = 'unary';
        }
      }

      let implFn = implementation[name];
      let impl;

      if (implFn === undefined && typeof attrs.originalName === 'string') {
        implFn = implementation[attrs.originalName];
      }

      if (implFn !== undefined) {
        impl = implFn.bind(implementation);
      } else {
        impl = getDefaultHandler(methodType, name);
      }

      const success = this.register(
        attrs.path,
        impl as UntypedHandleCall,
        attrs.responseSerialize,
        attrs.requestDeserialize,
        methodType
      );

      if (success === false) {
        throw new Error(`Method handler for ${attrs.path} already provided.`);
      }
    });
  }

  removeService(service: ServiceDefinition): void {
    if (
      service === null ||
      typeof service !== 'object'
    ) {
      throw new Error('removeService() requires object as argument');
    }

    const serviceKeys = Object.keys(service);
    serviceKeys.forEach((name) => {
      const attrs = service[name];
      this.unregister(attrs.path);
    });
  }

  bind(port: string, creds: ServerCredentials): void {
    throw new Error('Not implemented. Use bindAsync() instead');
  }

  bindAsync(
    port: string,
    creds: ServerCredentials,
    callback: (error: Error | null, port: number) => void
  ): void {
    if (this.started === true) {
      throw new Error('server is already started');
    }

    if (typeof port !== 'string') {
      throw new TypeError('port must be a string');
    }

    if (creds === null || typeof creds !== 'object') {
      throw new TypeError('creds must be an object');
    }

    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }

    const initialPortUri = parseUri(port);
    if (initialPortUri === null) {
      throw new Error(`Could not parse port "${port}"`);
    }
    const portUri = mapUriDefaultScheme(initialPortUri);
    if (portUri === null) {
      throw new Error(`Could not get a default scheme for port "${port}"`);
    }

    const serverOptions: http2.ServerOptions = {
      maxSendHeaderBlockLength: Number.MAX_SAFE_INTEGER
    };
    if ('grpc-node.max_session_memory' in this.options) {
      serverOptions.maxSessionMemory = this.options['grpc-node.max_session_memory'];
    }
    if ('grpc.max_concurrent_streams' in this.options) {
      serverOptions.settings = {
        maxConcurrentStreams: this.options['grpc.max_concurrent_streams'],
      };
    }

    const setupServer = (): http2.Http2Server | http2.Http2SecureServer => {
      let http2Server: http2.Http2Server | http2.Http2SecureServer;
      if (creds._isSecure()) {
        const secureServerOptions = Object.assign(
          serverOptions,
          creds._getSettings()!
        );
        http2Server = http2.createSecureServer(secureServerOptions);
      } else {
        http2Server = http2.createServer(serverOptions);
      }

      http2Server.setTimeout(0, noop);
      this._setupHandlers(http2Server);
      return http2Server;
    };

    const bindSpecificPort = (
      addressList: SubchannelAddress[],
      portNum: number,
      previousCount: number
    ): Promise<BindResult> => {
      if (addressList.length === 0) {
        return Promise.resolve({ port: portNum, count: previousCount });
      }
      return Promise.all(
        addressList.map((address) => {
          trace('Attempting to bind ' + subchannelAddressToString(address));
          let addr: SubchannelAddress;
          if (isTcpSubchannelAddress(address)) {
            addr = {
              host: (address as TcpSubchannelAddress).host,
              port: portNum,
            };
          } else {
            addr = address;
          }

          const http2Server = setupServer();
          return new Promise<number | Error>((resolve, reject) => {
            function onError(err: Error): void {
              resolve(err);
            }

            http2Server.once('error', onError);

            http2Server.listen(addr, () => {
              trace('Successfully bound ' + subchannelAddressToString(address));
              this.http2ServerList.push(http2Server);
              const boundAddress = http2Server.address()!;
              if (typeof boundAddress === 'string') {
                resolve(portNum);
              } else {
                resolve(boundAddress.port);
              }
              http2Server.removeListener('error', onError);
            });
          });
        })
      ).then((results) => {
        let count = 0;
        for (const result of results) {
          if (typeof result === 'number') {
            count += 1;
            if (result !== portNum) {
              throw new Error(
                'Invalid state: multiple port numbers added from single address'
              );
            }
          }
        }
        return {
          port: portNum,
          count: count + previousCount,
        };
      });
    };

    const bindWildcardPort = (
      addressList: SubchannelAddress[]
    ): Promise<BindResult> => {
      if (addressList.length === 0) {
        return Promise.resolve<BindResult>({ port: 0, count: 0 });
      }
      const address = addressList[0];
      const http2Server = setupServer();
      return new Promise<BindResult>((resolve, reject) => {
        function onError(err: Error): void {
          resolve(bindWildcardPort(addressList.slice(1)));
        }

        http2Server.once('error', onError);

        http2Server.listen(address, () => {
          this.http2ServerList.push(http2Server);
          resolve(
            bindSpecificPort(
              addressList.slice(1),
              (http2Server.address() as AddressInfo).port,
              1
            )
          );
          http2Server.removeListener('error', onError);
        });
      });
    };

    const resolverListener: ResolverListener = {
      onSuccessfulResolution: (
        addressList,
        serviceConfig,
        serviceConfigError
      ) => {
        // We only want one resolution result. Discard all future results
        resolverListener.onSuccessfulResolution = () => {};
        if (addressList.length === 0) {
          callback(new Error(`No addresses resolved for port ${port}`), 0);
          return;
        }
        let bindResultPromise: Promise<BindResult>;
        if (isTcpSubchannelAddress(addressList[0])) {
          if (addressList[0].port === 0) {
            bindResultPromise = bindWildcardPort(addressList);
          } else {
            bindResultPromise = bindSpecificPort(
              addressList,
              addressList[0].port,
              0
            );
          }
        } else {
          // Use an arbitrary non-zero port for non-TCP addresses
          bindResultPromise = bindSpecificPort(addressList, 1, 0);
        }
        bindResultPromise.then(
          (bindResult) => {
            if (bindResult.count === 0) {
              const errorString = `No address added out of total ${addressList.length} resolved`;
              logging.log(LogVerbosity.ERROR, errorString);
              callback(new Error(errorString), 0);
            } else {
              if (bindResult.count < addressList.length) {
                logging.log(
                  LogVerbosity.INFO,
                  `WARNING Only ${bindResult.count} addresses added out of total ${addressList.length} resolved`
                );
              }
              callback(null, bindResult.port);
            }
          },
          (error) => {
            const errorString = `No address added out of total ${addressList.length} resolved`;
            logging.log(LogVerbosity.ERROR, errorString);
            callback(new Error(errorString), 0);
          }
        );
      },
      onError: (error) => {
        callback(new Error(error.details), 0);
      },
    };

    const resolver = createResolver(portUri, resolverListener, this.options);
    resolver.updateResolution();
  }

  forceShutdown(): void {
    // Close the server if it is still running.

    for (const http2Server of this.http2ServerList) {
      if (http2Server.listening) {
        http2Server.close();
      }
    }

    this.started = false;

    // Always destroy any available sessions. It's possible that one or more
    // tryShutdown() calls are in progress. Don't wait on them to finish.
    this.sessions.forEach((session) => {
      // Cast NGHTTP2_CANCEL to any because TypeScript doesn't seem to
      // recognize destroy(code) as a valid signature.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      session.destroy(http2.constants.NGHTTP2_CANCEL as any);
    });
    this.sessions.clear();
  }

  register<RequestType, ResponseType>(
    name: string,
    handler: HandleCall<RequestType, ResponseType>,
    serialize: Serialize<ResponseType>,
    deserialize: Deserialize<RequestType>,
    type: string
  ): boolean {
    if (this.handlers.has(name)) {
      return false;
    }

    this.handlers.set(name, {
      func: handler,
      serialize,
      deserialize,
      type,
      path: name,
    } as UntypedHandler);
    return true;
  }

  unregister(name: string): boolean {
    return this.handlers.delete(name);
  }

  start(): void {
    if (
      this.http2ServerList.length === 0 ||
      this.http2ServerList.every(
        (http2Server) => http2Server.listening !== true
      )
    ) {
      throw new Error('server must be bound in order to start');
    }

    if (this.started === true) {
      throw new Error('server is already started');
    }

    this.started = true;
  }

  tryShutdown(callback: (error?: Error) => void): void {
    let pendingChecks = 0;

    function maybeCallback(): void {
      pendingChecks--;

      if (pendingChecks === 0) {
        callback();
      }
    }

    // Close the server if necessary.
    this.started = false;

    for (const http2Server of this.http2ServerList) {
      if (http2Server.listening) {
        pendingChecks++;
        http2Server.close(maybeCallback);
      }
    }

    this.sessions.forEach((session) => {
      if (!session.closed) {
        pendingChecks += 1;
        session.close(maybeCallback);
      }
    });
    if (pendingChecks === 0) {
      callback();
    }
  }

  addHttp2Port(): void {
    throw new Error('Not yet implemented');
  }

  private _setupHandlers(
    http2Server: http2.Http2Server | http2.Http2SecureServer
  ): void {
    if (http2Server === null) {
      return;
    }

    http2Server.on(
      'stream',
      (stream: http2.ServerHttp2Stream, headers: http2.IncomingHttpHeaders) => {
        const contentType = headers[http2.constants.HTTP2_HEADER_CONTENT_TYPE];

        if (
          typeof contentType !== 'string' ||
          !contentType.startsWith('application/grpc')
        ) {
          stream.respond(
            {
              [http2.constants.HTTP2_HEADER_STATUS]:
                http2.constants.HTTP_STATUS_UNSUPPORTED_MEDIA_TYPE,
            },
            { endStream: true }
          );
          return;
        }

        try {
          const path = headers[http2.constants.HTTP2_HEADER_PATH] as string;
          const serverAddress = http2Server.address();
          let serverAddressString = 'null';
          if (serverAddress) {
            if (typeof serverAddress === 'string') {
              serverAddressString = serverAddress;
            } else {
              serverAddressString =
                serverAddress.address + ':' + serverAddress.port;
            }
          }
          trace(
            'Received call to method ' +
              path +
              ' at address ' +
              serverAddressString
          );
          const handler = this.handlers.get(path);

          if (handler === undefined) {
            trace(
              'No handler registered for method ' +
                path +
                '. Sending UNIMPLEMENTED status.'
            );
            throw getUnimplementedStatusResponse(path);
          }

          const call = new Http2ServerCallStream(stream, handler, this.options);
          const metadata: Metadata = call.receiveMetadata(headers) as Metadata;
          switch (handler.type) {
            case 'unary':
              handleUnary(call, handler as UntypedUnaryHandler, metadata);
              break;
            case 'clientStream':
              handleClientStreaming(
                call,
                handler as UntypedClientStreamingHandler,
                metadata
              );
              break;
            case 'serverStream':
              handleServerStreaming(
                call,
                handler as UntypedServerStreamingHandler,
                metadata
              );
              break;
            case 'bidi':
              handleBidiStreaming(
                call,
                handler as UntypedBidiStreamingHandler,
                metadata
              );
              break;
            default:
              throw new Error(`Unknown handler type: ${handler.type}`);
          }
        } catch (err) {
          const call = new Http2ServerCallStream(stream, null!, this.options);

          if (err.code === undefined) {
            err.code = Status.INTERNAL;
          }

          call.sendError(err);
        }
      }
    );

    http2Server.on('session', (session) => {
      if (!this.started) {
        session.destroy();
        return;
      }

      this.sessions.add(session);

      session.on('close', () => {
        this.sessions.delete(session);
      });
    });
  }
}

async function handleUnary<RequestType, ResponseType>(
  call: Http2ServerCallStream<RequestType, ResponseType>,
  handler: UnaryHandler<RequestType, ResponseType>,
  metadata: Metadata
): Promise<void> {
  const request = await call.receiveUnaryMessage();

  if (request === undefined || call.cancelled) {
    return;
  }

  const emitter = new ServerUnaryCallImpl<RequestType, ResponseType>(
    call,
    metadata,
    request
  );

  handler.func(
    emitter,
    (
      err: ServerErrorResponse | ServerStatusResponse | null,
      value?: ResponseType | null,
      trailer?: Metadata,
      flags?: number
    ) => {
      call.sendUnaryMessage(err, value, trailer, flags);
    }
  );
}

function handleClientStreaming<RequestType, ResponseType>(
  call: Http2ServerCallStream<RequestType, ResponseType>,
  handler: ClientStreamingHandler<RequestType, ResponseType>,
  metadata: Metadata
): void {
  const stream = new ServerReadableStreamImpl<RequestType, ResponseType>(
    call,
    metadata,
    handler.deserialize
  );

  function respond(
    err: ServerErrorResponse | ServerStatusResponse | null,
    value?: ResponseType | null,
    trailer?: Metadata,
    flags?: number
  ) {
    stream.destroy();
    call.sendUnaryMessage(err, value, trailer, flags);
  }

  if (call.cancelled) {
    return;
  }

  stream.on('error', respond);
  handler.func(stream, respond);
}

async function handleServerStreaming<RequestType, ResponseType>(
  call: Http2ServerCallStream<RequestType, ResponseType>,
  handler: ServerStreamingHandler<RequestType, ResponseType>,
  metadata: Metadata
): Promise<void> {
  const request = await call.receiveUnaryMessage();

  if (request === undefined || call.cancelled) {
    return;
  }

  const stream = new ServerWritableStreamImpl<RequestType, ResponseType>(
    call,
    metadata,
    handler.serialize,
    request
  );

  handler.func(stream);
}

function handleBidiStreaming<RequestType, ResponseType>(
  call: Http2ServerCallStream<RequestType, ResponseType>,
  handler: BidiStreamingHandler<RequestType, ResponseType>,
  metadata: Metadata
): void {
  const stream = new ServerDuplexStreamImpl<RequestType, ResponseType>(
    call,
    metadata,
    handler.serialize,
    handler.deserialize
  );

  if (call.cancelled) {
    return;
  }

  handler.func(stream);
}
