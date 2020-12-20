module github.com/kubeflow/kubeflow/components/notebook-controller

go 1.15

require (
	github.com/go-logr/logr v0.3.0
	github.com/kubeflow/kubeflow/components/common v0.0.0
	github.com/onsi/ginkgo v1.14.1
	github.com/onsi/gomega v1.10.2
	github.com/prometheus/client_golang v1.7.1
	k8s.io/api v0.19.6
	k8s.io/apimachinery v0.19.6
	k8s.io/client-go v0.19.6
	sigs.k8s.io/controller-runtime v0.7.0
)

replace github.com/kubeflow/kubeflow/components/common => ../common
