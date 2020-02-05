module github.com/kubeflow/kubeflow/components/tensorboard-controller

go 1.12

require (
	github.com/go-logr/logr v0.1.0
	github.com/gogo/protobuf v1.1.1
	github.com/kubeflow/kubeflow/components/common v0.0.0-00010101000000-000000000000
	github.com/onsi/ginkgo v1.6.0
	github.com/onsi/gomega v1.4.2
	k8s.io/api v0.0.0-20190409021203-6e4e0e4f393b
	k8s.io/apimachinery v0.0.0-20190404173353-6a84e37a896d
	k8s.io/client-go v11.0.1-0.20190409021438-1a26190bd76a+incompatible
	sigs.k8s.io/controller-runtime v0.2.2
)

replace github.com/kubeflow/kubeflow/components/common => ../common
