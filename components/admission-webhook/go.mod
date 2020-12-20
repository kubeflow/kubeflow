module github.com/kubeflow/kubeflow/components/admission-webhook

go 1.15

require (
	github.com/mattbaird/jsonpatch v0.0.0-20171005235357-81af80346b1a
	github.com/onsi/gomega v1.10.2
	golang.org/x/net v0.0.0-20201110031124-69a78807bb2b
	k8s.io/api v0.19.6
	k8s.io/apiextensions-apiserver v0.19.6 // indirect
	k8s.io/apimachinery v0.19.6
	k8s.io/client-go v0.19.6
	k8s.io/klog v0.3.0
	sigs.k8s.io/controller-runtime v0.7.0
)
