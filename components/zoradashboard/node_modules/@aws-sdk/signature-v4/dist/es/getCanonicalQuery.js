import { __values } from "tslib";
import { escapeUri } from "@aws-sdk/util-uri-escape";
import { SIGNATURE_HEADER } from "./constants";
/**
 * @internal
 */
export function getCanonicalQuery(_a) {
    var e_1, _b;
    var _c = _a.query, query = _c === void 0 ? {} : _c;
    var keys = [];
    var serialized = {};
    var _loop_1 = function (key) {
        if (key.toLowerCase() === SIGNATURE_HEADER) {
            return "continue";
        }
        keys.push(key);
        var value = query[key];
        if (typeof value === "string") {
            serialized[key] = escapeUri(key) + "=" + escapeUri(value);
        }
        else if (Array.isArray(value)) {
            serialized[key] = value
                .slice(0)
                .sort()
                .reduce(function (encoded, value) { return encoded.concat([escapeUri(key) + "=" + escapeUri(value)]); }, [])
                .join("&");
        }
    };
    try {
        for (var _d = __values(Object.keys(query).sort()), _e = _d.next(); !_e.done; _e = _d.next()) {
            var key = _e.value;
            _loop_1(key);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_b = _d.return)) _b.call(_d);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return keys
        .map(function (key) { return serialized[key]; })
        .filter(function (serialized) { return serialized; }) // omit any falsy values
        .join("&");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Q2Fub25pY2FsUXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZ2V0Q2Fub25pY2FsUXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUVyRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFL0M7O0dBRUc7QUFDSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsRUFBMkI7O1FBQXpCLGFBQVUsRUFBVixLQUFLLG1CQUFHLEVBQUUsS0FBQTtJQUM1QyxJQUFNLElBQUksR0FBa0IsRUFBRSxDQUFDO0lBQy9CLElBQU0sVUFBVSxHQUE4QixFQUFFLENBQUM7NEJBQ3RDLEdBQUc7UUFDWixJQUFJLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxnQkFBZ0IsRUFBRTs7U0FFM0M7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBTSxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQUksU0FBUyxDQUFDLEtBQUssQ0FBRyxDQUFDO1NBQzNEO2FBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQy9CLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLO2lCQUNwQixLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUNSLElBQUksRUFBRTtpQkFDTixNQUFNLENBQ0wsVUFBQyxPQUFzQixFQUFFLEtBQWEsSUFBSyxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBSSxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQUksU0FBUyxDQUFDLEtBQUssQ0FBRyxDQUFDLENBQUMsRUFBekQsQ0FBeUQsRUFDcEcsRUFBRSxDQUNIO2lCQUNBLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNkOzs7UUFsQkgsS0FBa0IsSUFBQSxLQUFBLFNBQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQSxnQkFBQTtZQUF0QyxJQUFNLEdBQUcsV0FBQTtvQkFBSCxHQUFHO1NBbUJiOzs7Ozs7Ozs7SUFFRCxPQUFPLElBQUk7U0FDUixHQUFHLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQWYsQ0FBZSxDQUFDO1NBQzdCLE1BQU0sQ0FBQyxVQUFDLFVBQVUsSUFBSyxPQUFBLFVBQVUsRUFBVixDQUFVLENBQUMsQ0FBQyx3QkFBd0I7U0FDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEh0dHBSZXF1ZXN0IH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyBlc2NhcGVVcmkgfSBmcm9tIFwiQGF3cy1zZGsvdXRpbC11cmktZXNjYXBlXCI7XG5cbmltcG9ydCB7IFNJR05BVFVSRV9IRUFERVIgfSBmcm9tIFwiLi9jb25zdGFudHNcIjtcblxuLyoqXG4gKiBAaW50ZXJuYWxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENhbm9uaWNhbFF1ZXJ5KHsgcXVlcnkgPSB7fSB9OiBIdHRwUmVxdWVzdCk6IHN0cmluZyB7XG4gIGNvbnN0IGtleXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgY29uc3Qgc2VyaWFsaXplZDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHt9O1xuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhxdWVyeSkuc29ydCgpKSB7XG4gICAgaWYgKGtleS50b0xvd2VyQ2FzZSgpID09PSBTSUdOQVRVUkVfSEVBREVSKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBrZXlzLnB1c2goa2V5KTtcbiAgICBjb25zdCB2YWx1ZSA9IHF1ZXJ5W2tleV07XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgc2VyaWFsaXplZFtrZXldID0gYCR7ZXNjYXBlVXJpKGtleSl9PSR7ZXNjYXBlVXJpKHZhbHVlKX1gO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgIHNlcmlhbGl6ZWRba2V5XSA9IHZhbHVlXG4gICAgICAgIC5zbGljZSgwKVxuICAgICAgICAuc29ydCgpXG4gICAgICAgIC5yZWR1Y2UoXG4gICAgICAgICAgKGVuY29kZWQ6IEFycmF5PHN0cmluZz4sIHZhbHVlOiBzdHJpbmcpID0+IGVuY29kZWQuY29uY2F0KFtgJHtlc2NhcGVVcmkoa2V5KX09JHtlc2NhcGVVcmkodmFsdWUpfWBdKSxcbiAgICAgICAgICBbXVxuICAgICAgICApXG4gICAgICAgIC5qb2luKFwiJlwiKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ga2V5c1xuICAgIC5tYXAoKGtleSkgPT4gc2VyaWFsaXplZFtrZXldKVxuICAgIC5maWx0ZXIoKHNlcmlhbGl6ZWQpID0+IHNlcmlhbGl6ZWQpIC8vIG9taXQgYW55IGZhbHN5IHZhbHVlc1xuICAgIC5qb2luKFwiJlwiKTtcbn1cbiJdfQ==