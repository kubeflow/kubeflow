"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCanonicalQuery = void 0;
const util_uri_escape_1 = require("@aws-sdk/util-uri-escape");
const constants_1 = require("./constants");
/**
 * @internal
 */
function getCanonicalQuery({ query = {} }) {
    const keys = [];
    const serialized = {};
    for (const key of Object.keys(query).sort()) {
        if (key.toLowerCase() === constants_1.SIGNATURE_HEADER) {
            continue;
        }
        keys.push(key);
        const value = query[key];
        if (typeof value === "string") {
            serialized[key] = `${util_uri_escape_1.escapeUri(key)}=${util_uri_escape_1.escapeUri(value)}`;
        }
        else if (Array.isArray(value)) {
            serialized[key] = value
                .slice(0)
                .sort()
                .reduce((encoded, value) => encoded.concat([`${util_uri_escape_1.escapeUri(key)}=${util_uri_escape_1.escapeUri(value)}`]), [])
                .join("&");
        }
    }
    return keys
        .map((key) => serialized[key])
        .filter((serialized) => serialized) // omit any falsy values
        .join("&");
}
exports.getCanonicalQuery = getCanonicalQuery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q2Fub25pY2FsUXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZ2V0Q2Fub25pY2FsUXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsOERBQXFEO0FBRXJELDJDQUErQztBQUUvQzs7R0FFRztBQUNILFNBQWdCLGlCQUFpQixDQUFDLEVBQUUsS0FBSyxHQUFHLEVBQUUsRUFBZTtJQUMzRCxNQUFNLElBQUksR0FBa0IsRUFBRSxDQUFDO0lBQy9CLE1BQU0sVUFBVSxHQUE4QixFQUFFLENBQUM7SUFDakQsS0FBSyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzNDLElBQUksR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLDRCQUFnQixFQUFFO1lBQzFDLFNBQVM7U0FDVjtRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsMkJBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSwyQkFBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7U0FDM0Q7YUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDL0IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUs7aUJBQ3BCLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQ1IsSUFBSSxFQUFFO2lCQUNOLE1BQU0sQ0FDTCxDQUFDLE9BQXNCLEVBQUUsS0FBYSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRywyQkFBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLDJCQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3BHLEVBQUUsQ0FDSDtpQkFDQSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDZDtLQUNGO0lBRUQsT0FBTyxJQUFJO1NBQ1IsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDN0IsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyx3QkFBd0I7U0FDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsQ0FBQztBQTVCRCw4Q0E0QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIdHRwUmVxdWVzdCB9IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuaW1wb3J0IHsgZXNjYXBlVXJpIH0gZnJvbSBcIkBhd3Mtc2RrL3V0aWwtdXJpLWVzY2FwZVwiO1xuXG5pbXBvcnQgeyBTSUdOQVRVUkVfSEVBREVSIH0gZnJvbSBcIi4vY29uc3RhbnRzXCI7XG5cbi8qKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDYW5vbmljYWxRdWVyeSh7IHF1ZXJ5ID0ge30gfTogSHR0cFJlcXVlc3QpOiBzdHJpbmcge1xuICBjb25zdCBrZXlzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGNvbnN0IHNlcmlhbGl6ZWQ6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fTtcbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMocXVlcnkpLnNvcnQoKSkge1xuICAgIGlmIChrZXkudG9Mb3dlckNhc2UoKSA9PT0gU0lHTkFUVVJFX0hFQURFUikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAga2V5cy5wdXNoKGtleSk7XG4gICAgY29uc3QgdmFsdWUgPSBxdWVyeVtrZXldO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHNlcmlhbGl6ZWRba2V5XSA9IGAke2VzY2FwZVVyaShrZXkpfT0ke2VzY2FwZVVyaSh2YWx1ZSl9YDtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICBzZXJpYWxpemVkW2tleV0gPSB2YWx1ZVxuICAgICAgICAuc2xpY2UoMClcbiAgICAgICAgLnNvcnQoKVxuICAgICAgICAucmVkdWNlKFxuICAgICAgICAgIChlbmNvZGVkOiBBcnJheTxzdHJpbmc+LCB2YWx1ZTogc3RyaW5nKSA9PiBlbmNvZGVkLmNvbmNhdChbYCR7ZXNjYXBlVXJpKGtleSl9PSR7ZXNjYXBlVXJpKHZhbHVlKX1gXSksXG4gICAgICAgICAgW11cbiAgICAgICAgKVxuICAgICAgICAuam9pbihcIiZcIik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGtleXNcbiAgICAubWFwKChrZXkpID0+IHNlcmlhbGl6ZWRba2V5XSlcbiAgICAuZmlsdGVyKChzZXJpYWxpemVkKSA9PiBzZXJpYWxpemVkKSAvLyBvbWl0IGFueSBmYWxzeSB2YWx1ZXNcbiAgICAuam9pbihcIiZcIik7XG59XG4iXX0=