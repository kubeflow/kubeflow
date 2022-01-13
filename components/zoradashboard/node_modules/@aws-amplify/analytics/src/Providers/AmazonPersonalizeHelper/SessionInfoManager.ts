/*
 * Copyright 2019-2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
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
import { SessionInfo } from './DataType';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import { v1 as uuid } from 'uuid';
import { ConsoleLogger as Logger, JS } from '@aws-amplify/core';

import Cache from '@aws-amplify/cache';

const PERSONALIZE_CACHE = '_awsct';
const PERSONALIZE_CACHE_USERID = '_awsct_uid';
const PERSONALIZE_CACHE_SESSIONID = '_awsct_sid';
const DEFAULT_CACHE_PREFIX = 'peronslize';
const TIMER_INTERVAL = 30 * 1000;
const DELIMITER = '.';
const CACHE_EXPIRY_IN_DAYS = 7;
const logger = new Logger('AmazonPersonalizeProvider');

export class SessionInfoManager {
	private _isBrowser;
	private _cache;
	private _timer;
	private _timerKey;

	constructor(prefixKey = '') {
		this._isBrowser = JS.browserOrNode().isBrowser;
		this._timerKey = uuid().substr(0, 15);
		this._refreshTimer();
	}

	private _refreshTimer() {
		if (this._timer) {
			clearInterval(this._timer);
		}
		const that = this;
		this._timer = setInterval(() => {
			that._timerKey = uuid().substr(0, 15);
		}, TIMER_INTERVAL);
	}

	private storeValue(key: string, value: any): void {
		const today = new Date();
		const expire = new Date();
		expire.setTime(today.getTime() + 3600000 * 24 * CACHE_EXPIRY_IN_DAYS);
		Cache.setItem(this._getCachePrefix(key), value, {
			expires: expire.getTime(),
		});
	}

	private retrieveValue(key: string): any {
		return Cache.getItem(this._getCachePrefix(key));
	}

	private _getCachePrefix(key): string {
		if (this._isBrowser) {
			return key + DELIMITER + window.location.host;
		}
		return DEFAULT_CACHE_PREFIX;
	}

	public getTimerKey() {
		return this._timerKey;
	}

	public updateSessionInfo(userId: string, sessionInfo: SessionInfo) {
		const existUserId = sessionInfo.userId;
		const existSessionId = sessionInfo.sessionId;
		if (this._isRequireNewSession(userId, existUserId, existSessionId)) {
			const newSessionId = uuid();
			this.storeValue(PERSONALIZE_CACHE_USERID, userId);
			this.storeValue(PERSONALIZE_CACHE_SESSIONID, newSessionId);
			sessionInfo.sessionId = newSessionId;
		} else if (
			this._isRequireUpdateSessionInfo(userId, existUserId, existSessionId)
		) {
			this.storeValue(PERSONALIZE_CACHE_USERID, userId);
		}
		sessionInfo.userId = userId;
	}

	private _isRequireUpdateSessionInfo(
		userId: string,
		cachedSessionUserId: string,
		cachedSessionSessionId: string
	): boolean {
		// anonymouse => sign in : hasSession && s_userId == null && curr_userId !=null
		const isNoCachedSession: boolean = isEmpty(cachedSessionSessionId);
		return (
			!isNoCachedSession && isEmpty(cachedSessionUserId) && !isEmpty(userId)
		);
	}

	public retrieveSessionInfo(trackingId: string): SessionInfo {
		const sessionInfo = <SessionInfo>{};
		sessionInfo.trackingId = trackingId;
		sessionInfo.sessionId = this.retrieveValue(PERSONALIZE_CACHE_SESSIONID);
		sessionInfo.userId = this.retrieveValue(PERSONALIZE_CACHE_USERID);
		if (isEmpty(sessionInfo.sessionId)) {
			sessionInfo.sessionId = uuid();
			this.storeValue(PERSONALIZE_CACHE_SESSIONID, sessionInfo.sessionId);
		}
		this.storeValue(PERSONALIZE_CACHE, trackingId);
		return sessionInfo;
	}

	private _isRequireNewSession(
		userId: string,
		cachedSessionUserId: string,
		cachedSessionSessionId: string
	): boolean {
		// new session => 1. no cached session info 2. signOut: s_userId !=null && curr_userId ==null
		// 3. switch account: s_userId !=null && curr_userId !=null && s_userId != curr_userId
		const isNoCachedSession: boolean = isEmpty(cachedSessionSessionId);
		const isSignoutCase: boolean =
			isEmpty(userId) && !isEmpty(cachedSessionUserId);
		const isSwitchUserCase: boolean =
			!isEmpty(userId) &&
			!isEmpty(cachedSessionUserId) &&
			!isEqual(userId, cachedSessionUserId);
		return isNoCachedSession || isSignoutCase || isSwitchUserCase;
	}
}
