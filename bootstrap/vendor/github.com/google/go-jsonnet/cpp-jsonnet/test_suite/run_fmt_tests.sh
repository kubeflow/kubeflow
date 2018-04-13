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

cd "$(dirname $0)"

source "tests.source"

# Enable next line to test the garbage collector
#PARAMS="--gc-min-objects 1 --gc-growth-trigger 1"

# Enable next line for a slow and thorough test
#VALGRIND="valgrind -q"

#VERBOSE=true

init

for TEST in *.jsonnet ../examples/*.jsonnet ../examples/terraform/*.jsonnet ../benchmarks/*.jsonnet ../gc_stress/*.jsonnet ; do

    GOLDEN_OUTPUT="$(cat $TEST)"
    GOLDEN_KIND="PLAIN"

    if [ -r "$TEST.fmt.golden" ] ; then
        GOLDEN_OUTPUT=$(cat "$TEST.fmt.golden")
    fi

    if [ $(echo "$TEST" | cut -b 1-12) == "error.parse." ] ; then
        continue  # No point testing these
    fi

    EXPECTED_EXIT_CODE=0
    JSONNET_CMD="$VALGRIND "$JSONNET_BIN" fmt"
    test_eval "$JSONNET_CMD" "$TEST" "$EXPECTED_EXIT_CODE" "$GOLDEN_OUTPUT" "$GOLDEN_KIND"
done

if [ $FAILED -eq 0 ] ; then
    echo "$0: All $EXECUTED test scripts pass."
else
    echo "$0: FAILED: $FAILED / $EXECUTED"
    exit 1
fi

deinit
