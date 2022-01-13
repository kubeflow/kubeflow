"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.parse = exports.validate = void 0;
/**
 * Validate whether a string is an ARN.
 */
const validate = (str) => typeof str === "string" && str.indexOf("arn:") === 0 && str.split(":").length >= 6;
exports.validate = validate;
/**
 * Parse an ARN string into structure with partition, service, region, accountId and resource values
 */
const parse = (arn) => {
    const segments = arn.split(":");
    if (segments.length < 6 || segments[0] !== "arn")
        throw new Error("Malformed ARN");
    const [, 
    //Skip "arn" literal
    partition, service, region, accountId, ...resource] = segments;
    return {
        partition,
        service,
        region,
        accountId,
        resource: resource.join(":"),
    };
};
exports.parse = parse;
/**
 * Build an ARN with service, partition, region, accountId, and resources strings
 */
const build = (arnObject) => {
    const { partition = "aws", service, region, accountId, resource } = arnObject;
    if ([service, region, accountId, resource].some((segment) => typeof segment !== "string")) {
        throw new Error("Input ARN object is invalid");
    }
    return `arn:${partition}:${service}:${region}:${accountId}:${resource}`;
};
exports.build = build;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0E7O0dBRUc7QUFDSSxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQVEsRUFBVyxFQUFFLENBQzVDLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7QUFEeEUsUUFBQSxRQUFRLFlBQ2dFO0FBRXJGOztHQUVHO0FBQ0ksTUFBTSxLQUFLLEdBQUcsQ0FBQyxHQUFXLEVBQU8sRUFBRTtJQUN4QyxNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUs7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ25GLE1BQU0sQ0FDSixBQURLO0lBRUwsb0JBQW9CO0lBQ3BCLFNBQVMsRUFDVCxPQUFPLEVBQ1AsTUFBTSxFQUNOLFNBQVMsRUFDVCxHQUFHLFFBQVEsQ0FDWixHQUFHLFFBQVEsQ0FBQztJQUViLE9BQU87UUFDTCxTQUFTO1FBQ1QsT0FBTztRQUNQLE1BQU07UUFDTixTQUFTO1FBQ1QsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0tBQzdCLENBQUM7QUFDSixDQUFDLENBQUM7QUFwQlcsUUFBQSxLQUFLLFNBb0JoQjtBQUlGOztHQUVHO0FBQ0ksTUFBTSxLQUFLLEdBQUcsQ0FBQyxTQUF1QixFQUFVLEVBQUU7SUFDdkQsTUFBTSxFQUFFLFNBQVMsR0FBRyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEdBQUcsU0FBUyxDQUFDO0lBQzlFLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sT0FBTyxLQUFLLFFBQVEsQ0FBQyxFQUFFO1FBQ3pGLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztLQUNoRDtJQUNELE9BQU8sT0FBTyxTQUFTLElBQUksT0FBTyxJQUFJLE1BQU0sSUFBSSxTQUFTLElBQUksUUFBUSxFQUFFLENBQUM7QUFDMUUsQ0FBQyxDQUFDO0FBTlcsUUFBQSxLQUFLLFNBTWhCIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBBUk4ge1xuICBwYXJ0aXRpb246IHN0cmluZztcbiAgc2VydmljZTogc3RyaW5nO1xuICByZWdpb246IHN0cmluZztcbiAgYWNjb3VudElkOiBzdHJpbmc7XG4gIHJlc291cmNlOiBzdHJpbmc7XG59XG4vKipcbiAqIFZhbGlkYXRlIHdoZXRoZXIgYSBzdHJpbmcgaXMgYW4gQVJOLlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGUgPSAoc3RyOiBhbnkpOiBib29sZWFuID0+XG4gIHR5cGVvZiBzdHIgPT09IFwic3RyaW5nXCIgJiYgc3RyLmluZGV4T2YoXCJhcm46XCIpID09PSAwICYmIHN0ci5zcGxpdChcIjpcIikubGVuZ3RoID49IDY7XG5cbi8qKlxuICogUGFyc2UgYW4gQVJOIHN0cmluZyBpbnRvIHN0cnVjdHVyZSB3aXRoIHBhcnRpdGlvbiwgc2VydmljZSwgcmVnaW9uLCBhY2NvdW50SWQgYW5kIHJlc291cmNlIHZhbHVlc1xuICovXG5leHBvcnQgY29uc3QgcGFyc2UgPSAoYXJuOiBzdHJpbmcpOiBBUk4gPT4ge1xuICBjb25zdCBzZWdtZW50cyA9IGFybi5zcGxpdChcIjpcIik7XG4gIGlmIChzZWdtZW50cy5sZW5ndGggPCA2IHx8IHNlZ21lbnRzWzBdICE9PSBcImFyblwiKSB0aHJvdyBuZXcgRXJyb3IoXCJNYWxmb3JtZWQgQVJOXCIpO1xuICBjb25zdCBbXG4gICAgLFxuICAgIC8vU2tpcCBcImFyblwiIGxpdGVyYWxcbiAgICBwYXJ0aXRpb24sXG4gICAgc2VydmljZSxcbiAgICByZWdpb24sXG4gICAgYWNjb3VudElkLFxuICAgIC4uLnJlc291cmNlXG4gIF0gPSBzZWdtZW50cztcblxuICByZXR1cm4ge1xuICAgIHBhcnRpdGlvbixcbiAgICBzZXJ2aWNlLFxuICAgIHJlZ2lvbixcbiAgICBhY2NvdW50SWQsXG4gICAgcmVzb3VyY2U6IHJlc291cmNlLmpvaW4oXCI6XCIpLFxuICB9O1xufTtcblxudHlwZSBidWlsZE9wdGlvbnMgPSBPbWl0PEFSTiwgXCJwYXJ0aXRpb25cIj4gJiB7IHBhcnRpdGlvbj86IHN0cmluZyB9O1xuXG4vKipcbiAqIEJ1aWxkIGFuIEFSTiB3aXRoIHNlcnZpY2UsIHBhcnRpdGlvbiwgcmVnaW9uLCBhY2NvdW50SWQsIGFuZCByZXNvdXJjZXMgc3RyaW5nc1xuICovXG5leHBvcnQgY29uc3QgYnVpbGQgPSAoYXJuT2JqZWN0OiBidWlsZE9wdGlvbnMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB7IHBhcnRpdGlvbiA9IFwiYXdzXCIsIHNlcnZpY2UsIHJlZ2lvbiwgYWNjb3VudElkLCByZXNvdXJjZSB9ID0gYXJuT2JqZWN0O1xuICBpZiAoW3NlcnZpY2UsIHJlZ2lvbiwgYWNjb3VudElkLCByZXNvdXJjZV0uc29tZSgoc2VnbWVudCkgPT4gdHlwZW9mIHNlZ21lbnQgIT09IFwic3RyaW5nXCIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW5wdXQgQVJOIG9iamVjdCBpcyBpbnZhbGlkXCIpO1xuICB9XG4gIHJldHVybiBgYXJuOiR7cGFydGl0aW9ufToke3NlcnZpY2V9OiR7cmVnaW9ufToke2FjY291bnRJZH06JHtyZXNvdXJjZX1gO1xufTtcbiJdfQ==