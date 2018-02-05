#!/bin/bash

# Copyright 2016 Google Inc. All Rights Reserved.
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

# A simple shell script for retrying a command.
#
# We found e.g. fetching and installing opencv from the apt repository to be
# somewhat unreliable. So this script wraps the installation in a simple retry
# loop.

# Allow command line argument -n <number>: the number of times to retry the
# command.
num_retries=10
if [ "$1" == "-n" ]; then
  shift
  num_retries="$1"
  shift
fi
command_to_run="$@"

# Run the command num_retries times.
exit_code=0
for i in $(seq 1 "${num_retries}"); do
  echo "Running command: ${command_to_run}; trial: $i"
  ${command_to_run}
  exit_code=$?
  if [ ${exit_code} -eq 0 ]; then
    # The command succeeded.
    exit 0
  fi
  sleep 1
done

echo "Command did not complete successfully: ${command_to_run}"
exit ${exit_code}
