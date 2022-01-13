/*
 * Copyright 2017-2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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

import { SceneOptions } from './XR';

export interface XRProvider {
	// configure your provider
	configure(config: object): object;

	// return 'XR';
	getCategory(): string;

	// return the name of you provider
	getProviderName(): string;

	loadScene(
		sceneName: string,
		domElementId: string,
		sceneOptions: SceneOptions
	);
	isSceneLoaded(sceneName): boolean;
	getSceneController(sceneName: string): any;
	isVRCapable(sceneName: string): boolean;
	isVRPresentationActive(sceneName: string): boolean;
	start(sceneName: string): void;
	enterVR(sceneName: string): void;
	exitVR(sceneName: string): void;
	isMuted(sceneName: string): boolean;
	setMuted(sceneName: string, muted: boolean): void;
	onSceneEvent(
		sceneName: string,
		eventName: string,
		eventHandler: Function
	): void;
	enableAudio(sceneName: string): void;
}
