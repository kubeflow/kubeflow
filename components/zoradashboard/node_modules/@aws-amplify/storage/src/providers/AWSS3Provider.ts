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
	Hub,
	Credentials,
	Parser,
	getAmplifyUserAgent,
	ICredentials,
} from '@aws-amplify/core';
import {
	S3Client,
	GetObjectCommand,
	DeleteObjectCommand,
	ListObjectsCommand,
	GetObjectCommandOutput,
	DeleteObjectCommandInput,
	CopyObjectCommandInput,
	CopyObjectCommand,
	PutObjectCommandInput,
	GetObjectCommandInput,
} from '@aws-sdk/client-s3';
import { formatUrl } from '@aws-sdk/util-format-url';
import { createRequest } from '@aws-sdk/util-create-request';
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import { AxiosHttpHandler, SEND_DOWNLOAD_PROGRESS_EVENT, SEND_UPLOAD_PROGRESS_EVENT } from './axios-http-handler';
import {
	StorageOptions,
	StorageProvider,
	S3ProviderGetConfig,
	S3ProviderGetOuput,
	S3ProviderPutConfig,
	S3ProviderRemoveConfig,
	S3ProviderListOutput,
	S3ProviderListConfig,
	S3ProviderPutOutput,
	S3ProviderCopyConfig,
	S3ProviderCopyOutput,
	S3CopySource,
	S3CopyDestination,
	StorageLevel,
	CustomPrefix,
	S3ProviderRemoveOutput,
} from '../types';
import { StorageErrorStrings } from '../common/StorageErrorStrings';
import { AWSS3ProviderManagedUpload } from './AWSS3ProviderManagedUpload';
import * as events from 'events';
import { CancelTokenSource } from 'axios';

const logger = new Logger('AWSS3Provider');

const AMPLIFY_SYMBOL = (typeof Symbol !== 'undefined' && typeof Symbol.for === 'function'
	? Symbol.for('amplify_default')
	: '@@amplify_default') as Symbol;
const SET_CONTENT_LENGTH_HEADER = 'contentLengthMiddleware';
const DEFAULT_STORAGE_LEVEL = 'public';
const DEFAULT_PRESIGN_EXPIRATION = 900;

const dispatchStorageEvent = (track: boolean, event: string, attrs: any, metrics: any, message: string): void => {
	if (track) {
		const data = { attrs };
		if (metrics) {
			data['metrics'] = metrics;
		}
		Hub.dispatch(
			'storage',
			{
				event,
				data,
				message,
			},
			'Storage',
			AMPLIFY_SYMBOL
		);
	}
};

const localTestingStorageEndpoint = 'http://localhost:20005';
/**
 * Provide storage methods to use AWS S3
 */
export class AWSS3Provider implements StorageProvider {
	static readonly CATEGORY = 'Storage';
	static readonly PROVIDER_NAME = 'AWSS3';
	private _config: StorageOptions;

	/**
	 * Initialize Storage with AWS configurations
	 * @param {Object} config - Configuration object for storage
	 */
	constructor(config?: StorageOptions) {
		this._config = config ? config : {};
		logger.debug('Storage Options', this._config);
	}

	/**
	 * get the category of the plugin
	 */
	public getCategory(): string {
		return AWSS3Provider.CATEGORY;
	}

	/**
	 * get provider name of the plugin
	 */
	getProviderName(): string {
		return AWSS3Provider.PROVIDER_NAME;
	}

	/**
	 * Configure Storage part with aws configuration
	 * @param {Object} config - Configuration of the Storage
	 * @return {Object} - Current configuration
	 */
	public configure(config?): object {
		logger.debug('configure Storage', config);
		if (!config) return this._config;
		const amplifyConfig = Parser.parseMobilehubConfig(config);
		this._config = Object.assign({}, this._config, amplifyConfig.Storage);
		if (!this._config.bucket) {
			logger.debug('Do not have bucket yet');
		}
		return this._config;
	}

	/**
	 * Copy an object from a source object to a new object within the same bucket. Can optionally copy files across
	 * different level or identityId (if source object's level is 'protected').
	 *
	 * @async
	 * @param {S3CopySource} src - Key and optionally access level and identityId of the source object.
	 * @param {S3CopyDestination} dest - Key and optionally access level of the destination object.
	 * @param {S3ProviderCopyConfig} [config] - Optional configuration for s3 commands.
	 * @return {Promise<S3ProviderCopyOutput>} The key of the copied object.
	 */
	public async copy(
		src: S3CopySource,
		dest: S3CopyDestination,
		config?: S3ProviderCopyConfig
	): Promise<S3ProviderCopyOutput> {
		const credentialsOK = await this._ensureCredentials();
		if (!credentialsOK || !this._isWithCredentials(this._config)) {
			throw new Error(StorageErrorStrings.NO_CREDENTIALS);
		}
		const opt = Object.assign({}, this._config, config);
		const {
			acl,
			bucket,
			cacheControl,
			expires,
			track,
			serverSideEncryption,
			SSECustomerAlgorithm,
			SSECustomerKey,
			SSECustomerKeyMD5,
			SSEKMSKeyId,
		} = opt;
		const { level: srcLevel = DEFAULT_STORAGE_LEVEL, identityId: srcIdentityId, key: srcKey } = src;
		const { level: destLevel = DEFAULT_STORAGE_LEVEL, key: destKey } = dest;
		if (!srcKey || typeof srcKey !== 'string') {
			throw new Error(StorageErrorStrings.NO_SRC_KEY);
		}
		if (!destKey || typeof destKey !== 'string') {
			throw new Error(StorageErrorStrings.NO_DEST_KEY);
		}
		if (srcLevel !== 'protected' && srcIdentityId) {
			logger.warn(
				`You may copy files from another user if the source level is "protected", currently it's ${srcLevel}`
			);
		}
		const srcPrefix = this._prefix({
			...opt,
			level: srcLevel,
			...(srcIdentityId && { identityId: srcIdentityId }),
		});
		const destPrefix = this._prefix({ ...opt, level: destLevel });
		const finalSrcKey = `${bucket}/${srcPrefix}${srcKey}`;
		const finalDestKey = `${destPrefix}${destKey}`;
		logger.debug(`copying ${finalSrcKey} to ${finalDestKey}`);

		const params: CopyObjectCommandInput = {
			Bucket: bucket,
			CopySource: finalSrcKey,
			Key: finalDestKey,
			// Copies over metadata like contentType as well
			MetadataDirective: 'COPY',
		};

		if (cacheControl) params.CacheControl = cacheControl;
		if (expires) params.Expires = expires;
		if (serverSideEncryption) {
			params.ServerSideEncryption = serverSideEncryption;
		}
		if (SSECustomerAlgorithm) {
			params.SSECustomerAlgorithm = SSECustomerAlgorithm;
		}
		if (SSECustomerKey) {
			params.SSECustomerKey = SSECustomerKey;
		}
		if (SSECustomerKeyMD5) {
			params.SSECustomerKeyMD5 = SSECustomerKeyMD5;
		}
		if (SSEKMSKeyId) {
			params.SSEKMSKeyId = SSEKMSKeyId;
		}
		if (acl) params.ACL = acl;

		const s3 = this._createNewS3Client(opt);
		s3.middlewareStack.remove(SET_CONTENT_LENGTH_HEADER);
		try {
			await s3.send(new CopyObjectCommand(params));
			dispatchStorageEvent(
				track,
				'copy',
				{
					method: 'copy',
					result: 'success',
				},
				null,
				`Copy success from ${srcKey} to ${destKey}`
			);
			return {
				key: destKey,
			};
		} catch (error) {
			dispatchStorageEvent(
				track,
				'copy',
				{
					method: 'copy',
					result: 'failed',
				},
				null,
				`Copy failed from ${srcKey} to ${destKey}`
			);
			throw error;
		}
	}

	/**
	 * Get a presigned URL of the file or the object data when download:true
	 *
	 * @param {string} key - key of the object
	 * @param {S3ProviderGetConfig} [config] - Optional configuration for the underlying S3 command
	 * @return {Promise<string | GetObjectCommandOutput>} - A promise resolves to Amazon S3 presigned URL or the
	 * GetObjectCommandOutput if download is set to true on success
	 */
	public async get<T extends S3ProviderGetConfig & StorageOptions>(
		key: string,
		config?: T
	): Promise<S3ProviderGetOuput<T>>;
	public async get(
		key: string,
		config?: S3ProviderGetConfig & StorageOptions
	): Promise<string | GetObjectCommandOutput> {
		const credentialsOK = await this._ensureCredentials();
		if (!credentialsOK || !this._isWithCredentials(this._config)) {
			throw new Error(StorageErrorStrings.NO_CREDENTIALS);
		}
		const opt = Object.assign({}, this._config, config);
		const {
			bucket,
			download,
			cacheControl,
			contentDisposition,
			contentEncoding,
			contentLanguage,
			contentType,
			expires,
			track,
			progressCallback,
		} = opt;
		const prefix = this._prefix(opt);
		const final_key = prefix + key;
		const emitter = new events.EventEmitter();
		const s3 = this._createNewS3Client(opt, emitter);
		logger.debug('get ' + key + ' from ' + final_key);

		const params: GetObjectCommandInput = {
			Bucket: bucket,
			Key: final_key,
		};

		// See: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
		if (cacheControl) params.ResponseCacheControl = cacheControl;
		if (contentDisposition) params.ResponseContentDisposition = contentDisposition;
		if (contentEncoding) params.ResponseContentEncoding = contentEncoding;
		if (contentLanguage) params.ResponseContentLanguage = contentLanguage;
		if (contentType) params.ResponseContentType = contentType;

		if (download === true) {
			const getObjectCommand = new GetObjectCommand(params);
			try {
				if (progressCallback) {
					if (typeof progressCallback === 'function') {
						emitter.on(SEND_DOWNLOAD_PROGRESS_EVENT, progress => {
							progressCallback(progress);
						});
					} else {
						logger.warn('progressCallback should be a function, not a ' + typeof progressCallback);
					}
				}
				const response = await s3.send(getObjectCommand);
				emitter.removeAllListeners(SEND_DOWNLOAD_PROGRESS_EVENT);
				dispatchStorageEvent(
					track,
					'download',
					{ method: 'get', result: 'success' },
					{
						fileSize: Number(response.Body['size'] || response.Body['length']),
					},
					`Download success for ${key}`
				);
				return response;
			} catch (error) {
				dispatchStorageEvent(
					track,
					'download',
					{
						method: 'get',
						result: 'failed',
					},
					null,
					`Download failed with ${error.message}`
				);
				throw error;
			}
		}

		try {
			const signer = new S3RequestPresigner({ ...s3.config });
			const request = await createRequest(s3, new GetObjectCommand(params));
			// Default is 15 mins as defined in V2 AWS SDK
			const url = formatUrl(await signer.presign(request, { expiresIn: expires || DEFAULT_PRESIGN_EXPIRATION }));
			dispatchStorageEvent(track, 'getSignedUrl', { method: 'get', result: 'success' }, null, `Signed URL: ${url}`);
			return url;
		} catch (error) {
			logger.warn('get signed url error', error);
			dispatchStorageEvent(
				track,
				'getSignedUrl',
				{ method: 'get', result: 'failed' },
				null,
				`Could not get a signed URL for ${key}`
			);
			throw error;
		}
	}

	/**
	 * Put a file in S3 bucket specified to configure method
	 * @param {string} key - key of the object
	 * @param {PutObjectCommandInput["Body"]} object - File to be put in Amazon S3 bucket
	 * @param {S3ProviderPutConfig} [config] - Optional configuration for the underlying S3 command
	 * @return {Promise<S3ProviderPutOutput>} - promise resolves to an object with the new object's key on success
	 */
	public async put(
		key: string,
		object: PutObjectCommandInput['Body'],
		config?: S3ProviderPutConfig
	): Promise<S3ProviderPutOutput> {
		const credentialsOK = await this._ensureCredentials();
		if (!credentialsOK || !this._isWithCredentials(this._config)) {
			throw new Error(StorageErrorStrings.NO_CREDENTIALS);
		}
		const opt = Object.assign({}, this._config, config);
		const { bucket, track, progressCallback } = opt;
		const { contentType, contentDisposition, contentEncoding, cacheControl, expires, metadata, tagging, acl } = opt;
		const { serverSideEncryption, SSECustomerAlgorithm, SSECustomerKey, SSECustomerKeyMD5, SSEKMSKeyId } = opt;
		const type = contentType ? contentType : 'binary/octet-stream';

		const prefix = this._prefix(opt);
		const final_key = prefix + key;
		logger.debug('put ' + key + ' to ' + final_key);

		const params: PutObjectCommandInput = {
			Bucket: bucket,
			Key: final_key,
			Body: object,
			ContentType: type,
		};
		if (cacheControl) {
			params.CacheControl = cacheControl;
		}
		if (contentDisposition) {
			params.ContentDisposition = contentDisposition;
		}
		if (contentEncoding) {
			params.ContentEncoding = contentEncoding;
		}
		if (expires) {
			params.Expires = expires;
		}
		if (metadata) {
			params.Metadata = metadata;
		}
		if (tagging) {
			params.Tagging = tagging;
		}
		if (serverSideEncryption) {
			params.ServerSideEncryption = serverSideEncryption;
		}
		if (SSECustomerAlgorithm) {
			params.SSECustomerAlgorithm = SSECustomerAlgorithm;
		}
		if (SSECustomerKey) {
			params.SSECustomerKey = SSECustomerKey;
		}
		if (SSECustomerKeyMD5) {
			params.SSECustomerKeyMD5 = SSECustomerKeyMD5;
		}
		if (SSEKMSKeyId) {
			params.SSEKMSKeyId = SSEKMSKeyId;
		}

		const emitter = new events.EventEmitter();
		const uploader = new AWSS3ProviderManagedUpload(params, opt, emitter);

		if (acl) {
			params.ACL = acl;
		}

		try {
			if (progressCallback) {
				if (typeof progressCallback === 'function') {
					emitter.on(SEND_UPLOAD_PROGRESS_EVENT, progress => {
						progressCallback(progress);
					});
				} else {
					logger.warn('progressCallback should be a function, not a ' + typeof progressCallback);
				}
			}

			const response = await uploader.upload();

			logger.debug('upload result', response);
			dispatchStorageEvent(track, 'upload', { method: 'put', result: 'success' }, null, `Upload success for ${key}`);
			return {
				key,
			};
		} catch (error) {
			logger.warn('error uploading', error);
			dispatchStorageEvent(track, 'upload', { method: 'put', result: 'failed' }, null, `Error uploading ${key}`);
			throw error;
		}
	}

	/**
	 * Remove the object for specified key
	 * @param {string} key - key of the object
	 * @param {S3ProviderRemoveConfig} [config] - Optional configuration for the underlying S3 command
	 * @return {Promise<S3ProviderRemoveOutput>} - Promise resolves upon successful removal of the object
	 */
	public async remove(key: string, config?: S3ProviderRemoveConfig): Promise<S3ProviderRemoveOutput> {
		const credentialsOK = await this._ensureCredentials();
		if (!credentialsOK || !this._isWithCredentials(this._config)) {
			throw new Error(StorageErrorStrings.NO_CREDENTIALS);
		}
		const opt = Object.assign({}, this._config, config);
		const { bucket, track } = opt;

		const prefix = this._prefix(opt);
		const final_key = prefix + key;
		const s3 = this._createNewS3Client(opt);
		logger.debug('remove ' + key + ' from ' + final_key);

		const params: DeleteObjectCommandInput = {
			Bucket: bucket,
			Key: final_key,
		};

		const deleteObjectCommand = new DeleteObjectCommand(params);

		try {
			const response = await s3.send(deleteObjectCommand);
			dispatchStorageEvent(
				track,
				'delete',
				{ method: 'remove', result: 'success' },
				null,
				`Deleted ${key} successfully`
			);
			return response;
		} catch (error) {
			dispatchStorageEvent(
				track,
				'delete',
				{ method: 'remove', result: 'failed' },
				null,
				`Deletion of ${key} failed with ${error}`
			);
			throw error;
		}
	}

	/**
	 * List bucket objects relative to the level and prefix specified
	 * @param {string} path - the path that contains objects
	 * @param {S3ProviderListConfig} [config] - Optional configuration for the underlying S3 command
	 * @return {Promise<S3ProviderListOutput>} - Promise resolves to list of keys, eTags, lastModified and file size for
	 * all objects in path
	 */
	public async list(path: string, config?: S3ProviderListConfig): Promise<S3ProviderListOutput> {
		const credentialsOK = await this._ensureCredentials();
		if (!credentialsOK || !this._isWithCredentials(this._config)) {
			throw new Error(StorageErrorStrings.NO_CREDENTIALS);
		}
		const opt = Object.assign({}, this._config, config);
		const { bucket, track, maxKeys } = opt;

		const prefix = this._prefix(opt);
		const final_path = prefix + path;
		const s3 = this._createNewS3Client(opt);
		logger.debug('list ' + path + ' from ' + final_path);

		const params = {
			Bucket: bucket,
			Prefix: final_path,
			MaxKeys: maxKeys,
		};

		const listObjectsCommand = new ListObjectsCommand(params);

		try {
			const response = await s3.send(listObjectsCommand);
			let list: S3ProviderListOutput = [];
			if (response && response.Contents) {
				list = response.Contents.map(item => {
					return {
						key: item.Key.substr(prefix.length),
						eTag: item.ETag,
						lastModified: item.LastModified,
						size: item.Size,
					};
				});
			}
			dispatchStorageEvent(
				track,
				'list',
				{ method: 'list', result: 'success' },
				null,
				`${list.length} items returned from list operation`
			);
			logger.debug('list', list);
			return list;
		} catch (error) {
			logger.warn('list error', error);
			dispatchStorageEvent(
				track,
				'list',
				{ method: 'list', result: 'failed' },
				null,
				`Listing items failed: ${error.message}`
			);
			throw error;
		}
	}

	private async _ensureCredentials(): Promise<boolean> {
		try {
			const credentials = await Credentials.get();
			if (!credentials) return false;
			const cred = Credentials.shear(credentials);
			logger.debug('set credentials for storage', cred);
			this._config.credentials = cred;

			return true;
		} catch (error) {
			logger.warn('ensure credentials error', error);
			return false;
		}
	}

	private _isWithCredentials(config: StorageOptions): config is StorageOptions & { credentials: ICredentials } {
		return typeof config === 'object' && config.hasOwnProperty('credentials');
	}

	private _prefix(config: {
		credentials: ICredentials;
		level?: StorageLevel;
		customPrefix?: CustomPrefix;
		identityId?: string;
	}): string {
		const { credentials, level } = config;

		const customPrefix = config.customPrefix || {};
		const identityId = config.identityId || credentials.identityId;
		const privatePath = (customPrefix.private !== undefined ? customPrefix.private : 'private/') + identityId + '/';
		const protectedPath =
			(customPrefix.protected !== undefined ? customPrefix.protected : 'protected/') + identityId + '/';
		const publicPath = customPrefix.public !== undefined ? customPrefix.public : 'public/';

		switch (level) {
			case 'private':
				return privatePath;
			case 'protected':
				return protectedPath;
			default:
				return publicPath;
		}
	}

	/**
	 * Creates an S3 client with new V3 aws sdk
	 */
	private _createNewS3Client(
		config: {
			credentials: ICredentials;
			region?: string;
			cancelTokenSource?: CancelTokenSource;
			dangerouslyConnectToHttpEndpointForTesting?: boolean;
		},
		emitter?: events.EventEmitter
	): S3Client {
		const { region, credentials, cancelTokenSource, dangerouslyConnectToHttpEndpointForTesting } = config;
		let localTestingConfig = {};

		if (dangerouslyConnectToHttpEndpointForTesting) {
			localTestingConfig = {
				endpoint: localTestingStorageEndpoint,
				tls: false,
				bucketEndpoint: false,
				forcePathStyle: true,
			};
		}

		const s3client = new S3Client({
			region,
			credentials,
			customUserAgent: getAmplifyUserAgent(),
			...localTestingConfig,
			requestHandler: new AxiosHttpHandler({}, emitter, cancelTokenSource),
		});
		return s3client;
	}
}

/**
 * @deprecated use named import
 */
export default AWSS3Provider;
