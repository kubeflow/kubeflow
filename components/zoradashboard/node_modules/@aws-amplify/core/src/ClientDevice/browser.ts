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
import { ConsoleLogger as Logger } from '../Logger';

const logger = new Logger('ClientDevice_Browser');

export function clientInfo() {
	if (typeof window === 'undefined') {
		return {};
	}

	return browserClientInfo();
}

function browserClientInfo() {
	if (typeof window === 'undefined') {
		logger.warn('No window object available to get browser client info');
		return {};
	}

	const nav = window.navigator;
	if (!nav) {
		logger.warn('No navigator object available to get browser client info');
		return {};
	}

	const { platform, product, vendor, userAgent, language } = nav;
	const type = browserType(userAgent);
	const timezone = browserTimezone();

	return {
		platform,
		make: product || vendor,
		model: type.type,
		version: type.version,
		appVersion: [type.type, type.version].join('/'),
		language,
		timezone,
	};
}

export function dimension() {
	if (typeof window === 'undefined') {
		logger.warn('No window object available to get browser client info');
		return { width: 320, height: 320 };
	}

	return {
		width: window.innerWidth,
		height: window.innerHeight,
	};
}

function browserTimezone() {
	const tzMatch = /\(([A-Za-z\s].*)\)/.exec(new Date().toString());
	return tzMatch ? tzMatch[1] || '' : '';
}

export function browserType(userAgent: string) {
	const operaMatch = /.+(Opera[\s[A-Z]*|OPR[\sA-Z]*)\/([0-9\.]+).*/i.exec(
		userAgent
	);
	if (operaMatch) {
		return { type: operaMatch[1], version: operaMatch[2] };
	}

	const ieMatch = /.+(Trident|Edge)\/([0-9\.]+).*/i.exec(userAgent);
	if (ieMatch) {
		return { type: ieMatch[1], version: ieMatch[2] };
	}

	const cfMatch = /.+(Chrome|Firefox|FxiOS)\/([0-9\.]+).*/i.exec(userAgent);
	if (cfMatch) {
		return { type: cfMatch[1], version: cfMatch[2] };
	}

	const sMatch = /.+(Safari)\/([0-9\.]+).*/i.exec(userAgent);
	if (sMatch) {
		return { type: sMatch[1], version: sMatch[2] };
	}

	const awkMatch = /.+(AppleWebKit)\/([0-9\.]+).*/i.exec(userAgent);
	if (awkMatch) {
		return { type: awkMatch[1], version: awkMatch[2] };
	}

	const anyMatch = /.*([A-Z]+)\/([0-9\.]+).*/i.exec(userAgent);
	if (anyMatch) {
		return { type: anyMatch[1], version: anyMatch[2] };
	}

	return { type: '', version: '' };
}
