# Test programs

Run `./run_tests.sh` to run the full suite and report results.

The tests are executed with very aggressive garbage collection parameters.  A full garbage
collection cycle is run on every allocation.  This means if an object is freed by the GC but still
referenced (because the reference was not from the stack / heap) then the error can be caught in
valgrind.

The output of each test (merging `stdout` and `stderr` with `2>&1`) should match its .golden file.  If a
test has no `.golden` file, the test should return "true".  If a test's name begins with "error." then
its exit code is expected to be 1, otherwise it should be 0.

If a test is changed, and its golden output needs to be updated (e.g. line numbers in stack traces
no-longer match up) then run `./refresh_golden.sh <thetest.jsonnet>`
