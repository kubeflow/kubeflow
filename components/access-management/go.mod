module github.com/kubeflow/kubeflow/components/access-management

go 1.15

require (
	github.com/gorilla/mux v1.7.2
	github.com/kubeflow/kubeflow/components/profile-controller v0.0.0
	github.com/prometheus/client_golang v1.7.1
	github.com/sirupsen/logrus v1.6.0
	k8s.io/api v0.19.6
	k8s.io/apimachinery v0.19.6
	k8s.io/client-go v0.19.6
	sigs.k8s.io/controller-runtime v0.7.0
)

replace (
	git.apache.org/thrift.git => github.com/apache/thrift v0.0.0-20180902110319-2566ecd5d999
	github.com/kubeflow/kubeflow/components/profile-controller => ../profile-controller
)
