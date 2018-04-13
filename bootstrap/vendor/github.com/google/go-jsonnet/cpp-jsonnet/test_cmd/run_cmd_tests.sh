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

DIR="$(dirname $0)"

source "${DIR}/cmd_tests.source"

pushd "${DIR}"

rm -rf out

# And now the tests:

# do_test <name> <exit_code> <args...>

# Only check_file additional files if the test otherwise succeded, to avoid double-counting
# failures.  All tests must write into out/$NAME/ and nowhere else.

do_test "no_args" 1
do_test "help" 0 --help
do_test "eval" 1 eval
do_test "nosuchcommand" 1 nosuchcommand
do_test "version1" 0 -v
do_test "version2" 0 --version
do_test "bad_out" 1 "test.jsonnet" -o ""
do_test "simple1" 0 "test.jsonnet"
do_test "simple2" 0 eval "test.jsonnet"
do_test "simple3" 0 eval -
do_test "simple4" 1 eval "nosuchfile.jsonnet"
do_test "simple5" 1 "test.jsonnet" "test.jsonnet"
if do_test "simple_out" 0 "test.jsonnet" -o "out/simple_out/custom_output"; then
    check_file "simple_out" "out/simple_out/custom_output" "simple_out.golden.custom_output"
fi
do_test "exec1" 0 -e "{ a: 1, b: 2, c: 3 }"
do_test "exec2" 0 eval -e "{ a: 1, b: 2, c: 3 }"
if do_test "exec_out" 0 -e "{ a: 1, b: 2, c: 3 }" -o "out/exec_out/custom_output"; then
    check_file "exec_out" "out/exec_out/custom_output" "exec_out.golden.custom_output"
fi
do_test "double_dash" 0 -e -- -1
do_test "max_stack1" 1 -s 1 -e 'local x = 1; x'
do_test "max_stack2" 1 --max-stack 1 -e 'local x = 1; x'
do_test "max_stack3" 0 --max-stack 2 -e 'local x = 1; x'
# TODO(https://github.com/google/go-jsonnet/issues/145) Fix this problem in the Go implementation.
if [ "${IMPLEMENTATION}" == "golang" ] ; then
    do_test "max_stack4" 1 --max-stack 7 -e 'local f(n, c=0) = if n == 0 then c else f(n - 1, c + n) tailstrict; f(100)'
else
    do_test "max_stack4" 0 --max-stack 7 -e 'local f(n, c=0) = if n == 0 then c else f(n - 1, c + n) tailstrict; f(100)'
fi
do_test "max_stack5" 1 --max-stack 0 -e 'true'
do_test "max_stack6" 1 --max-stack -1 -e 'true'
do_test "jpath1" 0 --jpath "lib1" -e 'import "lib1_test.jsonnet"'
do_test "jpath2" 0 -J "lib1" -e 'import "lib1_test.jsonnet"'
do_test "jpath3" 0 -J "lib2" -e 'import "lib2_test.jsonnet"'
do_test "jpath4" 0 -J "lib1" -J "lib2" -e 'import "lib2_test.jsonnet"'
do_test "jpath5" 0 -J "lib2" -J "lib1" -e 'import "lib2_test.jsonnet"'
do_test "jpath6" 0 -J "lib2" -J "lib1" -e 'importstr "shared.txt"'
do_test "jpath7" 0 -J "lib1" -J "lib2" -e 'importstr "shared.txt"'
do_test "jpath8" 1 -J "" -e 'true'
do_test "ext1" 0 --ext-str x=1 -e 'std.extVar("x")'
do_test "ext2" 0 -V x=1 -e 'std.extVar("x")'
do_test "ext3" 1 -V y=1 -e 'std.extVar("x")'
do_test "ext4" 0 --ext-code x=1+1 -e 'std.extVar("x")'
do_test "ext5" 0 --ext-str-file "x=test.txt" -e 'std.extVar("x")'
do_test "ext6" 0 --ext-code-file "x=test.jsonnet" -e 'std.extVar("x")'
do_test "ext7" 0 --ext-code-file "x=lib1/lib3_test.jsonnet" -e 'std.extVar("x")'
do_test "tla1" 0 --tla-str x=1 -e 'function(x) x'
do_test "tla2" 0 -A x=1 -e 'function(x) x'
do_test "tla3" 1 -A y=1 -e 'function(x) x'
do_test "tla4" 0 --tla-code x=1+1 -e 'function(x) x'
do_test "tla5" 0 --tla-str-file "x=test.txt" -e 'function(x) x'
do_test "tla6" 0 --tla-code-file "x=test.jsonnet" -e 'function(x) x'
do_test "tla7" 1 -A x=val -e 'function() 3'
do_test "tla8" 0 -A x=val -e '3'
do_test "tla9" 0 -e 'function() 3'
do_test "tla10" 0 --tla-code-file "x=lib1/lib3_test.jsonnet" -e 'function(x) x'
do_test "max_trace1" 1 -t 10 -e 'local f(n, c=0) = if n == 0 then error "whee" else f(n - 1, c + n); f(100)'
do_test "max_trace2" 1 --max-trace 10 -e 'local f(n, c=0) = if n == 0 then error "whee" else f(n - 1, c + n); f(100)'
do_test "max_trace3" 1 -t 20 -e 'local f(n, c=0) = if n == 0 then error "whee" else f(n - 1, c + n); f(100)'
do_test "max_trace4" 1 -t 0 -e 'local f(n, c=0) = if n == 0 then error "whee" else f(n - 1, c + n); f(100)'
do_test "max_trace5" 1 -t -1 -e 'true'
if do_test "multi1" 0 -m "out/multi1" -e '{ file1: "file1", file2: "file2" }'; then
    check_file "multi1" "out/multi1/file1" "multi1.golden.file1"
    check_file "multi1" "out/multi1/file2" "multi1.golden.file2"
fi
if do_test "multi2" 0 --multi "out/multi2" -e '{ file1: "file1", file2: "file2" }'; then
    check_file "multi2" "out/multi2/file1" "multi2.golden.file1"
    check_file "multi2" "out/multi2/file2" "multi2.golden.file2"
fi
if do_test "multi3" 0 -m "out/multi3" -o "out/multi3/list" -e '{ file1: "file1", file2: "file2" }'; then
    check_file "multi3" "out/multi3/file1" "multi3.golden.file1"
    check_file "multi3" "out/multi3/file2" "multi3.golden.file2"
    check_file "multi3" "out/multi3/list" "multi3.golden.list"
fi
do_test "multi4" 1 -m -- -e 'null'
do_test "yaml1" 0 -y -e '[1,2,3]'
do_test "yaml2" 1 -y -e 'null'
if do_test "yaml3" 0 -y -o "out/yaml3/stream" -e '[1,2,3]'; then
    check_file "yaml3" "out/yaml3/stream" "yaml3.golden.stream"
fi
do_test "string1" 0 -S -e '"A long\nparagraph."'
do_test "string2" 1 -S -e 'null'

export JSONNET_PATH=lib1:lib2
do_test "jsonnet_path1" 0 -e 'importstr "shared.txt"'
export JSONNET_PATH=lib2:lib1
do_test "jsonnet_path2" 0 -e 'importstr "shared.txt"'

popd

# Bean counting:

if [ $FAILED -eq 0 ] ; then
    echo "$0: All $EXECUTED test scripts pass."
else
    echo "$0: FAILED: $FAILED / $EXECUTED"
    exit 1
fi

