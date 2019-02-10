// Some useful routines.
{
  run:: function(testCases) {
    local testEqual(x) = x {
      pass: x.actual == x.expected,
    },
    local curry(testCases) = {
      // For each test case determine whether expected matches equals
      local testCasesWithResults = std.map(
        testEqual,
        testCases,
      ),
      return::
        testCasesWithResults,
    }.return,
    // Compute test suite.
    local foldResults(left, right) = {
      pass: left.pass && right.pass,
    },
    local initResult = { pass: true },
    local suiteResult = std.foldl(foldResults, curry(testCases), initResult),
    local testSuite = suiteResult {
      testCases: curry(testCases),
    },
    result::
      testSuite,
  }.result,

}
