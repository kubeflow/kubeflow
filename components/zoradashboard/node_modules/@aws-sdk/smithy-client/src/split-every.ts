/**
 * Given an input string, splits based on the delimiter after a given
 * number of delimiters has been encountered.
 *
 * @param value The input string to split.
 * @param delimiter The delimiter to split on.
 * @param numDelimiters The number of delimiters to have encountered to split.
 */
export function splitEvery(value: string, delimiter: string, numDelimiters: number): Array<string> {
  // Fail if we don't have a clear number to split on.
  if (numDelimiters <= 0 || !Number.isInteger(numDelimiters)) {
    throw new Error("Invalid number of delimiters (" + numDelimiters + ") for splitEvery.");
  }

  const segments = value.split(delimiter);
  // Short circuit extra logic for the simple case.
  if (numDelimiters === 1) {
    return segments;
  }

  const compoundSegments: Array<string> = [];
  let currentSegment = "";
  for (let i = 0; i < segments.length; i++) {
    if (currentSegment === "") {
      // Start a new segment.
      currentSegment = segments[i];
    } else {
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
