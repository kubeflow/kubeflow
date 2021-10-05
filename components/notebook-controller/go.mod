module github.com/geojaz/kubeflow/components/notebook-controller

go 1.15

require (
	github.com/go-logr/logr v0.4.0
	github.com/kubeflow/kubeflow/components/common v0.0.0-20200908101143-7f5e242f4671
	github.com/onsi/ginkgo v1.14.1
	github.com/onsi/gomega v1.10.2
	github.com/prometheus/client_golang v1.7.1
	k8s.io/api v0.22.2
	k8s.io/apimachinery v0.22.2
	k8s.io/client-go v0.22.2
	sigs.k8s.io/controller-runtime v0.7.2
)

// Ensure we build the notebook-controller with the latest `common`
// module. However, because this module's `replace` will be ignored by
// other modules, we still specify a commit in the `require` directive.
replace github.com/kubeflow/kubeflow/components/common => ../common
