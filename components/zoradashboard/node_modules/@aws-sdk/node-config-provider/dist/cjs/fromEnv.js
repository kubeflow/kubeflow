"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromEnv = void 0;
const property_provider_1 = require("@aws-sdk/property-provider");
/**
 * Get config value given the environment variable name or getter from
 * environment variable.
 */
const fromEnv = (envVarSelector) => async () => {
    try {
        const config = envVarSelector(process.env);
        if (config === undefined) {
            throw new Error();
        }
        return config;
    }
    catch (e) {
        throw new property_provider_1.ProviderError(e.message || `Cannot load config from environment variables with getter: ${envVarSelector}`);
    }
};
exports.fromEnv = fromEnv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbUVudi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mcm9tRW52LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtFQUEyRDtBQUszRDs7O0dBR0c7QUFDSSxNQUFNLE9BQU8sR0FBRyxDQUFhLGNBQWdDLEVBQWUsRUFBRSxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQy9GLElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxFQUFFLENBQUM7U0FDbkI7UUFDRCxPQUFPLE1BQVcsQ0FBQztLQUNwQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsTUFBTSxJQUFJLGlDQUFhLENBQ3JCLENBQUMsQ0FBQyxPQUFPLElBQUksOERBQThELGNBQWMsRUFBRSxDQUM1RixDQUFDO0tBQ0g7QUFDSCxDQUFDLENBQUM7QUFaVyxRQUFBLE9BQU8sV0FZbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlckVycm9yIH0gZnJvbSBcIkBhd3Mtc2RrL3Byb3BlcnR5LXByb3ZpZGVyXCI7XG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5leHBvcnQgdHlwZSBHZXR0ZXJGcm9tRW52PFQ+ID0gKGVudjogTm9kZUpTLlByb2Nlc3NFbnYpID0+IFQgfCB1bmRlZmluZWQ7XG5cbi8qKlxuICogR2V0IGNvbmZpZyB2YWx1ZSBnaXZlbiB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGUgbmFtZSBvciBnZXR0ZXIgZnJvbVxuICogZW52aXJvbm1lbnQgdmFyaWFibGUuXG4gKi9cbmV4cG9ydCBjb25zdCBmcm9tRW52ID0gPFQgPSBzdHJpbmc+KGVudlZhclNlbGVjdG9yOiBHZXR0ZXJGcm9tRW52PFQ+KTogUHJvdmlkZXI8VD4gPT4gYXN5bmMgKCkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNvbmZpZyA9IGVudlZhclNlbGVjdG9yKHByb2Nlc3MuZW52KTtcbiAgICBpZiAoY29uZmlnID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigpO1xuICAgIH1cbiAgICByZXR1cm4gY29uZmlnIGFzIFQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihcbiAgICAgIGUubWVzc2FnZSB8fCBgQ2Fubm90IGxvYWQgY29uZmlnIGZyb20gZW52aXJvbm1lbnQgdmFyaWFibGVzIHdpdGggZ2V0dGVyOiAke2VudlZhclNlbGVjdG9yfWBcbiAgICApO1xuICB9XG59O1xuIl19