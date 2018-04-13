#!/bin/bash

# runs the e2e tests

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$DIR"
ginkgo -tags e2e -slowSpecThreshold 10 -p "$@"