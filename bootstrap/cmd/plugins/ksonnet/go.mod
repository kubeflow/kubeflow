module github.com/kubeflow/kubeflow/bootstrap/cmd/plugins/ksonnet

require (
	cloud.google.com/go v0.34.0
	github.com/cenkalti/backoff v2.1.1+incompatible
	github.com/ghodss/yaml v1.0.0
	github.com/go-kit/kit v0.8.0
	github.com/golang/glog v0.0.0-20160126235308-23def4e6c14b
	github.com/hashicorp/go-getter v1.0.2
	github.com/imdario/mergo v0.3.6
	github.com/ksonnet/ksonnet v0.13.1
	github.com/kubeflow/kubeflow/bootstrap v0.0.0-20190301163200-22592d580f36 // indirect
	github.com/mitchellh/go-homedir v1.0.0
	github.com/onrik/logrus v0.2.1
	github.com/onsi/gomega v1.4.3
	github.com/prometheus/client_golang v0.9.2
	github.com/sirupsen/logrus v1.3.0
	github.com/spf13/afero v1.2.0
	github.com/spf13/cobra v0.0.3
	github.com/spf13/pflag v1.0.3
	github.com/spf13/viper v1.3.1
	golang.org/x/net v0.0.0-20190110200230-915654e7eabc
	golang.org/x/oauth2 v0.0.0-20190115181402-5dab4167f31c
	google.golang.org/api v0.1.0
	google.golang.org/genproto v0.0.0-20190111180523-db91494dd46c
	gopkg.in/resty.v1 v1.11.0
	gopkg.in/yaml.v2 v2.2.2
	k8s.io/api v0.0.0-20180308224125-73d903622b73
	k8s.io/apiextensions-apiserver v0.0.0-20190116054503-cf30b7cf64c2
	k8s.io/apimachinery v0.0.0-20190111195121-fa6ddc151d63
	k8s.io/cli-runtime v0.0.0-20190227060459-9ff7d311e3cf // indirect
	k8s.io/client-go v10.0.0+incompatible
	sigs.k8s.io/controller-runtime v0.1.1
)

replace (
	github.com/Azure/go-autorest => github.com/Azure/go-autorest v9.1.0+incompatible
	github.com/mitchellh/go-homedir => github.com/mitchellh/go-homedir v1.0.0
	github.com/russross/blackfriday => github.com/russross/blackfriday v1.5.2-0.20180428102519-11635eb403ff // indirect
	k8s.io/api => github.com/kubernetes/api v0.0.0-20180601181742-8b7507fac302
	k8s.io/apiextensions-apiserver => k8s.io/apiextensions-apiserver v0.0.0-20180426153726-e8ab413e0ae1
	k8s.io/apimachinery => k8s.io/apimachinery v0.0.0-20180601181227-17529ec7eadb
	k8s.io/apiserver => k8s.io/apiserver v0.0.0-20180601190550-8378ef881d4f
	k8s.io/cli-runtime => github.com/kubernetes/cli-runtime v0.0.0-20181004125037-79bf4e0b6454
	k8s.io/client-go => github.com/kubernetes/client-go v7.0.0+incompatible
	k8s.io/code-generator/cmd/client-gen => k8s.io/code-generator/cmd/client-gen v0.0.0-20180228050103-7ead8f38b01c
	k8s.io/kubernetes => k8s.io/kubernetes v1.10.4
)
