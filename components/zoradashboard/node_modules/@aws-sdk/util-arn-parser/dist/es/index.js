import { __read } from "tslib";
/**
 * Validate whether a string is an ARN.
 */
export var validate = function (str) {
    return typeof str === "string" && str.indexOf("arn:") === 0 && str.split(":").length >= 6;
};
/**
 * Parse an ARN string into structure with partition, service, region, accountId and resource values
 */
export var parse = function (arn) {
    var segments = arn.split(":");
    if (segments.length < 6 || segments[0] !== "arn")
        throw new Error("Malformed ARN");
    var _a = __read(segments), 
    //Skip "arn" literal
    partition = _a[1], service = _a[2], region = _a[3], accountId = _a[4], resource = _a.slice(5);
    return {
        partition: partition,
        service: service,
        region: region,
        accountId: accountId,
        resource: resource.join(":"),
    };
};
/**
 * Build an ARN with service, partition, region, accountId, and resources strings
 */
export var build = function (arnObject) {
    var _a = arnObject.partition, partition = _a === void 0 ? "aws" : _a, service = arnObject.service, region = arnObject.region, accountId = arnObject.accountId, resource = arnObject.resource;
    if ([service, region, accountId, resource].some(function (segment) { return typeof segment !== "string"; })) {
        throw new Error("Input ARN object is invalid");
    }
    return "arn:" + partition + ":" + service + ":" + region + ":" + accountId + ":" + resource;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQU9BOztHQUVHO0FBQ0gsTUFBTSxDQUFDLElBQU0sUUFBUSxHQUFHLFVBQUMsR0FBUTtJQUMvQixPQUFBLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDO0FBQWxGLENBQWtGLENBQUM7QUFFckY7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxLQUFLLEdBQUcsVUFBQyxHQUFXO0lBQy9CLElBQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEMsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSztRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDN0UsSUFBQSxLQUFBLE9BUUYsUUFBUSxDQUFBO0lBTlYsb0JBQW9CO0lBQ3BCLFNBQVMsUUFBQSxFQUNULE9BQU8sUUFBQSxFQUNQLE1BQU0sUUFBQSxFQUNOLFNBQVMsUUFBQSxFQUNOLFFBQVEsY0FDRCxDQUFDO0lBRWIsT0FBTztRQUNMLFNBQVMsV0FBQTtRQUNULE9BQU8sU0FBQTtRQUNQLE1BQU0sUUFBQTtRQUNOLFNBQVMsV0FBQTtRQUNULFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztLQUM3QixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBSUY7O0dBRUc7QUFDSCxNQUFNLENBQUMsSUFBTSxLQUFLLEdBQUcsVUFBQyxTQUF1QjtJQUNuQyxJQUFBLEtBQTRELFNBQVMsVUFBcEQsRUFBakIsU0FBUyxtQkFBRyxLQUFLLEtBQUEsRUFBRSxPQUFPLEdBQWtDLFNBQVMsUUFBM0MsRUFBRSxNQUFNLEdBQTBCLFNBQVMsT0FBbkMsRUFBRSxTQUFTLEdBQWUsU0FBUyxVQUF4QixFQUFFLFFBQVEsR0FBSyxTQUFTLFNBQWQsQ0FBZTtJQUM5RSxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsT0FBTyxPQUFPLEtBQUssUUFBUSxFQUEzQixDQUEyQixDQUFDLEVBQUU7UUFDekYsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0tBQ2hEO0lBQ0QsT0FBTyxTQUFPLFNBQVMsU0FBSSxPQUFPLFNBQUksTUFBTSxTQUFJLFNBQVMsU0FBSSxRQUFVLENBQUM7QUFDMUUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGludGVyZmFjZSBBUk4ge1xuICBwYXJ0aXRpb246IHN0cmluZztcbiAgc2VydmljZTogc3RyaW5nO1xuICByZWdpb246IHN0cmluZztcbiAgYWNjb3VudElkOiBzdHJpbmc7XG4gIHJlc291cmNlOiBzdHJpbmc7XG59XG4vKipcbiAqIFZhbGlkYXRlIHdoZXRoZXIgYSBzdHJpbmcgaXMgYW4gQVJOLlxuICovXG5leHBvcnQgY29uc3QgdmFsaWRhdGUgPSAoc3RyOiBhbnkpOiBib29sZWFuID0+XG4gIHR5cGVvZiBzdHIgPT09IFwic3RyaW5nXCIgJiYgc3RyLmluZGV4T2YoXCJhcm46XCIpID09PSAwICYmIHN0ci5zcGxpdChcIjpcIikubGVuZ3RoID49IDY7XG5cbi8qKlxuICogUGFyc2UgYW4gQVJOIHN0cmluZyBpbnRvIHN0cnVjdHVyZSB3aXRoIHBhcnRpdGlvbiwgc2VydmljZSwgcmVnaW9uLCBhY2NvdW50SWQgYW5kIHJlc291cmNlIHZhbHVlc1xuICovXG5leHBvcnQgY29uc3QgcGFyc2UgPSAoYXJuOiBzdHJpbmcpOiBBUk4gPT4ge1xuICBjb25zdCBzZWdtZW50cyA9IGFybi5zcGxpdChcIjpcIik7XG4gIGlmIChzZWdtZW50cy5sZW5ndGggPCA2IHx8IHNlZ21lbnRzWzBdICE9PSBcImFyblwiKSB0aHJvdyBuZXcgRXJyb3IoXCJNYWxmb3JtZWQgQVJOXCIpO1xuICBjb25zdCBbXG4gICAgLFxuICAgIC8vU2tpcCBcImFyblwiIGxpdGVyYWxcbiAgICBwYXJ0aXRpb24sXG4gICAgc2VydmljZSxcbiAgICByZWdpb24sXG4gICAgYWNjb3VudElkLFxuICAgIC4uLnJlc291cmNlXG4gIF0gPSBzZWdtZW50cztcblxuICByZXR1cm4ge1xuICAgIHBhcnRpdGlvbixcbiAgICBzZXJ2aWNlLFxuICAgIHJlZ2lvbixcbiAgICBhY2NvdW50SWQsXG4gICAgcmVzb3VyY2U6IHJlc291cmNlLmpvaW4oXCI6XCIpLFxuICB9O1xufTtcblxudHlwZSBidWlsZE9wdGlvbnMgPSBPbWl0PEFSTiwgXCJwYXJ0aXRpb25cIj4gJiB7IHBhcnRpdGlvbj86IHN0cmluZyB9O1xuXG4vKipcbiAqIEJ1aWxkIGFuIEFSTiB3aXRoIHNlcnZpY2UsIHBhcnRpdGlvbiwgcmVnaW9uLCBhY2NvdW50SWQsIGFuZCByZXNvdXJjZXMgc3RyaW5nc1xuICovXG5leHBvcnQgY29uc3QgYnVpbGQgPSAoYXJuT2JqZWN0OiBidWlsZE9wdGlvbnMpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB7IHBhcnRpdGlvbiA9IFwiYXdzXCIsIHNlcnZpY2UsIHJlZ2lvbiwgYWNjb3VudElkLCByZXNvdXJjZSB9ID0gYXJuT2JqZWN0O1xuICBpZiAoW3NlcnZpY2UsIHJlZ2lvbiwgYWNjb3VudElkLCByZXNvdXJjZV0uc29tZSgoc2VnbWVudCkgPT4gdHlwZW9mIHNlZ21lbnQgIT09IFwic3RyaW5nXCIpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSW5wdXQgQVJOIG9iamVjdCBpcyBpbnZhbGlkXCIpO1xuICB9XG4gIHJldHVybiBgYXJuOiR7cGFydGl0aW9ufToke3NlcnZpY2V9OiR7cmVnaW9ufToke2FjY291bnRJZH06JHtyZXNvdXJjZX1gO1xufTtcbiJdfQ==