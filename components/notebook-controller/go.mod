module github.com/kubeflow/kubeflow/components/notebook-controller

go 1.14

require (
	github.com/go-logr/logr v0.1.0
	github.com/kubeflow/kubeflow/components/common v0.0.0-00010101000000-000000000000
	github.com/prometheus/client_golang v1.7.1
	k8s.io/api v0.18.6
	k8s.io/apimachinery v0.18.6
	k8s.io/client-go v0.18.6
	sigs.k8s.io/controller-runtime v0.6.2
)

replace github.com/kubeflow/kubeflow/components/common => ../common
