import { __assign, __read, __spread, __values } from "tslib";
export var constructStack = function () {
    var absoluteEntries = [];
    var relativeEntries = [];
    var entriesNameSet = new Set();
    var sort = function (entries) {
        return entries.sort(function (a, b) {
            return stepWeights[b.step] - stepWeights[a.step] ||
                priorityWeights[b.priority || "normal"] - priorityWeights[a.priority || "normal"];
        });
    };
    var removeByName = function (toRemove) {
        var isRemoved = false;
        var filterCb = function (entry) {
            if (entry.name && entry.name === toRemove) {
                isRemoved = true;
                entriesNameSet.delete(toRemove);
                return false;
            }
            return true;
        };
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
    };
    var removeByReference = function (toRemove) {
        var isRemoved = false;
        var filterCb = function (entry) {
            if (entry.middleware === toRemove) {
                isRemoved = true;
                if (entry.name)
                    entriesNameSet.delete(entry.name);
                return false;
            }
            return true;
        };
        absoluteEntries = absoluteEntries.filter(filterCb);
        relativeEntries = relativeEntries.filter(filterCb);
        return isRemoved;
    };
    var cloneTo = function (toStack) {
        absoluteEntries.forEach(function (entry) {
            //@ts-ignore
            toStack.add(entry.middleware, __assign({}, entry));
        });
        relativeEntries.forEach(function (entry) {
            //@ts-ignore
            toStack.addRelativeTo(entry.middleware, __assign({}, entry));
        });
        return toStack;
    };
    var expandRelativeMiddlewareList = function (from) {
        var expandedMiddlewareList = [];
        from.before.forEach(function (entry) {
            if (entry.before.length === 0 && entry.after.length === 0) {
                expandedMiddlewareList.push(entry);
            }
            else {
                expandedMiddlewareList.push.apply(expandedMiddlewareList, __spread(expandRelativeMiddlewareList(entry)));
            }
        });
        expandedMiddlewareList.push(from);
        from.after.reverse().forEach(function (entry) {
            if (entry.before.length === 0 && entry.after.length === 0) {
                expandedMiddlewareList.push(entry);
            }
            else {
                expandedMiddlewareList.push.apply(expandedMiddlewareList, __spread(expandRelativeMiddlewareList(entry)));
            }
        });
        return expandedMiddlewareList;
    };
    /**
     * Get a final list of middleware in the order of being executed in the resolved handler.
     */
    var getMiddlewareList = function () {
        var normalizedAbsoluteEntries = [];
        var normalizedRelativeEntries = [];
        var normalizedEntriesNameMap = {};
        absoluteEntries.forEach(function (entry) {
            var normalizedEntry = __assign(__assign({}, entry), { before: [], after: [] });
            if (normalizedEntry.name)
                normalizedEntriesNameMap[normalizedEntry.name] = normalizedEntry;
            normalizedAbsoluteEntries.push(normalizedEntry);
        });
        relativeEntries.forEach(function (entry) {
            var normalizedEntry = __assign(__assign({}, entry), { before: [], after: [] });
            if (normalizedEntry.name)
                normalizedEntriesNameMap[normalizedEntry.name] = normalizedEntry;
            normalizedRelativeEntries.push(normalizedEntry);
        });
        normalizedRelativeEntries.forEach(function (entry) {
            if (entry.toMiddleware) {
                var toMiddleware = normalizedEntriesNameMap[entry.toMiddleware];
                if (toMiddleware === undefined) {
                    throw new Error(entry.toMiddleware + " is not found when adding " + (entry.name || "anonymous") + " middleware " + entry.relation + " " + entry.toMiddleware);
                }
                if (entry.relation === "after") {
                    toMiddleware.after.push(entry);
                }
                if (entry.relation === "before") {
                    toMiddleware.before.push(entry);
                }
            }
        });
        var mainChain = sort(normalizedAbsoluteEntries)
            .map(expandRelativeMiddlewareList)
            .reduce(function (wholeList, expendedMiddlewareList) {
            // TODO: Replace it with Array.flat();
            wholeList.push.apply(wholeList, __spread(expendedMiddlewareList));
            return wholeList;
        }, []);
        return mainChain.map(function (entry) { return entry.middleware; });
    };
    var stack = {
        add: function (middleware, options) {
            if (options === void 0) { options = {}; }
            var name = options.name, override = options.override;
            var entry = __assign({ step: "initialize", priority: "normal", middleware: middleware }, options);
            if (name) {
                if (entriesNameSet.has(name)) {
                    if (!override)
                        throw new Error("Duplicate middleware name '" + name + "'");
                    var toOverrideIndex = absoluteEntries.findIndex(function (entry) { return entry.name === name; });
                    var toOverride = absoluteEntries[toOverrideIndex];
                    if (toOverride.step !== entry.step || toOverride.priority !== entry.priority) {
                        throw new Error("\"" + name + "\" middleware with " + toOverride.priority + " priority in " + toOverride.step + " step cannot be " +
                            ("overridden by same-name middleware with " + entry.priority + " priority in " + entry.step + " step."));
                    }
                    absoluteEntries.splice(toOverrideIndex, 1);
                }
                entriesNameSet.add(name);
            }
            absoluteEntries.push(entry);
        },
        addRelativeTo: function (middleware, options) {
            var name = options.name, override = options.override;
            var entry = __assign({ middleware: middleware }, options);
            if (name) {
                if (entriesNameSet.has(name)) {
                    if (!override)
                        throw new Error("Duplicate middleware name '" + name + "'");
                    var toOverrideIndex = relativeEntries.findIndex(function (entry) { return entry.name === name; });
                    var toOverride = relativeEntries[toOverrideIndex];
                    if (toOverride.toMiddleware !== entry.toMiddleware || toOverride.relation !== entry.relation) {
                        throw new Error("\"" + name + "\" middleware " + toOverride.relation + " \"" + toOverride.toMiddleware + "\" middleware cannot be overridden " +
                            ("by same-name middleware " + entry.relation + " \"" + entry.toMiddleware + "\" middleware."));
                    }
                    relativeEntries.splice(toOverrideIndex, 1);
                }
                entriesNameSet.add(name);
            }
            relativeEntries.push(entry);
        },
        clone: function () { return cloneTo(constructStack()); },
        use: function (plugin) {
            plugin.applyToStack(stack);
        },
        remove: function (toRemove) {
            if (typeof toRemove === "string")
                return removeByName(toRemove);
            else
                return removeByReference(toRemove);
        },
        removeByTag: function (toRemove) {
            var isRemoved = false;
            var filterCb = function (entry) {
                var tags = entry.tags, name = entry.name;
                if (tags && tags.includes(toRemove)) {
                    if (name)
                        entriesNameSet.delete(name);
                    isRemoved = true;
                    return false;
                }
                return true;
            };
            absoluteEntries = absoluteEntries.filter(filterCb);
            relativeEntries = relativeEntries.filter(filterCb);
            return isRemoved;
        },
        concat: function (from) {
            var cloned = cloneTo(constructStack());
            cloned.use(from);
            return cloned;
        },
        applyToStack: cloneTo,
        resolve: function (handler, context) {
            var e_1, _a;
            try {
                for (var _b = __values(getMiddlewareList().reverse()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var middleware = _c.value;
                    handler = middleware(handler, context);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return handler;
        },
    };
    return stack;
};
var stepWeights = {
    initialize: 5,
    serialize: 4,
    build: 3,
    finalizeRequest: 2,
    deserialize: 1,
};
var priorityWeights = {
    high: 3,
    normal: 2,
    low: 1,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWlkZGxld2FyZVN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL01pZGRsZXdhcmVTdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBZ0JBLE1BQU0sQ0FBQyxJQUFNLGNBQWMsR0FBRztJQUM1QixJQUFJLGVBQWUsR0FBNkMsRUFBRSxDQUFDO0lBQ25FLElBQUksZUFBZSxHQUE2QyxFQUFFLENBQUM7SUFDbkUsSUFBTSxjQUFjLEdBQWdCLElBQUksR0FBRyxFQUFFLENBQUM7SUFFOUMsSUFBTSxJQUFJLEdBQUcsVUFBbUQsT0FBWTtRQUMxRSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQ1YsVUFBQyxDQUFDLEVBQUUsQ0FBQztZQUNILE9BQUEsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDekMsZUFBZSxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDO1FBRGpGLENBQ2lGLENBQ3BGO0lBSkQsQ0FJQyxDQUFDO0lBRUosSUFBTSxZQUFZLEdBQUcsVUFBQyxRQUFnQjtRQUNwQyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBTSxRQUFRLEdBQUcsVUFBQyxLQUFxQztZQUNyRCxJQUFJLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQ3pDLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLGNBQWMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUMsQ0FBQztRQUNGLGVBQWUsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELGVBQWUsR0FBRyxlQUFl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QUM7Q0FDUCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWJzb2x1dGVMb2NhdGlvbixcbiAgRGVzZXJpYWxpemVIYW5kbGVyLFxuICBIYW5kbGVyLFxuICBIYW5kbGVyRXhlY3V0aW9uQ29udGV4dCxcbiAgSGFuZGxlck9wdGlvbnMsXG4gIE1pZGRsZXdhcmVTdGFjayxcbiAgTWlkZGxld2FyZVR5cGUsXG4gIFBsdWdnYWJsZSxcbiAgUHJpb3JpdHksXG4gIFJlbGF0aXZlTG9jYXRpb24sXG4gIFN0ZXAsXG59IGZyb20gXCJAYXdzLXNkay90eXBlc1wiO1xuXG5pbXBvcnQgeyBBYnNvbHV0ZU1pZGRsZXdhcmVFbnRyeSwgTWlkZGxld2FyZUVudHJ5LCBOb3JtYWxpemVkLCBSZWxhdGl2ZU1pZGRsZXdhcmVFbnRyeSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBjb25zdCBjb25zdHJ1Y3RTdGFjayA9IDxJbnB1dCBleHRlbmRzIG9iamVjdCwgT3V0cHV0IGV4dGVuZHMgb2JqZWN0PigpOiBNaWRkbGV3YXJlU3RhY2s8SW5wdXQsIE91dHB1dD4gPT4ge1xuICBsZXQgYWJzb2x1dGVFbnRyaWVzOiBBYnNvbHV0ZU1pZGRsZXdhcmVFbnRyeTxJbnB1dCwgT3V0cHV0PltdID0gW107XG4gIGxldCByZWxhdGl2ZUVudHJpZXM6IFJlbGF0aXZlTWlkZGxld2FyZUVudHJ5PElucHV0LCBPdXRwdXQ+W10gPSBbXTtcbiAgY29uc3QgZW50cmllc05hbWVTZXQ6IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpO1xuXG4gIGNvbnN0IHNvcnQgPSA8VCBleHRlbmRzIEFic29sdXRlTWlkZGxld2FyZUVudHJ5PElucHV0LCBPdXRwdXQ+PihlbnRyaWVzOiBUW10pOiBUW10gPT5cbiAgICBlbnRyaWVzLnNvcnQoXG4gICAgICAoYSwgYikgPT5cbiAgICAgICAgc3RlcFdlaWdodHNbYi5zdGVwXSAtIHN0ZXBXZWlnaHRzW2Euc3RlcF0gfHxcbiAgICAgICAgcHJpb3JpdHlXZWlnaHRzW2IucHJpb3JpdHkgfHwgXCJub3JtYWxcIl0gLSBwcmlvcml0eVdlaWdodHNbYS5wcmlvcml0eSB8fCBcIm5vcm1hbFwiXVxuICAgICk7XG5cbiAgY29uc3QgcmVtb3ZlQnlOYW1lID0gKHRvUmVtb3ZlOiBzdHJpbmcpOiBib29sZWFuID0+IHtcbiAgICBsZXQgaXNSZW1vdmVkID0gZmFsc2U7XG4gICAgY29uc3QgZmlsdGVyQ2IgPSAoZW50cnk6IE1pZGRsZXdhcmVFbnRyeTxJbnB1dCwgT3V0cHV0Pik6IGJvb2xlYW4gPT4ge1xuICAgICAgaWYgKGVudHJ5Lm5hbWUgJiYgZW50cnkubmFtZSA9PT0gdG9SZW1vdmUpIHtcbiAgICAgICAgaXNSZW1vdmVkID0gdHJ1ZTtcbiAgICAgICAgZW50cmllc05hbWVTZXQuZGVsZXRlKHRvUmVtb3ZlKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBhYnNvbHV0ZUVudHJpZXMgPSBhYnNvbHV0ZUVudHJpZXMuZmlsdGVyKGZpbHRlckNiKTtcbiAgICByZWxhdGl2ZUVudHJpZXMgPSByZWxhdGl2ZUVudHJpZXMuZmlsdGVyKGZpbHRlckNiKTtcbiAgICByZXR1cm4gaXNSZW1vdmVkO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZUJ5UmVmZXJlbmNlID0gKHRvUmVtb3ZlOiBNaWRkbGV3YXJlVHlwZTxJbnB1dCwgT3V0cHV0Pik6IGJvb2xlYW4gPT4ge1xuICAgIGxldCBpc1JlbW92ZWQgPSBmYWxzZTtcbiAgICBjb25zdCBmaWx0ZXJDYiA9IChlbnRyeTogTWlkZGxld2FyZUVudHJ5PElucHV0LCBPdXRwdXQ+KTogYm9vbGVhbiA9PiB7XG4gICAgICBpZiAoZW50cnkubWlkZGxld2FyZSA9PT0gdG9SZW1vdmUpIHtcbiAgICAgICAgaXNSZW1vdmVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKGVudHJ5Lm5hbWUpIGVudHJpZXNOYW1lU2V0LmRlbGV0ZShlbnRyeS5uYW1lKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBhYnNvbHV0ZUVudHJpZXMgPSBhYnNvbHV0ZUVudHJpZXMuZmlsdGVyKGZpbHRlckNiKTtcbiAgICByZWxhdGl2ZUVudHJpZXMgPSByZWxhdGl2ZUVudHJpZXMuZmlsdGVyKGZpbHRlckNiKTtcbiAgICByZXR1cm4gaXNSZW1vdmVkO1xuICB9O1xuXG4gIGNvbnN0IGNsb25lVG8gPSA8SW5wdXRUeXBlIGV4dGVuZHMgSW5wdXQsIE91dHB1dFR5cGUgZXh0ZW5kcyBPdXRwdXQ+KFxuICAgIHRvU3RhY2s6IE1pZGRsZXdhcmVTdGFjazxJbnB1dFR5cGUsIE91dHB1dFR5cGU+XG4gICk6IE1pZGRsZXdhcmVTdGFjazxJbnB1dFR5cGUsIE91dHB1dFR5cGU+ID0+IHtcbiAgICBhYnNvbHV0ZUVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgdG9TdGFjay5hZGQoZW50cnkubWlkZGxld2FyZSwgeyAuLi5lbnRyeSB9KTtcbiAgICB9KTtcbiAgICByZWxhdGl2ZUVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgdG9TdGFjay5hZGRSZWxhdGl2ZVRvKGVudHJ5Lm1pZGRsZXdhcmUsIHsgLi4uZW50cnkgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRvU3RhY2s7XG4gIH07XG5cbiAgY29uc3QgZXhwYW5kUmVsYXRpdmVNaWRkbGV3YXJlTGlzdCA9IChcbiAgICBmcm9tOiBOb3JtYWxpemVkPE1pZGRsZXdhcmVFbnRyeTxJbnB1dCwgT3V0cHV0PiwgSW5wdXQsIE91dHB1dD5cbiAgKTogTWlkZGxld2FyZUVudHJ5PElucHV0LCBPdXRwdXQ+W10gPT4ge1xuICAgIGNvbnN0IGV4cGFuZGVkTWlkZGxld2FyZUxpc3Q6IE1pZGRsZXdhcmVFbnRyeTxJbnB1dCwgT3V0cHV0PltdID0gW107XG4gICAgZnJvbS5iZWZvcmUuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGlmIChlbnRyeS5iZWZvcmUubGVuZ3RoID09PSAwICYmIGVudHJ5LmFmdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBleHBhbmRlZE1pZGRsZXdhcmVMaXN0LnB1c2goZW50cnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXhwYW5kZWRNaWRkbGV3YXJlTGlzdC5wdXNoKC4uLmV4cGFuZFJlbGF0aXZlTWlkZGxld2FyZUxpc3QoZW50cnkpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBleHBhbmRlZE1pZGRsZXdhcmVMaXN0LnB1c2goZnJvbSk7XG4gICAgZnJvbS5hZnRlci5yZXZlcnNlKCkuZm9yRWFjaCgoZW50cnkpID0+IHtcbiAgICAgIGlmIChlbnRyeS5iZWZvcmUubGVuZ3RoID09PSAwICYmIGVudHJ5LmFmdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBleHBhbmRlZE1pZGRsZXdhcmVMaXN0LnB1c2goZW50cnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXhwYW5kZWRNaWRkbGV3YXJlTGlzdC5wdXNoKC4uLmV4cGFuZFJlbGF0aXZlTWlkZGxld2FyZUxpc3QoZW50cnkpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZXhwYW5kZWRNaWRkbGV3YXJlTGlzdDtcbiAgfTtcblxuICAvKipcbiAgICogR2V0IGEgZmluYWwgbGlzdCBvZiBtaWRkbGV3YXJlIGluIHRoZSBvcmRlciBvZiBiZWluZyBleGVjdXRlZCBpbiB0aGUgcmVzb2x2ZWQgaGFuZGxlci5cbiAgICovXG4gIGNvbnN0IGdldE1pZGRsZXdhcmVMaXN0ID0gKCk6IEFycmF5PE1pZGRsZXdhcmVUeXBlPElucHV0LCBPdXRwdXQ+PiA9PiB7XG4gICAgY29uc3Qgbm9ybWFsaXplZEFic29sdXRlRW50cmllczogTm9ybWFsaXplZDxBYnNvbHV0ZU1pZGRsZXdhcmVFbnRyeTxJbnB1dCwgT3V0cHV0PiwgSW5wdXQsIE91dHB1dD5bXSA9IFtdO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWRSZWxhdGl2ZUVudHJpZXM6IE5vcm1hbGl6ZWQ8UmVsYXRpdmVNaWRkbGV3YXJlRW50cnk8SW5wdXQsIE91dHB1dD4sIElucHV0LCBPdXRwdXQ+W10gPSBbXTtcbiAgICBjb25zdCBub3JtYWxpemVkRW50cmllc05hbWVNYXA6IHtcbiAgICAgIFttaWRkbGV3YXJlTmFtZTogc3RyaW5nXTogTm9ybWFsaXplZDxNaWRkbGV3YXJlRW50cnk8SW5wdXQsIE91dHB1dD4sIElucHV0LCBPdXRwdXQ+O1xuICAgIH0gPSB7fTtcblxuICAgIGFic29sdXRlRW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEVudHJ5ID0ge1xuICAgICAgICAuLi5lbnRyeSxcbiAgICAgICAgYmVmb3JlOiBbXSxcbiAgICAgICAgYWZ0ZXI6IFtdLFxuICAgICAgfTtcbiAgICAgIGlmIChub3JtYWxpemVkRW50cnkubmFtZSkgbm9ybWFsaXplZEVudHJpZXNOYW1lTWFwW25vcm1hbGl6ZWRFbnRyeS5uYW1lXSA9IG5vcm1hbGl6ZWRFbnRyeTtcbiAgICAgIG5vcm1hbGl6ZWRBYnNvbHV0ZUVudHJpZXMucHVzaChub3JtYWxpemVkRW50cnkpO1xuICAgIH0pO1xuXG4gICAgcmVsYXRpdmVFbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBub3JtYWxpemVkRW50cnkgPSB7XG4gICAgICAgIC4uLmVudHJ5LFxuICAgICAgICBiZWZvcmU6IFtdLFxuICAgICAgICBhZnRlcjogW10sXG4gICAgICB9O1xuICAgICAgaWYgKG5vcm1hbGl6ZWRFbnRyeS5uYW1lKSBub3JtYWxpemVkRW50cmllc05hbWVNYXBbbm9ybWFsaXplZEVudHJ5Lm5hbWVdID0gbm9ybWFsaXplZEVudHJ5O1xuICAgICAgbm9ybWFsaXplZFJlbGF0aXZlRW50cmllcy5wdXNoKG5vcm1hbGl6ZWRFbnRyeSk7XG4gICAgfSk7XG5cbiAgICBub3JtYWxpemVkUmVsYXRpdmVFbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICBpZiAoZW50cnkudG9NaWRkbGV3YXJlKSB7XG4gICAgICAgIGNvbnN0IHRvTWlkZGxld2FyZSA9IG5vcm1hbGl6ZWRFbnRyaWVzTmFtZU1hcFtlbnRyeS50b01pZGRsZXdhcmVdO1xuICAgICAgICBpZiAodG9NaWRkbGV3YXJlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgJHtlbnRyeS50b01pZGRsZXdhcmV9IGlzIG5vdCBmb3VuZCB3aGVuIGFkZGluZyAke2VudHJ5Lm5hbWUgfHwgXCJhbm9ueW1vdXNcIn0gbWlkZGxld2FyZSAke2VudHJ5LnJlbGF0aW9ufSAke1xuICAgICAgICAgICAgICBlbnRyeS50b01pZGRsZXdhcmVcbiAgICAgICAgICAgIH1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW50cnkucmVsYXRpb24gPT09IFwiYWZ0ZXJcIikge1xuICAgICAgICAgIHRvTWlkZGxld2FyZS5hZnRlci5wdXNoKGVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZW50cnkucmVsYXRpb24gPT09IFwiYmVmb3JlXCIpIHtcbiAgICAgICAgICB0b01pZGRsZXdhcmUuYmVmb3JlLnB1c2goZW50cnkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCBtYWluQ2hhaW4gPSBzb3J0KG5vcm1hbGl6ZWRBYnNvbHV0ZUVudHJpZXMpXG4gICAgICAubWFwKGV4cGFuZFJlbGF0aXZlTWlkZGxld2FyZUxpc3QpXG4gICAgICAucmVkdWNlKCh3aG9sZUxpc3QsIGV4cGVuZGVkTWlkZGxld2FyZUxpc3QpID0+IHtcbiAgICAgICAgLy8gVE9ETzogUmVwbGFjZSBpdCB3aXRoIEFycmF5LmZsYXQoKTtcbiAgICAgICAgd2hvbGVMaXN0LnB1c2goLi4uZXhwZW5kZWRNaWRkbGV3YXJlTGlzdCk7XG4gICAgICAgIHJldHVybiB3aG9sZUxpc3Q7XG4gICAgICB9LCBbXSBhcyBNaWRkbGV3YXJlRW50cnk8SW5wdXQsIE91dHB1dD5bXSk7XG4gICAgcmV0dXJuIG1haW5DaGFpbi5tYXAoKGVudHJ5KSA9PiBlbnRyeS5taWRkbGV3YXJlKTtcbiAgfTtcblxuICBjb25zdCBzdGFjayA9IHtcbiAgICBhZGQ6IChtaWRkbGV3YXJlOiBNaWRkbGV3YXJlVHlwZTxJbnB1dCwgT3V0cHV0Piwgb3B0aW9uczogSGFuZGxlck9wdGlvbnMgJiBBYnNvbHV0ZUxvY2F0aW9uID0ge30pID0+IHtcbiAgICAgIGNvbnN0IHsgbmFtZSwgb3ZlcnJpZGUgfSA9IG9wdGlvbnM7XG4gICAgICBjb25zdCBlbnRyeTogQWJzb2x1dGVNaWRkbGV3YXJlRW50cnk8SW5wdXQsIE91dHB1dD4gPSB7XG4gICAgICAgIHN0ZXA6IFwiaW5pdGlhbGl6ZVwiLFxuICAgICAgICBwcmlvcml0eTogXCJub3JtYWxcIixcbiAgICAgICAgbWlkZGxld2FyZSxcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIH07XG4gICAgICBpZiAobmFtZSkge1xuICAgICAgICBpZiAoZW50cmllc05hbWVTZXQuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgaWYgKCFvdmVycmlkZSkgdGhyb3cgbmV3IEVycm9yKGBEdXBsaWNhdGUgbWlkZGxld2FyZSBuYW1lICcke25hbWV9J2ApO1xuICAgICAgICAgIGNvbnN0IHRvT3ZlcnJpZGVJbmRleCA9IGFic29sdXRlRW50cmllcy5maW5kSW5kZXgoKGVudHJ5KSA9PiBlbnRyeS5uYW1lID09PSBuYW1lKTtcbiAgICAgICAgICBjb25zdCB0b092ZXJyaWRlID0gYWJzb2x1dGVFbnRyaWVzW3RvT3ZlcnJpZGVJbmRleF07XG4gICAgICAgICAgaWYgKHRvT3ZlcnJpZGUuc3RlcCAhPT0gZW50cnkuc3RlcCB8fCB0b092ZXJyaWRlLnByaW9yaXR5ICE9PSBlbnRyeS5wcmlvcml0eSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgXCIke25hbWV9XCIgbWlkZGxld2FyZSB3aXRoICR7dG9PdmVycmlkZS5wcmlvcml0eX0gcHJpb3JpdHkgaW4gJHt0b092ZXJyaWRlLnN0ZXB9IHN0ZXAgY2Fubm90IGJlIGAgK1xuICAgICAgICAgICAgICAgIGBvdmVycmlkZGVuIGJ5IHNhbWUtbmFtZSBtaWRkbGV3YXJlIHdpdGggJHtlbnRyeS5wcmlvcml0eX0gcHJpb3JpdHkgaW4gJHtlbnRyeS5zdGVwfSBzdGVwLmBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGFic29sdXRlRW50cmllcy5zcGxpY2UodG9PdmVycmlkZUluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbnRyaWVzTmFtZVNldC5hZGQobmFtZSk7XG4gICAgICB9XG4gICAgICBhYnNvbHV0ZUVudHJpZXMucHVzaChlbnRyeSk7XG4gICAgfSxcblxuICAgIGFkZFJlbGF0aXZlVG86IChtaWRkbGV3YXJlOiBNaWRkbGV3YXJlVHlwZTxJbnB1dCwgT3V0cHV0Piwgb3B0aW9uczogSGFuZGxlck9wdGlvbnMgJiBSZWxhdGl2ZUxvY2F0aW9uKSA9PiB7XG4gICAgICBjb25zdCB7IG5hbWUsIG92ZXJyaWRlIH0gPSBvcHRpb25zO1xuICAgICAgY29uc3QgZW50cnk6IFJlbGF0aXZlTWlkZGxld2FyZUVudHJ5PElucHV0LCBPdXRwdXQ+ID0ge1xuICAgICAgICBtaWRkbGV3YXJlLFxuICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgfTtcbiAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgIGlmIChlbnRyaWVzTmFtZVNldC5oYXMobmFtZSkpIHtcbiAgICAgICAgICBpZiAoIW92ZXJyaWRlKSB0aHJvdyBuZXcgRXJyb3IoYER1cGxpY2F0ZSBtaWRkbGV3YXJlIG5hbWUgJyR7bmFtZX0nYCk7XG4gICAgICAgICAgY29uc3QgdG9PdmVycmlkZUluZGV4ID0gcmVsYXRpdmVFbnRyaWVzLmZpbmRJbmRleCgoZW50cnkpID0+IGVudHJ5Lm5hbWUgPT09IG5hbWUpO1xuICAgICAgICAgIGNvbnN0IHRvT3ZlcnJpZGUgPSByZWxhdGl2ZUVudHJpZXNbdG9PdmVycmlkZUluZGV4XTtcbiAgICAgICAgICBpZiAodG9PdmVycmlkZS50b01pZGRsZXdhcmUgIT09IGVudHJ5LnRvTWlkZGxld2FyZSB8fCB0b092ZXJyaWRlLnJlbGF0aW9uICE9PSBlbnRyeS5yZWxhdGlvbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgXCIke25hbWV9XCIgbWlkZGxld2FyZSAke3RvT3ZlcnJpZGUucmVsYXRpb259IFwiJHt0b092ZXJyaWRlLnRvTWlkZGxld2FyZX1cIiBtaWRkbGV3YXJlIGNhbm5vdCBiZSBvdmVycmlkZGVuIGAgK1xuICAgICAgICAgICAgICAgIGBieSBzYW1lLW5hbWUgbWlkZGxld2FyZSAke2VudHJ5LnJlbGF0aW9ufSBcIiR7ZW50cnkudG9NaWRkbGV3YXJlfVwiIG1pZGRsZXdhcmUuYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVsYXRpdmVFbnRyaWVzLnNwbGljZSh0b092ZXJyaWRlSW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVudHJpZXNOYW1lU2V0LmFkZChuYW1lKTtcbiAgICAgIH1cbiAgICAgIHJlbGF0aXZlRW50cmllcy5wdXNoKGVudHJ5KTtcbiAgICB9LFxuXG4gICAgY2xvbmU6ICgpID0+IGNsb25lVG8oY29uc3RydWN0U3RhY2s8SW5wdXQsIE91dHB1dD4oKSksXG5cbiAgICB1c2U6IChwbHVnaW46IFBsdWdnYWJsZTxJbnB1dCwgT3V0cHV0PikgPT4ge1xuICAgICAgcGx1Z2luLmFwcGx5VG9TdGFjayhzdGFjayk7XG4gICAgfSxcblxuICAgIHJlbW92ZTogKHRvUmVtb3ZlOiBNaWRkbGV3YXJlVHlwZTxJbnB1dCwgT3V0cHV0PiB8IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgICAgaWYgKHR5cGVvZiB0b1JlbW92ZSA9PT0gXCJzdHJpbmdcIikgcmV0dXJuIHJlbW92ZUJ5TmFtZSh0b1JlbW92ZSk7XG4gICAgICBlbHNlIHJldHVybiByZW1vdmVCeVJlZmVyZW5jZSh0b1JlbW92ZSk7XG4gICAgfSxcblxuICAgIHJlbW92ZUJ5VGFnOiAodG9SZW1vdmU6IHN0cmluZyk6IGJvb2xlYW4gPT4ge1xuICAgICAgbGV0IGlzUmVtb3ZlZCA9IGZhbHNlO1xuICAgICAgY29uc3QgZmlsdGVyQ2IgPSAoZW50cnk6IE1pZGRsZXdhcmVFbnRyeTxJbnB1dCwgT3V0cHV0Pik6IGJvb2xlYW4gPT4ge1xuICAgICAgICBjb25zdCB7IHRhZ3MsIG5hbWUgfSA9IGVudHJ5O1xuICAgICAgICBpZiAodGFncyAmJiB0YWdzLmluY2x1ZGVzKHRvUmVtb3ZlKSkge1xuICAgICAgICAgIGlmIChuYW1lKSBlbnRyaWVzTmFtZVNldC5kZWxldGUobmFtZSk7XG4gICAgICAgICAgaXNSZW1vdmVkID0gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgICAgYWJzb2x1dGVFbnRyaWVzID0gYWJzb2x1dGVFbnRyaWVzLmZpbHRlcihmaWx0ZXJDYik7XG4gICAgICByZWxhdGl2ZUVudHJpZXMgPSByZWxhdGl2ZUVudHJpZXMuZmlsdGVyKGZpbHRlckNiKTtcbiAgICAgIHJldHVybiBpc1JlbW92ZWQ7XG4gICAgfSxcblxuICAgIGNvbmNhdDogPElucHV0VHlwZSBleHRlbmRzIElucHV0LCBPdXRwdXRUeXBlIGV4dGVuZHMgT3V0cHV0PihcbiAgICAgIGZyb206IE1pZGRsZXdhcmVTdGFjazxJbnB1dFR5cGUsIE91dHB1dFR5cGU+XG4gICAgKTogTWlkZGxld2FyZVN0YWNrPElucHV0VHlwZSwgT3V0cHV0VHlwZT4gPT4ge1xuICAgICAgY29uc3QgY2xvbmVkID0gY2xvbmVUbyhjb25zdHJ1Y3RTdGFjazxJbnB1dFR5cGUsIE91dHB1dFR5cGU+KCkpO1xuICAgICAgY2xvbmVkLnVzZShmcm9tKTtcbiAgICAgIHJldHVybiBjbG9uZWQ7XG4gICAgfSxcblxuICAgIGFwcGx5VG9TdGFjazogY2xvbmVUbyxcblxuICAgIHJlc29sdmU6IDxJbnB1dFR5cGUgZXh0ZW5kcyBJbnB1dCwgT3V0cHV0VHlwZSBleHRlbmRzIE91dHB1dD4oXG4gICAgICBoYW5kbGVyOiBEZXNlcmlhbGl6ZUhhbmRsZXI8SW5wdXRUeXBlLCBPdXRwdXRUeXBlPixcbiAgICAgIGNvbnRleHQ6IEhhbmRsZXJFeGVjdXRpb25Db250ZXh0XG4gICAgKTogSGFuZGxlcjxJbnB1dFR5cGUsIE91dHB1dFR5cGU+ID0+IHtcbiAgICAgIGZvciAoY29uc3QgbWlkZGxld2FyZSBvZiBnZXRNaWRkbGV3YXJlTGlzdCgpLnJldmVyc2UoKSkge1xuICAgICAgICBoYW5kbGVyID0gbWlkZGxld2FyZShoYW5kbGVyIGFzIEhhbmRsZXI8SW5wdXQsIE91dHB1dFR5cGU+LCBjb250ZXh0KSBhcyBhbnk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaGFuZGxlciBhcyBIYW5kbGVyPElucHV0VHlwZSwgT3V0cHV0VHlwZT47XG4gICAgfSxcbiAgfTtcbiAgcmV0dXJuIHN0YWNrO1xufTtcblxuY29uc3Qgc3RlcFdlaWdodHM6IHsgW2tleSBpbiBTdGVwXTogbnVtYmVyIH0gPSB7XG4gIGluaXRpYWxpemU6IDUsXG4gIHNlcmlhbGl6ZTogNCxcbiAgYnVpbGQ6IDMsXG4gIGZpbmFsaXplUmVxdWVzdDogMixcbiAgZGVzZXJpYWxpemU6IDEsXG59O1xuXG5jb25zdCBwcmlvcml0eVdlaWdodHM6IHsgW2tleSBpbiBQcmlvcml0eV06IG51bWJlciB9ID0ge1xuICBoaWdoOiAzLFxuICBub3JtYWw6IDIsXG4gIGxvdzogMSxcbn07XG4iXX0=