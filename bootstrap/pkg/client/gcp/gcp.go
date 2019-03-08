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
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"regexp"

	"github.com/cenkalti/backoff"
	"github.com/ghodss/yaml"
	configtypes "github.com/kubeflow/kubeflow/bootstrap/config"
	kftypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps"
	gcptypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/gcp/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/pkg/client/ksonnet"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
	"golang.org/x/oauth2/google"
	gke "google.golang.org/api/container/v1"
	"google.golang.org/api/deploymentmanager/v2"
	v1 "k8s.io/api/core/v1"
	rbacv1 "k8s.io/api/rbac/v1"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
)

const (
	GCP_CONFIG        = "gcp_config"
	K8S_SPECS         = "k8s_specs"
	CONFIG_FILE       = "cluster-kubeflow.yaml"
	STORAGE_FILE      = "storage-kubeflow.yaml"
	NETWORK_FILE      = "network.yaml"
	GCFS_FILE         = "gcfs.yaml"
	ISTIO_DIR         = "istio"
	ISTIO_CRD         = "istio-crd.yaml"
	ISTIO_INSTALL     = "istio-noauth.yaml"
	ADMIN_SECRET_NAME = "admin-gcp-sa"
	USER_SECRET_NAME  = "user-gcp-sa"
	KUBEFLOW_OAUTH    = "kubeflow-oauth"
	IMPORTS           = "imports"
	PATH              = "path"
	CLIENT_ID         = "CLIENT_ID"
	CLIENT_SECRET     = "CLIENT_SECRET"
)

// Gcp implements KfApp Interface
// It includes the KsApp along with additional Gcp types
type Gcp struct {
	kftypes.FullKfApp
	GcpApp *gcptypes.Gcp
}

func GetKfApp(options map[string]interface{}) kftypes.KfApp {
	options[string(kftypes.PLATFORM)] = string(kftypes.KSONNET)
	log.Infof("getting ksonnet platform in gcp")
	_ksonnet := ksonnet.GetKfApp(options)
	options[string(kftypes.PLATFORM)] = "gcp"
	_gcp := &Gcp{
		FullKfApp: kftypes.FullKfApp{
			Children: make(map[kftypes.Platform]kftypes.KfApp),
		},
		GcpApp: &gcptypes.Gcp{
			TypeMeta: metav1.TypeMeta{
				Kind:       "Gcp",
				APIVersion: "gcp.apps.kubeflow.org/v1alpha1",
			},
		},
	}
	_gcp.Children[kftypes.KSONNET] = _ksonnet
	if options[string(kftypes.DATA)] != nil {
		dat := options[string(kftypes.DATA)].([]byte)
		specErr := yaml.Unmarshal(dat, _gcp.GcpApp)
		if specErr != nil {
			log.Errorf("couldn't unmarshal GcpApp. Error: %v", specErr)
			return nil
		}
	}
	if options[string(kftypes.PLATFORM)] != nil {
		_gcp.GcpApp.Spec.Platform = options[string(kftypes.PLATFORM)].(string)
	}
	if options[string(kftypes.APPNAME)] != nil {
		_gcp.GcpApp.Name = options[string(kftypes.APPNAME)].(string)
	}
	if options[string(kftypes.APPDIR)] != nil {
		_gcp.GcpApp.Spec.AppDir = options[string(kftypes.APPDIR)].(string)
	}
	if options[string(kftypes.NAMESPACE)] != nil {
		namespace := options[string(kftypes.NAMESPACE)].(string)
		_gcp.GcpApp.Namespace = namespace
	}
	if options[string(kftypes.REPO)] != nil {
		kubeflowRepo := options[string(kftypes.REPO)].(string)
		re := regexp.MustCompile(`(^\$GOPATH)(.*$)`)
		goPathVar := os.Getenv("GOPATH")
		if goPathVar != "" {
			kubeflowRepo = re.ReplaceAllString(kubeflowRepo, goPathVar+`$2`)
		}
		_gcp.GcpApp.Spec.Repo = path.Join(kubeflowRepo, "kubeflow")
	}
	if options[string(kftypes.VERSION)] != nil {
		kubeflowVersion := options[string(kftypes.VERSION)].(string)
		_gcp.GcpApp.Spec.Version = kubeflowVersion
	}
	if options[string(kftypes.EMAIL)] != nil {
		email := options[string(kftypes.EMAIL)].(string)
		_gcp.GcpApp.Spec.Email = email
	}
	if options[string(kftypes.ZONE)] != nil &&
		options[string(kftypes.ZONE)].(string) != "" {
		zone := options[string(kftypes.ZONE)].(string)
		_gcp.GcpApp.Spec.Zone = zone
	} else if _gcp.GcpApp.Spec.Zone != "" {
		options[string(kftypes.ZONE)] = _gcp.GcpApp.Spec.Zone
	}
	if options[string(kftypes.IPNAME)] != nil &&
		options[string(kftypes.IPNAME)].(string) != "" {
		ipName := options[string(kftypes.IPNAME)].(string)
		_gcp.GcpApp.Spec.IpName = ipName
	} else if _gcp.GcpApp.Name != "" {
		_gcp.GcpApp.Spec.IpName = _gcp.GcpApp.Name + "-ip"
	}
	if options[string(kftypes.PROJECT)] != nil &&
		options[string(kftypes.PROJECT)].(string) != "" {
		project := options[string(kftypes.PROJECT)].(string)
		_gcp.GcpApp.Spec.Project = project
	} else if _gcp.GcpApp.Spec.Project != "" {
		options[string(kftypes.PROJECT)] = _gcp.GcpApp.Spec.Project
	}
	if options[string(kftypes.HOSTNAME)] != nil &&
		options[string(kftypes.HOSTNAME)].(string) != "" {
		hostname := options[string(kftypes.HOSTNAME)].(string)
		_gcp.GcpApp.Spec.Hostname = hostname
	} else if _gcp.GcpApp.Name != "" && _gcp.GcpApp.Spec.Project != "" {
		_gcp.GcpApp.Spec.Hostname = fmt.Sprintf("%v.endpoints.%v.cloud.goog",
			_gcp.GcpApp.Name, _gcp.GcpApp.Spec.Project)
	}
	if options[string(kftypes.USE_BASIC_AUTH)] != nil {
		_gcp.GcpApp.Spec.UseBasicAuth = options[string(kftypes.USE_BASIC_AUTH)].(bool)
	}
	if options[string(kftypes.USE_ISTIO)] != nil {
		_gcp.GcpApp.Spec.UseIstio = options[string(kftypes.USE_ISTIO)].(bool)
	}
	if options[string(kftypes.SKIP_INIT_GCP_PROJECT)] != nil {
		skipInitProject := options[string(kftypes.SKIP_INIT_GCP_PROJECT)].(bool)
		_gcp.GcpApp.Spec.SkipInitProject = skipInitProject
	}
	return _gcp
}

// Delete the gcp kfapp
func (gcp *Gcp) Delete(resources kftypes.ResourceEnum, options map[string]interface{}) error {
	ks := gcp.Children[kftypes.KSONNET]
	if ks != nil {
		ksDeleteErr := ks.Delete(resources, options)
		if ksDeleteErr != nil {
			return fmt.Errorf("gcp delete failed for %v: %v", string(kftypes.KSONNET), ksDeleteErr)
		}
	} else {
		return fmt.Errorf("%v not in Children", string(kftypes.KSONNET))
	}
	return nil
}

func (gcp *Gcp) ConfigK8s() error {
	ctx := context.Background()
	k8sClientset, err := gcp.getK8sClientset(ctx)
	if err != nil {
		return err
	}
	if err = createNamespace(k8sClientset, gcp.GcpApp.Namespace); err != nil {
		return fmt.Errorf("Creating namespace error: %v", err)
	}
	if err = bindAdmin(k8sClientset, gcp.GcpApp.Spec.Email); err != nil {
		return fmt.Errorf("Binding user as admin error: %v", err)
	}

	return nil
}

func getSA(name string, nameSuffix string, project string) string {
	return fmt.Sprintf("%v-%v@%v.iam.gserviceaccount.com", name, nameSuffix, project)
}

func (gcp *Gcp) writeConfigFile() error {
	buf, bufErr := yaml.Marshal(gcp.GcpApp)
	if bufErr != nil {
		return bufErr
	}
	cfgFilePath := filepath.Join(gcp.GcpApp.Spec.AppDir, kftypes.KfConfigFile)
	cfgFilePathErr := ioutil.WriteFile(cfgFilePath, buf, 0644)
	if cfgFilePathErr != nil {
		return cfgFilePathErr
	}
	return nil
}

// Simple deploymentmanager.TargetConfiguration factory method. This method assumes imported paths
// are all within the same filesystem. From gcloud CLI source codes it appears URL is a possible
// option. We might need to update this method or find a way to work with Python source code from
// gcloud.
func generateTarget(configPath string) (*deploymentmanager.TargetConfiguration, error) {
	if !filepath.IsAbs(configPath) {
		if p, err := filepath.Abs(configPath); err != nil {
			return nil, fmt.Errorf("Getting absolute path error: %v", err)
		} else {
			configPath = p
		}
	}
	log.Infof("Reading config file: %v", configPath)
	configBuf, bufErr := ioutil.ReadFile(configPath)
	if bufErr != nil {
		return nil, fmt.Errorf("Reading config file error: %v", bufErr)
	}
	targetConfig := &deploymentmanager.TargetConfiguration{
		Config: &deploymentmanager.ConfigFile{
			Content: string(configBuf),
		},
	}

	var config map[string]interface{}
	if err := yaml.Unmarshal(configBuf, &config); err != nil {
		return nil, fmt.Errorf("Unable to read YAML: %v", err)
	}
	if _, ok := config[IMPORTS]; !ok {
		return targetConfig, nil
	}

	entries := config[IMPORTS].([]interface{})
	dirName := filepath.Dir(configPath)
	for _, entry := range entries {
		entryMap := entry.(map[string]interface{})
		if _, ok := entryMap[PATH]; !ok {
			continue
		}
		importPath := entryMap[PATH].(string)
		if !filepath.IsAbs(importPath) {
			importPath = path.Join(dirName, importPath)
		}
		log.Infof("Reading import file: %v", importPath)
		if buf, err := ioutil.ReadFile(importPath); err == nil {
			targetConfig.Imports = append(targetConfig.Imports, &deploymentmanager.ImportFile{
				Name:    entryMap[PATH].(string),
				Content: string(buf),
			})
		} else {
			return nil, fmt.Errorf("Erro reading import file: %v", err)
		}
	}
	return targetConfig, nil
}

func (gcp *Gcp) getK8sClientset(ctx context.Context) (*clientset.Clientset, error) {
	cluster, err := kftypes.GetClusterInfo(ctx, gcp.GcpApp.Spec.Project,
		gcp.GcpApp.Spec.Zone, gcp.GcpApp.Name)
	if err != nil {
		return nil, fmt.Errorf("Get Cluster error: %v", err)
	}
	config, err := kftypes.BuildConfigFromClusterInfo(ctx, cluster)
	if err != nil {
		return nil, fmt.Errorf("Build ClientConfig error: %v", err)
	}

	return clientset.NewForConfig(config)
}

func blockingWait(project string, opName string, deploymentmanagerService *deploymentmanager.Service,
	ctx context.Context) error {
	// Explicitly copy string to avoid memory leak.
	p := "" + project
	name := "" + opName
	return backoff.Retry(func() error {
		op, err := deploymentmanagerService.Operations.Get(p, name).Context(ctx).Do()
		if op.Status == "DONE" {
			if op.HttpErrorStatusCode > 0 {
				return backoff.Permanent(fmt.Errorf("Deployment error(%v): %v",
					op.HttpErrorStatusCode, op.HttpErrorMessage))
			}
			log.Infof("Deployment service is finished: %v", op.Status)
			return nil
		} else if err != nil {
			return backoff.Permanent(fmt.Errorf("Deployment error: %v", err))
		}
		log.Warnf("Deployment service is not ready: %v", op.Status)
		name = op.Name
		return fmt.Errorf("Deployment is not ready: %v", op.Status)
	}, backoff.NewExponentialBackOff())
}

func createNamespace(k8sClientset *clientset.Clientset, namespace string) error {
	log.Infof("Creating namespace: %v", namespace)
	_, err := k8sClientset.CoreV1().Namespaces().Get(namespace, metav1.GetOptions{})
	if err == nil {
		log.Infof("Namespace already exists...")
		return nil
	}
	log.Infof("Get namespace error: %v", err)
	_, err = k8sClientset.CoreV1().Namespaces().Create(
		&v1.Namespace{
			ObjectMeta: metav1.ObjectMeta{
				Name: namespace,
			},
		},
	)
	return err
}

func bindAdmin(k8sClientset *clientset.Clientset, user string) error {
	log.Infof("Binding admin role for %v ...", user)
	defaultAdmin := "default-admin"
	_, err := k8sClientset.RbacV1().ClusterRoleBindings().Get(defaultAdmin,
		metav1.GetOptions{
			TypeMeta: metav1.TypeMeta{
				APIVersion: "rbac.authorization.k8s.io/v1beta1",
				Kind:       "ClusterRoleBinding",
			},
		})

	binding := &rbacv1.ClusterRoleBinding{
		TypeMeta: metav1.TypeMeta{
			APIVersion: "rbac.authorization.k8s.io/v1beta1",
			Kind:       "ClusterRoleBinding",
		},
		ObjectMeta: metav1.ObjectMeta{
			Name: "default-admin",
		},
		RoleRef: rbacv1.RoleRef{
			APIGroup: "rbac.authorization.k8s.io",
			Kind:     "ClusterRole",
			Name:     "cluster-admin",
		},
		Subjects: []rbacv1.Subject{
			{
				Kind: rbacv1.UserKind,
				Name: user,
			},
		},
	}
	if err == nil {
		log.Infof("Updating default-admin...")
		_, err = k8sClientset.RbacV1().ClusterRoleBindings().Update(binding)
	} else {
		log.Infof("default-admin not found, creating...")
		_, err = k8sClientset.RbacV1().ClusterRoleBindings().Create(binding)
	}
	return err
}

func (gcp *Gcp) copyFile(source string, dest string) error {
	from, err := os.Open(source)
	if err != nil {
		return fmt.Errorf("cannot create directory %v", err)
	}
	defer from.Close()
	to, err := os.OpenFile(dest, os.O_RDWR|os.O_CREATE, 0666)
	if err != nil {
		return fmt.Errorf("cannot create dest file %v  Error %v", dest, err)
	}
	defer to.Close()
	_, err = io.Copy(to, from)
	if err != nil {
		return fmt.Errorf("copy failed source %v dest %v Error %v", source, dest, err)
	}

	return nil
}

func setNameVal(entries []configtypes.NameValue, name string, val string) {
	for i, nv := range entries {
		if nv.Name == name {
			log.Infof("Setting %v to %v", name, val)
			entries[i].Value = val
			return
		}
	}
	log.Infof("Appending %v as %v", name, val)
	entries = append(entries, configtypes.NameValue{
		Name:  name,
		Value: val,
	})
}

//TODO(#2515)
func (gcp *Gcp) replaceText(regex string, repl string, src []byte) []byte {
	re := regexp.MustCompile(regex)
	buf := re.ReplaceAll(src, []byte(repl))
	return buf
}

func (gcp *Gcp) getServiceClient(ctx context.Context) (*http.Client, error) {

	// See https://cloud.google.com/docs/authentication/.
	// Use GOOGLE_APPLICATION_CREDENTIALS environment variable to specify
	// a service account key file to authenticate to the API.

	client, err := google.DefaultClient(ctx, gke.CloudPlatformScope)
	if err != nil {
		log.Fatalf("Could not authenticate client: %v", err)
		return nil, err
	}
	return client, nil
}
