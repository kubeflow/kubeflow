/*
 * Copyright 2017-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

import {
	ConsoleLogger as Logger,
	getAmplifyUserAgent,
	Credentials,
} from '@aws-amplify/core';
import {
	S3Client,
	PutObjectCommand,
	PutObjectRequest,
	CreateMultipartUploadCommand,
	UploadPartCommand,
	CompleteMultipartUploadCommand,
	CompleteMultipartUploadCommandInput,
	ListPartsCommand,
	AbortMultipartUploadCommand,
	CompletedPart,
} from '@aws-sdk/client-s3';
import { AxiosHttpHandler, SEND_UPLOAD_PROGRESS_EVENT, SEND_DOWNLOAD_PROGRESS_EVENT } from './axios-http-handler';
import * as events from 'events';

const logger = new Logger('AWSS3ProviderManagedUpload');

const localTestingStorageEndpoint = 'http://localhost:20005';

const SET_CONTENT_LENGTH_HEADER = 'contentLengthMiddleware';
export declare interface Part {
	bodyPart: any;
	partNumber: number;
	emitter: events.EventEmitter;
	etag?: string;
	_lastUploadedBytes: number;
}

export class AWSS3ProviderManagedUpload {
	// Defaults
	protected minPartSize = 5 * 1024 * 1024; // in MB
	private queueSize = 4;

	// Data for current upload
	private body = null;
	private params = null;
	private opts = null;
	private completedParts: CompletedPart[] = [];
	private cancel = false;

	// Progress reporting
	private bytesUploaded = 0;
	private totalBytesToUpload = 0;
	private emitter: events.EventEmitter = null;

	constructor(params: PutObjectRequest, opts, emitter: events.EventEmitter) {
		this.params = params;
		this.opts = opts;
		this.emitter = emitter;
	}

	public async upload() {
		this.body = await this.validateAndSanitizeBody(this.params.Body);
		this.totalBytesToUpload = this.byteLength(this.body);
		if (this.totalBytesToUpload <= this.minPartSize) {
			// Multipart upload is not required. Upload the sanitized body as is
			this.params.Body = this.body;
			const putObjectCommand = new PutObjectCommand(this.params);
			const s3 = await this._createNewS3Client(this.opts, this.emitter);
			return s3.send(putObjectCommand);
		} else {
			// Step 1: Initiate the multi part upload
			const uploadId = await this.createMultiPartUpload();

			// Step 2: Upload chunks in parallel as requested
			const numberOfPartsToUpload = Math.ceil(
				this.totalBytesToUpload / this.minPartSize
			);

			const parts: Part[] = this.createParts();
			for (
				let start = 0;
				start < numberOfPartsToUpload;
				start += this.queueSize
			) {
				/** This first block will try to cancel the upload if the cancel
				 *	request came before any parts uploads have started.
				 **/
				await this.checkIfUploadCancelled(uploadId);

				// Upload as many as `queueSize` parts simultaneously
				await this.uploadParts(
					uploadId,
					parts.slice(start, start + this.queueSize)
				);

				/** Call cleanup a second time in case there were part upload requests
				 *  in flight. This is to ensure that all parts are cleaned up.
				 */
				await this.checkIfUploadCancelled(uploadId);
			}

			parts.map(part => {
				this.removeEventListener(part);
			});

			// Step 3: Finalize the upload such that S3 can recreate the file
			return await this.finishMultiPartUpload(uploadId);
		}
	}

	private createParts(): Part[] {
		const parts: Part[] = [];
		for (let bodyStart = 0; bodyStart < this.totalBytesToUpload; ) {
			const bodyEnd = Math.min(
				bodyStart + this.minPartSize,
				this.totalBytesToUpload
			);
			parts.push({
				bodyPart: this.body.slice(bodyStart, bodyEnd),
				partNumber: parts.length + 1,
				emitter: new events.EventEmitter(),
				_lastUploadedBytes: 0,
			});
			bodyStart += this.minPartSize;
		}
		return parts;
	}

	private async createMultiPartUpload() {
		const createMultiPartUploadCommand = new CreateMultipartUploadCommand(
			this.params
		);
		const s3 = await this._createNewS3Client(this.opts);

		// @aws-sdk/client-s3 seems to be ignoring the `ContentType` parameter, so we
		// are explicitly adding it via middleware.
		// https://github.com/aws/aws-sdk-js-v3/issues/2000
		s3.middlewareStack.add(
			next => (args: any) => {
				if (
					this.params.ContentType &&
					args &&
					args.request &&
					args.request.headers
				) {
					args.request.headers['Content-Type'] = this.params.ContentType;
				}
				return next(args);
			},
			{
				step: 'build',
			}
		);

		const response = await s3.send(createMultiPartUploadCommand);
		logger.debug(response.UploadId);
		return response.UploadId;
	}

	/**
	 * @private Not to be extended outside of tests
	 * @VisibleFotTesting
	 */
	protected async uploadParts(uploadId: string, parts: Part[]) {
		try {
			const allResults = await Promise.all(
				parts.map(async part => {
					this.setupEventListener(part);
					const s3 = await this._createNewS3Client(this.opts, part.emitter);
					return s3.send(
						new UploadPartCommand({
							PartNumber: part.partNumber,
							Body: part.bodyPart,
							UploadId: uploadId,
							Key: this.params.Key,
							Bucket: this.params.Bucket,
						})
					);
				})
			);
			// The order of resolved promises is the same as input promise order.
			for (let i = 0; i < allResults.length; i++) {
				this.completedParts.push({
					PartNumber: parts[i].partNumber,
					ETag: allResults[i].ETag,
				});
			}
		} catch (error) {
			logger.error(
				'error happened while uploading a part. Cancelling the multipart upload',
				error
			);
			this.cancelUpload();
			return;
		}
	}

	private async finishMultiPartUpload(uploadId: string) {
		const input: CompleteMultipartUploadCommandInput = {
			Bucket: this.params.Bucket,
			Key: this.params.Key,
			UploadId: uploadId,
			MultipartUpload: { Parts: this.completedParts },
		};
		const completeUploadCommand = new CompleteMultipartUploadCommand(input);
		const s3 = await this._createNewS3Client(this.opts);
		try {
			const data = await s3.send(completeUploadCommand);
			return data.Key;
		} catch (error) {
			logger.error(
				'error happened while finishing the upload. Cancelling the multipart upload',
				error
			);
			this.cancelUpload();
			return;
		}
	}

	private async checkIfUploadCancelled(uploadId: string) {
		if (this.cancel) {
			let errorMessage = 'Upload was cancelled.';
			try {
				await this.cleanup(uploadId);
			} catch (error) {
				errorMessage += ` ${error.message}`;
			}
			throw new Error(errorMessage);
		}
	}

	public cancelUpload() {
		this.cancel = true;
	}

	private async cleanup(uploadId: string) {
		// Reset this's state
		this.body = null;
		this.completedParts = [];
		this.bytesUploaded = 0;
		this.totalBytesToUpload = 0;

		const input = {
			Bucket: this.params.Bucket,
			Key: this.params.Key,
			UploadId: uploadId,
		};

		const s3 = await this._createNewS3Client(this.opts);
		await s3.send(new AbortMultipartUploadCommand(input));

		// verify that all parts are removed.
		const data = await s3.send(new ListPartsCommand(input));

		if (data && data.Parts && data.Parts.length > 0) {
			throw new Error('Multi Part upload clean up failed');
		}
	}

	private removeEventListener(part: Part) {
		part.emitter.removeAllListeners(SEND_UPLOAD_PROGRESS_EVENT);
		part.emitter.removeAllListeners(SEND_DOWNLOAD_PROGRESS_EVENT);
	}

	private setupEventListener(part: Part) {
		part.emitter.on(SEND_UPLOAD_PROGRESS_EVENT, progress => {
			this.progressChanged(
				part.partNumber,
				progress.loaded - part._lastUploadedBytes
			);
			part._lastUploadedBytes = progress.loaded;
		});
	}

	private progressChanged(partNumber: number, incrementalUpdate: number) {
		this.bytesUploaded += incrementalUpdate;
		this.emitter.emit(SEND_UPLOAD_PROGRESS_EVENT, {
			loaded: this.bytesUploaded,
			total: this.totalBytesToUpload,
			part: partNumber,
			key: this.params.Key,
		});
	}

	private byteLength(input: any) {
		if (input === null || input === undefined) return 0;
		if (typeof input.byteLength === 'number') {
			return input.byteLength;
		} else if (typeof input.length === 'number') {
			return input.length;
		} else if (typeof input.size === 'number') {
			return input.size;
		} else if (typeof input.path === 'string') {
			/* NodeJs Support
			return require('fs').lstatSync(input.path).size;
			*/
		} else {
			throw new Error('Cannot determine length of ' + input);
		}
	}

	private async validateAndSanitizeBody(body: any): Promise<any> {
		if (this.isGenericObject(body)) {
			// Any javascript object
			return JSON.stringify(body);
		} else {
			// Files, arrayBuffer etc
			return body;
		}
		/* TODO: streams and files for nodejs 
		if (
			typeof body.path === 'string' &&
			require('fs').lstatSync(body.path).size > 0
		) {
			return body;
		} */
	}

	private isGenericObject(body: any): body is Object {
		if (body !== null && typeof body === 'object') {
			try {
				return !(this.byteLength(body) >= 0);
			} catch (error) {
				// If we cannot determine the length of the body, consider it
				// as a generic object and upload a stringified version of it
				return true;
			}
		}
		return false;
	}

	/**
	 * @private
	 * creates an S3 client with new V3 aws sdk
	 */
	protected async _createNewS3Client(config, emitter?: events.EventEmitter) {
		const credentials = await this._getCredentials();
		const {
			region,
			dangerouslyConnectToHttpEndpointForTesting,
			cancelTokenSource,
		} = config;
		let localTestingConfig = {};

		if (dangerouslyConnectToHttpEndpointForTesting) {
			localTestingConfig = {
				endpoint: localTestingStorageEndpoint,
				tls: false,
				bucketEndpoint: false,
				forcePathStyle: true,
			};
		}

		const client = new S3Client({
			region,
			credentials,
			...localTestingConfig,
			requestHandler: new AxiosHttpHandler({}, emitter, cancelTokenSource),
			customUserAgent: getAmplifyUserAgent(),
		});
		client.middlewareStack.remove(SET_CONTENT_LENGTH_HEADER);
		return client;
	}

	/**
	 * @private
	 */
	_getCredentials() {
		return Credentials.get()
			.then(credentials => {
				if (!credentials) return false;
				const cred = Credentials.shear(credentials);
				logger.debug('set credentials for storage', cred);
				return cred;
			})
			.catch(error => {
				logger.warn('ensure credentials error', error);
				return false;
			});
	}
}
