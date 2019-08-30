package apply

import (
	"errors"
	"fmt"
	"io"
	"os"

	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/coordinator"
	log "github.com/sirupsen/logrus"
)

// Set default app name to kf-app
const appName = "kf-app"

var kfErr = &kfapis.KfError{
	Code:    int(kfapis.INTERNAL_ERROR),
	Message: fmt.Sprintf("error"),
}

// BootstrapKubeflow is used by the kfctl apply sub-command to take in a configfile
// as a flag and boostrap a KfApp and deploy it
func BootstrapKubeflow(configFilePath string, kfResource kftypes.ResourceEnum) error {
	log.SetLevel(log.InfoLevel)
	// Construct KfDef from the configFilePath provided
	kfDef, err := kfdefsv3.LoadKFDefFromURI(configFilePath)
	if err != nil {
		kfErr.Message = fmt.Sprintf("Error loading KfDef: %v", err)
		return kfErr
	}
	if kfDef.Name != "" {
		log.Infof("Overriding KfDef.Spec.Name; old value %v; new value %v", kfDef.Name, appName)
	}
	kfDef.Name = appName
	isValid, msg := kfDef.IsValid()
	if !isValid {
		log.Warnf("Invalid kfdef: %v", isValid)
		log.Errorf("Error validating generated KfDef, please check config file validity: %v", msg)
	}
	cwd, err := os.Getwd()
	if err != nil {
		kfErr.Message = fmt.Sprintf("Error getting current working directory: %v", err)
		return kfErr
	}
	log.Info("Present working directory is: %v", cwd)
	// Check if current directory is empty and if it is error out
	_, err = isCwdEmpty(cwd)
	if err != nil {
		kfErr.Message = fmt.Sprintf("Current working directory is not empty: %v", err)
		return err
	}
	kfDef.Spec.AppDir = cwd
	if kfDef.Spec.AppDir == "" {
		return errors.New("kfDef App Dir not set")
	}
	log.Infof("App directory name: %v", kfDef.Spec.AppDir)
	cfgFilePath, err := coordinator.CreateKfAppCfgFile(kfDef)
	if err != nil {
		kfErr.Message = fmt.Sprintf("Error creating app.yaml: %v", err)
		return kfErr
	}
	err = kfDef.SyncCache()
	if err != nil {
		kfErr.Message = fmt.Sprintf("Error syncing cache: %v", err)
		return kfErr
	}
	// Save app.yaml because we need to preserve information about the cache.
	if err = kfDef.WriteToFile(cfgFilePath); err != nil {
		kfErr.Message = fmt.Sprintf("error saving app.yaml")
		return kfErr
	}
	log.Infof("Saved configfile as kfdef in path: %v", cfgFilePath)

	// Load KfApp for Generate and Apply
	KfApp, err := coordinator.LoadKfAppCfgFile(cfgFilePath)
	if err != nil {
		kfErr.Message = fmt.Sprintf("failed to load kfapp: %v", err)
		return kfErr
	}
	// Once init is done, we generate and apply subsequently
	log.Println("Kubeflow Generate...")
	err = KfApp.Generate(kfResource)
	if err != nil {
		kfErr.Message = fmt.Sprintf("error generating config for kfapp: %v", err)
		return kfErr
	}
	log.Println("Kubeflow Apply...")
	err = KfApp.Apply(kfResource)
	if err != nil {
		kfErr.Message = fmt.Sprintf("error apply config on cluster: %v", err)
		return kfErr
	}
	return nil
}

// isCwdEmpty - quick check to determine if the working directory is empty
func isCwdEmpty(name string) (bool, error) {
	f, err := os.Open(name)
	if err != nil {
		return false, err
	}
	defer f.Close()

	_, err = f.Readdirnames(1)
	if err == io.EOF {
		return true, nil
	}
	return false, errors.New("current working directory not empty")
}
