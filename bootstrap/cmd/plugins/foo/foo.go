package main

import (
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/foo"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksonnet"
)

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	_foo := &foo.Foo{
		Ksonnet: ksonnet.GetKfApp(options),
	}
	return _foo
}
