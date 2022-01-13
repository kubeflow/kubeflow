"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromProcess = exports.ENV_PROFILE = void 0;
const credential_provider_ini_1 = require("@aws-sdk/credential-provider-ini");
const property_provider_1 = require("@aws-sdk/property-provider");
const child_process_1 = require("child_process");
/**
 * @internal
 */
exports.ENV_PROFILE = "AWS_PROFILE";
/**
 * Creates a credential provider that will read from a credential_process specified
 * in ini files.
 */
const fromProcess = (init = {}) => async () => {
    const profiles = await credential_provider_ini_1.parseKnownFiles(init);
    return resolveProcessCredentials(credential_provider_ini_1.getMasterProfileName(init), profiles);
};
exports.fromProcess = fromProcess;
const resolveProcessCredentials = async (profileName, profiles) => {
    const profile = profiles[profileName];
    if (profiles[profileName]) {
        const credentialProcess = profile["credential_process"];
        if (credentialProcess !== undefined) {
            return await execPromise(credentialProcess)
                .then((processResult) => {
                let data;
                try {
                    data = JSON.parse(processResult);
                }
                catch (_a) {
                    throw Error(`Profile ${profileName} credential_process returned invalid JSON.`);
                }
                const { Version: version, AccessKeyId: accessKeyId, SecretAccessKey: secretAccessKey, SessionToken: sessionToken, Expiration: expiration, } = data;
                if (version !== 1) {
                    throw Error(`Profile ${profileName} credential_process did not return Version 1.`);
                }
                if (accessKeyId === undefined || secretAccessKey === undefined) {
                    throw Error(`Profile ${profileName} credential_process returned invalid credentials.`);
                }
                let expirationUnix;
                if (expiration) {
                    const currentTime = new Date();
                    const expireTime = new Date(expiration);
                    if (expireTime < currentTime) {
                        throw Error(`Profile ${profileName} credential_process returned expired credentials.`);
                    }
                    expirationUnix = Math.floor(new Date(expiration).valueOf() / 1000);
                }
                return {
                    accessKeyId,
                    secretAccessKey,
                    sessionToken,
                    expirationUnix,
                };
            })
                .catch((error) => {
                throw new property_provider_1.ProviderError(error.message);
            });
        }
        else {
            throw new property_provider_1.ProviderError(`Profile ${profileName} did not contain credential_process.`);
        }
    }
    else {
        // If the profile cannot be parsed or does not contain the default or
        // specified profile throw an error. This should be considered a terminal
        // resolution error if a profile has been specified by the user (whether via
        // a parameter, anenvironment variable, or another profile's `source_profile` key).
        throw new property_provider_1.ProviderError(`Profile ${profileName} could not be found in shared credentials file.`);
    }
};
const execPromise = (command) => new Promise(function (resolve, reject) {
    child_process_1.exec(command, (error, stdout) => {
        if (error) {
            reject(error);
            return;
        }
        resolve(stdout.trim());
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsOEVBQTRHO0FBQzVHLGtFQUEyRDtBQUczRCxpREFBcUM7QUFFckM7O0dBRUc7QUFDVSxRQUFBLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFJekM7OztHQUdHO0FBQ0ksTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUF3QixFQUFFLEVBQXNCLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRTtJQUN4RixNQUFNLFFBQVEsR0FBRyxNQUFNLHlDQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsT0FBTyx5QkFBeUIsQ0FBQyw4Q0FBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN6RSxDQUFDLENBQUM7QUFIVyxRQUFBLFdBQVcsZUFHdEI7QUFFRixNQUFNLHlCQUF5QixHQUFHLEtBQUssRUFBRSxXQUFtQixFQUFFLFFBQXVCLEVBQXdCLEVBQUU7SUFDN0csTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXRDLElBQUksUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ3pCLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDeEQsSUFBSSxpQkFBaUIsS0FBSyxTQUFTLEVBQUU7WUFDbkMsT0FBTyxNQUFNLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQztpQkFDeEMsSUFBSSxDQUFDLENBQUMsYUFBa0IsRUFBRSxFQUFFO2dCQUMzQixJQUFJLElBQUksQ0FBQztnQkFDVCxJQUFJO29CQUNGLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUNsQztnQkFBQyxXQUFNO29CQUNOLE1BQU0sS0FBSyxDQUFDLFdBQVcsV0FBVyw0Q0FBNEMsQ0FBQyxDQUFDO2lCQUNqRjtnQkFFRCxNQUFNLEVBQ0osT0FBTyxFQUFFLE9BQU8sRUFDaEIsV0FBVyxFQUFFLFdBQVcsRUFDeEIsZUFBZSxFQUFFLGVBQWUsRUFDaEMsWUFBWSxFQUFFLFlBQVksRUFDMUIsVUFBVSxFQUFFLFVBQVUsR0FDdkIsR0FBRyxJQUFJLENBQUM7Z0JBRVQsSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFO29CQUNqQixNQUFNLEtBQUssQ0FBQyxXQUFXLFdBQVcsK0NBQStDLENBQUMsQ0FBQztpQkFDcEY7Z0JBRUQsSUFBSSxXQUFXLEtBQUssU0FBUyxJQUFJLGVBQWUsS0FBSyxTQUFTLEVBQUU7b0JBQzlELE1BQU0sS0FBSyxDQUFDLFdBQVcsV0FBVyxtREFBbUQsQ0FBQyxDQUFDO2lCQUN4RjtnQkFFRCxJQUFJLGNBQWMsQ0FBQztnQkFFbkIsSUFBSSxVQUFVLEVBQUU7b0JBQ2QsTUFBTSxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDL0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3hDLElBQUksVUFBVSxHQUFHLFdBQVcsRUFBRTt3QkFDNUIsTUFBTSxLQUFLLENBQUMsV0FBVyxXQUFXLG1EQUFtRCxDQUFDLENBQUM7cUJBQ3hGO29CQUNELGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO2lCQUNwRTtnQkFFRCxPQUFPO29CQUNMLFdBQVc7b0JBQ1gsZUFBZTtvQkFDZixZQUFZO29CQUNaLGNBQWM7aUJBQ2YsQ0FBQztZQUNKLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTtnQkFDdEIsTUFBTSxJQUFJLGlDQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNMLE1BQU0sSUFBSSxpQ0FBYSxDQUFDLFdBQVcsV0FBVyxzQ0FBc0MsQ0FBQyxDQUFDO1NBQ3ZGO0tBQ0Y7U0FBTTtRQUNMLHFFQUFxRTtRQUNyRSx5RUFBeUU7UUFDekUsNEVBQTRFO1FBQzVFLG1GQUFtRjtRQUNuRixNQUFNLElBQUksaUNBQWEsQ0FBQyxXQUFXLFdBQVcsaURBQWlELENBQUMsQ0FBQztLQUNsRztBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFHLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FDdEMsSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtJQUNuQyxvQkFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUM5QixJQUFJLEtBQUssRUFBRTtZQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNkLE9BQU87U0FDUjtRQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0TWFzdGVyUHJvZmlsZU5hbWUsIHBhcnNlS25vd25GaWxlcywgU291cmNlUHJvZmlsZUluaXQgfSBmcm9tIFwiQGF3cy1zZGsvY3JlZGVudGlhbC1wcm92aWRlci1pbmlcIjtcbmltcG9ydCB7IFByb3ZpZGVyRXJyb3IgfSBmcm9tIFwiQGF3cy1zZGsvcHJvcGVydHktcHJvdmlkZXJcIjtcbmltcG9ydCB7IFBhcnNlZEluaURhdGEgfSBmcm9tIFwiQGF3cy1zZGsvc2hhcmVkLWluaS1maWxlLWxvYWRlclwiO1xuaW1wb3J0IHsgQ3JlZGVudGlhbFByb3ZpZGVyLCBDcmVkZW50aWFscyB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBFTlZfUFJPRklMRSA9IFwiQVdTX1BST0ZJTEVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBGcm9tUHJvY2Vzc0luaXQgZXh0ZW5kcyBTb3VyY2VQcm9maWxlSW5pdCB7fVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjcmVkZW50aWFsIHByb3ZpZGVyIHRoYXQgd2lsbCByZWFkIGZyb20gYSBjcmVkZW50aWFsX3Byb2Nlc3Mgc3BlY2lmaWVkXG4gKiBpbiBpbmkgZmlsZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBmcm9tUHJvY2VzcyA9IChpbml0OiBGcm9tUHJvY2Vzc0luaXQgPSB7fSk6IENyZWRlbnRpYWxQcm92aWRlciA9PiBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHByb2ZpbGVzID0gYXdhaXQgcGFyc2VLbm93bkZpbGVzKGluaXQpO1xuICByZXR1cm4gcmVzb2x2ZVByb2Nlc3NDcmVkZW50aWFscyhnZXRNYXN0ZXJQcm9maWxlTmFtZShpbml0KSwgcHJvZmlsZXMpO1xufTtcblxuY29uc3QgcmVzb2x2ZVByb2Nlc3NDcmVkZW50aWFscyA9IGFzeW5jIChwcm9maWxlTmFtZTogc3RyaW5nLCBwcm9maWxlczogUGFyc2VkSW5pRGF0YSk6IFByb21pc2U8Q3JlZGVudGlhbHM+ID0+IHtcbiAgY29uc3QgcHJvZmlsZSA9IHByb2ZpbGVzW3Byb2ZpbGVOYW1lXTtcblxuICBpZiAocHJvZmlsZXNbcHJvZmlsZU5hbWVdKSB7XG4gICAgY29uc3QgY3JlZGVudGlhbFByb2Nlc3MgPSBwcm9maWxlW1wiY3JlZGVudGlhbF9wcm9jZXNzXCJdO1xuICAgIGlmIChjcmVkZW50aWFsUHJvY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gYXdhaXQgZXhlY1Byb21pc2UoY3JlZGVudGlhbFByb2Nlc3MpXG4gICAgICAgIC50aGVuKChwcm9jZXNzUmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UocHJvY2Vzc1Jlc3VsdCk7XG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSBjcmVkZW50aWFsX3Byb2Nlc3MgcmV0dXJuZWQgaW52YWxpZCBKU09OLmApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIFZlcnNpb246IHZlcnNpb24sXG4gICAgICAgICAgICBBY2Nlc3NLZXlJZDogYWNjZXNzS2V5SWQsXG4gICAgICAgICAgICBTZWNyZXRBY2Nlc3NLZXk6IHNlY3JldEFjY2Vzc0tleSxcbiAgICAgICAgICAgIFNlc3Npb25Ub2tlbjogc2Vzc2lvblRva2VuLFxuICAgICAgICAgICAgRXhwaXJhdGlvbjogZXhwaXJhdGlvbixcbiAgICAgICAgICB9ID0gZGF0YTtcblxuICAgICAgICAgIGlmICh2ZXJzaW9uICE9PSAxKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSBjcmVkZW50aWFsX3Byb2Nlc3MgZGlkIG5vdCByZXR1cm4gVmVyc2lvbiAxLmApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhY2Nlc3NLZXlJZCA9PT0gdW5kZWZpbmVkIHx8IHNlY3JldEFjY2Vzc0tleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSBjcmVkZW50aWFsX3Byb2Nlc3MgcmV0dXJuZWQgaW52YWxpZCBjcmVkZW50aWFscy5gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgZXhwaXJhdGlvblVuaXg7XG5cbiAgICAgICAgICBpZiAoZXhwaXJhdGlvbikge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgY29uc3QgZXhwaXJlVGltZSA9IG5ldyBEYXRlKGV4cGlyYXRpb24pO1xuICAgICAgICAgICAgaWYgKGV4cGlyZVRpbWUgPCBjdXJyZW50VGltZSkge1xuICAgICAgICAgICAgICB0aHJvdyBFcnJvcihgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSBjcmVkZW50aWFsX3Byb2Nlc3MgcmV0dXJuZWQgZXhwaXJlZCBjcmVkZW50aWFscy5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cGlyYXRpb25Vbml4ID0gTWF0aC5mbG9vcihuZXcgRGF0ZShleHBpcmF0aW9uKS52YWx1ZU9mKCkgLyAxMDAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWNjZXNzS2V5SWQsXG4gICAgICAgICAgICBzZWNyZXRBY2Nlc3NLZXksXG4gICAgICAgICAgICBzZXNzaW9uVG9rZW4sXG4gICAgICAgICAgICBleHBpcmF0aW9uVW5peCxcbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICAgIHRocm93IG5ldyBQcm92aWRlckVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFByb3ZpZGVyRXJyb3IoYFByb2ZpbGUgJHtwcm9maWxlTmFtZX0gZGlkIG5vdCBjb250YWluIGNyZWRlbnRpYWxfcHJvY2Vzcy5gKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSWYgdGhlIHByb2ZpbGUgY2Fubm90IGJlIHBhcnNlZCBvciBkb2VzIG5vdCBjb250YWluIHRoZSBkZWZhdWx0IG9yXG4gICAgLy8gc3BlY2lmaWVkIHByb2ZpbGUgdGhyb3cgYW4gZXJyb3IuIFRoaXMgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYSB0ZXJtaW5hbFxuICAgIC8vIHJlc29sdXRpb24gZXJyb3IgaWYgYSBwcm9maWxlIGhhcyBiZWVuIHNwZWNpZmllZCBieSB0aGUgdXNlciAod2hldGhlciB2aWFcbiAgICAvLyBhIHBhcmFtZXRlciwgYW5lbnZpcm9ubWVudCB2YXJpYWJsZSwgb3IgYW5vdGhlciBwcm9maWxlJ3MgYHNvdXJjZV9wcm9maWxlYCBrZXkpLlxuICAgIHRocm93IG5ldyBQcm92aWRlckVycm9yKGBQcm9maWxlICR7cHJvZmlsZU5hbWV9IGNvdWxkIG5vdCBiZSBmb3VuZCBpbiBzaGFyZWQgY3JlZGVudGlhbHMgZmlsZS5gKTtcbiAgfVxufTtcblxuY29uc3QgZXhlY1Byb21pc2UgPSAoY29tbWFuZDogc3RyaW5nKSA9PlxuICBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZXhlYyhjb21tYW5kLCAoZXJyb3IsIHN0ZG91dCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZShzdGRvdXQudHJpbSgpKTtcbiAgICB9KTtcbiAgfSk7XG4iXX0=