# Test Infrastructure

This directory contains the Kubeflow test Infrastructure.

This is a work in progress see [google/kubeflow#38](https://github.com/google/kubeflow/issues/38)

The current thinking is this will work as follows

  * Prow will be used to trigger E2E tests
  * The E2E test will launch an Argo workflow that describes the tests to run
  * Each step in the Argo workflow will be a binary invoked inside a container
  * The Argo workflow will use an NFS volume to attach a shared POSIX compliant filesystem to each step in the 
    workflow.
  * Each step in the pipeline can write outputs and junit.xml files to a test directory in the volume
  * A final step in the Argo pipeline will upload the outputs to GCS so they are available in gubernator

## Infrastructure

The test infrastructure is run in

```
PROJECT=mlkube-testing
ZONE=us-east1-d
CLUSter=kubeflow-testing
NAMESPACE=kubeflow-test-infra
```

The script [setup_argo.sh](setup_argo.sh) contains the commands run to setup Argo.

The ksonnet app `test-infra` contains ksonnet configs to deploy the test infrastructure.


## Permissions

User or service account deploying Kubeflow needs sufficient permissions to create the roles that are created as part of a Kubeflow deployment. For example you may need to run

```
kubectl create clusterrolebinding default-admin --clusterrole=cluster-admin --user=user@gmail.com
```

## GitHub tokens

You need to use a GitHub token with ksonnet otherwise the test quickly runs into GitHub API limits.

TODO(jlewi): We should create a GitHub bot account to use with our tests and then create API tokens for that bot.

## Managing namespaces

All namespaces created for the tests should be labeled with `app=kubeflow-e2e-test`.

This can be used to manually delete old namespaces that weren't properly garbage collected.
