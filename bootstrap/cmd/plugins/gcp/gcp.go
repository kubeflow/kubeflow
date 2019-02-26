package main

import (
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/gcp"
)

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	return gcp.GetKfApp(options)
}
