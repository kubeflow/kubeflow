import { __values } from "tslib";
var getTransformedHeaders = function (headers) {
    var e_1, _a;
    var transformedHeaders = {};
    try {
        for (var _b = __values(Object.keys(headers)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var name = _c.value;
            var headerValues = headers[name];
            transformedHeaders[name] = Array.isArray(headerValues) ? headerValues.join(",") : headerValues;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return transformedHeaders;
};
export { getTransformedHeaders };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXRyYW5zZm9ybWVkLWhlYWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZ2V0LXRyYW5zZm9ybWVkLWhlYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUdBLElBQU0scUJBQXFCLEdBQUcsVUFBQyxPQUE0Qjs7SUFDekQsSUFBTSxrQkFBa0IsR0FBYyxFQUFFLENBQUM7O1FBRXpDLEtBQW1CLElBQUEsS0FBQSxTQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUEsZ0JBQUEsNEJBQUU7WUFBcEMsSUFBTSxJQUFJLFdBQUE7WUFDYixJQUFNLFlBQVksR0FBVyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0Msa0JBQWtCLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1NBQ2hHOzs7Ozs7Ozs7SUFFRCxPQUFPLGtCQUFrQixDQUFDO0FBQzVCLENBQUMsQ0FBQztBQUVGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSGVhZGVyQmFnIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyBJbmNvbWluZ0h0dHBIZWFkZXJzIH0gZnJvbSBcImh0dHAyXCI7XG5cbmNvbnN0IGdldFRyYW5zZm9ybWVkSGVhZGVycyA9IChoZWFkZXJzOiBJbmNvbWluZ0h0dHBIZWFkZXJzKSA9PiB7XG4gIGNvbnN0IHRyYW5zZm9ybWVkSGVhZGVyczogSGVhZGVyQmFnID0ge307XG5cbiAgZm9yIChjb25zdCBuYW1lIG9mIE9iamVjdC5rZXlzKGhlYWRlcnMpKSB7XG4gICAgY29uc3QgaGVhZGVyVmFsdWVzID0gPHN0cmluZz5oZWFkZXJzW25hbWVdO1xuICAgIHRyYW5zZm9ybWVkSGVhZGVyc1tuYW1lXSA9IEFycmF5LmlzQXJyYXkoaGVhZGVyVmFsdWVzKSA/IGhlYWRlclZhbHVlcy5qb2luKFwiLFwiKSA6IGhlYWRlclZhbHVlcztcbiAgfVxuXG4gIHJldHVybiB0cmFuc2Zvcm1lZEhlYWRlcnM7XG59O1xuXG5leHBvcnQgeyBnZXRUcmFuc2Zvcm1lZEhlYWRlcnMgfTtcbiJdfQ==