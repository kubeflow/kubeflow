package configconverters

import (
	"fmt"
	"os"

	"github.com/ghodss/yaml"
	gogetter "github.com/hashicorp/go-getter"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kfconfig "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfconfig"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	netUrl "net/url"
	"path"
	"strings"
)

type Converter interface {
	ToKfConfig(appdir string, kfdefBytes []byte) (*kfconfig.KfConfig, error)
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

func LoadConfigFromURI(configFile string) (*kfconfig.KfConfig, error) {
	if configFile == "" {
		return nil, fmt.Errorf("config file must be the URI of a KfDef spec")
	}

	// TODO(jlewi): We should check if configFile doesn't specify a protocol or the protocol
	// is file:// then we can just read it rather than fetching with go-getter.
	appDir, err := ioutil.TempDir("", "")
	if err != nil {
		return nil, fmt.Errorf("Create a temporary directory to copy the file to.")
	}
	// Open config file
	//
	// TODO(jlewi): Should we use hashicorp go-getter.GetAny here? We use that to download
	// the tarballs for the repos. Maybe we should use that here as well to be consistent.
	appFile := path.Join(appDir, "tmp_app.yaml")

	log.Infof("Downloading %v to %v", configFile, appFile)
	configFileUri, err := netUrl.Parse(configFile)
	if err != nil {
		log.Errorf("could not parse configFile url")
	}
	if isValidUrl(configFile) {
		errGet := gogetter.GetFile(appFile, configFile)
		if errGet != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("could not fetch specified config %s: %v", configFile, err),
			}
		}
	} else {
		g := new(gogetter.FileGetter)
		g.Copy = true
		errGet := g.GetFile(appFile, configFileUri)
		if errGet != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("could not fetch specified config %s: %v", configFile, err),
			}
		}
	}

	// Read contents
	configFileBytes, err := ioutil.ReadFile(appFile)
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not read from config file %s: %v", configFile, err),
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
	cwd, err := os.Getwd()
	if err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not get current directory for KfDef %v", err),
		}
	}

	return converter.ToKfConfig(cwd, configFileBytes)
}

func isCwdEmpty() string {
	cwd, _ := os.Getwd()
	files, _ := ioutil.ReadDir(cwd)
	if len(files) > 1 {
		return ""
	}
	return cwd
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
