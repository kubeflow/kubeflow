# Kubeflow conformance program (WIP)

Before running the conformance tests, you need to configure kubectl default context to point to the k8s cluster that is hosting Kubeflow.

To run version <x.y> of the conformance test.

`cd kubeflow/conformance/<x.y>`

**Run conformance test**

Before running conformance tests, run setup:
`make setup`

To run all conformance tests for all components:
`make run`

You can run conformance test for a specific component:
`make run-kfp`
`make run-katib`
`make run-training-operator`

**Download test report**

To download test report for all components:
`make report`

You can download test report for a specific component:
`make report-kfp`
`make report-katib`
`make report-training-operator`

The reports are downloaded to /tmp/kf-conformance

**Submit the test report to Kubeflow conformance body for review**

TBD

**Clean up test resources**

`make clean`