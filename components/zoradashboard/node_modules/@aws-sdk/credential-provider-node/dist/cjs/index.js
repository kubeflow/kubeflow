"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultProvider = exports.ENV_IMDS_DISABLED = void 0;
const credential_provider_env_1 = require("@aws-sdk/credential-provider-env");
const credential_provider_imds_1 = require("@aws-sdk/credential-provider-imds");
const credential_provider_ini_1 = require("@aws-sdk/credential-provider-ini");
const credential_provider_process_1 = require("@aws-sdk/credential-provider-process");
const property_provider_1 = require("@aws-sdk/property-provider");
const shared_ini_file_loader_1 = require("@aws-sdk/shared-ini-file-loader");
exports.ENV_IMDS_DISABLED = "AWS_EC2_METADATA_DISABLED";
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
const defaultProvider = (init = {}) => {
    const options = { profile: process.env[credential_provider_ini_1.ENV_PROFILE], ...init };
    if (!options.loadedConfig)
        options.loadedConfig = shared_ini_file_loader_1.loadSharedConfigFiles(init);
    const providers = [credential_provider_ini_1.fromIni(options), credential_provider_process_1.fromProcess(options), remoteProvider(options)];
    if (!options.profile)
        providers.unshift(credential_provider_env_1.fromEnv());
    const providerChain = property_provider_1.chain(...providers);
    return property_provider_1.memoize(providerChain, (credentials) => credentials.expiration !== undefined && credentials.expiration.getTime() - Date.now() < 300000, (credentials) => credentials.expiration !== undefined);
};
exports.defaultProvider = defaultProvider;
const remoteProvider = (init) => {
    if (process.env[credential_provider_imds_1.ENV_CMDS_RELATIVE_URI] || process.env[credential_provider_imds_1.ENV_CMDS_FULL_URI]) {
        return credential_provider_imds_1.fromContainerMetadata(init);
    }
    if (process.env[exports.ENV_IMDS_DISABLED]) {
        return () => Promise.reject(new property_provider_1.ProviderError("EC2 Instance Metadata Service access disabled"));
    }
    return credential_provider_imds_1.fromInstanceMetadata(init);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOEVBQTJEO0FBQzNELGdGQU0yQztBQUMzQyw4RUFBcUY7QUFDckYsc0ZBQW9GO0FBQ3BGLGtFQUEyRTtBQUMzRSw0RUFBd0U7QUFHM0QsUUFBQSxpQkFBaUIsR0FBRywyQkFBMkIsQ0FBQztBQUU3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0ksTUFBTSxlQUFlLEdBQUcsQ0FBQyxPQUEyRCxFQUFFLEVBQXNCLEVBQUU7SUFDbkgsTUFBTSxPQUFPLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQ0FBVyxDQUFDLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQztJQUMvRCxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVk7UUFBRSxPQUFPLENBQUMsWUFBWSxHQUFHLDhDQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlFLE1BQU0sU0FBUyxHQUFHLENBQUMsaUNBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSx5Q0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3BGLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTztRQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsaUNBQU8sRUFBRSxDQUFDLENBQUM7SUFDbkQsTUFBTSxhQUFhLEdBQUcseUJBQUssQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBRTFDLE9BQU8sMkJBQU8sQ0FDWixhQUFhLEVBQ2IsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEtBQUssU0FBUyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLE1BQU0sRUFDL0csQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEtBQUssU0FBUyxDQUN0RCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBWlcsUUFBQSxlQUFlLG1CQVkxQjtBQUVGLE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBd0IsRUFBc0IsRUFBRTtJQUN0RSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0RBQXFCLENBQUMsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUFpQixDQUFDLEVBQUU7UUFDeEUsT0FBTyxnREFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNwQztJQUVELElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBaUIsQ0FBQyxFQUFFO1FBQ2xDLE9BQU8sR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlDQUFhLENBQUMsK0NBQStDLENBQUMsQ0FBQyxDQUFDO0tBQ2pHO0lBRUQsT0FBTywrQ0FBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tRW52IH0gZnJvbSBcIkBhd3Mtc2RrL2NyZWRlbnRpYWwtcHJvdmlkZXItZW52XCI7XG5pbXBvcnQge1xuICBFTlZfQ01EU19GVUxMX1VSSSxcbiAgRU5WX0NNRFNfUkVMQVRJVkVfVVJJLFxuICBmcm9tQ29udGFpbmVyTWV0YWRhdGEsXG4gIGZyb21JbnN0YW5jZU1ldGFkYXRhLFxuICBSZW1vdGVQcm92aWRlckluaXQsXG59IGZyb20gXCJAYXdzLXNkay9jcmVkZW50aWFsLXByb3ZpZGVyLWltZHNcIjtcbmltcG9ydCB7IEVOVl9QUk9GSUxFLCBmcm9tSW5pLCBGcm9tSW5pSW5pdCB9IGZyb20gXCJAYXdzLXNkay9jcmVkZW50aWFsLXByb3ZpZGVyLWluaVwiO1xuaW1wb3J0IHsgZnJvbVByb2Nlc3MsIEZyb21Qcm9jZXNzSW5pdCB9IGZyb20gXCJAYXdzLXNkay9jcmVkZW50aWFsLXByb3ZpZGVyLXByb2Nlc3NcIjtcbmltcG9ydCB7IGNoYWluLCBtZW1vaXplLCBQcm92aWRlckVycm9yIH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3BlcnR5LXByb3ZpZGVyXCI7XG5pbXBvcnQgeyBsb2FkU2hhcmVkQ29uZmlnRmlsZXMgfSBmcm9tIFwiQGF3cy1zZGsvc2hhcmVkLWluaS1maWxlLWxvYWRlclwiO1xuaW1wb3J0IHsgQ3JlZGVudGlhbFByb3ZpZGVyIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBFTlZfSU1EU19ESVNBQkxFRCA9IFwiQVdTX0VDMl9NRVRBREFUQV9ESVNBQkxFRFwiO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjcmVkZW50aWFsIHByb3ZpZGVyIHRoYXQgd2lsbCBhdHRlbXB0IHRvIGZpbmQgY3JlZGVudGlhbHMgZnJvbSB0aGVcbiAqIGZvbGxvd2luZyBzb3VyY2VzIChsaXN0ZWQgaW4gb3JkZXIgb2YgcHJlY2VkZW5jZSk6XG4gKiAgICogRW52aXJvbm1lbnQgdmFyaWFibGVzIGV4cG9zZWQgdmlhIGBwcm9jZXNzLmVudmBcbiAqICAgKiBTaGFyZWQgY3JlZGVudGlhbHMgYW5kIGNvbmZpZyBpbmkgZmlsZXNcbiAqICAgKiBUaGUgRUMyL0VDUyBJbnN0YW5jZSBNZXRhZGF0YSBTZXJ2aWNlXG4gKlxuICogVGhlIGRlZmF1bHQgY3JlZGVudGlhbCBwcm92aWRlciB3aWxsIGludm9rZSBvbmUgcHJvdmlkZXIgYXQgYSB0aW1lIGFuZCBvbmx5XG4gKiBjb250aW51ZSB0byB0aGUgbmV4dCBpZiBubyBjcmVkZW50aWFscyBoYXZlIGJlZW4gbG9jYXRlZC4gRm9yIGV4YW1wbGUsIGlmXG4gKiB0aGUgcHJvY2VzcyBmaW5kcyB2YWx1ZXMgZGVmaW5lZCB2aWEgdGhlIGBBV1NfQUNDRVNTX0tFWV9JRGAgYW5kXG4gKiBgQVdTX1NFQ1JFVF9BQ0NFU1NfS0VZYCBlbnZpcm9ubWVudCB2YXJpYWJsZXMsIHRoZSBmaWxlcyBhdFxuICogYH4vLmF3cy9jcmVkZW50aWFsc2AgYW5kIGB+Ly5hd3MvY29uZmlnYCB3aWxsIG5vdCBiZSByZWFkLCBub3Igd2lsbCBhbnlcbiAqIG1lc3NhZ2VzIGJlIHNlbnQgdG8gdGhlIEluc3RhbmNlIE1ldGFkYXRhIFNlcnZpY2UuXG4gKlxuICogQHBhcmFtIGluaXQgICAgICAgICAgICAgICAgICBDb25maWd1cmF0aW9uIHRoYXQgaXMgcGFzc2VkIHRvIGVhY2ggaW5kaXZpZHVhbFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm92aWRlclxuICpcbiAqIEBzZWUgZnJvbUVudiAgICAgICAgICAgICAgICAgVGhlIGZ1bmN0aW9uIHVzZWQgdG8gc291cmNlIGNyZWRlbnRpYWxzIGZyb21cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW52aXJvbm1lbnQgdmFyaWFibGVzXG4gKiBAc2VlIGZyb21JbmkgICAgICAgICAgICAgICAgIFRoZSBmdW5jdGlvbiB1c2VkIHRvIHNvdXJjZSBjcmVkZW50aWFscyBmcm9tIElOSVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlc1xuICogQHNlZSBmcm9tUHJvY2VzcyAgICAgICAgICAgICBUaGUgZnVuY3Rpb24gdXNlZCB0byBzb3VyY2VzIGNyZWRlbnRpYWxzIGZyb21cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbF9wcm9jZXNzIGluIElOSSBmaWxlc1xuICogQHNlZSBmcm9tSW5zdGFuY2VNZXRhZGF0YSAgICBUaGUgZnVuY3Rpb24gdXNlZCB0byBzb3VyY2UgY3JlZGVudGlhbHMgZnJvbSB0aGVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgRUMyIEluc3RhbmNlIE1ldGFkYXRhIFNlcnZpY2VcbiAqIEBzZWUgZnJvbUNvbnRhaW5lck1ldGFkYXRhICAgVGhlIGZ1bmN0aW9uIHVzZWQgdG8gc291cmNlIGNyZWRlbnRpYWxzIGZyb20gdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEVDUyBDb250YWluZXIgTWV0YWRhdGEgU2VydmljZVxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFByb3ZpZGVyID0gKGluaXQ6IEZyb21JbmlJbml0ICYgUmVtb3RlUHJvdmlkZXJJbml0ICYgRnJvbVByb2Nlc3NJbml0ID0ge30pOiBDcmVkZW50aWFsUHJvdmlkZXIgPT4ge1xuICBjb25zdCBvcHRpb25zID0geyBwcm9maWxlOiBwcm9jZXNzLmVudltFTlZfUFJPRklMRV0sIC4uLmluaXQgfTtcbiAgaWYgKCFvcHRpb25zLmxvYWRlZENvbmZpZykgb3B0aW9ucy5sb2FkZWRDb25maWcgPSBsb2FkU2hhcmVkQ29uZmlnRmlsZXMoaW5pdCk7XG4gIGNvbnN0IHByb3ZpZGVycyA9IFtmcm9tSW5pKG9wdGlvbnMpLCBmcm9tUHJvY2VzcyhvcHRpb25zKSwgcmVtb3RlUHJvdmlkZXIob3B0aW9ucyldO1xuICBpZiAoIW9wdGlvbnMucHJvZmlsZSkgcHJvdmlkZXJzLnVuc2hpZnQoZnJvbUVudigpKTtcbiAgY29uc3QgcHJvdmlkZXJDaGFpbiA9IGNoYWluKC4uLnByb3ZpZGVycyk7XG5cbiAgcmV0dXJuIG1lbW9pemUoXG4gICAgcHJvdmlkZXJDaGFpbixcbiAgICAoY3JlZGVudGlhbHMpID0+IGNyZWRlbnRpYWxzLmV4cGlyYXRpb24gIT09IHVuZGVmaW5lZCAmJiBjcmVkZW50aWFscy5leHBpcmF0aW9uLmdldFRpbWUoKSAtIERhdGUubm93KCkgPCAzMDAwMDAsXG4gICAgKGNyZWRlbnRpYWxzKSA9PiBjcmVkZW50aWFscy5leHBpcmF0aW9uICE9PSB1bmRlZmluZWRcbiAgKTtcbn07XG5cbmNvbnN0IHJlbW90ZVByb3ZpZGVyID0gKGluaXQ6IFJlbW90ZVByb3ZpZGVySW5pdCk6IENyZWRlbnRpYWxQcm92aWRlciA9PiB7XG4gIGlmIChwcm9jZXNzLmVudltFTlZfQ01EU19SRUxBVElWRV9VUkldIHx8IHByb2Nlc3MuZW52W0VOVl9DTURTX0ZVTExfVVJJXSkge1xuICAgIHJldHVybiBmcm9tQ29udGFpbmVyTWV0YWRhdGEoaW5pdCk7XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnZbRU5WX0lNRFNfRElTQUJMRURdKSB7XG4gICAgcmV0dXJuICgpID0+IFByb21pc2UucmVqZWN0KG5ldyBQcm92aWRlckVycm9yKFwiRUMyIEluc3RhbmNlIE1ldGFkYXRhIFNlcnZpY2UgYWNjZXNzIGRpc2FibGVkXCIpKTtcbiAgfVxuXG4gIHJldHVybiBmcm9tSW5zdGFuY2VNZXRhZGF0YShpbml0KTtcbn07XG4iXX0=