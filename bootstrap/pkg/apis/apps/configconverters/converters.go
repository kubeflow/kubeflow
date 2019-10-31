package configconverters

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"io/ioutil"
	netUrl "net/url"
	"strings"

	"github.com/ghodss/yaml"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfconfig"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	log "github.com/sirupsen/logrus"
)

type Converter interface {
	ToKfConfig(kfdefBytes []byte) (*kfconfig.KfConfig, error)
	ToKfDefSerialized(config kfconfig.KfConfig) ([]byte, error)
}

const (
	Api = "kfdef.apps.kubeflow.org"
)

func isValidUrl(toTest string) bool {
	_, err := netUrl.ParseRequestURI(toTest)
	if err != nil {
		return false
	} else {
		return true
	}
}

// LoadConfigFromURI reads the kfdef from a remote URI or local file,
// and returns the kfconfig.
// It will set the AppDir and ConfigFilename in kfconfig:
//   AppDir = cwd if configFile is remote, or it will be the dir of configFile.
//   ConfigFilename = the file name of configFile.
func LoadConfigFromURI(configFile string, appDir string) (*kfconfig.KfConfig, error) {
	if configFile == "" {
		return nil, fmt.Errorf("config file must be the URI of a KfDef spec")
	}

	isRemoteFile, err := utils.IsRemoteFile(configFile)
	if err != nil {
		return nil, err
	}

	var configFileBytes []byte
	// If config is remote, get file content via http get.
	if isRemoteFile {
		var client http.Client
		resp, err := client.Get(configFile)
		if err != nil || resp == nil || resp.StatusCode != http.StatusOK {
			return nil, fmt.Errorf("Failed fetching file %v: %v", configFile, err)
		}
		defer resp.Body.Close()
		configFileBytes, err = ioutil.ReadAll(resp.Body)
		if err != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: fmt.Sprintf("could not read from config file %s: %v", configFile, err),
			}
		}
	} else {
		// Read contents
		configFileBytes, err = ioutil.ReadFile(configFile)
		if err != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INTERNAL_ERROR),
				Message: fmt.Sprintf("could not read from config file %s: %v", configFile, err),
			}
		}
	}

	// Check API version.
	var obj map[string]interface{}
	if err = yaml.Unmarshal(configFileBytes, &obj); err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("invalid config file format: %v", err),
		}
	}
	apiVersion, ok := obj["apiVersion"]
	if !ok {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: "invalid config: apiVersion is not found.",
		}
	}
	apiVersionSeparated := strings.Split(apiVersion.(string), "/")
	if len(apiVersionSeparated) < 2 || apiVersionSeparated[0] != Api {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("invalid config: apiVersion must be in the format of %v/<version>, got %v", Api, apiVersion),
		}
	}

	// Add this check because kfctl binary can not properly install Kubeflow using v1alpha1 configuration.
	// See https://github.com/kubeflow/kubeflow/issues/4371.
	if apiVersionSeparated[1] == "v1alpha1" {
		return nil, &kfapis.KfError{
			Code: int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf(
				"KfDef version v1alpha1 is not supported by this binary. Please use configs at %s for to deploy Kubeflow 0.7 or use old kfctl at %s to deploy Kubeflow 0.6",
				"https://github.com/kubeflow/manifests/tree/v0.7-branch/kfdef",
				"https://github.com/kubeflow/kubeflow/releases/tag/v0.6.2",
			)}
	}

	converters := map[string]Converter{
		"v1alpha1": V1alpha1{},
		"v1beta1":  V1beta1{},
	}

	converter, ok := converters[apiVersionSeparated[1]]
	if !ok {
		versions := []string{}
		for key := range converters {
			versions = append(versions, key)
		}
		return nil, &kfapis.KfError{
			Code: int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("invalid config: version not supported; supported versions: %v, got %v",
				strings.Join(versions, ", "), apiVersionSeparated[1]),
		}
	}

	kfconfig, err := converter.ToKfConfig(configFileBytes)
	if err != nil {
		log.Errorf("Failed to convert kfdef to kfconfig: %v", err)
		return nil, err
	}

	// Set the AppDir for kfconfig
	if appDir != "" {
		kfconfig.Spec.AppDir = appDir
	} else {
		if isRemoteFile {
			cwd, err := os.Getwd()
			if err != nil {
				return nil, &kfapis.KfError{
					Code:    int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("could not get current directory for KfDef %v", err),
				}
			}
			kfconfig.Spec.AppDir = cwd
		} else {
			kfconfig.Spec.AppDir = filepath.Dir(configFile)
		}
	}
	kfconfig.Spec.ConfigFileName = filepath.Base(configFile)
	return kfconfig, nil
}

func WriteConfigToFile(config kfconfig.KfConfig) error {
	if config.Spec.AppDir == "" {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: "No AppDir, cannot write to file.",
		}
	}
	if config.Spec.ConfigFileName == "" {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: "No ConfigFileName, cannot write to file.",
		}
	}
	filename := filepath.Join(config.Spec.AppDir, config.Spec.ConfigFileName)
	converters := map[string]Converter{
		"v1alpha1": V1alpha1{},
		"v1beta1":  V1beta1{},
	}
	apiVersionSeparated := strings.Split(config.APIVersion, "/")
	if len(apiVersionSeparated) < 2 || apiVersionSeparated[0] != Api {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("invalid config: apiVersion must be in the format of %v/<version>, got %v", Api, config.APIVersion),
		}
	}

	converter, ok := converters[apiVersionSeparated[1]]
	if !ok {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("invalid config: unable to find converter for version %v", config.APIVersion),
		}
	}

	kfdefBytes, err := converter.ToKfDefSerialized(config)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("error when marshaling KfDef: %v", err),
		}
	}
	err = ioutil.WriteFile(filename, kfdefBytes, 0644)
	if err != nil {
		return &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("error when writing KfDef: %v", err),
		}
	}
	return nil
}
