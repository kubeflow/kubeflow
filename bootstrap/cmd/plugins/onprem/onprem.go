package main

import (
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	cltypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/onprem"
)

func GetKfApp(client *cltypes.KfDef) kftypes.KfApp {
	return onprem.GetKfApp(client)
}
