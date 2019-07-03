package app

import (
	"fmt"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	kfdefsv2 "github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/v1alpha1"
	metav1 "k8s.io/apimachinery/v2/pkg/apis/meta/v1"
)

// ToKfdef will output CreateRequest in format of kfdefs.KfDef
func (cr *CreateRequest) ToKfdef(appDir string, repo string, istio bool) (*kfdefsv2.KfDef, error) {
	kfDef := &kfdefsv2.KfDef{
		TypeMeta: metav1.TypeMeta{
			Kind:       "KfDef",
			APIVersion: "kfdef.apps.kubeflow.org/v1alpha1",
		},
		Spec: kfdefsv2.KfDefSpec{},
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

func (s *ksServer) DeployWithKfctl(req *CreateRequest) error {
	// TODO(jlewi): jlewi is in the midst of refactoring click to deploy.
	// Comment out all this code because otherwise it won't build
	// and wouldn't be functional otherwise.
	// https://github.com/kubeflow/kubeflow/pull/3534 has a preview of the changes.
	return fmt.Errorf("Not implemented.")
	// pull versioned kubeflow repo
	//ksRegistry := kfdefsv2.GetDefaultRegistry()
	//ksRegistry.Version = req.KfVersion
	//versionedRegPath, err := s.getRegistryUri(ksRegistry)
	//if err != nil {
	//	return err
	//}
	//
	//// pull source repo to random tmp dir
	//repoDir, err := s.CloneRepoToLocal(req.Project, req.Token, GetRepoNameKfctl(req.Project))
	//// clean up tmp dir afterwards
	//defer os.RemoveAll(repoDir)
	//if err != nil {
	//	return err
	//}
	//ksAppDir := path.Join(repoDir, GetRepoNameKfctl(req.Project), req.KfVersion, req.Name)
	//kfdef, err := req.ToKfdef(ksAppDir, versionedRegPath, s.installIstio)
	//if err != nil {
	//	return err
	//}
	//gcpArgs := gcp.GcpArgs{
	//	AccessToken:   req.Token,
	//	StorageOption: req.StorageOption,
	//	SAClientId:    req.SAClientID,
	//}
	////var gcpApp kftypes.KfApp
	//// run gcp generate / apply
	//if kfdef.Spec.UseBasicAuth {
	//	UsernameData, err := base64.StdEncoding.DecodeString(req.Username)
	//	if err != nil {
	//		log.Errorf("Failed decoding username: %v", err)
	//		return err
	//	}
	//	gcpArgs.Username = string(UsernameData)
	//	gcpArgs.EncodedPassword = req.PasswordHash
	//} else {
	//	gcpArgs.OauthID = req.ClientID
	//	gcpArgs.OauthSecret = req.ClientSecret
	//}
	//argBytes, err := json.Marshal(gcpArgs)
	//if err != nil {
	//	log.Errorf("Failed encoding gcp args: %v", err)
	//	return err
	//}
	//coord := coordinator.GetKfApp(kfdef)
	//
	//if err = coord.Generate(kftypes.ALL); err != nil {
	//	return err
	//}
	//if err = coord.Apply(kftypes.ALL); err != nil {
	//	return err
	//}
	//
	//err = SaveAppToRepo(req.Email, path.Join(repoDir, GetRepoNameKfctl(req.Project)))
	//if err != nil {
	//	log.Errorf("There was a problem saving config to cloud repo; %v", err)
	//	return err
	//}
	//return nil
}
