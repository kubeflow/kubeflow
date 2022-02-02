module github.com/kubeflow/kubeflow/components/notebook-controller

go 1.15

require (
	github.com/go-logr/logr v0.1.0
	github.com/kubeflow/kubeflow/components/common v0.0.0-20200908101143-7f5e242f4671
	github.com/prometheus/client_golang v0.9.0
	github.com/onsi/ginkgo v1.12.1
    github.com/onsi/gomega v1.10.1
	k8s.io/api v0.0.0-20190409021203-6e4e0e4f393b
	k8s.io/apimachinery v0.0.0-20190404173353-6a84e37a896d
	k8s.io/client-go v11.0.1-0.20190409021438-1a26190bd76a+incompatible
	sigs.k8s.io/controller-runtime v0.2.0
	sigs.k8s.io/controller-tools v0.2.0 // indirect
)

// Ensure we build the notebook-controller with the latest `common`
// module. However, because this module's `replace` will be ignored by
// other modules, we still specify a commit in the `require` directive.
replace github.com/kubeflow/kubeflow/components/common => ../common
