#!/bin/bash
set -ex

# Checkout the code.
/usr/local/bin/checkout.sh /src

# Trigger a workflow	          
python -m kubeflow.testing.run_e2e_workflow \
	--project=mlkube-testing \
	--zone=us-east1-d \
	--cluster=kubeflow-testing \
	--bucket=kubernetes-jenkins \
	--component=workflows \
	--app_dir=/src/kubeflow/kubeflow/testing/workflows