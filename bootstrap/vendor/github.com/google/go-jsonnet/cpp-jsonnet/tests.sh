set -e

JSONNET_BIN="${JSONNET_BIN:-./jsonnet}"
TEST_SNIPPET="std.assertEqual(({ x: 1, y: self.x } { x: 2 }).y, 2)"
echo -n "snippet: "
"$JSONNET_BIN" -e "${TEST_SNIPPET}" || FAIL=TRUE

if [ -z "$DISABLE_LIB_TESTS" ]; then
    echo -n 'libjsonnet_test_snippet: '
    LD_LIBRARY_PATH=. ./libjsonnet_test_snippet "${TEST_SNIPPET}" || FAIL=TRUE
    echo -n 'libjsonnet_test_file: '
    LD_LIBRARY_PATH=. ./libjsonnet_test_file "test_suite/object.jsonnet" || FAIL=TRUE
fi
examples/check.sh || FAIL=TRUE
examples/terraform/check.sh || FAIL=TRUE
test_cmd/run_cmd_tests.sh || FAIL=TRUE
test_suite/run_tests.sh || FAIL=TRUE
if [ -z "$DISABLE_FMT_TESTS" ]; then
    test_suite/run_fmt_tests.sh || FAIL=TRUE
    test_suite/run_fmt_idempotence_tests.sh || FAIL=TRUE
fi
if [ -n "$FAIL" ]; then
    echo "TESTS FAILED"
    exit 1
fi
