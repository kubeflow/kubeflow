# A note about Gaudi workloads

Some Gaudi workloads require hugepages to run correctly. One can find a list of workloads listed [here](https://console.cloud.intel.com/docs/guides/k8s_guide.html#hugepages-settings-by-model). As of now, Kubeflow Notebooks lack the capability to request hugepages resources for individual notebooks.

To add hugepages resources for the Notebook Pod, there are a couple of options:
* Use [Limit Ranges](https://kubernetes.io/docs/concepts/policy/limit-range/) to set default hugepages amount for all Pods in the namespace.
* Edit the Kubeflow's notebook object after it has been created and add the hugepages resources to the pod template.

The upcoming Notebooks 2.0 release will improve the situation with its `podTemplate` feature.
