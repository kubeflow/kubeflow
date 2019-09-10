package app

import (
	kftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// ToKfdef will output CreateRequest in format of kfdefs.KfDef
func (cr *CreateRequest) ToKfdef(appDir string, repo string, istio bool) (*kfdefsv3.KfDef, error) {
	kfDef := &kfdefsv3.KfDef{
		TypeMeta: metav1.TypeMeta{
			Kind:       "KfDef",
			APIVersion: "kfdef.apps.kubeflow.org/v1alpha1",
		},
		Spec: kfdefsv3.KfDefSpec{},
	}
	kfDef.Spec.ComponentConfig = cr.AppConfig
	kfDef.Name = cr.Name
	kfDef.Spec.AppDir = appDir
	kfDef.Spec.Email = cr.Email
	kfDef.Spec.Platform = kftypes.GCP
	kfDef.Namespace = cr.Namespace
	kfDef.Spec.Version = cr.KfVersion
	kfDef.Spec.Repo = repo
	kfDef.Spec.Project = cr.Project
	kfDef.Spec.IpName = cr.IPName
	kfDef.Spec.Zone = cr.Zone
	if cr.Username != "" {
		kfDef.Spec.UseBasicAuth = true
	}
	kfDef.Spec.SkipInitProject = true
	kfDef.Spec.UseIstio = istio
	return kfDef, nil
}
