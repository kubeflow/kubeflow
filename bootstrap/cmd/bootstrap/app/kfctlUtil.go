package app

import (
	"encoding/base64"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/kfdef/v1alpha1"
	log "github.com/sirupsen/logrus"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/gcp"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/kfapp/ksonnet"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"os"
	"path"
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
	kfDef.Spec.Email = cr.Email
	kfDef.Spec.Platform = kftypes.GCP
	kfDef.Namespace = cr.Namespace
	kfDef.Spec.Version = cr.KfVersion
	kfDef.Spec.Repo = repo
	kfDef.Spec.Project = cr.Project
	kfDef.Spec.IpName = cr.IpName
	kfDef.Spec.Zone = cr.Zone
	if cr.Username != "" {
		kfDef.Spec.UseBasicAuth = true
	}
	kfDef.Spec.SkipInitProject = true
	kfDef.Spec.UseIstio = istio
	return kfDef, nil
}

func (s *ksServer) DeployWithKfctl(req *CreateRequest) error{
	// pull versioned kubeflow repo
	ksRegistry := kfdefs.GetDefaultRegistry()
	ksRegistry.Version = req.KfVersion
	versionedRegPath, err := s.getRegistryUri(ksRegistry)
	if err != nil {
		return err
	}

	// pull source repo to random tmp dir
	repoDir, err := s.CloneRepoToLocal(req.Project, req.Token, GetRepoNameKfctl(req.Project))
	// clean up tmp dir afterwards
	defer os.RemoveAll(repoDir)
	if err != nil {
		return err
	}
	ksAppDir := path.Join(repoDir, GetRepoNameKfctl(req.Project), req.KfVersion, req.Name)
	kfdef, err := req.ToKfdef(ksAppDir, versionedRegPath, s.installIstio)
	if err != nil {
		return err
	}
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: req.Token,
	})
	ctx := context.Background()

	var gcpApp kftypes.KfApp
	// run gcp generate / apply
	if kfdef.Spec.UseBasicAuth {
		UsernameData, err := base64.StdEncoding.DecodeString(req.Username)
		if err != nil {
			log.Errorf("Failed decoding username: %v", err)
			return err
		}
		gcpApp = gcp.BuildKfApp(kfdef, oauth2.NewClient(ctx, ts), ts, req.StorageOption, req.SAClientId,
			string(UsernameData), req.PasswordHash, "", "")
	} else {
		gcpApp = gcp.BuildKfApp(kfdef, oauth2.NewClient(ctx, ts), ts, req.StorageOption, req.SAClientId,
			"", "", req.ClientId, req.ClientSecret)
	}
	
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
	err = SaveAppToRepo(req.Email, path.Join(repoDir, GetRepoNameKfctl(req.Project)))
	if err != nil {
		log.Errorf("There was a problem saving config to cloud repo; %v", err)
		return err
	}
	return nil
}
