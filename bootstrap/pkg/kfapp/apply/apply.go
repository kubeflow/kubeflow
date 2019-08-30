package apply

import (
	"errors"
	"fmt"
	"io"
	"os"

	kftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/coordinator"
	log "github.com/sirupsen/logrus"
)

// BootstrapKubeflow is used by the kfctl apply sub-command to take in a configfile
// as a flag and boostrap a KfApp and deploy it
func BootstrapKubeflow(configFilePath string, kfResource kftypes.ResourceEnum) error {
	// Set default app name to kf-app
	appName := "kf-app"

	// Construct KfDef from the configFilePath provided
	kfDef := &kfdefsv3.KfDef{}
	kfDef, err := kfdefsv3.LoadKFDefFromURI(configFilePath)
	if err != nil {
		log.Printf("Unable to create KfDef from config file: %v", err)
	}
	if kfDef.Name != "" {
		log.Warnf("Overriding KfDef.Spec.Name; old value %v; new value %v", kfDef.Name, appName)
	}
	kfDef.Name = appName
	isValid, msg := kfDef.IsValid()
	if !isValid {
		log.Printf("Invalid kfdef: %v", isValid)
		log.Printf("Error validating generated KfDef, please check config file validity: %v", msg)
	}
	cwd, err := os.Getwd()
	if err != nil {
		log.Printf("Error getting current working directory: %v", err)
	}
	fmt.Println("Present working directory is: %v", cwd)
	// Check if current directory is empty and if it is error out
	isEmpty, err := IsCwdEmpty(cwd)
	if !isEmpty && err != nil {
		return fmt.Errorf("Current directory is not empty, please try again in an empty directory: %v", err)
	}
	kfDef.Spec.AppDir = cwd
	if kfDef.Spec.AppDir == "" {
		return errors.New("kfDef App Dir not set")
	}
	log.Warnf("App directory name: %v", kfDef.Spec.AppDir)
	cfgFilePath, err := coordinator.CreateKfAppCfgFile(kfDef)
	if err != nil {
		log.Errorf("Error creating app.yaml from KfDef: %v", err)
		return err
	}

	log.Printf("Syncing Cache")
	err = kfDef.SyncCache()
	if err != nil {
		log.Errorf("Failed to synchronize the cache; error: %v", err)
		return err
	}
	// Save app.yaml because we need to preserve information about the cache.
	if err := kfDef.WriteToFile(cfgFilePath); err != nil {
		log.Errorf("Failed to save KfDef to %v; error %v", cfgFilePath, err)
		return err
	}
	log.Infof("Saved configfile as kfdef in path: %v", cfgFilePath)

	// Load KfApp for Generate and Apply
	KfApp, KfErr := coordinator.LoadKfAppCfgFile(cfgFilePath)
	if KfErr != nil {
		log.Printf("Error loading KfApp from configfilepath: %v", KfErr)
	}
	// Once init is done, we generate and apply subsequently
	log.Println("Kubeflow Generate...")
	generateErr := KfApp.Generate(kfResource)
	if generateErr != nil {
		log.Println("Unable to generate resources for KfApp", generateErr)
		return generateErr
	}
	log.Println("Kubeflow Apply...")
	applyErr := KfApp.Apply(kfResource)
	if applyErr != nil {
		log.Println("Unable to apply resources for KfApp", applyErr)
	}
	return nil
}

// IsCwdEmpty - quick check to determine if the working directory is empty
func IsCwdEmpty(name string) (bool, error) {
	f, err := os.Open(name)
	if err != nil {
		return false, err
	}
	defer f.Close()

	_, err = f.Readdirnames(1)
	if err == io.EOF {
		return true, nil
	}
	return false, err
}
