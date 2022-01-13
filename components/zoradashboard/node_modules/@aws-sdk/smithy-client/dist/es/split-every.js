/**
 * Given an input string, splits based on the delimiter after a given
 * number of delimiters has been encountered.
 *
 * @param value The input string to split.
 * @param delimiter The delimiter to split on.
 * @param numDelimiters The number of delimiters to have encountered to split.
 */
export function splitEvery(value, delimiter, numDelimiters) {
    // Fail if we don't have a clear number to split on.
    if (numDelimiters <= 0 || !Number.isInteger(numDelimiters)) {
        throw new Error("Invalid number of delimiters (" + numDelimiters + ") for splitEvery.");
    }
    var segments = value.split(delimiter);
    // Short circuit extra logic for the simple case.
    if (numDelimiters === 1) {
        return segments;
    }
    var compoundSegments = [];
    var currentSegment = "";
    for (var i = 0; i < segments.length; i++) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BsaXQtZXZlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc3BsaXQtZXZlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUNILE1BQU0sVUFBVSxVQUFVLENBQUMsS0FBYSxFQUFFLFNBQWlCLEVBQUUsYUFBcUI7SUFDaEYsb0RBQW9EO0lBQ3BELElBQUksYUFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUU7UUFDMUQsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsR0FBRyxhQUFhLEdBQUcsbUJBQW1CLENBQUMsQ0FBQztLQUN6RjtJQUVELElBQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDeEMsaURBQWlEO0lBQ2pELElBQUksYUFBYSxLQUFLLENBQUMsRUFBRTtRQUN2QixPQUFPLFFBQVEsQ0FBQztLQUNqQjtJQUVELElBQU0sZ0JBQWdCLEdBQWtCLEVBQUUsQ0FBQztJQUMzQyxJQUFJLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDeEMsSUFBSSxjQUFjLEtBQUssRUFBRSxFQUFFO1lBQ3pCLHVCQUF1QjtZQUN2QixjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzlCO2FBQU07WUFDTCxtREFBbUQ7WUFDbkQsY0FBYyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDM0M7UUFFRCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLGFBQWEsS0FBSyxDQUFDLEVBQUU7WUFDakMsbUVBQW1FO1lBQ25FLGdCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN0QyxpQ0FBaUM7WUFDakMsY0FBYyxHQUFHLEVBQUUsQ0FBQztTQUNyQjtLQUNGO0lBRUQsdUNBQXVDO0lBQ3ZDLElBQUksY0FBYyxLQUFLLEVBQUUsRUFBRTtRQUN6QixnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDdkM7SUFFRCxPQUFPLGdCQUFnQixDQUFDO0FBQzFCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdpdmVuIGFuIGlucHV0IHN0cmluZywgc3BsaXRzIGJhc2VkIG9uIHRoZSBkZWxpbWl0ZXIgYWZ0ZXIgYSBnaXZlblxuICogbnVtYmVyIG9mIGRlbGltaXRlcnMgaGFzIGJlZW4gZW5jb3VudGVyZWQuXG4gKlxuICogQHBhcmFtIHZhbHVlIFRoZSBpbnB1dCBzdHJpbmcgdG8gc3BsaXQuXG4gKiBAcGFyYW0gZGVsaW1pdGVyIFRoZSBkZWxpbWl0ZXIgdG8gc3BsaXQgb24uXG4gKiBAcGFyYW0gbnVtRGVsaW1pdGVycyBUaGUgbnVtYmVyIG9mIGRlbGltaXRlcnMgdG8gaGF2ZSBlbmNvdW50ZXJlZCB0byBzcGxpdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNwbGl0RXZlcnkodmFsdWU6IHN0cmluZywgZGVsaW1pdGVyOiBzdHJpbmcsIG51bURlbGltaXRlcnM6IG51bWJlcik6IEFycmF5PHN0cmluZz4ge1xuICAvLyBGYWlsIGlmIHdlIGRvbid0IGhhdmUgYSBjbGVhciBudW1iZXIgdG8gc3BsaXQgb24uXG4gIGlmIChudW1EZWxpbWl0ZXJzIDw9IDAgfHwgIU51bWJlci5pc0ludGVnZXIobnVtRGVsaW1pdGVycykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIG51bWJlciBvZiBkZWxpbWl0ZXJzIChcIiArIG51bURlbGltaXRlcnMgKyBcIikgZm9yIHNwbGl0RXZlcnkuXCIpO1xuICB9XG5cbiAgY29uc3Qgc2VnbWVudHMgPSB2YWx1ZS5zcGxpdChkZWxpbWl0ZXIpO1xuICAvLyBTaG9ydCBjaXJjdWl0IGV4dHJhIGxvZ2ljIGZvciB0aGUgc2ltcGxlIGNhc2UuXG4gIGlmIChudW1EZWxpbWl0ZXJzID09PSAxKSB7XG4gICAgcmV0dXJuIHNlZ21lbnRzO1xuICB9XG5cbiAgY29uc3QgY29tcG91bmRTZWdtZW50czogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBsZXQgY3VycmVudFNlZ21lbnQgPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlZ21lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGN1cnJlbnRTZWdtZW50ID09PSBcIlwiKSB7XG4gICAgICAvLyBTdGFydCBhIG5ldyBzZWdtZW50LlxuICAgICAgY3VycmVudFNlZ21lbnQgPSBzZWdtZW50c1tpXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ29tcG91bmQgdGhlIGN1cnJlbnQgc2VnbWVudCB3aXRoIHRoZSBkZWxpbWl0ZXIuXG4gICAgICBjdXJyZW50U2VnbWVudCArPSBkZWxpbWl0ZXIgKyBzZWdtZW50c1tpXTtcbiAgICB9XG5cbiAgICBpZiAoKGkgKyAxKSAlIG51bURlbGltaXRlcnMgPT09IDApIHtcbiAgICAgIC8vIFdlIGVuY291bnRlcmVkIHRoZSByaWdodCBudW1iZXIgb2YgZGVsaW1pdGVycywgc28gYWRkIHRoZSBlbnRyeS5cbiAgICAgIGNvbXBvdW5kU2VnbWVudHMucHVzaChjdXJyZW50U2VnbWVudCk7XG4gICAgICAvLyBBbmQgcmVzZXQgdGhlIGN1cnJlbnQgc2VnbWVudC5cbiAgICAgIGN1cnJlbnRTZWdtZW50ID0gXCJcIjtcbiAgICB9XG4gIH1cblxuICAvLyBIYW5kbGUgYW55IGxlZnRvdmVyIHNlZ21lbnQgcG9ydGlvbi5cbiAgaWYgKGN1cnJlbnRTZWdtZW50ICE9PSBcIlwiKSB7XG4gICAgY29tcG91bmRTZWdtZW50cy5wdXNoKGN1cnJlbnRTZWdtZW50KTtcbiAgfVxuXG4gIHJldHVybiBjb21wb3VuZFNlZ21lbnRzO1xufVxuIl19