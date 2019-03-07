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

package gcp

import (
	"fmt"
	"path"
	"path/filepath"

	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"google.golang.org/api/serviceusage/v1"
)

func (gcp *Gcp) gcpInitProject() error {
	ctx := context.Background()
	client, clientErr := gcp.getServiceClient(ctx)
	if clientErr != nil {
		return fmt.Errorf("could not create client %v", clientErr)
	}
	serviceusageService, serviceusageServiceErr := serviceusage.New(client)
	if serviceusageServiceErr != nil {
		return fmt.Errorf("could not create service usage service %v", serviceusageServiceErr)
	}

	enabledApis := []string{
		"deploymentmanager.googleapis.com",
		"servicemanagement.googleapis.com",
		"container.googleapis.com",
		"cloudresourcemanager.googleapis.com",
		"endpoints.googleapis.com",
		"file.googleapis.com",
		"ml.googleapis.com",
		"iam.googleapis.com",
		"sqladmin.googleapis.com",
	}
	for _, api := range enabledApis {
		service := fmt.Sprintf("projects/%v/services/%v", gcp.GcpApp.Spec.Project, api)
		_, opErr := serviceusageService.Services.Enable(service, &serviceusage.EnableServiceRequest{}).Context(ctx).Do()
		if opErr != nil {
			return fmt.Errorf("could not enable API service %v: %v", api, opErr)
		}
	}
	return nil
}

func (gcp *Gcp) Init(options map[string]interface{}) error {
	ks := gcp.Children[kftypes.KSONNET]
	if ks != nil {
		ksInitErr := ks.Init(options)
		if ksInitErr != nil {
			return fmt.Errorf("gcp init failed for %v: %v", string(kftypes.KSONNET), ksInitErr)
		}
	} else {
		return fmt.Errorf("%v not in Children", string(kftypes.KSONNET))
	}
	cacheDir := path.Join(gcp.GcpApp.Spec.AppDir, kftypes.DefaultCacheDir)
	newPath := filepath.Join(cacheDir, gcp.GcpApp.Spec.Version)
	gcp.GcpApp.Spec.Repo = path.Join(newPath, "kubeflow")
	createConfigErr := gcp.writeConfigFile()
	if createConfigErr != nil {
		return fmt.Errorf("cannot create config file app.yaml in %v", gcp.GcpApp.Spec.AppDir)
	}

	if !gcp.GcpApp.Spec.SkipInitProject {
		log.Infof("Not skipping GCP project init, running gcpInitProject.")
		initProjectErr := gcp.gcpInitProject()
		if initProjectErr != nil {
			return fmt.Errorf("cannot init gcp project %v", initProjectErr)
		}
	}

	return nil
}
