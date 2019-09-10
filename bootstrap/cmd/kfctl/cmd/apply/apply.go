package apply

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"

	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/coordinator"
	log "github.com/sirupsen/logrus"
)

// Set default app name to kf-app
const appName = "kf-app"

var kfInternalErr = &kfapis.KfError{
	Code:    int(kfapis.INTERNAL_ERROR),
	Message: fmt.Sprintf("error"),
}

var kfInvalidArgErr = &kfapis.KfError{
	Code:    int(kfapis.INVALID_ARGUMENT),
	Message: fmt.Sprintf("error"),
}

// BootstrapKubeflow is used by the kfctl apply sub-command to take in a configfile
// as a flag and boostrap a KfApp and deploy it
func BootstrapKubeflow(configFilePath string, kfResource kftypes.ResourceEnum) *kfapis.KfError {
	log.SetLevel(log.InfoLevel)
	// Construct KfDef from the configFilePath provided
	kfDef, err := kfdefsv3.LoadKFDefFromURI(configFilePath)
	if err != nil {
		kfInvalidArgErr.Message = fmt.Sprintf("Error loading KfDef from configfile: %v", err)
		return kfInvalidArgErr
	}
	if kfDef.Name != "" {
		log.Infof("Overriding KfDef.Spec.Name; old value %v; new value %v", kfDef.Name, appName)
	}
	kfDef.Name = appName
	isValid, msg := kfDef.IsValid()
	if !isValid {
		log.Warnf("Invalid kfdef!")
		kfInvalidArgErr.Message = fmt.Sprintf("Error validating KfDef, please check configfile: %v", msg)
		return kfInvalidArgErr
	}
	err = isCwdEmpty()
	if err != nil {
		kfInternalErr.Message = fmt.Sprintf("Current working directory is not empty: %v", err)
		return kfInternalErr
	}
	kfDef.Spec.AppDir, err = os.Getwd()
	if err != nil {
		kfInvalidArgErr.Message = fmt.Sprintf("Couldn't set AppDir: %v", err)
		return kfInvalidArgErr
	}
	log.Infof("App directory name: %v", kfDef.Spec.AppDir)
	platform := kfDef.Spec.Platform
	if platform != "" {
		kfResource = kftypes.ALL
	}
	cfgFilePath, err := coordinator.CreateKfAppCfgFile(kfDef)
	if err != nil {
		kfInternalErr.Message = fmt.Sprintf("Error creating app.yaml: %v", err)
		return kfInternalErr
	}
	err = kfDef.SyncCache()
	if err != nil {
		kfInternalErr.Message = fmt.Sprintf("Error syncing cache: %v", err)
		return kfInternalErr
	}
	// Save app.yaml because we need to preserve information about the cache.
	if err = kfDef.WriteToFile(cfgFilePath); err != nil {
		kfInternalErr.Message = fmt.Sprintf("error saving app.yaml")
		return kfInternalErr
	}
	log.Infof("Saved configfile as kfdef in path: %v", cfgFilePath)

	// Load KfApp for Generate and Apply
	KfApp, err := coordinator.LoadKfAppCfgFile(cfgFilePath)
	if err != nil {
		kfInternalErr.Message = fmt.Sprintf("failed to load kfapp: %v", err)
		return kfInternalErr
	}
	// Once init is done, we generate and apply subsequently
	log.Println("Kubeflow Generate...")
	err = KfApp.Generate(kfResource)
	if err != nil {
		kfInternalErr.Message = fmt.Sprintf("error generating config for kfapp: %v", err)
		return kfInternalErr
	}
	log.Println("Kubeflow Apply...")
	err = KfApp.Apply(kfResource)
	if err != nil {
		kfInternalErr.Message = fmt.Sprintf("error apply config on cluster: %v", err)
		return kfInternalErr
	}
	return nil
}

// isCwdEmpty - quick check to determine if the working directory is empty
func isCwdEmpty() error {
	cwd, err := os.Getwd()
	if err != nil {
		return err
	}
	files, err := ioutil.ReadDir(cwd)
	if err != nil {
		return err
	}
	if len(files) > 0 {
		return errors.New("Current working directory not empty")
	}
	return nil
}
