"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromInstanceMetadata = void 0;
const property_provider_1 = require("@aws-sdk/property-provider");
const httpRequest_1 = require("./remoteProvider/httpRequest");
const ImdsCredentials_1 = require("./remoteProvider/ImdsCredentials");
const RemoteProviderInit_1 = require("./remoteProvider/RemoteProviderInit");
const retry_1 = require("./remoteProvider/retry");
const IMDS_IP = "169.254.169.254";
const IMDS_PATH = "/latest/meta-data/iam/security-credentials/";
const IMDS_TOKEN_PATH = "/latest/api/token";
/**
 * Creates a credential provider that will source credentials from the EC2
 * Instance Metadata Service
 */
const fromInstanceMetadata = (init = {}) => {
    // when set to true, metadata service will not fetch token
    let disableFetchToken = false;
    const { timeout, maxRetries } = RemoteProviderInit_1.providerConfigFromInit(init);
    const getCredentials = async (maxRetries, options) => {
        const profile = (await retry_1.retry(async () => {
            let profile;
            try {
                profile = await getProfile(options);
            }
            catch (err) {
                if (err.statusCode === 401) {
                    disableFetchToken = false;
                }
                throw err;
            }
            return profile;
        }, maxRetries)).trim();
        return retry_1.retry(async () => {
            let creds;
            try {
                creds = await getCredentialsFromProfile(profile, options);
            }
            catch (err) {
                if (err.statusCode === 401) {
                    disableFetchToken = false;
                }
                throw err;
            }
            return creds;
        }, maxRetries);
    };
    return async () => {
        if (disableFetchToken) {
            return getCredentials(maxRetries, { timeout });
        }
        else {
            let token;
            try {
                token = (await getMetadataToken({ timeout })).toString();
            }
            catch (error) {
                if ((error === null || error === void 0 ? void 0 : error.statusCode) === 400) {
                    throw Object.assign(error, {
                        message: "EC2 Metadata token request returned error",
                    });
                }
                else if (error.message === "TimeoutError" || [403, 404, 405].includes(error.statusCode)) {
                    disableFetchToken = true;
                }
                return getCredentials(maxRetries, { timeout });
            }
            return getCredentials(maxRetries, {
                timeout,
                headers: {
                    "x-aws-ec2-metadata-token": token,
                },
            });
        }
    };
};
exports.fromInstanceMetadata = fromInstanceMetadata;
const getMetadataToken = async (options) => httpRequest_1.httpRequest({
    ...options,
    host: IMDS_IP,
    path: IMDS_TOKEN_PATH,
    method: "PUT",
    headers: {
        "x-aws-ec2-metadata-token-ttl-seconds": "21600",
    },
});
const getProfile = async (options) => (await httpRequest_1.httpRequest({ ...options, host: IMDS_IP, path: IMDS_PATH })).toString();
const getCredentialsFromProfile = async (profile, options) => {
    const credsResponse = JSON.parse((await httpRequest_1.httpRequest({
        ...options,
        host: IMDS_IP,
        path: IMDS_PATH + profile,
    })).toString());
    if (!ImdsCredentials_1.isImdsCredentials(credsResponse)) {
        throw new property_provider_1.ProviderError("Invalid response received from instance metadata service.");
    }
    return ImdsCredentials_1.fromImdsCredentials(credsResponse);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbUluc3RhbmNlTWV0YWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnJvbUluc3RhbmNlTWV0YWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0VBQTJEO0FBSTNELDhEQUEyRDtBQUMzRCxzRUFBMEY7QUFDMUYsNEVBQWlHO0FBQ2pHLGtEQUErQztBQUUvQyxNQUFNLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztBQUNsQyxNQUFNLFNBQVMsR0FBRyw2Q0FBNkMsQ0FBQztBQUNoRSxNQUFNLGVBQWUsR0FBRyxtQkFBbUIsQ0FBQztBQUU1Qzs7O0dBR0c7QUFDSSxNQUFNLG9CQUFvQixHQUFHLENBQUMsT0FBMkIsRUFBRSxFQUFzQixFQUFFO0lBQ3hGLDBEQUEwRDtJQUMxRCxJQUFJLGlCQUFpQixHQUFHLEtBQUssQ0FBQztJQUM5QixNQUFNLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxHQUFHLDJDQUFzQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTdELE1BQU0sY0FBYyxHQUFHLEtBQUssRUFBRSxVQUFrQixFQUFFLE9BQXVCLEVBQUUsRUFBRTtRQUMzRSxNQUFNLE9BQU8sR0FBRyxDQUNkLE1BQU0sYUFBSyxDQUFTLEtBQUssSUFBSSxFQUFFO1lBQzdCLElBQUksT0FBZSxDQUFDO1lBQ3BCLElBQUk7Z0JBQ0YsT0FBTyxHQUFHLE1BQU0sVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3JDO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtvQkFDMUIsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO2lCQUMzQjtnQkFDRCxNQUFNLEdBQUcsQ0FBQzthQUNYO1lBQ0QsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUNmLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFVCxPQUFPLGFBQUssQ0FBQyxLQUFLLElBQUksRUFB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NUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvdmlkZXJFcnJvciB9IGZyb20gXCJAYXdzLXNkay9wcm9wZXJ0eS1wcm92aWRlclwiO1xuaW1wb3J0IHsgQ3JlZGVudGlhbFByb3ZpZGVyLCBDcmVkZW50aWFscyB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuaW1wb3J0IHsgUmVxdWVzdE9wdGlvbnMgfSBmcm9tIFwiaHR0cFwiO1xuXG5pbXBvcnQgeyBodHRwUmVxdWVzdCB9IGZyb20gXCIuL3JlbW90ZVByb3ZpZGVyL2h0dHBSZXF1ZXN0XCI7XG5pbXBvcnQgeyBmcm9tSW1kc0NyZWRlbnRpYWxzLCBpc0ltZHNDcmVkZW50aWFscyB9IGZyb20gXCIuL3JlbW90ZVByb3ZpZGVyL0ltZHNDcmVkZW50aWFsc1wiO1xuaW1wb3J0IHsgcHJvdmlkZXJDb25maWdGcm9tSW5pdCwgUmVtb3RlUHJvdmlkZXJJbml0IH0gZnJvbSBcIi4vcmVtb3RlUHJvdmlkZXIvUmVtb3RlUHJvdmlkZXJJbml0XCI7XG5pbXBvcnQgeyByZXRyeSB9IGZyb20gXCIuL3JlbW90ZVByb3ZpZGVyL3JldHJ5XCI7XG5cbmNvbnN0IElNRFNfSVAgPSBcIjE2OS4yNTQuMTY5LjI1NFwiO1xuY29uc3QgSU1EU19QQVRIID0gXCIvbGF0ZXN0L21ldGEtZGF0YS9pYW0vc2VjdXJpdHktY3JlZGVudGlhbHMvXCI7XG5jb25zdCBJTURTX1RPS0VOX1BBVEggPSBcIi9sYXRlc3QvYXBpL3Rva2VuXCI7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNyZWRlbnRpYWwgcHJvdmlkZXIgdGhhdCB3aWxsIHNvdXJjZSBjcmVkZW50aWFscyBmcm9tIHRoZSBFQzJcbiAqIEluc3RhbmNlIE1ldGFkYXRhIFNlcnZpY2VcbiAqL1xuZXhwb3J0IGNvbnN0IGZyb21JbnN0YW5jZU1ldGFkYXRhID0gKGluaXQ6IFJlbW90ZVByb3ZpZGVySW5pdCA9IHt9KTogQ3JlZGVudGlhbFByb3ZpZGVyID0+IHtcbiAgLy8gd2hlbiBzZXQgdG8gdHJ1ZSwgbWV0YWRhdGEgc2VydmljZSB3aWxsIG5vdCBmZXRjaCB0b2tlblxuICBsZXQgZGlzYWJsZUZldGNoVG9rZW4gPSBmYWxzZTtcbiAgY29uc3QgeyB0aW1lb3V0LCBtYXhSZXRyaWVzIH0gPSBwcm92aWRlckNvbmZpZ0Zyb21Jbml0KGluaXQpO1xuXG4gIGNvbnN0IGdldENyZWRlbnRpYWxzID0gYXN5bmMgKG1heFJldHJpZXM6IG51bWJlciwgb3B0aW9uczogUmVxdWVzdE9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBwcm9maWxlID0gKFxuICAgICAgYXdhaXQgcmV0cnk8c3RyaW5nPihhc3luYyAoKSA9PiB7XG4gICAgICAgIGxldCBwcm9maWxlOiBzdHJpbmc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcHJvZmlsZSA9IGF3YWl0IGdldFByb2ZpbGUob3B0aW9ucyk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGlmIChlcnIuc3RhdHVzQ29kZSA9PT0gNDAxKSB7XG4gICAgICAgICAgICBkaXNhYmxlRmV0Y2hUb2tlbiA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb2ZpbGU7XG4gICAgICB9LCBtYXhSZXRyaWVzKVxuICAgICkudHJpbSgpO1xuXG4gICAgcmV0dXJuIHJldHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBjcmVkczogQ3JlZGVudGlhbHM7XG4gICAgICB0cnkge1xuICAgICAgICBjcmVkcyA9IGF3YWl0IGdldENyZWRlbnRpYWxzRnJvbVByb2ZpbGUocHJvZmlsZSwgb3B0aW9ucyk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgaWYgKGVyci5zdGF0dXNDb2RlID09PSA0MDEpIHtcbiAgICAgICAgICBkaXNhYmxlRmV0Y2hUb2tlbiA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjcmVkcztcbiAgICB9LCBtYXhSZXRyaWVzKTtcbiAgfTtcblxuICByZXR1cm4gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChkaXNhYmxlRmV0Y2hUb2tlbikge1xuICAgICAgcmV0dXJuIGdldENyZWRlbnRpYWxzKG1heFJldHJpZXMsIHsgdGltZW91dCB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRva2VuOiBzdHJpbmc7XG4gICAgICB0cnkge1xuICAgICAgICB0b2tlbiA9IChhd2FpdCBnZXRNZXRhZGF0YVRva2VuKHsgdGltZW91dCB9KSkudG9TdHJpbmcoKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvcj8uc3RhdHVzQ29kZSA9PT0gNDAwKSB7XG4gICAgICAgICAgdGhyb3cgT2JqZWN0LmFzc2lnbihlcnJvciwge1xuICAgICAgICAgICAgbWVzc2FnZTogXCJFQzIgTWV0YWRhdGEgdG9rZW4gcmVxdWVzdCByZXR1cm5lZCBlcnJvclwiLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGVycm9yLm1lc3NhZ2UgPT09IFwiVGltZW91dEVycm9yXCIgfHwgWzQwMywgNDA0LCA0MDVdLmluY2x1ZGVzKGVycm9yLnN0YXR1c0NvZGUpKSB7XG4gICAgICAgICAgZGlzYWJsZUZldGNoVG9rZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBnZXRDcmVkZW50aWFscyhtYXhSZXRyaWVzLCB7IHRpbWVvdXQgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0Q3JlZGVudGlhbHMobWF4UmV0cmllcywge1xuICAgICAgICB0aW1lb3V0LFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJ4LWF3cy1lYzItbWV0YWRhdGEtdG9rZW5cIjogdG9rZW4sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59O1xuXG5jb25zdCBnZXRNZXRhZGF0YVRva2VuID0gYXN5bmMgKG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zKSA9PlxuICBodHRwUmVxdWVzdCh7XG4gICAgLi4ub3B0aW9ucyxcbiAgICBob3N0OiBJTURTX0lQLFxuICAgIHBhdGg6IElNRFNfVE9LRU5fUEFUSCxcbiAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgaGVhZGVyczoge1xuICAgICAgXCJ4LWF3cy1lYzItbWV0YWRhdGEtdG9rZW4tdHRsLXNlY29uZHNcIjogXCIyMTYwMFwiLFxuICAgIH0sXG4gIH0pO1xuXG5jb25zdCBnZXRQcm9maWxlID0gYXN5bmMgKG9wdGlvbnM6IFJlcXVlc3RPcHRpb25zKSA9PlxuICAoYXdhaXQgaHR0cFJlcXVlc3QoeyAuLi5vcHRpb25zLCBob3N0OiBJTURTX0lQLCBwYXRoOiBJTURTX1BBVEggfSkpLnRvU3RyaW5nKCk7XG5cbmNvbnN0IGdldENyZWRlbnRpYWxzRnJvbVByb2ZpbGUgPSBhc3luYyAocHJvZmlsZTogc3RyaW5nLCBvcHRpb25zOiBSZXF1ZXN0T3B0aW9ucykgPT4ge1xuICBjb25zdCBjcmVkc1Jlc3BvbnNlID0gSlNPTi5wYXJzZShcbiAgICAoXG4gICAgICBhd2FpdCBodHRwUmVxdWVzdCh7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIGhvc3Q6IElNRFNfSVAsXG4gICAgICAgIHBhdGg6IElNRFNfUEFUSCArIHByb2ZpbGUsXG4gICAgICB9KVxuICAgICkudG9TdHJpbmcoKVxuICApO1xuXG4gIGlmICghaXNJbWRzQ3JlZGVudGlhbHMoY3JlZHNSZXNwb25zZSkpIHtcbiAgICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihcIkludmFsaWQgcmVzcG9uc2UgcmVjZWl2ZWQgZnJvbSBpbnN0YW5jZSBtZXRhZGF0YSBzZXJ2aWNlLlwiKTtcbiAgfVxuXG4gIHJldHVybiBmcm9tSW1kc0NyZWRlbnRpYWxzKGNyZWRzUmVzcG9uc2UpO1xufTtcbiJdfQ==