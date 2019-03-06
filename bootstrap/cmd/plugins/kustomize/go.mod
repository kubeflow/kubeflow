module github.com/kubeflow/kubeflow/bootstrap/cmd/plugins/kustomize

require (
	github.com/emicklei/go-restful v2.9.0+incompatible
	github.com/go-openapi/jsonpointer v0.18.0
	github.com/go-openapi/jsonreference v0.18.0
	github.com/go-openapi/swag v0.17.2
	github.com/kubeflow/kubeflow/bootstrap/v2 v2.0.0 // indirect
	github.com/sirupsen/logrus v1.3.0
	github.com/spf13/pflag v1.0.3
	golang.org/x/crypto v0.0.0
	golang.org/x/net v0.0.0
	golang.org/x/oauth2 v0.0.0-20190115181402-5dab4167f31c
	gopkg.in/yaml.v2 v2.2.2
	k8s.io/api v0.0.0-20190301173355-16f65c82b8fa // indirect
	k8s.io/api/v2 v2.0.0
	k8s.io/apiextensions-apiserver v0.0.0-20190116054503-cf30b7cf64c2
	k8s.io/apimachinery v0.0.0-20190301173222-2f7e9cae4418 // indirect
	k8s.io/apimachinery/v2 v2.0.0
	k8s.io/client-go/v2 v2.0.0
	k8s.io/kube-openapi v0.0.0-20190115222348-ced9eb3070a5
	sigs.k8s.io/controller-runtime/v2 v2.0.0
	sigs.k8s.io/kustomize/v2 v2.0.0 // indirect
)

replace (
	github.com/emicklei/go-restful => github.com/emicklei/go-restful v2.8.0+incompatible
	github.com/go-openapi/jsonpointer => github.com/go-openapi/jsonpointer v0.17.0
	github.com/go-openapi/jsonreference => github.com/go-openapi/jsonreference v0.17.0
	github.com/go-openapi/spec => github.com/go-openapi/spec v0.18.0
	github.com/go-openapi/swag => github.com/go-openapi/swag v0.17.0
	github.com/gregjones/httpcache => github.com/gregjones/httpcache v0.0.0-20181110185634-c63ab54fda8f
	github.com/hashicorp/go-getter => github.com/hashicorp/go-getter v1.0.2 // indirect
	github.com/kubeflow/kubeflow/bootstrap => ../../../../bootstrap
	github.com/kubeflow/kubeflow/bootstrap/v2 => ../../../../bootstrap/v2
	github.com/pkg/errors => github.com/pkg/errors v0.8.1
	github.com/spf13/pflag => github.com/spf13/pflag v1.0.3
	golang.org/x/crypto => golang.org/x/crypto v0.0.0-20181203042331-505ab145d0a9
	golang.org/x/net => golang.org/x/net v0.0.0-20180124060956-0ed95abb35c4
	golang.org/x/oauth2 => golang.org/x/oauth2 v0.0.0-20190115181402-5dab4167f31c
	golang.org/x/time => golang.org/x/time v0.0.0-20181108054448-85acf8d2951c
	gopkg.in/yaml.v2 => gopkg.in/yaml.v2 v2.2.2
	k8s.io/api => k8s.io/api v0.0.0-20180601181742-8b7507fac302
	k8s.io/api/v2 => /tmp/v2/k8s.io/api/v2
	k8s.io/apiextensions-apiserver => k8s.io/apiextensions-apiserver v0.0.0-20180601203502-8e7f43002fec
	k8s.io/apiextensions-apiserver/v2 => /tmp/v2/k8s.io/apiextensions-apiserver/v2
	k8s.io/apimachinery => k8s.io/apimachinery v0.0.0-20180601181227-17529ec7eadb
	k8s.io/apimachinery/v2 => /tmp/v2/k8s.io/apimachinery/v2
	k8s.io/client-go/v2 => /tmp/v2/k8s.io/client-go/v2
	k8s.io/kube-openapi => k8s.io/kube-openapi v0.0.0-20190115222348-ced9eb3070a5
	sigs.k8s.io/controller-runtime/v2 => /tmp/v2/sigs.k8s.io/controller-runtime/v2
	sigs.k8s.io/kustomize/v2 => /tmp/v2/sigs.k8s.io/kustomize/v2
)
