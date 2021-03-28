module github.com/kubeflow/kubeflow/components/pvcviewer-controller

go 1.16

require (
	github.com/go-logr/logr v0.1.0
	github.com/gogo/protobuf v1.2.2-0.20190723190241-65acae22fc9d
	github.com/kubeflow/kubeflow/components/common v0.0.0-00010101000000-000000000000
	k8s.io/api v0.17.2
	k8s.io/apimachinery v0.17.2
	k8s.io/client-go v0.17.2
	sigs.k8s.io/controller-runtime v0.5.1
)

replace github.com/kubeflow/kubeflow/components/common => ../common
