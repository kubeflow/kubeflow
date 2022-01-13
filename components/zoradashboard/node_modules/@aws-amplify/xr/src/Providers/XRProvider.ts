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
import { XRProvider, ProviderOptions, SceneOptions } from '../types';
import { ConsoleLogger as Logger } from '@aws-amplify/core';

const logger = new Logger('AbstractXRProvider');

export abstract class AbstractXRProvider implements XRProvider {
	private _config: ProviderOptions;

	constructor(options: ProviderOptions = {}) {
		this._config = options;
	}

	configure(config: ProviderOptions = {}): ProviderOptions {
		this._config = { ...config, ...this._config };

		logger.debug(`configure ${this.getProviderName()}`, this._config);

		return this.options;
	}

	getCategory() {
		return 'XR';
	}

	abstract getProviderName(): string;

	protected get options(): ProviderOptions {
		return { ...this._config };
	}

	public abstract loadScene(
		sceneName: string,
		domElementId: string,
		sceneOptions: SceneOptions
	): void;
	public abstract isSceneLoaded(sceneName: string);
	public abstract getSceneController(sceneName: string): any;
	public abstract isVRCapable(sceneName: string): boolean;
	public abstract isVRPresentationActive(sceneName: string): boolean;
	public abstract start(sceneName: string): void;
	public abstract enterVR(sceneName: string): void;
	public abstract exitVR(sceneName: string): void;
	public abstract isMuted(sceneName: string): boolean;
	public abstract setMuted(sceneName: string, muted: boolean): void;
	public abstract onSceneEvent(
		sceneName: string,
		eventName: string,
		eventHandler: Function
	): void;
	public abstract enableAudio(sceneName: string): void;
}
