# Kubeflow conformance program (WIP)

Before running the conformance tests, you need to configure kubectl default context to point to the k8s cluster that is hosting Kubeflow.

To run version <x.y> of the conformance test.

`cd kubeflow/conformance/<x.y>`

**Run conformance test**

`make run`

**Download test report**

`make report`

The reports are downloaded to /tmp/kf-conformance

**Submit the test report to Kubeflow conformance body for review**

TBD

**Clean up test resources**

`make clean`