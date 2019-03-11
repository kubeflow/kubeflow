module github.com/kubeflow/kubeflow/bootstrap

require (
	cloud.google.com/go v0.34.0
	github.com/cenkalti/backoff v2.1.1+incompatible
	github.com/deckarep/golang-set v1.7.1
	github.com/ghodss/yaml v1.0.0
	github.com/go-kit/kit v0.8.0
	github.com/go-openapi/jsonpointer v0.18.0
	github.com/go-openapi/jsonreference v0.18.0
	github.com/go-openapi/swag v0.17.2
	github.com/golang/glog v0.0.0-20160126235308-23def4e6c14b
	github.com/hashicorp/go-getter v1.0.2
	github.com/imdario/mergo v0.3.6
	github.com/ksonnet/ksonnet v0.13.1
	github.com/kubeflow/kubeflow/bootstrap/v2 v2.0.0
	github.com/mitchellh/go-homedir v1.0.0
	github.com/onrik/logrus v0.2.1
	github.com/onsi/gomega v1.4.3
	github.com/prometheus/client_golang v0.9.2
	github.com/sirupsen/logrus v1.3.0
	github.com/spf13/afero v1.2.0
	github.com/spf13/cobra v0.0.3
	github.com/spf13/pflag v1.0.3
	github.com/spf13/viper v1.3.1
	golang.org/x/crypto v0.0.0
	golang.org/x/net v0.0.0-20190108225652-1e06a53dbb7e
	golang.org/x/oauth2 v0.0.0-20190115181402-5dab4167f31c
	google.golang.org/api v0.1.0
	google.golang.org/genproto v0.0.0-20190111180523-db91494dd46c
	gopkg.in/resty.v1 v1.11.0
	gopkg.in/yaml.v2 v2.2.2
	k8s.io/api v0.0.0-20180308224125-73d903622b73
	k8s.io/api/v2 v2.0.0
	k8s.io/apiextensions-apiserver v0.0.0-20190116054503-cf30b7cf64c2
	k8s.io/apiextensions-apiserver/v2 v2.0.0
	k8s.io/apimachinery v0.0.0-20190111195121-fa6ddc151d63
	k8s.io/apimachinery/v2 v2.0.0
	k8s.io/client-go v7.0.0+incompatible
	k8s.io/client-go/v2 v2.0.0
	sigs.k8s.io/controller-runtime v0.1.1
	sigs.k8s.io/controller-runtime/v2 v2.0.0
)

replace (
	github.com/Azure/go-autorest => github.com/Azure/go-autorest v9.1.0+incompatible
	github.com/go-openapi/jsonpointer => github.com/go-openapi/jsonpointer v0.17.0
	github.com/go-openapi/jsonreference => github.com/go-openapi/jsonreference v0.17.0
	github.com/go-openapi/spec => github.com/go-openapi/spec v0.18.0
	github.com/go-openapi/swag => github.com/go-openapi/swag v0.17.0
	github.com/kubeflow/kubeflow/bootstrap => ../bootstrap
	github.com/kubeflow/kubeflow/bootstrap/v2 => ../bootstrap/v2
	github.com/mitchellh/go-homedir => github.com/mitchellh/go-homedir v1.0.0
	github.com/russross/blackfriday => github.com/russross/blackfriday v1.5.2-0.20180428102519-11635eb403ff // indirect
	golang.org/x/crypto => golang.org/x/crypto v0.0.0-20181203042331-505ab145d0a9
	golang.org/x/net => golang.org/x/net v0.0.0-20180124060956-0ed95abb35c4
	k8s.io/api => k8s.io/api v0.0.0-20180601181742-8b7507fac302
	k8s.io/api/v2 => /tmp/v2/k8s.io/api/v2
	k8s.io/apiextensions-apiserver => k8s.io/apiextensions-apiserver v0.0.0-20180601203502-8e7f43002fec
	k8s.io/apiextensions-apiserver/v2 => /tmp/v2/k8s.io/apiextensions-apiserver/v2
	k8s.io/apimachinery => k8s.io/apimachinery v0.0.0-20180601181227-17529ec7eadb
	k8s.io/apimachinery/v2 => /tmp/v2/k8s.io/apimachinery/v2
	k8s.io/apiserver => k8s.io/apiserver v0.0.0-20180601190550-8378ef881d4f
	k8s.io/cli-runtime => k8s.io/cli-runtime v0.0.0-20180907072557-b3b289918979
	k8s.io/client-go => k8s.io/client-go v7.0.0+incompatible
	k8s.io/client-go/v2 => /tmp/v2/k8s.io/client-go/v2
	k8s.io/kubernetes => k8s.io/kubernetes v1.10.4
	sigs.k8s.io/controller-runtime => sigs.k8s.io/controller-runtime v0.1.1
	sigs.k8s.io/controller-runtime/v2 => /tmp/v2/sigs.k8s.io/controller-runtime/v2
	sigs.k8s.io/kustomize/v2 => /tmp/v2/sigs.k8s.io/kustomize/v2
)
