package app

import (
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/kfdef/v1alpha1"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/gcp"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/ksonnet"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"os"
	"path"
	"path/filepath"
)

func (cr *CreateRequest) ToKfdef(appDir string, repo string, istio bool) (*kfdefs.KfDef, error) {
	kfDef := &kfdefs.KfDef{
		TypeMeta: metav1.TypeMeta{
			Kind:       "KfDef",
			APIVersion: "kfdef.apps.kubeflow.org/v1alpha1",
		},
		Spec: kfdefs.KfDefSpec{},
	}
	kfDef.Spec.ComponentConfig = cr.AppConfig
	kfDef.Name = cr.Name
	kfDef.Spec.AppDir = appDir
	kfDef.Spec.Platform = kftypes.GCP
	kfDef.Namespace = cr.Namespace
	kfDef.Spec.Version = cr.Version
	kfDef.Spec.Repo = repo
	kfDef.Spec.Project = cr.Project
	// TODO
	//kfDef.Spec.UseBasicAuth = options[string(kftypes.USE_BASIC_AUTH)].(bool)
	kfDef.Spec.UseIstio = istio
	return kfDef, nil
}

func (s *ksServer) DeployWithKfctl(req *CreateRequest) error{
	// pull versioned kubeflow repo
	versionedRegPath, err := s.getRegistryUri(&kstypes.RegistryConfig{
		Name: "kubeflow",
		Repo: "https://github.com/kubeflow/kubeflow.git",
		Version: req.Version,
		Path: "kubeflow",
	})
	if err != nil {
		return err
	}
	versionedKfRepo := filepath.Dir(versionedRegPath)

	// pull source repo to random tmp dir
	repoDir, err := s.CloneRepoToLocal(req.Project, req.Token, GetRepoNameKfctl(req.Project))
	// clean up tmp dir afterwards
	defer os.RemoveAll(repoDir)
	if err != nil {
		return err
	}
	ksAppDir := path.Join(repoDir, GetRepoNameKfctl(req.Project), req.Version, req.Name)
	kfdef, err := req.ToKfdef(ksAppDir, versionedKfRepo, s.installIstio)
	if err != nil {
		return err
	}
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: req.Token,
	})
	ctx := context.Background()

	// run gcp generate / apply
	gcpApp := gcp.BuildKfApp(kfdef, oauth2.NewClient(ctx, ts), ts)
	if err = gcpApp.Generate(kftypes.ALL); err != nil {
		return err
	}
	if err = gcpApp.Apply(kftypes.ALL); err != nil {
		return err
	}

	// run ksonnet generate / apply
	restConfig, err := buildClusterConfig(ctx, req.Token, req.Project, req.Zone, req.Cluster)
	if err != nil {
		return err
	}
	apiConfig := BuildClientCmdApi(restConfig, req.Token)
	ksonnetApp := ksonnet.BuildKfApp(kfdef, restConfig, apiConfig)
	if err = ksonnetApp.Generate(kftypes.ALL); err != nil {
		return err
	}
	if err = ksonnetApp.Apply(kftypes.ALL); err != nil {
		return err
	}
	return nil
}
