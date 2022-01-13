import { __assign, __read, __spread } from "tslib";
import { fromEnv } from "@aws-sdk/credential-provider-env";
import { ENV_CMDS_FULL_URI, ENV_CMDS_RELATIVE_URI, fromContainerMetadata, fromInstanceMetadata, } from "@aws-sdk/credential-provider-imds";
import { ENV_PROFILE, fromIni } from "@aws-sdk/credential-provider-ini";
import { fromProcess } from "@aws-sdk/credential-provider-process";
import { chain, memoize, ProviderError } from "@aws-sdk/property-provider";
import { loadSharedConfigFiles } from "@aws-sdk/shared-ini-file-loader";
export var ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
/**
 * Creates a credential provider that will attempt to find credentials from the
 * following sources (listed in order of precedence):
 *   * Environment variables exposed via `process.env`
 *   * Shared credentials and config ini files
 *   * The EC2/ECS Instance Metadata Service
 *
 * The default credential provider will invoke one provider at a time and only
 * continue to the next if no credentials have been located. For example, if
 * the process finds values defined via the `AWS_ACCESS_KEY_ID` and
 * `AWS_SECRET_ACCESS_KEY` environment variables, the files at
 * `~/.aws/credentials` and `~/.aws/config` will not be read, nor will any
 * messages be sent to the Instance Metadata Service.
 *
 * @param init                  Configuration that is passed to each individual
 *                              provider
 *
 * @see fromEnv                 The function used to source credentials from
 *                              environment variables
 * @see fromIni                 The function used to source credentials from INI
 *                              files
 * @see fromProcess             The function used to sources credentials from
 *                              credential_process in INI files
 * @see fromInstanceMetadata    The function used to source credentials from the
 *                              EC2 Instance Metadata Service
 * @see fromContainerMetadata   The function used to source credentials from the
 *                              ECS Container Metadata Service
 */
export var defaultProvider = function (init) {
    if (init === void 0) { init = {}; }
    var options = __assign({ profile: process.env[ENV_PROFILE] }, init);
    if (!options.loadedConfig)
        options.loadedConfig = loadSharedConfigFiles(init);
    var providers = [fromIni(options), fromProcess(options), remoteProvider(options)];
    if (!options.profile)
        providers.unshift(fromEnv());
    var providerChain = chain.apply(void 0, __spread(providers));
    return memoize(providerChain, function (credentials) { return credentials.expiration !== undefined && credentials.expiration.getTime() - Date.now() < 300000; }, function (credentials) { return credentials.expiration !== undefined; });
};
var remoteProvider = function (init) {
    if (process.env[ENV_CMDS_RELATIVE_URI] || process.env[ENV_CMDS_FULL_URI]) {
        return fromContainerMetadata(init);
    }
    if (process.env[ENV_IMDS_DISABLED]) {
        return function () { return Promise.reject(new ProviderError("EC2 Instance Metadata Service access disabled")); };
    }
    return fromInstanceMetadata(init);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRCxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIsb0JBQW9CLEdBRXJCLE1BQU0sbUNBQW1DLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQWUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRixPQUFPLEVBQUUsV0FBVyxFQUFtQixNQUFNLHNDQUFzQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzNFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBR3hFLE1BQU0sQ0FBQyxJQUFNLGlCQUFpQixHQUFHLDJCQUEyQixDQUFDO0FBRTdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxNQUFNLENBQUMsSUFBTSxlQUFlLEdBQUcsVUFBQyxJQUE2RDtJQUE3RCxxQkFBQSxFQUFBLFNBQTZEO0lBQzNGLElBQU0sT0FBTyxjQUFLLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFLLElBQUksQ0FBRSxDQUFDO0lBQy9ELElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWTtRQUFFLE9BQU8sQ0FBQyxZQUFZLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUUsSUFBTSxTQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztRQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUNuRCxJQUFNLGFBQWEsR0FBRyxLQUFLLHdCQUFJLFNBQVMsRUFBQyxDQUFDO0lBRTFDLE9BQU8sT0FBTyxDQUNaLGFBQWEsRUFDYixVQUFDLFdBQVcsSUFBSyxPQUFBLFdBQVcsQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sRUFBOUYsQ0FBOEYsRUFDL0csVUFBQyxXQUFXLElBQUssT0FBQSxXQUFXLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBcEMsQ0FBb0MsQ0FDdEQsQ0FBQztBQUNKLENBQUMsQ0FBQztBQUVGLElBQU0sY0FBYyxHQUFHLFVBQUMsSUFBd0I7SUFDOUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO1FBQ3hFLE9BQU8scUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDcEM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsRUFBRTtRQUNsQyxPQUFPLGNBQU0sT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksYUFBYSxDQUFDLCtDQUErQyxDQUFDLENBQUMsRUFBbEYsQ0FBa0YsQ0FBQztLQUNqRztJQUVELE9BQU8sb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZnJvbUVudiB9IGZyb20gXCJAYXdzLXNkay9jcmVkZW50aWFsLXByb3ZpZGVyLWVudlwiO1xuaW1wb3J0IHtcbiAgRU5WX0NNRFNfRlVMTF9VUkksXG4gIEVOVl9DTURTX1JFTEFUSVZFX1VSSSxcbiAgZnJvbUNvbnRhaW5lck1ldGFkYXRhLFxuICBmcm9tSW5zdGFuY2VNZXRhZGF0YSxcbiAgUmVtb3RlUHJvdmlkZXJJbml0LFxufSBmcm9tIFwiQGF3cy1zZGsvY3JlZGVudGlhbC1wcm92aWRlci1pbWRzXCI7XG5pbXBvcnQgeyBFTlZfUFJPRklMRSwgZnJvbUluaSwgRnJvbUluaUluaXQgfSBmcm9tIFwiQGF3cy1zZGsvY3JlZGVudGlhbC1wcm92aWRlci1pbmlcIjtcbmltcG9ydCB7IGZyb21Qcm9jZXNzLCBGcm9tUHJvY2Vzc0luaXQgfSBmcm9tIFwiQGF3cy1zZGsvY3JlZGVudGlhbC1wcm92aWRlci1wcm9jZXNzXCI7XG5pbXBvcnQgeyBjaGFpbiwgbWVtb2l6ZSwgUHJvdmlkZXJFcnJvciB9IGZyb20gXCJAYXdzLXNkay9wcm9wZXJ0eS1wcm92aWRlclwiO1xuaW1wb3J0IHsgbG9hZFNoYXJlZENvbmZpZ0ZpbGVzIH0gZnJvbSBcIkBhd3Mtc2RrL3NoYXJlZC1pbmktZmlsZS1sb2FkZXJcIjtcbmltcG9ydCB7IENyZWRlbnRpYWxQcm92aWRlciB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5leHBvcnQgY29uc3QgRU5WX0lNRFNfRElTQUJMRUQgPSBcIkFXU19FQzJfTUVUQURBVEFfRElTQUJMRURcIjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY3JlZGVudGlhbCBwcm92aWRlciB0aGF0IHdpbGwgYXR0ZW1wdCB0byBmaW5kIGNyZWRlbnRpYWxzIGZyb20gdGhlXG4gKiBmb2xsb3dpbmcgc291cmNlcyAobGlzdGVkIGluIG9yZGVyIG9mIHByZWNlZGVuY2UpOlxuICogICAqIEVudmlyb25tZW50IHZhcmlhYmxlcyBleHBvc2VkIHZpYSBgcHJvY2Vzcy5lbnZgXG4gKiAgICogU2hhcmVkIGNyZWRlbnRpYWxzIGFuZCBjb25maWcgaW5pIGZpbGVzXG4gKiAgICogVGhlIEVDMi9FQ1MgSW5zdGFuY2UgTWV0YWRhdGEgU2VydmljZVxuICpcbiAqIFRoZSBkZWZhdWx0IGNyZWRlbnRpYWwgcHJvdmlkZXIgd2lsbCBpbnZva2Ugb25lIHByb3ZpZGVyIGF0IGEgdGltZSBhbmQgb25seVxuICogY29udGludWUgdG8gdGhlIG5leHQgaWYgbm8gY3JlZGVudGlhbHMgaGF2ZSBiZWVuIGxvY2F0ZWQuIEZvciBleGFtcGxlLCBpZlxuICogdGhlIHByb2Nlc3MgZmluZHMgdmFsdWVzIGRlZmluZWQgdmlhIHRoZSBgQVdTX0FDQ0VTU19LRVlfSURgIGFuZFxuICogYEFXU19TRUNSRVRfQUNDRVNTX0tFWWAgZW52aXJvbm1lbnQgdmFyaWFibGVzLCB0aGUgZmlsZXMgYXRcbiAqIGB+Ly5hd3MvY3JlZGVudGlhbHNgIGFuZCBgfi8uYXdzL2NvbmZpZ2Agd2lsbCBub3QgYmUgcmVhZCwgbm9yIHdpbGwgYW55XG4gKiBtZXNzYWdlcyBiZSBzZW50IHRvIHRoZSBJbnN0YW5jZSBNZXRhZGF0YSBTZXJ2aWNlLlxuICpcbiAqIEBwYXJhbSBpbml0ICAgICAgICAgICAgICAgICAgQ29uZmlndXJhdGlvbiB0aGF0IGlzIHBhc3NlZCB0byBlYWNoIGluZGl2aWR1YWxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvdmlkZXJcbiAqXG4gKiBAc2VlIGZyb21FbnYgICAgICAgICAgICAgICAgIFRoZSBmdW5jdGlvbiB1c2VkIHRvIHNvdXJjZSBjcmVkZW50aWFscyBmcm9tXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudmlyb25tZW50IHZhcmlhYmxlc1xuICogQHNlZSBmcm9tSW5pICAgICAgICAgICAgICAgICBUaGUgZnVuY3Rpb24gdXNlZCB0byBzb3VyY2UgY3JlZGVudGlhbHMgZnJvbSBJTklcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXNcbiAqIEBzZWUgZnJvbVByb2Nlc3MgICAgICAgICAgICAgVGhlIGZ1bmN0aW9uIHVzZWQgdG8gc291cmNlcyBjcmVkZW50aWFscyBmcm9tXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxfcHJvY2VzcyBpbiBJTkkgZmlsZXNcbiAqIEBzZWUgZnJvbUluc3RhbmNlTWV0YWRhdGEgICAgVGhlIGZ1bmN0aW9uIHVzZWQgdG8gc291cmNlIGNyZWRlbnRpYWxzIGZyb20gdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVDMiBJbnN0YW5jZSBNZXRhZGF0YSBTZXJ2aWNlXG4gKiBAc2VlIGZyb21Db250YWluZXJNZXRhZGF0YSAgIFRoZSBmdW5jdGlvbiB1c2VkIHRvIHNvdXJjZSBjcmVkZW50aWFscyBmcm9tIHRoZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBFQ1MgQ29udGFpbmVyIE1ldGFkYXRhIFNlcnZpY2VcbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRQcm92aWRlciA9IChpbml0OiBGcm9tSW5pSW5pdCAmIFJlbW90ZVByb3ZpZGVySW5pdCAmIEZyb21Qcm9jZXNzSW5pdCA9IHt9KTogQ3JlZGVudGlhbFByb3ZpZGVyID0+IHtcbiAgY29uc3Qgb3B0aW9ucyA9IHsgcHJvZmlsZTogcHJvY2Vzcy5lbnZbRU5WX1BST0ZJTEVdLCAuLi5pbml0IH07XG4gIGlmICghb3B0aW9ucy5sb2FkZWRDb25maWcpIG9wdGlvbnMubG9hZGVkQ29uZmlnID0gbG9hZFNoYXJlZENvbmZpZ0ZpbGVzKGluaXQpO1xuICBjb25zdCBwcm92aWRlcnMgPSBbZnJvbUluaShvcHRpb25zKSwgZnJvbVByb2Nlc3Mob3B0aW9ucyksIHJlbW90ZVByb3ZpZGVyKG9wdGlvbnMpXTtcbiAgaWYgKCFvcHRpb25zLnByb2ZpbGUpIHByb3ZpZGVycy51bnNoaWZ0KGZyb21FbnYoKSk7XG4gIGNvbnN0IHByb3ZpZGVyQ2hhaW4gPSBjaGFpbiguLi5wcm92aWRlcnMpO1xuXG4gIHJldHVybiBtZW1vaXplKFxuICAgIHByb3ZpZGVyQ2hhaW4sXG4gICAgKGNyZWRlbnRpYWxzKSA9PiBjcmVkZW50aWFscy5leHBpcmF0aW9uICE9PSB1bmRlZmluZWQgJiYgY3JlZGVudGlhbHMuZXhwaXJhdGlvbi5nZXRUaW1lKCkgLSBEYXRlLm5vdygpIDwgMzAwMDAwLFxuICAgIChjcmVkZW50aWFscykgPT4gY3JlZGVudGlhbHMuZXhwaXJhdGlvbiAhPT0gdW5kZWZpbmVkXG4gICk7XG59O1xuXG5jb25zdCByZW1vdGVQcm92aWRlciA9IChpbml0OiBSZW1vdGVQcm92aWRlckluaXQpOiBDcmVkZW50aWFsUHJvdmlkZXIgPT4ge1xuICBpZiAocHJvY2Vzcy5lbnZbRU5WX0NNRFNfUkVMQVRJVkVfVVJJXSB8fCBwcm9jZXNzLmVudltFTlZfQ01EU19GVUxMX1VSSV0pIHtcbiAgICByZXR1cm4gZnJvbUNvbnRhaW5lck1ldGFkYXRhKGluaXQpO1xuICB9XG5cbiAgaWYgKHByb2Nlc3MuZW52W0VOVl9JTURTX0RJU0FCTEVEXSkge1xuICAgIHJldHVybiAoKSA9PiBQcm9taXNlLnJlamVjdChuZXcgUHJvdmlkZXJFcnJvcihcIkVDMiBJbnN0YW5jZSBNZXRhZGF0YSBTZXJ2aWNlIGFjY2VzcyBkaXNhYmxlZFwiKSk7XG4gIH1cblxuICByZXR1cm4gZnJvbUluc3RhbmNlTWV0YWRhdGEoaW5pdCk7XG59O1xuIl19