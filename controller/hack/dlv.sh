#!/usr/bin/env bash

dlv --listen=:2345 --headless=true --api-version=2 exec /go/src/github.com/kubeflow/kubeflow/controller/bin/manager
