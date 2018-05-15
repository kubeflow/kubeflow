#!/bin/bash

# Copyright 2015 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

TEST_SUITE_NAME="${TEST_SUITE_NAME:-$0}"

cd $(dirname $0)

JSONNET_BIN="${JSONNET_BIN:-../jsonnet}"

source ../test_suite/tests.source

init

shopt -s nullglob

FAILED=0
SUCCESS=0

EXAMPLES_DIR="${EXAMPLES_DIR:-./}"

for I in "$EXAMPLES_DIR"/*.jsonnet.golden ; do
    TEST=$(basename "$I" .golden)
    JSONNET_CMD="$JSONNET_BIN"
    JSONNET_FILE="$EXAMPLES_DIR/$TEST"
    EXPECTED_EXIT_CODE=0
    # We run jsonnet again on the output to disregard formatting
    GOLDEN_OUTPUT="$("$JSONNET_BIN" "$I" 2> /dev/null)"
    GOLDEN_KIND=PLAIN
    test_eval "$JSONNET_CMD" "$JSONNET_FILE" "$EXPECTED_EXIT_CODE" "$GOLDEN_OUTPUT" "$GOLDEN_KIND"
done

for I in "$EXAMPLES_DIR"/*.error ; do
    TEST=$(basename "$I" .error)
    JSONNET_CMD="$JSONNET_BIN"
    JSONNET_FILE="$TEST"
    EXPECTED_EXIT_CODE=1
    GOLDEN_OUTPUT="$(cat "$I")"
    GOLDEN_KIND=PLAIN
    test_eval "$JSONNET_CMD" "$JSONNET_FILE" "$EXPECTED_EXIT_CODE" "$GOLDEN_OUTPUT" "$GOLDEN_KIND"
done

deinit

if [ "$FAILED" -eq 0 ] ; then
    echo "$TEST_SUITE_NAME: All $EXECUTED tests executed correctly."
else
    echo "$TEST_SUITE_NAME: $FAILED / $EXECUTED tests failed."
    exit 1
fi
