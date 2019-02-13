package main

import (
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/foo"
)

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	return foo.GetKfApp(options)
}
