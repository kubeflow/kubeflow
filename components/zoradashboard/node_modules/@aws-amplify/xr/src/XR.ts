/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
import { Amplify, ConsoleLogger as Logger } from '@aws-amplify/core';
import { XRProvider, XROptions, SceneOptions } from './types';
import { SumerianProvider } from './Providers/SumerianProvider';
import { XRProviderNotConfigured } from './Errors';

const logger = new Logger('XR');

const DEFAULT_PROVIDER_NAME = 'SumerianProvider';

export class XRClass {
	private _options: XROptions;

	private _pluggables: { [key: string]: XRProvider };
	private _defaultProvider: string;

	/**
	 * Initialize XR with AWS configurations
	 *
	 * @param {XROptions} options - Configuration object for XR
	 */
	constructor(options: XROptions) {
		this._options = options;
		logger.debug('XR Options', this._options);
		this._defaultProvider = DEFAULT_PROVIDER_NAME;
		this._pluggables = {};

		// Add default provider
		this.addPluggable(new SumerianProvider());
	}

	/**
	 * Configure XR part with configurations
	 *
	 * @param {XROptions} config - Configuration for XR
	 * @return {Object} - The current configuration
	 */
	configure(options: XROptions) {
		const opt = options ? options.XR || options : {};
		logger.debug('configure XR', { opt });

		this._options = Object.assign({}, this._options, opt);

		Object.entries(this._pluggables).map(([name, provider]) => {
			if (name === this._defaultProvider && !opt[this._defaultProvider]) {
				provider.configure(this._options);
			} else {
				provider.configure(this._options[name]);
			}
		});

		return this._options;
	}

	/**
	 * add plugin into XR category
	 * @param {Object} pluggable - an instance of the plugin
	 */
	public async addPluggable(pluggable: XRProvider) {
		if (pluggable && pluggable.getCategory() === 'XR') {
			this._pluggables[pluggable.getProviderName()] = pluggable;
			const config = pluggable.configure(this._options);

			return config;
		}
	}

	public async loadScene(
		sceneName: string,
		domElementId: string,
		sceneOptions: SceneOptions = {},
		provider: string = this._defaultProvider
	) {
		if (!this._pluggables[provider])
			throw new XRProviderNotConfigured(
				`Provider '${provider}' not configured`
			);
		return await this._pluggables[provider].loadScene(
			sceneName,
			domElementId,
			sceneOptions
		);
	}

	public isSceneLoaded(
		sceneName: string,
		provider: string = this._defaultProvider
	) {
		if (!this._pluggables[provider])
			throw new XRProviderNotConfigured(
				`Provider '${provider}' not configured`
			);
		return this._pluggables[provider].isSceneLoaded(sceneName);
	}

	public getSceneController(
		sceneName: string,
		provider: string = this._defaultProvider
	) {
		if (!this._pluggables[provider])
			throw new XRProviderNotConfigured(
				`Provider '${provider}' not configured`
			);
		return this._pluggables[provider].getSceneController(sceneName);
	}

	public isVRCapable(
		sceneName: string,
		provider: string = this._defaultProvider
	) {
		if (!this._pluggables[provider])
			throw new XRProviderNotConfigured(
				`Provider '${provider}' not configured`
			);
		return this._pluggables[provider].isVRCapable(sceneName);
	}

	public isVRPresentationActive(
		sceneName: string,
		provider: string = this._defaultProvider
	) {
		if (!this._pluggables[provider])
			throw new XRProviderNotConfigured(
				`Provider '${provider}' not configured`
			);
		return this._pluggables[provider].isVRPresentationActive(sceneName);
	}

	public start(sceneName: string, provider: string = this._defaultProvider) {
		if (!this._pluggables[provider])
			throw new XRProviderNotConfigured(
				`Provider '${provider}' not configured`
			);
		return this._pluggables[provider].start(sceneName);
	}

	public enterVR(sceneName: string, provider: string = this._defaultProvider) {
		if (!this._pluggables[provider])
			throw new XRProviderNotConfigured(
				`Provider '${provider}' not configured`
			);
		return this._pluggables[provider].enterVR(sceneName);
	}

	public exitVR(sceneName: string, provider: string = this._defaultProvider) {
		if (!this._pluggables[provider])
			throw new XRProviderNotConfigured(
				`Provider '${provider}' not configured`
			);
		return this._pluggables[provider].exitVR(sceneName);
	}

	public isMuted(sceneName: string, provider: string = this._defaultProvider) {
		if (!this._pluggables[provider])
			throw new XRProviderNotConfigured(
				`Provider '${provider}' not configured`
			);
		return this._pluggables[provider].isMuted(sceneName);
	}

	public setMuted(
		sceneName: string,
		muted: boolean,
		provider: string = this._defaultProvider
	) {
		if (!this._pluggables[provider])
			throw new XRProviderNotConfigured(
				`Provider '${provider}' not configured`
			);
		return this._pluggables[provider].setMuted(sceneName, muted);
	}

	public onSceneEvent(
		sceneName: string,
		eventName: string,
		eventHandler: Function,
		provider: string = this._defaultProvider
	) {
		if (!this._pluggables[provider])
			throw new XRProviderNotConfigured(
				`Provider '${provider}' not configured`
			);
		return this._pluggables[provider].onSceneEvent(
			sceneName,
			eventName,
			eventHandler
		);
	}

	public enableAudio(
		sceneName: string,
		provider: string = this._defaultProvider
	) {
		if (!this._pluggables[provider])
			throw new XRProviderNotConfigured(
				`Provider '${provider}' not configured`
			);
		return this._pluggables[provider].enableAudio(sceneName);
	}
}

export const XR = new XRClass(null);
Amplify.register(XR);
