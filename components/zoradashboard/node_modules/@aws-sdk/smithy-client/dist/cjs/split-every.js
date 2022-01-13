"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitEvery = void 0;
/**
 * Given an input string, splits based on the delimiter after a given
 * number of delimiters has been encountered.
 *
 * @param value The input string to split.
 * @param delimiter The delimiter to split on.
 * @param numDelimiters The number of delimiters to have encountered to split.
 */
function splitEvery(value, delimiter, numDelimiters) {
    // Fail if we don't have a clear number to split on.
    if (numDelimiters <= 0 || !Number.isInteger(numDelimiters)) {
        throw new Error("Invalid number of delimiters (" + numDelimiters + ") for splitEvery.");
    }
    const segments = value.split(delimiter);
    // Short circuit extra logic for the simple case.
    if (numDelimiters === 1) {
        return segments;
    }
    const compoundSegments = [];
    let currentSegment = "";
    for (let i = 0; i < segments.length; i++) {
        if (currentSegment === "") {
            // Start a new segment.
            currentSegment = segments[i];
        }
        else {
            // Compound the current segment with the delimiter.
            currentSegment += delimiter + segments[i];
        }
        if ((i + 1) % numDelimiters === 0) {
            // We encountered the right number of delimiters, so add the entry.
            compoundSegments.push(currentSegment);
            // And reset the current segment.
            currentSegment = "";
        }
    }
    // Handle any leftover segment portion.
    if (currentSegment !== "") {
        compoundSegments.push(currentSegment);
    }
    return compoundSegments;
}
exports.splitEvery = splitEvery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQtZXZlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BsaXQtZXZlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7Ozs7R0FPRztBQUNILFNBQWdCLFVBQVUsQ0FBQyxLQUFhLEVBQUUsU0FBaUIsRUFBRSxhQUFxQjtJQUNoRixvREFBb0Q7SUFDcEQsSUFBSSxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRTtRQUMxRCxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxHQUFHLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxDQUFDO0tBQ3pGO0lBRUQsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN4QyxpREFBaUQ7SUFDakQsSUFBSSxhQUFhLEtBQUssQ0FBQyxFQUFFO1FBQ3ZCLE9BQU8sUUFBUSxDQUFDO0tBQ2pCO0lBRUQsTUFBTSxnQkFBZ0IsR0FBa0IsRUFBRSxDQUFDO0lBQzNDLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUN4QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN4QyxJQUFJLGNBQWMsS0FBSyxFQUFFLEVBQUU7WUFDekIsdUJBQXVCO1lBQ3ZCLGNBQWMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUI7YUFBTTtZQUNMLG1EQUFtRDtZQUNuRCxjQUFjLElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMzQztRQUVELElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsYUFBYSxLQUFLLENBQUMsRUFBRTtZQUNqQyxtRUFBbUU7WUFDbkUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3RDLGlDQUFpQztZQUNqQyxjQUFjLEdBQUcsRUFBRSxDQUFDO1NBQ3JCO0tBQ0Y7SUFFRCx1Q0FBdUM7SUFDdkMsSUFBSSxjQUFjLEtBQUssRUFBRSxFQUFFO1FBQ3pCLGdCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztLQUN2QztJQUVELE9BQU8sZ0JBQWdCLENBQUM7QUFDMUIsQ0FBQztBQXJDRCxnQ0FxQ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdpdmVuIGFuIGlucHV0IHN0cmluZywgc3BsaXRzIGJhc2VkIG9uIHRoZSBkZWxpbWl0ZXIgYWZ0ZXIgYSBnaXZlblxuICogbnVtYmVyIG9mIGRlbGltaXRlcnMgaGFzIGJlZW4gZW5jb3VudGVyZWQuXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCBzdHJpbmcgdG8gc3BsaXQuXG4gKiBAcGFyYW0gZGVsaW1pdGVyIFRoZSBkZWxpbWl0ZXIgdG8gc3BsaXQgb24uXG4gKiBAcGFyYW0gbnVtRGVsaW1pdGVycyBUaGUgbnVtYmVyIG9mIGRlbGltaXRlcnMgdG8gaGF2ZSBlbmNvdW50ZXJlZCB0byBzcGxpdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0RXZlcnkodmFsdWU6IHN0cmluZywgZGVsaW1pdGVyOiBzdHJpbmcsIG51bURlbGltaXRlcnM6IG51bWJlcik6IEFycmF5PHN0cmluZz4ge1xuICAvLyBGYWlsIGlmIHdlIGRvbid0IGhhdmUgYSBjbGVhciBudW1iZXIgdG8gc3BsaXQgb24uXG4gIGlmIChudW1EZWxpbWl0ZXJzIDw9IDAgfHwgIU51bWJlci5pc0ludGVnZXIobnVtRGVsaW1pdGVycykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG51bWJlciBvZiBkZWxpbWl0ZXJzIChcIiArIG51bURlbGltaXRlcnMgKyBcIikgZm9yIHNwbGl0RXZlcnkuXCIpO1xuICB9XG5cbiAgY29uc3Qgc2VnbWVudHMgPSB2YWx1ZS5zcGxpdChkZWxpbWl0ZXIpO1xuICAvLyBTaG9ydCBjaXJjdWl0IGV4dHJhIGxvZ2ljIGZvciB0aGUgc2ltcGxlIGNhc2UuXG4gIGlmIChudW1EZWxpbWl0ZXJzID09PSAxKSB7XG4gICAgcmV0dXJuIHNlZ21lbnRzO1xuICB9XG5cbiAgY29uc3QgY29tcG91bmRTZWdtZW50czogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBsZXQgY3VycmVudFNlZ21lbnQgPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGN1cnJlbnRTZWdtZW50ID09PSBcIlwiKSB7XG4gICAgICAvLyBTdGFydCBhIG5ldyBzZWdtZW50LlxuICAgICAgY3VycmVudFNlZ21lbnQgPSBzZWdtZW50c1tpXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ29tcG91bmQgdGhlIGN1cnJlbnQgc2VnbWVudCB3aXRoIHRoZSBkZWxpbWl0ZXIuXG4gICAgICBjdXJyZW50U2VnbWVudCArPSBkZWxpbWl0ZXIgKyBzZWdtZW50c1tpXTtcbiAgICB9XG5cbiAgICBpZiAoKGkgKyAxKSAlIG51bURlbGltaXRlcnMgPT09IDApIHtcbiAgICAgIC8vIFdlIGVuY291bnRlcmVkIHRoZSByaWdodCBudW1iZXIgb2YgZGVsaW1pdGVycywgc28gYWRkIHRoZSBlbnRyeS5cbiAgICAgIGNvbXBvdW5kU2VnbWVudHMucHVzaChjdXJyZW50U2VnbWVudCk7XG4gICAgICAvLyBBbmQgcmVzZXQgdGhlIGN1cnJlbnQgc2VnbWVudC5cbiAgICAgIGN1cnJlbnRTZWdtZW50ID0gXCJcIjtcbiAgICB9XG4gIH1cblxuICAvLyBIYW5kbGUgYW55IGxlZnRvdmVyIHNlZ21lbnQgcG9ydGlvbi5cbiAgaWYgKGN1cnJlbnRTZWdtZW50ICE9PSBcIlwiKSB7XG4gICAgY29tcG91bmRTZWdtZW50cy5wdXNoKGN1cnJlbnRTZWdtZW50KTtcbiAgfVxuXG4gIHJldHVybiBjb21wb3VuZFNlZ21lbnRzO1xufVxuIl19