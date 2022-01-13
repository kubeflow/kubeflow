import { __awaiter, __generator } from "tslib";
import { getMasterProfileName, parseKnownFiles } from "@aws-sdk/credential-provider-ini";
import { ProviderError } from "@aws-sdk/property-provider";
import { exec } from "child_process";
/**
 * @internal
 */
export var ENV_PROFILE = "AWS_PROFILE";
/**
 * Creates a credential provider that will read from a credential_process specified
 * in ini files.
 */
export var fromProcess = function (init) {
    if (init === void 0) { init = {}; }
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var profiles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parseKnownFiles(init)];
                case 1:
                    profiles = _a.sent();
                    return [2 /*return*/, resolveProcessCredentials(getMasterProfileName(init), profiles)];
            }
        });
    }); };
};
var resolveProcessCredentials = function (profileName, profiles) { return __awaiter(void 0, void 0, void 0, function () {
    var profile, credentialProcess;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                profile = profiles[profileName];
                if (!profiles[profileName]) return [3 /*break*/, 4];
                credentialProcess = profile["credential_process"];
                if (!(credentialProcess !== undefined)) return [3 /*break*/, 2];
                return [4 /*yield*/, execPromise(credentialProcess)
                        .then(function (processResult) {
                        var data;
                        try {
                            data = JSON.parse(processResult);
                        }
                        catch (_a) {
                            throw Error("Profile " + profileName + " credential_process returned invalid JSON.");
                        }
                        var version = data.Version, accessKeyId = data.AccessKeyId, secretAccessKey = data.SecretAccessKey, sessionToken = data.SessionToken, expiration = data.Expiration;
                        if (version !== 1) {
                            throw Error("Profile " + profileName + " credential_process did not return Version 1.");
                        }
                        if (accessKeyId === undefined || secretAccessKey === undefined) {
                            throw Error("Profile " + profileName + " credential_process returned invalid credentials.");
                        }
                        var expirationUnix;
                        if (expiration) {
                            var currentTime = new Date();
                            var expireTime = new Date(expiration);
                            if (expireTime < currentTime) {
                                throw Error("Profile " + profileName + " credential_process returned expired credentials.");
                            }
                            expirationUnix = Math.floor(new Date(expiration).valueOf() / 1000);
                        }
                        return {
                            accessKeyId: accessKeyId,
                            secretAccessKey: secretAccessKey,
                            sessionToken: sessionToken,
                            expirationUnix: expirationUnix,
                        };
                    })
                        .catch(function (error) {
                        throw new ProviderError(error.message);
                    })];
            case 1: return [2 /*return*/, _a.sent()];
            case 2: throw new ProviderError("Profile " + profileName + " did not contain credential_process.");
            case 3: return [3 /*break*/, 5];
            case 4: 
            // If the profile cannot be parsed or does not contain the default or
            // specified profile throw an error. This should be considered a terminal
            // resolution error if a profile has been specified by the user (whether via
            // a parameter, anenvironment variable, or another profile's `source_profile` key).
            throw new ProviderError("Profile " + profileName + " could not be found in shared credentials file.");
            case 5: return [2 /*return*/];
        }
    });
}); };
var execPromise = function (command) {
    return new Promise(function (resolve, reject) {
        exec(command, function (error, stdout) {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxlQUFlLEVBQXFCLE1BQU0sa0NBQWtDLENBQUM7QUFDNUcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzNELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFckM7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBSXpDOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxVQUFDLElBQTBCO0lBQTFCLHFCQUFBLEVBQUEsU0FBMEI7SUFBeUIsT0FBQTs7Ozt3QkFDNUQscUJBQU0sZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFBOztvQkFBdEMsUUFBUSxHQUFHLFNBQTJCO29CQUM1QyxzQkFBTyx5QkFBeUIsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBQzs7O1NBQ3hFO0FBSDhFLENBRzlFLENBQUM7QUFFRixJQUFNLHlCQUF5QixHQUFHLFVBQU8sV0FBbUIsRUFBRSxRQUF1Qjs7Ozs7Z0JBQzdFLE9BQU8sR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBRWxDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBckIsd0JBQXFCO2dCQUNqQixpQkFBaUIsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztxQkFDcEQsQ0FBQSxpQkFBaUIsS0FBSyxTQUFTLENBQUEsRUFBL0Isd0JBQStCO2dCQUMxQixxQkFBTSxXQUFXLENBQUMsaUJBQWlCLENBQUM7eUJBQ3hDLElBQUksQ0FBQyxVQUFDLGFBQWtCO3dCQUN2QixJQUFJLElBQUksQ0FBQzt3QkFDVCxJQUFJOzRCQUNGLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3lCQUNsQzt3QkFBQyxXQUFNOzRCQUNOLE1BQU0sS0FBSyxDQUFDLGFBQVcsV0FBVywrQ0FBNEMsQ0FBQyxDQUFDO3lCQUNqRjt3QkFHQyxJQUFTLE9BQU8sR0FLZCxJQUFJLFFBTFUsRUFDSCxXQUFXLEdBSXRCLElBQUksWUFKa0IsRUFDUCxlQUFlLEdBRzlCLElBQUksZ0JBSDBCLEVBQ2xCLFlBQVksR0FFeEIsSUFBSSxhQUZvQixFQUNkLFVBQVUsR0FDcEIsSUFBSSxXQURnQixDQUNmO3dCQUVULElBQUksT0FBTyxLQUFLLENBQUMsRUFBRTs0QkFDakIsTUFBTSxLQUFLLENBQUMsYUFBVyxXQUFXLGtEQUErQyxDQUFDLENBQUM7eUJBQ3BGO3dCQUVELElBQUksV0FBVyxLQUFLLFNBQVMsSUFBSSxlQUFlLEtBQUssU0FBUyxFQUFFOzRCQUM5RCxNQUFNLEtBQUssQ0FBQyxhQUFXLFdBQVcsc0RBQW1ELENBQUMsQ0FBQzt5QkFDeEY7d0JBRUQsSUFBSSxjQUFjLENBQUM7d0JBRW5CLElBQUksVUFBVSxFQUFFOzRCQUNkLElBQU0sV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7NEJBQy9CLElBQU0sVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzRCQUN4QyxJQUFJLFVBQVUsR0FBRyxXQUFXLEVBQUU7Z0NBQzVCLE1BQU0sS0FBSyxDQUFDLGFBQVcsV0FBVyxzREFBbUQsQ0FBQyxDQUFDOzZCQUN4Rjs0QkFDRCxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQzt5QkFDcEU7d0JBRUQsT0FBTzs0QkFDTCxXQUFXLGFBQUE7NEJBQ1gsZUFBZSxpQkFBQTs0QkFDZixZQUFZLGNBQUE7NEJBQ1osY0FBYyxnQkFBQTt5QkFDZixDQUFDO29CQUNKLENBQUMsQ0FBQzt5QkFDRCxLQUFLLENBQUMsVUFBQyxLQUFZO3dCQUNsQixNQUFNLElBQUksYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDekMsQ0FBQyxDQUFDLEVBQUE7b0JBN0NKLHNCQUFPLFNBNkNILEVBQUM7b0JBRUwsTUFBTSxJQUFJLGFBQWEsQ0FBQyxhQUFXLFdBQVcseUNBQXNDLENBQUMsQ0FBQzs7O1lBR3hGLHFFQUFxRTtZQUNyRSx5RUFBeUU7WUFDekUsNEVBQTRFO1lBQzVFLG1GQUFtRjtZQUNuRixNQUFNLElBQUksYUFBYSxDQUFDLGFBQVcsV0FBVyxvREFBaUQsQ0FBQyxDQUFDOzs7O0tBRXBHLENBQUM7QUFFRixJQUFNLFdBQVcsR0FBRyxVQUFDLE9BQWU7SUFDbEMsT0FBQSxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNO1FBQ25DLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFLLEVBQUUsTUFBTTtZQUMxQixJQUFJLEtBQUssRUFBRTtnQkFDVCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2QsT0FBTzthQUNSO1lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3pCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBVEYsQ0FTRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0TWFzdGVyUHJvZmlsZU5hbWUsIHBhcnNlS25vd25GaWxlcywgU291cmNlUHJvZmlsZUluaXQgfSBmcm9tIFwiQGF3cy1zZGsvY3JlZGVudGlhbC1wcm92aWRlci1pbmlcIjtcbmltcG9ydCB7IFByb3ZpZGVyRXJyb3IgfSBmcm9tIFwiQGF3cy1zZGsvcHJvcGVydHktcHJvdmlkZXJcIjtcbmltcG9ydCB7IFBhcnNlZEluaURhdGEgfSBmcm9tIFwiQGF3cy1zZGsvc2hhcmVkLWluaS1maWxlLWxvYWRlclwiO1xuaW1wb3J0IHsgQ3JlZGVudGlhbFByb3ZpZGVyLCBDcmVkZW50aWFscyB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuaW1wb3J0IHsgZXhlYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBFTlZfUFJPRklMRSA9IFwiQVdTX1BST0ZJTEVcIjtcblxuZXhwb3J0IGludGVyZmFjZSBGcm9tUHJvY2Vzc0luaXQgZXh0ZW5kcyBTb3VyY2VQcm9maWxlSW5pdCB7fVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjcmVkZW50aWFsIHByb3ZpZGVyIHRoYXQgd2lsbCByZWFkIGZyb20gYSBjcmVkZW50aWFsX3Byb2Nlc3Mgc3BlY2lmaWVkXG4gKiBpbiBpbmkgZmlsZXMuXG4gKi9cbmV4cG9ydCBjb25zdCBmcm9tUHJvY2VzcyA9IChpbml0OiBGcm9tUHJvY2Vzc0luaXQgPSB7fSk6IENyZWRlbnRpYWxQcm92aWRlciA9PiBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHByb2ZpbGVzID0gYXdhaXQgcGFyc2VLbm93bkZpbGVzKGluaXQpO1xuICByZXR1cm4gcmVzb2x2ZVByb2Nlc3NDcmVkZW50aWFscyhnZXRNYXN0ZXJQcm9maWxlTmFtZShpbml0KSwgcHJvZmlsZXMpO1xufTtcblxuY29uc3QgcmVzb2x2ZVByb2Nlc3NDcmVkZW50aWFscyA9IGFzeW5jIChwcm9maWxlTmFtZTogc3RyaW5nLCBwcm9maWxlczogUGFyc2VkSW5pRGF0YSk6IFByb21pc2U8Q3JlZGVudGlhbHM+ID0+IHtcbiAgY29uc3QgcHJvZmlsZSA9IHByb2ZpbGVzW3Byb2ZpbGVOYW1lXTtcblxuICBpZiAocHJvZmlsZXNbcHJvZmlsZU5hbWVdKSB7XG4gICAgY29uc3QgY3JlZGVudGlhbFByb2Nlc3MgPSBwcm9maWxlW1wiY3JlZGVudGlhbF9wcm9jZXNzXCJdO1xuICAgIGlmIChjcmVkZW50aWFsUHJvY2VzcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gYXdhaXQgZXhlY1Byb21pc2UoY3JlZGVudGlhbFByb2Nlc3MpXG4gICAgICAgIC50aGVuKChwcm9jZXNzUmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICBsZXQgZGF0YTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UocHJvY2Vzc1Jlc3VsdCk7XG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSBjcmVkZW50aWFsX3Byb2Nlc3MgcmV0dXJuZWQgaW52YWxpZCBKU09OLmApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIFZlcnNpb246IHZlcnNpb24sXG4gICAgICAgICAgICBBY2Nlc3NLZXlJZDogYWNjZXNzS2V5SWQsXG4gICAgICAgICAgICBTZWNyZXRBY2Nlc3NLZXk6IHNlY3JldEFjY2Vzc0tleSxcbiAgICAgICAgICAgIFNlc3Npb25Ub2tlbjogc2Vzc2lvblRva2VuLFxuICAgICAgICAgICAgRXhwaXJhdGlvbjogZXhwaXJhdGlvbixcbiAgICAgICAgICB9ID0gZGF0YTtcblxuICAgICAgICAgIGlmICh2ZXJzaW9uICE9PSAxKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSBjcmVkZW50aWFsX3Byb2Nlc3MgZGlkIG5vdCByZXR1cm4gVmVyc2lvbiAxLmApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChhY2Nlc3NLZXlJZCA9PT0gdW5kZWZpbmVkIHx8IHNlY3JldEFjY2Vzc0tleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSBjcmVkZW50aWFsX3Byb2Nlc3MgcmV0dXJuZWQgaW52YWxpZCBjcmVkZW50aWFscy5gKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgZXhwaXJhdGlvblVuaXg7XG5cbiAgICAgICAgICBpZiAoZXhwaXJhdGlvbikge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgY29uc3QgZXhwaXJlVGltZSA9IG5ldyBEYXRlKGV4cGlyYXRpb24pO1xuICAgICAgICAgICAgaWYgKGV4cGlyZVRpbWUgPCBjdXJyZW50VGltZSkge1xuICAgICAgICAgICAgICB0aHJvdyBFcnJvcihgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSBjcmVkZW50aWFsX3Byb2Nlc3MgcmV0dXJuZWQgZXhwaXJlZCBjcmVkZW50aWFscy5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGV4cGlyYXRpb25Vbml4ID0gTWF0aC5mbG9vcihuZXcgRGF0ZShleHBpcmF0aW9uKS52YWx1ZU9mKCkgLyAxMDAwKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWNjZXNzS2V5SWQsXG4gICAgICAgICAgICBzZWNyZXRBY2Nlc3NLZXksXG4gICAgICAgICAgICBzZXNzaW9uVG9rZW4sXG4gICAgICAgICAgICBleHBpcmF0aW9uVW5peCxcbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICAgIHRocm93IG5ldyBQcm92aWRlckVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFByb3ZpZGVyRXJyb3IoYFByb2ZpbGUgJHtwcm9maWxlTmFtZX0gZGlkIG5vdCBjb250YWluIGNyZWRlbnRpYWxfcHJvY2Vzcy5gKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSWYgdGhlIHByb2ZpbGUgY2Fubm90IGJlIHBhcnNlZCBvciBkb2VzIG5vdCBjb250YWluIHRoZSBkZWZhdWx0IG9yXG4gICAgLy8gc3BlY2lmaWVkIHByb2ZpbGUgdGhyb3cgYW4gZXJyb3IuIFRoaXMgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYSB0ZXJtaW5hbFxuICAgIC8vIHJlc29sdXRpb24gZXJyb3IgaWYgYSBwcm9maWxlIGhhcyBiZWVuIHNwZWNpZmllZCBieSB0aGUgdXNlciAod2hldGhlciB2aWFcbiAgICAvLyBhIHBhcmFtZXRlciwgYW5lbnZpcm9ubWVudCB2YXJpYWJsZSwgb3IgYW5vdGhlciBwcm9maWxlJ3MgYHNvdXJjZV9wcm9maWxlYCBrZXkpLlxuICAgIHRocm93IG5ldyBQcm92aWRlckVycm9yKGBQcm9maWxlICR7cHJvZmlsZU5hbWV9IGNvdWxkIG5vdCBiZSBmb3VuZCBpbiBzaGFyZWQgY3JlZGVudGlhbHMgZmlsZS5gKTtcbiAgfVxufTtcblxuY29uc3QgZXhlY1Byb21pc2UgPSAoY29tbWFuZDogc3RyaW5nKSA9PlxuICBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgZXhlYyhjb21tYW5kLCAoZXJyb3IsIHN0ZG91dCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZShzdGRvdXQudHJpbSgpKTtcbiAgICB9KTtcbiAgfSk7XG4iXX0=