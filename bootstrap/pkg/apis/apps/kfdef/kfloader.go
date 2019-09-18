package kfdef

import (
	"fmt"
	"github.com/ghodss/yaml"
	gogetter "github.com/hashicorp/go-getter"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kfdefv1alpha1 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	kfdefv1beta1 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1beta1"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	netUrl "net/url"
	"path"
	"strings"
)

const (
	KfConfigFile = "app.yaml"
	Api          = "kfdef.apps.kubeflow.org"
)

func isValidUrl(toTest string) bool {
	_, err := netUrl.ParseRequestURI(toTest)
	if err != nil {
		return false
	} else {
		return true
	}
}

func loadKfDefV1Alpha1(configs []byte) (*kfdefv1beta1.KfDef, error) {
	alphaConfig := &kfdefv1alpha1.KfDef{}
	if err := yaml.Unmarshal(configs, alphaConfig); err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("invalid config file format: %v", err),
		}
	}

	return nil, fmt.Errorf("Not implemented")
}

func loadKfDefV1Beta1(configs []byte) (*kfdefv1beta1.KfDef, error) {
	kfdef := &kfdefv1beta1.KfDef{}
	if err := yaml.Unmarshal(configs, kfdef); err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INVALID_ARGUMENT),
			Message: fmt.Sprintf("invalid config file format: %v", err),
		}
	}
	return kfdef, nil
}

func LoadKfDefFromURI(configFile string) (*kfdefv1beta1.KfDef, error) {
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
	appFile := path.Join(appDir, KfConfigFile)

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

	return nil, nil
}
