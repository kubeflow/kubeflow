"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isEmpty_1 = __importDefault(require("lodash/isEmpty"));
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var uuid_1 = require("uuid");
var core_1 = require("@aws-amplify/core");
var cache_1 = __importDefault(require("@aws-amplify/cache"));
var PERSONALIZE_CACHE = '_awsct';
var PERSONALIZE_CACHE_USERID = '_awsct_uid';
var PERSONALIZE_CACHE_SESSIONID = '_awsct_sid';
var DEFAULT_CACHE_PREFIX = 'peronslize';
var TIMER_INTERVAL = 30 * 1000;
var DELIMITER = '.';
var CACHE_EXPIRY_IN_DAYS = 7;
var logger = new core_1.ConsoleLogger('AmazonPersonalizeProvider');
var SessionInfoManager = /** @class */ (function () {
    function SessionInfoManager(prefixKey) {
        if (prefixKey === void 0) { prefixKey = ''; }
        this._isBrowser = core_1.JS.browserOrNode().isBrowser;
        this._timerKey = uuid_1.v1().substr(0, 15);
        this._refreshTimer();
    }
    SessionInfoManager.prototype._refreshTimer = function () {
        if (this._timer) {
            clearInterval(this._timer);
        }
        var that = this;
        this._timer = setInterval(function () {
            that._timerKey = uuid_1.v1().substr(0, 15);
        }, TIMER_INTERVAL);
    };
    SessionInfoManager.prototype.storeValue = function (key, value) {
        var today = new Date();
        var expire = new Date();
        expire.setTime(today.getTime() + 3600000 * 24 * CACHE_EXPIRY_IN_DAYS);
        cache_1.default.setItem(this._getCachePrefix(key), value, {
            expires: expire.getTime(),
        });
    };
    SessionInfoManager.prototype.retrieveValue = function (key) {
        return cache_1.default.getItem(this._getCachePrefix(key));
    };
    SessionInfoManager.prototype._getCachePrefix = function (key) {
        if (this._isBrowser) {
            return key + DELIMITER + window.location.host;
        }
        return DEFAULT_CACHE_PREFIX;
    };
    SessionInfoManager.prototype.getTimerKey = function () {
        return this._timerKey;
    };
    SessionInfoManager.prototype.updateSessionInfo = function (userId, sessionInfo) {
        var existUserId = sessionInfo.userId;
        var existSessionId = sessionInfo.sessionId;
        if (this._isRequireNewSession(userId, existUserId, existSessionId)) {
            var newSessionId = uuid_1.v1();
            this.storeValue(PERSONALIZE_CACHE_USERID, userId);
            this.storeValue(PERSONALIZE_CACHE_SESSIONID, newSessionId);
            sessionInfo.sessionId = newSessionId;
        }
        else if (this._isRequireUpdateSessionInfo(userId, existUserId, existSessionId)) {
            this.storeValue(PERSONALIZE_CACHE_USERID, userId);
        }
        sessionInfo.userId = userId;
    };
    SessionInfoManager.prototype._isRequireUpdateSessionInfo = function (userId, cachedSessionUserId, cachedSessionSessionId) {
        // anonymouse => sign in : hasSession && s_userId == null && curr_userId !=null
        var isNoCachedSession = isEmpty_1.default(cachedSessionSessionId);
        return (!isNoCachedSession && isEmpty_1.default(cachedSessionUserId) && !isEmpty_1.default(userId));
    };
    SessionInfoManager.prototype.retrieveSessionInfo = function (trackingId) {
        var sessionInfo = {};
        sessionInfo.trackingId = trackingId;
        sessionInfo.sessionId = this.retrieveValue(PERSONALIZE_CACHE_SESSIONID);
        sessionInfo.userId = this.retrieveValue(PERSONALIZE_CACHE_USERID);
        if (isEmpty_1.default(sessionInfo.sessionId)) {
            sessionInfo.sessionId = uuid_1.v1();
            this.storeValue(PERSONALIZE_CACHE_SESSIONID, sessionInfo.sessionId);
        }
        this.storeValue(PERSONALIZE_CACHE, trackingId);
        return sessionInfo;
    };
    SessionInfoManager.prototype._isRequireNewSession = function (userId, cachedSessionUserId, cachedSessionSessionId) {
        // new session => 1. no cached session info 2. signOut: s_userId !=null && curr_userId ==null
        // 3. switch account: s_userId !=null && curr_userId !=null && s_userId != curr_userId
        var isNoCachedSession = isEmpty_1.default(cachedSessionSessionId);
        var isSignoutCase = isEmpty_1.default(userId) && !isEmpty_1.default(cachedSessionUserId);
        var isSwitchUserCase = !isEmpty_1.default(userId) &&
            !isEmpty_1.default(cachedSessionUserId) &&
            !isEqual_1.default(userId, cachedSessionUserId);
        return isNoCachedSession || isSignoutCase || isSwitchUserCase;
    };
    return SessionInfoManager;
}());
exports.SessionInfoManager = SessionInfoManager;
//# sourceMappingURL=SessionInfoManager.js.map