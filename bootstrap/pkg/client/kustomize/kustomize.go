/*
Copyright The Kubernetes Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package kustomize

import (
	"context"
	"fmt"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	"golang.org/x/oauth2/google"
	"google.golang.org/api/iam/v1"
	"io/ioutil"
	"path/filepath"
)

// Kustomize implements KfApp Interface
// It should include functionality needed for the kustomize platform
// In addition to `kustomize build`, there is `kustomize edit ...`
// As noted below there are lots of different ways to use edit
//  kustomize edit add configmap my-configmap --from-file=my-key=file/path --from-literal=my-literal=12345
//  kustomize edit add configmap my-configmap --from-file=file/path
//  kustomize edit add configmap my-configmap --from-env-file=env/path.env
//  kustomize edit add configmap NAME --from-literal=k=v
//  kustomize edit add resource <filepath>
//  kustomize edit add patch <filepath>
//  kustomize edit add base <filepath1>,<filepath2>,<filepath3>
//  kustomize edit set nameprefix <prefix-value>

// A good example is kustomize/pkg/examplelayout/simple
// which creates an instance from a package, this may be the most similar to ksonnet packages
// and is taken from [Declarative Application Management in Kubernetes]
// (https://docs.google.com/document/d/1cLPGweVEYrVqQvBLJg6sxV-TrE5Rm2MNOBA_cxZP2WU)
type Kustomize struct {
	//Add additional types required for kustomize
}

func GetKfApp(_ map[string]interface{}) kftypes.KfApp {
	return &Kustomize{}
}

func (kustomize *Kustomize) Apply(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	return nil
}

func (kustomize *Kustomize) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	return nil
}

func (kustomize *Kustomize) generate(options map[string]interface{}) error {
	appDir := ""
	if options[string(kftypes.APPDIR)] != nil {
		appDir = options[string(kftypes.APPDIR)].(string)
	}
	email := ""
	if options[string(kftypes.EMAIL)] != nil {
		email = options[string(kftypes.EMAIL)].(string)
	}
	cfgFilePath := filepath.Join(appDir, "auth.json")
	// created key can be used to make signed jwt requests
	// see https://developers.google.com/identity/protocols/OAuth2ServiceAccount#callinganapi
	key, keyErr := kustomize.createKey(email)
	if keyErr != nil {
		return fmt.Errorf("could not create key Error: %v", keyErr)
	}
	buf, bufErr := key.MarshalJSON()
	if bufErr != nil {
		return fmt.Errorf("could not marshal key to json Error: %v", bufErr)
	}
	cfgFilePathErr := ioutil.WriteFile(cfgFilePath, buf, 0644)
	if cfgFilePathErr != nil {
		return fmt.Errorf("could not write key file Error: %v", cfgFilePathErr)
	}
	return nil
}

// kfctl generate all -V --email <service_account_name>@<project>.iam.gserviceaccount.com
func (kustomize *Kustomize) Generate(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	switch resources {
	case kftypes.K8S:
	case kftypes.ALL:
		fallthrough
	case kftypes.PLATFORM:
		generateErr := kustomize.generate(options)
		if generateErr != nil {
			return fmt.Errorf("kustomize generate failed Error: %v", generateErr)
		}
	}
	return nil
}

// kfctl init kustomize -V --platform kustomize --project <project>
func (kustomize *Kustomize) Init(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	return nil
}

// this is from https://cloud.google.com/iam/docs/creating-managing-service-account-keys#iam-service-account-keys-create-go
func (kustomize *Kustomize) createKey(serviceAccountEmail string) (*iam.ServiceAccountKey, error) {
	client, err := google.DefaultClient(context.Background(), iam.CloudPlatformScope)
	if err != nil {
		return nil, fmt.Errorf("google.DefaultClient: %v", err)
	}
	service, err := iam.New(client)
	if err != nil {
		return nil, fmt.Errorf("iam.New: %v", err)
	}
	resource := "projects/-/serviceAccounts/" + serviceAccountEmail
	request := &iam.CreateServiceAccountKeyRequest{}
	key, err := service.Projects.ServiceAccounts.Keys.Create(resource, request).Do()
	if err != nil {
		return nil, fmt.Errorf("Projects.ServiceAccounts.Keys.Create: %v", err)
	}
	return key, nil
}
