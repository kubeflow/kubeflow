#!/bin/bash
#
# Script to autoformat libsonnet files.
# Assumes jsonnet is on the path.
set -ex
find ./ -name "*.libsonnet" -exec jsonnet fmt {} -i --indent 2 ";"
find ./ -name "*.jsonnet" -exec jsonnet fmt {} -i --indent 2 ";"
