package builder

import (
	"errors"
	"fmt"
	"io/ioutil"
	"os"
	"path/filepath"
	"strings"

	"github.com/ghodss/yaml"
	gogetter "github.com/hashicorp/go-getter"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfdefsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	log "github.com/sirupsen/logrus"
)

// Set default app name to kf-app
const appName = "kf-app"

// Set default filename for the configfile
const appFile = "app.yaml"

// LoadConfigFile gets a KfDef config and backfills necessary information
// and writes the resultant kfDef to the current working directory
func LoadConfigFile(configFilePath string) (*kfdefsv3.KfDef, *kfapis.KfError) {
	log.SetLevel(log.InfoLevel)

	// Check if current working directory is empty
	cwd, err := isCwdEmpty()
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("%v", err),
		}
	}

	// Creates a temporary directory by default is set to `/tmp` when arguments are ("", "")
	tempDir, err := ioutil.TempDir("", "")
	if err != nil {
		return nil, &kfapis.KfError{
			Code: int(kfapis.INTERNAL_ERROR),
			// See: https://github.com/golang/go/blob/master/src/os/file.go#L352
			Message: fmt.Sprintf("temporary directory does not exist or could not access: %v", err),
		}
	}

	// GetAny is used because configFilePath can be either a URL or a local file
	// one of the design goals for the latest kfctl semantics
	err = gogetter.GetAny(tempDir, configFilePath)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("could not fetch config file %v", err),
		}
	}
	var tempFile string
	err = filepath.Walk(tempDir, func(path string, info os.FileInfo, err error) error {
		tempFile = path
		return nil
	})
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("couldn't read config file %v", err),
		}
	}
	// Read appFile in-memory and unmarshal into KfDef struct
	configFileBytes, err := ioutil.ReadFile(tempFile)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("couldn't read config file %v", err),
		}
	}
	kfDef := &kfdefsv3.KfDef{}
	if err := yaml.Unmarshal(configFileBytes, kfDef); err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not unmarshal config file onto KfDef struct: %v", err),
		}
	}

	// Set kfDef Name to default
	kfDef.Name = appName
	kfDef.Spec.AppDir = cwd
	// Download to Cache
	parts := strings.Split(kfDef.Spec.PackageManager, "@")
	version := "master"
	if len(parts) == 2 {
		version = parts[1]
	}
	cacheDir, cacheDirErr := kftypes.DownloadToCache(cwd, kftypes.ManifestsRepo, version)
	if cacheDirErr != nil || cacheDir == "" {
		log.Fatalf("could not download repo to cache Error %v", cacheDirErr)
	}
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not sync cache to app directory: %v", err),
		}
	}

	// Write KfDef to current directory as app.yaml
	err = kfDef.WriteToFile(cwd + "/" + appFile)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not write kfDef to file: %v", err),
		}
	}

	return kfDef, nil
}

// GetPlatform parses the configfile and gets the platform from the spec
func GetPlatform(kfDef *kfdefsv3.KfDef) kftypes.ResourceEnum {
	if kfDef.Spec.Platform != "" {
		return kftypes.ALL
	}
	return kftypes.K8S
}

// isCwdEmpty - quick check to determine if the working directory is empty
func isCwdEmpty() (string, error) {
	cwd, err := os.Getwd()
	if err != nil {
		return "", err
	}
	files, err := ioutil.ReadDir(cwd)
	if err != nil {
		return "", err
	}
	if len(files) > 0 {
		return "", errors.New("Current working directory not empty")
	}
	return cwd, nil
}
