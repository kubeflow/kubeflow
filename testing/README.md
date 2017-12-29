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

You can deploy argo as follows (you don't need to use argo's CLI)

```
ks apply prow -c argo
```  

 Then you can connect to the UI via the proxy at

 ```
 http://127.0.0.1:8001/api/v1/proxy/namespaces/kubeflow-test-infra/services/argo-ui:80/
 ```

## Running the tests

### Run a presubmit

```
ks param set workflows name e2e-test-pr-`date '+%Y%m%d-%H%M%S'`
ks param set workflows pr ${PR_NUMBER}
ks param set workflows commit ${COMMIT}
ks apply prow -c workflows
```
	* You can set COMMIT to `pr` to checkout the latest change on the PR.

### Run a postsubmit

```
ks param set workflows name e2e-test-postsubmit-`date '+%Y%m%d-%H%M%S'`
ks param set workflows pr ""
ks param set workflows commit ${COMMIT}
ks apply prow -c workflows
```
  * You can set COMMIT to `master` to use HEAD

## Permissions

User or service account deploying Kubeflow needs sufficient permissions to create the roles that are created as part of a Kubeflow deployment. For example you may need to run

```
kubectl create clusterrolebinding default-admin --clusterrole=cluster-admin --user=user@gmail.com
```

## GitHub tokens

You need to use a GitHub token with ksonnet otherwise the test quickly runs into GitHub API limits.

TODO(jlewi): We should create a GitHub bot account to use with our tests and then create API tokens for that bot.

To create the secret do
```
kubectl create secret generic github-token --namespace=kubeflow-test-infra --from-literal=github_token=6bba656ffb88a720f9708a3264356e158fafb7a5
```
## Managing namespaces

All namespaces created for the tests should be labeled with `app=kubeflow-e2e-test`.

This can be used to manually delete old namespaces that weren't properly garbage collected.
