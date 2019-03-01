module github.com/kubeflow/kubeflow/bootstrap/cmd/plugins/kustomize

require (
	bitbucket.org/ww/goautoneg v0.0.0-20120707110453-75cd24fc2f2c // indirect
	github.com/PuerkitoBio/purell v1.1.0
	github.com/PuerkitoBio/urlesc v0.0.0-20170810143723-de5bf2ad4578
	github.com/davecgh/go-spew v1.1.1
	github.com/emicklei/go-restful/v2 v2.7.1
	github.com/evanphx/json-patch v4.1.0+incompatible
	github.com/ghodss/yaml v1.0.0
	github.com/go-openapi/jsonpointer v0.17.0
	github.com/go-openapi/jsonreference v0.17.0
	github.com/go-openapi/spec v0.18.0
	github.com/go-openapi/swag v0.17.0
	github.com/gogo/protobuf v1.2.0
	github.com/golang/glog v0.0.0-20160126235308-23def4e6c14b
	github.com/golang/protobuf v1.2.0
	github.com/google/gofuzz v0.0.0-20170612174753-24818f796faf
	github.com/googleapis/gnostic v0.2.0
	github.com/inconshreveable/mousetrap v1.0.0
	github.com/json-iterator/go v1.1.5
	github.com/kubeflow/kubeflow/bootstrap v0.0.0-20190301192226-0524257ed83d // indirect
	github.com/mailru/easyjson v0.0.0-20180823135443-60711f1a8329
	github.com/modern-go/concurrent v0.0.0-20180306012644-bacd9c7ef1dd
	github.com/modern-go/reflect2 v1.0.1
	github.com/pkg/errors v0.8.1
	github.com/spf13/cobra v0.0.3
	github.com/spf13/pflag v1.0.3
	golang.org/x/net v0.0.0-20190110200230-915654e7eabc
	golang.org/x/text v0.3.0
	gopkg.in/inf.v0 v0.9.1
	gopkg.in/yaml.v2 v2.2.2
	k8s.io/api v0.0.0-20190301173355-16f65c82b8fa
	k8s.io/apiextensions-apiserver v0.0.0-20190301175221-f5208066c302 // indirect
	k8s.io/apimachinery v0.0.0-20190111195121-fa6ddc151d63
	k8s.io/apiserver v0.0.0-20190301174102-a63f6f9c2ab2 // indirect
	k8s.io/client-go v10.0.0+incompatible
	k8s.io/component-base v0.0.0-20190301173817-1925c57e3358 // indirect
	k8s.io/kube-openapi v0.0.0-20190115222348-ced9eb3070a5
	k8s.io/utils v0.0.0-20190221042446-c2654d5206da // indirect
	sigs.k8s.io/structured-merge-diff v0.0.0-20190218090210-8c17deb35728 // indirect
)

replace (
	github.com/kubeflow/kubeflow/bootstrap => ../../../../bootstrap
	k8s.io/api => k8s.io/api v0.0.0-20190222213804-5cb15d344471
	k8s.io/apiextensions-apiserver => k8s.io/apiextensions-apiserver v0.0.0-20190228180357-d002e88f6236
	k8s.io/apimachinery => k8s.io/apimachinery v0.0.0-20190221213512-86fb29eff628
	k8s.io/apiserver => k8s.io/apiserver v0.0.0-20190228174905-79427f02047f
	k8s.io/client-go => k8s.io/client-go v10.0.0+incompatible
)
