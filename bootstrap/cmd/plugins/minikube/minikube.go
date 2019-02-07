package main

import (
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/minikube"
)

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	return minikube.GetKfApp(options)
}
