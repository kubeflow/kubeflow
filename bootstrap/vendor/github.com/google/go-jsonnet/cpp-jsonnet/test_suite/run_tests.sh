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

for TEST in *.jsonnet ; do

    GOLDEN_OUTPUT="true"
    GOLDEN_KIND="PLAIN"


    EXPECTED_EXIT_CODE=0
    if [ $(echo "$TEST" | cut -b 1-6) == "error." ] ; then
        EXPECTED_EXIT_CODE=1
    fi
    if [ -r "$TEST.golden" ] ; then
        GOLDEN_OUTPUT=$(cat "$TEST.golden")
    fi
    if [ -r "$TEST.golden_regex" ] ; then
        GOLDEN_KIND="REGEX"
        GOLDEN_OUTPUT=$(cat "$TEST.golden_regex")
    fi

    EXT_PARAMS=""
    TLA_PARAMS=""
    if [[ "$TEST" =~ ^tla[.] ]] ; then
        TLA_PARAMS="--tla-str var1=test --tla-code var2={x:1,y:2}"
    else
        EXT_PARAMS="--ext-str var1=test --ext-code var2={x:1,y:2}"
    fi

    if [ -n "$DISABLE_EXT_PARAMS" ]; then
        EXT_PARAMS=""
    fi
    JSONNET_CMD="$VALGRIND "$JSONNET_BIN" $PARAMS $EXT_PARAMS $TLA_PARAMS"
    test_eval "$JSONNET_CMD" "$TEST" "$EXPECTED_EXIT_CODE" "$GOLDEN_OUTPUT" "$GOLDEN_KIND"
done

deinit

if [ $FAILED -eq 0 ] ; then
    echo "$0: All $EXECUTED test scripts pass."
else
    echo "$0: FAILED: $FAILED / $EXECUTED"
    exit 1
fi
