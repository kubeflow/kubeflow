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

const lists: MethodEmbed[] = [];

export class MethodEmbed {
	public context;
	public methodName;
	private _originalMethod;
	private _bindedMethod;

	static add(context, methodName, methodOverride) {
		getInstance(context, methodName).set(methodOverride);
	}

	static remove(context, methodName) {
		getInstance(context, methodName).remove();
	}

	constructor(context, methodName) {
		this.context = context;
		this.methodName = methodName;

		this._originalMethod = context[methodName].bind(context);
	}

	public set(methodOverride) {
		this.context[this.methodName] = (...args) => {
			return methodOverride(this._originalMethod(...args));
		};
	}

	public remove() {
		this.context[this.methodName] = this._originalMethod;
	}
}

function getInstance(context, methodName): MethodEmbed {
	let instance = lists.filter(
		h => h.context === context && h.methodName === methodName
	)[0];

	if (!instance) {
		instance = new MethodEmbed(context, methodName);
		lists.push(instance);
	}

	return instance;
}

/**
 * @deprecated use named import
 */
export default MethodEmbed;
