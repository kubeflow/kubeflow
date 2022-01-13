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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { ConsoleLogger as Logger } from './Logger';
import { Sha256 as jsSha256 } from '@aws-crypto/sha256-js';
import { toHex } from '@aws-sdk/util-hex-encoding';
import { parse, format } from 'url';
import { DateUtils } from './Util';
var logger = new Logger('Signer');
var DEFAULT_ALGORITHM = 'AWS4-HMAC-SHA256';
var IOT_SERVICE_NAME = 'iotdevicegateway';
var encrypt = function (key, src) {
    var hash = new jsSha256(key);
    hash.update(src);
    return hash.digestSync();
};
var hash = function (src) {
    var arg = src || '';
    var hash = new jsSha256();
    hash.update(arg);
    return toHex(hash.digestSync());
};
/**
 * @private
 * RFC 3986 compliant version of encodeURIComponent
 */
var escape_RFC3986 = function (component) {
    return component.replace(/[!'()*]/g, function (c) {
        return ('%' +
            c
                .charCodeAt(0)
                .toString(16)
                .toUpperCase());
    });
};
/**
 * @private
 * Create canonical query string
 *
 */
var canonical_query = function (query) {
    if (!query || query.length === 0) {
        return '';
    }
    return query
        .split('&')
        .map(function (e) {
        var key_val = e.split('=');
        if (key_val.length === 1) {
            return e;
        }
        else {
            var reencoded_val = escape_RFC3986(key_val[1]);
            return key_val[0] + '=' + reencoded_val;
        }
    })
        .sort(function (a, b) {
        var key_a = a.split('=')[0];
        var key_b = b.split('=')[0];
        if (key_a === key_b) {
            return a < b ? -1 : 1;
        }
        else {
            return key_a < key_b ? -1 : 1;
        }
    })
        .join('&');
};
/**
* @private
* Create canonical headers
*
<pre>
CanonicalHeaders =
    CanonicalHeadersEntry0 + CanonicalHeadersEntry1 + ... + CanonicalHeadersEntryN
CanonicalHeadersEntry =
    Lowercase(HeaderName) + ':' + Trimall(HeaderValue) + '\n'
</pre>
*/
var canonical_headers = function (headers) {
    if (!headers || Object.keys(headers).length === 0) {
        return '';
    }
    return (Object.keys(headers)
        .map(function (key) {
        return {
            key: key.toLowerCase(),
            value: headers[key] ? headers[key].trim().replace(/\s+/g, ' ') : '',
        };
    })
        .sort(function (a, b) {
        return a.key < b.key ? -1 : 1;
    })
        .map(function (item) {
        return item.key + ':' + item.value;
    })
        .join('\n') + '\n');
};
/**
 * List of header keys included in the canonical headers.
 * @access private
 */
var signed_headers = function (headers) {
    return Object.keys(headers)
        .map(function (key) {
        return key.toLowerCase();
    })
        .sort()
        .join(';');
};
/**
* @private
* Create canonical request
* Refer to
* {@link http://docs.aws.amazon.com/general/latest/gr/sigv4-create-canonical-request.html|Create a Canonical Request}
*
<pre>
CanonicalRequest =
    HTTPRequestMethod + '\n' +
    CanonicalURI + '\n' +
    CanonicalQueryString + '\n' +
    CanonicalHeaders + '\n' +
    SignedHeaders + '\n' +
    HexEncode(Hash(RequestPayload))
</pre>
*/
var canonical_request = function (request) {
    var url_info = parse(request.url);
    return [
        request.method || '/',
        encodeURIComponent(url_info.pathname).replace(/%2F/gi, '/'),
        canonical_query(url_info.query),
        canonical_headers(request.headers),
        signed_headers(request.headers),
        hash(request.data),
    ].join('\n');
};
var parse_service_info = function (request) {
    var url_info = parse(request.url), host = url_info.host;
    var matched = host.match(/([^\.]+)\.(?:([^\.]*)\.)?amazonaws\.com$/);
    var parsed = (matched || []).slice(1, 3);
    if (parsed[1] === 'es') {
        // Elastic Search
        parsed = parsed.reverse();
    }
    return {
        service: request.service || parsed[0],
        region: request.region || parsed[1],
    };
};
var credential_scope = function (d_str, region, service) {
    return [d_str, region, service, 'aws4_request'].join('/');
};
/**
* @private
* Create a string to sign
* Refer to
* {@link http://docs.aws.amazon.com/general/latest/gr/sigv4-create-string-to-sign.html|Create String to Sign}
*
<pre>
StringToSign =
    Algorithm + \n +
    RequestDateTime + \n +
    CredentialScope + \n +
    HashedCanonicalRequest
</pre>
*/
var string_to_sign = function (algorithm, canonical_request, dt_str, scope) {
    return [algorithm, dt_str, scope, hash(canonical_request)].join('\n');
};
/**
* @private
* Create signing key
* Refer to
* {@link http://docs.aws.amazon.com/general/latest/gr/sigv4-calculate-signature.html|Calculate Signature}
*
<pre>
kSecret = your secret access key
kDate = HMAC("AWS4" + kSecret, Date)
kRegion = HMAC(kDate, Region)
kService = HMAC(kRegion, Service)
kSigning = HMAC(kService, "aws4_request")
</pre>
*/
var get_signing_key = function (secret_key, d_str, service_info) {
    logger.debug(service_info);
    var k = 'AWS4' + secret_key, k_date = encrypt(k, d_str), k_region = encrypt(k_date, service_info.region), k_service = encrypt(k_region, service_info.service), k_signing = encrypt(k_service, 'aws4_request');
    return k_signing;
};
var get_signature = function (signing_key, str_to_sign) {
    return toHex(encrypt(signing_key, str_to_sign));
};
/**
 * @private
 * Create authorization header
 * Refer to
 * {@link http://docs.aws.amazon.com/general/latest/gr/sigv4-add-signature-to-request.html|Add the Signing Information}
 */
var get_authorization_header = function (algorithm, access_key, scope, signed_headers, signature) {
    return [
        algorithm + ' ' + 'Credential=' + access_key + '/' + scope,
        'SignedHeaders=' + signed_headers,
        'Signature=' + signature,
    ].join(', ');
};
var Signer = /** @class */ (function () {
    function Signer() {
    }
    /**
    * Sign a HTTP request, add 'Authorization' header to request param
    * @method sign
    * @memberof Signer
    * @static
    *
    * @param {object} request - HTTP request object
    <pre>
    request: {
        method: GET | POST | PUT ...
        url: ...,
        headers: {
            header1: ...
        },
        data: data
    }
    </pre>
    * @param {object} access_info - AWS access credential info
    <pre>
    access_info: {
        access_key: ...,
        secret_key: ...,
        session_token: ...
    }
    </pre>
    * @param {object} [service_info] - AWS service type and region, optional,
    *                                  if not provided then parse out from url
    <pre>
    service_info: {
        service: ...,
        region: ...
    }
    </pre>
    *
    * @returns {object} Signed HTTP request
    */
    Signer.sign = function (request, access_info, service_info) {
        if (service_info === void 0) { service_info = null; }
        request.headers = request.headers || {};
        // datetime string and date string
        var dt = DateUtils.getDateWithClockOffset(), dt_str = dt.toISOString().replace(/[:\-]|\.\d{3}/g, ''), d_str = dt_str.substr(0, 8);
        var url_info = parse(request.url);
        request.headers['host'] = url_info.host;
        request.headers['x-amz-date'] = dt_str;
        if (access_info.session_token) {
            request.headers['X-Amz-Security-Token'] = access_info.session_token;
        }
        // Task 1: Create a Canonical Request
        var request_str = canonical_request(request);
        logger.debug(request_str);
        // Task 2: Create a String to Sign
        var serviceInfo = service_info || parse_service_info(request), scope = credential_scope(d_str, serviceInfo.region, serviceInfo.service), str_to_sign = string_to_sign(DEFAULT_ALGORITHM, request_str, dt_str, scope);
        // Task 3: Calculate the Signature
        var signing_key = get_signing_key(access_info.secret_key, d_str, serviceInfo), signature = get_signature(signing_key, str_to_sign);
        // Task 4: Adding the Signing information to the Request
        var authorization_header = get_authorization_header(DEFAULT_ALGORITHM, access_info.access_key, scope, signed_headers(request.headers), signature);
        request.headers['Authorization'] = authorization_header;
        return request;
    };
    Signer.signUrl = function (urlOrRequest, accessInfo, serviceInfo, expiration) {
        var urlToSign = typeof urlOrRequest === 'object' ? urlOrRequest.url : urlOrRequest;
        var method = typeof urlOrRequest === 'object' ? urlOrRequest.method : 'GET';
        var body = typeof urlOrRequest === 'object' ? urlOrRequest.body : undefined;
        var now = DateUtils.getDateWithClockOffset()
            .toISOString()
            .replace(/[:\-]|\.\d{3}/g, '');
        var today = now.substr(0, 8);
        // Intentionally discarding search
        var _a = parse(urlToSign, true, true), search = _a.search, parsedUrl = __rest(_a, ["search"]);
        var host = parsedUrl.host;
        var signedHeaders = { host: host };
        var _b = serviceInfo || parse_service_info({ url: format(parsedUrl) }), region = _b.region, service = _b.service;
        var credentialScope = credential_scope(today, region, service);
        // IoT service does not allow the session token in the canonical request
        // https://docs.aws.amazon.com/general/latest/gr/sigv4-add-signature-to-request.html
        var sessionTokenRequired = accessInfo.session_token && service !== IOT_SERVICE_NAME;
        var queryParams = __assign(__assign(__assign({ 'X-Amz-Algorithm': DEFAULT_ALGORITHM, 'X-Amz-Credential': [accessInfo.access_key, credentialScope].join('/'), 'X-Amz-Date': now.substr(0, 16) }, (sessionTokenRequired
            ? { 'X-Amz-Security-Token': "" + accessInfo.session_token }
            : {})), (expiration ? { 'X-Amz-Expires': "" + expiration } : {})), { 'X-Amz-SignedHeaders': Object.keys(signedHeaders).join(',') });
        var canonicalRequest = canonical_request({
            method: method,
            url: format(__assign(__assign({}, parsedUrl), { query: __assign(__assign({}, parsedUrl.query), queryParams) })),
            headers: signedHeaders,
            data: body,
        });
        var stringToSign = string_to_sign(DEFAULT_ALGORITHM, canonicalRequest, now, credentialScope);
        var signing_key = get_signing_key(accessInfo.secret_key, today, {
            region: region,
            service: service,
        });
        var signature = get_signature(signing_key, stringToSign);
        var additionalQueryParams = __assign({ 'X-Amz-Signature': signature }, (accessInfo.session_token && {
            'X-Amz-Security-Token': accessInfo.session_token,
        }));
        var result = format({
            protocol: parsedUrl.protocol,
            slashes: true,
            hostname: parsedUrl.hostname,
            port: parsedUrl.port,
            pathname: parsedUrl.pathname,
            query: __assign(__assign(__assign({}, parsedUrl.query), queryParams), additionalQueryParams),
        });
        return result;
    };
    return Signer;
}());
export { Signer };
/**
 * @deprecated use per-function import
 */
export default Signer;
//# sourceMappingURL=Signer.js.map