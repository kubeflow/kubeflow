package main

import (
	kftypesv2 "github.com/kubeflow/kubeflow/kfctl/v2/pkg/apis/apps"
	cltypesv2 "github.com/kubeflow/kubeflow/kfctl/v2/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/kfctl/v2/pkg/kfapp/dockerfordesktop"
)

func GetKfApp(client *cltypesv2.KfDef, _ kftypesv2.Platform) kftypesv2.KfApp {
	return dockerfordesktop.GetKfApp(client)
}
