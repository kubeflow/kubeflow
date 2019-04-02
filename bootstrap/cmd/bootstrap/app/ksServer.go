package app

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path"
	"sync"

	"path/filepath"

	"os"
	"os/exec"
	"time"

	"bytes"
	"io/ioutil"
	"math/rand"
	"strings"

	"github.com/cenkalti/backoff"
	"github.com/go-kit/kit/endpoint"
	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/ksonnet/ksonnet/pkg/actions"
	kApp "github.com/ksonnet/ksonnet/pkg/app"
	"github.com/ksonnet/ksonnet/pkg/client"
	kstypes "github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"google.golang.org/api/deploymentmanager/v2"
	"google.golang.org/api/sourcerepo/v1"
	core_v1 "k8s.io/api/core/v1"
	meta_v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
	type_v1 "k8s.io/client-go/kubernetes/typed/core/v1"
	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
)

// The name of the prototype for Jupyter.
const JupyterPrototype = "jupyterhub"

// root dir of local cached VERSIONED REGISTRIES
const CachedRegistries = "/opt/versioned_registries"
const CloudShellTemplatePath = "/opt/registries/kubeflow/deployment/gke/cloud_shell_templates"

// key used for storing start time of a request to deploy in the request contexts
const StartTime = "StartTime"

const KubeflowRegName = "kubeflow"
const KubeflowFolder = "ks_app"
const DmFolder = "gcp_config"
const CloudShellFolder = "kf_util"
const IstioFolder = "istio"
// default k8s spec to use
const K8sSpecPath = "../bootstrap/k8sSpec/v1.11.7/api/openapi-spec/swagger.json"

const MetadataStoreDiskSuffix = "-metadata-store"
const ArtifactStoreDiskSuffix = "-artifact-store"

type DmSpec struct {
	// path to the deployment manager configuration file
	ConfigFile string
	// path to the deployment manager template file
	TemplateFile string
	// the suffix to append to the deployment name
	DmNameSuffix string
}

var ClusterDmSpec = DmSpec{
	ConfigFile:   "../deployment/gke/deployment_manager_configs/cluster-kubeflow.yaml",
	TemplateFile: "../deployment/gke/deployment_manager_configs/cluster.jinja",
	DmNameSuffix: "",
}

var StorageDmSpec = DmSpec{
	ConfigFile:   "../deployment/gke/deployment_manager_configs/storage-kubeflow.yaml",
	TemplateFile: "../deployment/gke/deployment_manager_configs/storage.jinja",
	DmNameSuffix: "-storage",
}

// KsService defines an interface for working with ksonnet.
type KsService interface {
	// CreateApp creates a ksonnet application.
	CreateApp(context.Context, CreateRequest, *deploymentmanager.Deployment) error
	// Apply ksonnet app to target GKE cluster
	Apply(ctx context.Context, req ApplyRequest) error
	ConfigCluster(context.Context, CreateRequest) error
	BindRole(context.Context, string, string, string) error
	InstallIstio(ctx context.Context, req CreateRequest) error
	InsertDeployment(context.Context, CreateRequest, DmSpec) (*deploymentmanager.Deployment, error)
	GetDeploymentStatus(context.Context, CreateRequest, string) (string, string, error)
	ApplyIamPolicy(context.Context, ApplyIamRequest) error
	GetProjectLock(string) *sync.Mutex
}

// appInfo keeps track of information about apps.
type appInfo struct {
	App kApp.App
}

// ksServer provides a server to wrap ksonnet.
// This allows ksonnet applications to be managed remotely.
type ksServer struct {
	// appsDir is the directory where apps should be stored.
	appsDir string
	// knownRegistries is a list of known registries
	// This can be used to map the name of a registry to info about the registry.
	// This allows apps to specify a registry by name without having to know any
	// other information about the regisry.
	knownRegistries map[string]*kstypes.RegistryConfig

	//gkeVersionOverride allows overriding the GKE version specified in DM config. If not set the value in DM config is used.
	// https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.zones.clusters
	gkeVersionOverride string

	fs afero.Fs

	// project-id -> project lock
	projectLocks map[string]*sync.Mutex
	serverMux    sync.Mutex

	// Whether to install istio.
	installIstio bool
}

type MultiError struct {
	Errors []error
}

func (m *MultiError) Collect(err error) {
	if err != nil {
		m.Errors = append(m.Errors, err)
	}
}

func (m MultiError) ToError() error {
	if len(m.Errors) == 0 {
		return nil
	}

	errStrings := []string{}
	for _, err := range m.Errors {
		errStrings = append(errStrings, err.Error())
	}
	return fmt.Errorf(strings.Join(errStrings, "\n"))
}

// NewServer constructs a ksServer.
func NewServer(appsDir string, registries []*kstypes.RegistryConfig, gkeVersionOverride string, installIstio bool) (*ksServer, error) {
	if appsDir == "" {
		return nil, fmt.Errorf("appsDir can't be empty")
	}

	s := &ksServer{
		appsDir:            appsDir,
		projectLocks:       make(map[string]*sync.Mutex),
		knownRegistries:    make(map[string]*kstypes.RegistryConfig),
		gkeVersionOverride: gkeVersionOverride,
		fs:                 afero.NewOsFs(),
		installIstio:       installIstio,
	}

	for _, r := range registries {
		s.knownRegistries[r.Name] = r
		if r.RegUri == "" {
			return nil, fmt.Errorf("Known registry %v missing URI", r.Name)
		}
	}

	log.Infof("appsDir is %v", appsDir)
	info, err := s.fs.Stat(appsDir)

	// TODO(jlewi): Should we create the directory if it doesn't exist?
	if err != nil {
		return nil, err
	}

	if !info.IsDir() {
		return nil, fmt.Errorf("appsDir %v is not a directory", appsDir)
	}

	return s, nil
}

type StorageOption struct {
	// Whether to create persistent storage for storing all Kubeflow Pipeline artifacts or not.
	CreatePipelinePersistentStorage bool
}

// CreateRequest represents a request to create a ksonnet application.
type CreateRequest struct {
	// Name for the app.
	Name string
	// AppConfig is the config for the app.
	AppConfig kstypes.AppConfig

	// Namespace for the app.
	Namespace string

	// Whether to try to autoconfigure the app.
	AutoConfigure bool

	// target GKE cLuster info
	Cluster       string
	Project       string
	ProjectNumber string
	Zone          string

	// Access token, need to access target cluster in order for AutoConfigure
	Token string
	Apply bool
	Email string
	// temporary
	ClientId     string
	ClientSecret string
	IpName       string
	Username     string
	PasswordHash string

	// For test: GCP service account client id
	SAClientId string

	StorageOption StorageOption
}

// basicServerResponse is general response contains nil if handler raise no error, otherwise an error message.
type basicServerResponse struct {
	Err string `json:"err,omitempty"` // errors don't JSON-marshal, so we use a string
}

type HealthzRequest struct {
	Msg string
}

type HealthzResponse struct {
	Reply string
}

// Request to apply an app.
type ApplyRequest struct {
	// Name of the app to apply
	Name string

	// kubeflow version
	KfVersion string

	// Environment is the environment to use.
	Environment string

	// Components is a list of the names of the components to apply.
	Components []string

	// target GKE cLuster info
	Cluster string
	Project string
	Zone    string

	// Token is an authorization token to use to authorize to the K8s API Server.
	// Leave blank to use the pods service account.
	Token string
	Email string

	// For test: GCP service account client id
	SAClientId string

	// pass *appInfo if ks app is already on disk.
	AppInfo *appInfo
}

var (
	// Counter metrics
	// num of requests counter vec
	// status field has values: {"OK", "UNKNOWN", "INTERNAL", "INVALID_ARGUMENT"}
	deployReqCounter = prometheus.NewCounterVec(
		prometheus.CounterOpts{
			Name: "deploy_requests",
			Help: "Number of requests for deployments",
		},
		[]string{"status"},
	)
	deploymentFailure = prometheus.NewCounterVec(prometheus.CounterOpts{
		Name: "deployments_failure",
		Help: "Number of failed Kubeflow deployments",
	}, []string{"status"})

	serviceHeartbeat = prometheus.NewCounter(prometheus.CounterOpts{
		Name: "service_heartbeat",
		Help: "Heartbeat signal every 10 seconds indicating pods are alive.",
	})

	deployReqCounterUser = prometheus.NewCounter(prometheus.CounterOpts{
		Name: "deploy_requests_user",
		Help: "Number of user requests for deployments",
	})
	kfDeploymentsDoneUser = prometheus.NewCounter(prometheus.CounterOpts{
		Name: "kubeflow_deployments_done_user",
		Help: "Number of successfully finished Kubeflow user deployments",
	})

	// Gauge metrics
	deployReqCounterRaw = prometheus.NewGauge(prometheus.GaugeOpts{
		Name: "deploy_requests_raw",
		Help: "Number of requests for deployments",
	})
	kfDeploymentsDoneRaw = prometheus.NewGauge(prometheus.GaugeOpts{
		Name: "kubeflow_deployments_done_raw",
		Help: "Number of successfully finished Kubeflow deployments",
	})

	// latencies
	clusterDeploymentLatencies = prometheus.NewHistogram(prometheus.HistogramOpts{
		Name:    "cluster_dep_duration_seconds",
		Help:    "A histogram of the GKE cluster deployment request duration in seconds",
		Buckets: prometheus.LinearBuckets(30, 30, 15),
	})
	kfDeploymentLatencies = prometheus.NewHistogram(prometheus.HistogramOpts{
		Name:    "kubeflow_dep_duration_seconds",
		Help:    "A histogram of the KF deployment request duration in seconds",
		Buckets: prometheus.LinearBuckets(150, 30, 20),
	})
)

func init() {
	// Register prometheus counters
	prometheus.MustRegister(deployReqCounter)
	prometheus.MustRegister(clusterDeploymentLatencies)
	prometheus.MustRegister(kfDeploymentLatencies)
	prometheus.MustRegister(deployReqCounterUser)
	prometheus.MustRegister(kfDeploymentsDoneUser)
	prometheus.MustRegister(deployReqCounterRaw)
	prometheus.MustRegister(kfDeploymentsDoneRaw)
	prometheus.MustRegister(deploymentFailure)
	prometheus.MustRegister(serviceHeartbeat)
}

func setupNamespace(namespaces type_v1.NamespaceInterface, name_space string) error {
	namespace, err := namespaces.Get(name_space, meta_v1.GetOptions{})
	if err == nil {
		log.Infof("Using existing namespace: %v", namespace.Name)
	} else {
		log.Infof("Creating namespace: %v for all kubeflow resources", name_space)
		_, err = namespaces.Create(
			&core_v1.Namespace{
				ObjectMeta: meta_v1.ObjectMeta{
					Name: name_space,
				},
			},
		)
		return err
	}
	return err
}

// Return version of specified registry, or empty string if not found
func getRegistryVersion(request CreateRequest, regName string) string {
	for _, registry := range request.AppConfig.Registries {
		if registry.Name == regName {
			return registry.Version
		}
	}
	return ""
}

func (s *CreateRequest) Validate() error {
	missings := make([]string, 0)
	if len(s.Name) == 0 {
		missings = append(missings, "Deployment name")
	}
	if len(s.Project) == 0 {
		missings = append(missings, "Project")
	}
	if len(missings) == 0 {
		return nil
	}
	return fmt.Errorf("missing input fields: %v", missings)
}

func (s *ksServer) GetProjectLock(project string) *sync.Mutex {
	s.serverMux.Lock()
	defer s.serverMux.Unlock()
	_, ok := s.projectLocks[project]
	if !ok {
		s.projectLocks[project] = &sync.Mutex{}
	}
	return s.projectLocks[project]
}

// InstallIstio installs istio into the cluster.
func (s *ksServer) InstallIstio(ctx context.Context, req CreateRequest) error {
	if !s.installIstio {
		return nil
	}
	log.Infof("Installing Istio...")
	regPath := s.knownRegistries["kubeflow"].RegUri

	token := req.Token
	if token == "" {
		log.Errorf("No token specified in request; dropping request.")
		return fmt.Errorf("No token specified in request; dropping request.")
	}
	config, err := buildClusterConfig(ctx, req.Token, req.Project, req.Zone, req.Cluster)
	if err != nil {
		log.Errorf("Failed getting GKE cluster config: %v", err)
		return err
	}

	err = CreateResourceFromFile(config, path.Join(regPath, "../dependencies/istio/install/crds.yaml"))
	if err != nil {
		log.Errorf("Failed to create istio CRD: %v", err)
		return err
	}
	err = CreateResourceFromFile(config, path.Join(regPath, "../dependencies/istio/install/istio-noauth.yaml"))
	if err != nil {
		log.Errorf("Failed to create istio manifest: %v", err)
		return err
	}
	err = CreateResourceFromFile(config, path.Join(regPath, "../dependencies/istio/kf-istio-resources.yaml"))
	if err != nil {
		log.Errorf("Failed to create kubeflow istio resource: %v", err)
		return err
	}
	return nil
}

// CreateApp creates a ksonnet application based on the request.
func (s *ksServer) CreateApp(ctx context.Context, request CreateRequest, dmDeploy *deploymentmanager.Deployment) error {
	config, err := rest.InClusterConfig()
	if request.Token != "" {
		config, err = buildClusterConfig(ctx, request.Token, request.Project, request.Zone, request.Cluster)
	}
	if err != nil {
		log.Errorf("Failed getting GKE cluster config: %v", err)
		return err
	}
	projLock := s.GetProjectLock(request.Project)

	projLock.Lock()
	defer projLock.Unlock()

	if request.Name == "" {
		return fmt.Errorf("Name must be a non empty string.")
	}
	kfVersion := getRegistryVersion(request, KubeflowRegName)
	a, repoDir, err := s.GetApp(request.Project, request.Name, kfVersion, request.Token)
	defer os.RemoveAll(repoDir)
	if repoDir == "" {
		return fmt.Errorf("Cannot load ks app from cloud source repo")
	}
	envName := "default"
	if err == nil {
		log.Infof("App %v exists in project %v", request.Name, request.Project)
		options := map[string]interface{}{
			actions.OptionAppRoot: a.App.Root(),
			actions.OptionEnvName: envName,
			actions.OptionServer:  config.Host,
		}
		err := actions.RunEnvSet(options)
		if err != nil {
			return fmt.Errorf("There was a problem setting app env: %v", err)
		}
	} else {
		log.Infof("Creating app %v", request.Name)
		log.Infof("Using K8s host %v", config.Host)
		deployConfDir := path.Join(repoDir, GetRepoName(request.Project), kfVersion, request.Name)
		if err = os.MkdirAll(deployConfDir, os.ModePerm); err != nil {
			return fmt.Errorf("Cannot create deployConfDir: %v", err)
		}
		appDir := path.Join(deployConfDir, KubeflowFolder)
		_, err = s.fs.Stat(appDir)
		absSpecPath := path.Join(s.knownRegistries["kubeflow"].RegUri, K8sSpecPath)
		specFlag := "file:" + absSpecPath
		// Fetch k8s api spec from github if not found locally
		if _, err = os.Stat(absSpecPath); err != nil {
			log.Infof("k8s spec cache not found, using remote resource.")
			specFlag = "version:v1.11.7"

		}
		if err != nil {
			options := map[string]interface{}{
				actions.OptionFs:      s.fs,
				actions.OptionName:    "app",
				actions.OptionEnvName: envName,
				actions.OptionNewRoot: appDir,
				actions.OptionServer:  config.Host,
				// Use k8s swagger spec from kubeflow repo cache.
				actions.OptionSpecFlag:              specFlag,
				actions.OptionNamespace:             request.Namespace,
				actions.OptionSkipDefaultRegistries: true,
			}
			// Add retry around ks init as sometimes fetching k8s API from github will fail
			bo := backoff.WithMaxRetries(backoff.NewConstantBackOff(2*time.Second), 5)
			err = backoff.Retry(func() error {
				// Clean up leftovers from previous run if exists
				if initErr := os.RemoveAll(appDir); initErr != nil {
					log.Warnf("Failed to cleanup app dir from previous run, error: %v. will retry up to 5 times", initErr)
					return initErr
				}
				if initErr := actions.RunInit(options); initErr != nil {
					log.Warnf("app init failed with error: %v. will retry up to 5 times", initErr)
					return initErr
				}
				return nil
			}, bo)

			if err != nil {
				return fmt.Errorf("There was a problem initializing the app: %v", err)
			}
			log.Infof("Successfully initialized the app %v.", appDir)

		} else {
			log.Infof("Directory %v exists", appDir)
		}

		kfApp, err := kApp.Load(s.fs, nil, appDir)

		if err != nil {
			log.Errorf("There was a problem loading app %v. Error: %v", request.Name, err)
			return err
		}
		a = &appInfo{
			App: kfApp,
		}
	}

	// Add the registries to the app.
	for idx, registry := range request.AppConfig.Registries {
		RegUri, err := s.getRegistryUri(registry)
		if err != nil {
			log.Errorf("There was a problem getRegistryUri for registry %v. Error: %v", registry.Name, err)
			return err
		}
		request.AppConfig.Registries[idx].RegUri = RegUri
		log.Infof("App %v add registry %v URI %v", request.Name, registry.Name, registry.RegUri)
		options := map[string]interface{}{
			actions.OptionAppRoot: a.App.Root(),
			actions.OptionName:    registry.Name,
			actions.OptionURI:     request.AppConfig.Registries[idx].RegUri,
			// Version doesn't actually appear to be used by the add function.
			actions.OptionVersion: "",
			// Looks like override allows us to override existing registries; we shouldn't
			// need to do that.
			actions.OptionOverride: false,
		}

		registries, err := a.App.Registries()
		if err != nil {
			log.Errorf("There was a problem listing registries; %v", err)
		}

		if _, found := registries[registry.Name]; found {
			log.Infof("App already has registry %v", registry.Name)
		} else {

			err = actions.RunRegistryAdd(options)
			if err != nil {
				return fmt.Errorf("There was a problem adding registry %v: %v", registry.Name, err)
			}
		}
	}

	err = s.appGenerate(a.App, &request.AppConfig)
	if err != nil {
		return fmt.Errorf("There was a problem generating app: %v", err)
	}
	if request.AutoConfigure {
		s.autoConfigureApp(&a.App, &request.AppConfig, request.Namespace, config)
	}
	log.Infof("Created and initialized app at %v", a.App.Root())
	if request.Apply {
		components := []string{}
		for _, comp := range request.AppConfig.Components {
			components = append(components, comp.Name)
		}
		err = s.Apply(ctx, ApplyRequest{
			Name:        request.Name,
			KfVersion:   getRegistryVersion(request, KubeflowRegName),
			Environment: "default",
			Components:  components,
			Cluster:     request.Cluster,
			Project:     request.Project,
			Zone:        request.Zone,
			Token:       request.Token,
			Email:       request.Email,
			SAClientId:  request.SAClientId,
			AppInfo:     a,
		})
		if err != nil {
			log.Errorf("Failed to apply app: %v", err)
			return err
		}
	}

	if dmDeploy != nil {
		UpdateDmConfig(repoDir, request.Project, request.Name, kfVersion, dmDeploy)
	}
	UpdateCloudShellConfig(repoDir, request.Project, request.Name, kfVersion, request.Zone)
	if s.installIstio {
		UpdateIstioManifest(repoDir, request.Project, request.Name, kfVersion, s.knownRegistries["kubeflow"].RegUri)
	}
	err = s.SaveAppToRepo(request.Project, request.Email, repoDir)
	if err != nil {
		log.Errorf("There was a problem saving config to cloud repo; %v", err)
		return err
	}
	return nil
}

// fetch remote registry to local disk, or use baked-in registry if version not specified in user request.
// Then return registry's RegUri.
func (s *ksServer) getRegistryUri(registry *kstypes.RegistryConfig) (string, error) {
	if registry.Name == "" ||
		registry.Path == "" ||
		registry.Repo == "" ||
		registry.Version == "" ||
		registry.Version == "default" {

		v, ok := s.knownRegistries[registry.Name]
		if !ok {
			return "", fmt.Errorf("Create request uses registry %v but some "+
				"required fields are not specified and this is not a known registry.", registry.Name)
		}
		log.Infof("No remote registry provided for registry %v; setting URI to local %v.", registry.Name, v.RegUri)
		return v.RegUri, nil
	} else {
		versionPath := path.Join(CachedRegistries, registry.Name, registry.Version)

		s.serverMux.Lock()
		defer s.serverMux.Unlock()
		_, err := s.fs.Stat(versionPath)

		// If specific version doesn't exist locally, will download.
		// The local cache path will be CachedRegistries/registry_name/registry_version/
		if err != nil {
			registryPath := path.Join(CachedRegistries, registry.Name)
			_, err := s.fs.Stat(registryPath)
			if err != nil {
				os.Mkdir(registryPath, os.ModePerm)
			}
			fileUrl := registry.Repo + "/archive/" + registry.Version + ".tar.gz"

			err = runCmd(fmt.Sprintf("curl -L -o %v %v", versionPath+".tar.gz", fileUrl))
			if err != nil {
				return "", err
			}
			err = runCmd(fmt.Sprintf("tar -xzvf %s  -C %s", versionPath+".tar.gz", registryPath))
			if err != nil {
				return "", err
			}
			err = os.Rename(path.Join(registryPath, registry.Name+"-"+strings.Trim(registry.Version, "v")), versionPath)
			if err != nil {
				log.Errorf("Error occrued during os.Rename. Error: %v", err)
				return "", err
			}
		}
		return path.Join(versionPath, registry.Path), nil
	}
}

func runCmd(rawcmd string) error {
	bo := backoff.WithMaxRetries(backoff.NewConstantBackOff(2*time.Second), 10)
	return backoff.Retry(func() error {
		cmd := exec.Command("sh", "-c", rawcmd)
		result, err := cmd.CombinedOutput()
		if err != nil {
			return fmt.Errorf("Error occrued during execute cmd %v. Error: %v", rawcmd, string(result))
		}
		return err
	}, bo)
}

// appGenerate installs packages and creates components.
func (s *ksServer) appGenerate(kfApp kApp.App, appConfig *kstypes.AppConfig) error {
	libs, err := kfApp.Libraries()

	if err != nil {
		return fmt.Errorf("Could not list libraries for app; error %v", err)
	}

	// Install all packages within each registry
	// TODO(jlewi): Why do we install packages in the registry? Is this
	// a legacy of when we had fewer optional/non-default packages?
	// I think the code implicitly assumes RegUri is a file URI
	// otherwise registry.yaml won't be located at regFile.
	// Installing all packages could still be useful in the case
	// where we are using a file URI (e.g. fetching from a registry cloned
	// into the docker image). Installing all packages copies the packages
	// into vendor so that the ks app will contain a complete set of packages.
	// This is beneficial because the file URI won't be valid if the app is copied
	// to other machines.
	// Should we add an option to install packages rather than doing it if
	// registry.yaml exists?
	for _, registry := range appConfig.Registries {
		regFile := path.Join(registry.RegUri, "registry.yaml")
		_, err = s.fs.Stat(regFile)
		if err == nil {
			log.Infof("processing registry file %v ", regFile)
			var ksRegistry kstypes.KsRegistry
			if LoadConfig(regFile, &ksRegistry) == nil {
				for pkgName, _ := range ksRegistry.Libraries {
					_, err = s.fs.Stat(path.Join(registry.RegUri, pkgName))
					if err != nil {
						return fmt.Errorf("Package %v didn't exist in registry %v", pkgName, registry.RegUri)
					}
					full := fmt.Sprintf("%v/%v", registry.Name, pkgName)
					log.Infof("Installing package %v", full)

					if _, found := libs[full]; found {
						log.Infof("Package %v already exists", pkgName)
						continue
					}
					err := actions.RunPkgInstall(map[string]interface{}{
						actions.OptionAppRoot: kfApp.Root(),
						actions.OptionPkgName: full,
						actions.OptionName:    pkgName,
						actions.OptionForce:   false,
					})

					if err != nil {
						return fmt.Errorf("There was a problem installing package %v; error %v", full, err)
					}
				}
			}
		}
	}

	// Install packages.
	for _, pkg := range appConfig.Packages {
		full := fmt.Sprintf("%v/%v", pkg.Registry, pkg.Name)
		log.Infof("Installing package %v", full)

		if _, found := libs[full]; found {
			log.Infof("Package %v already exists", pkg.Name)
			continue
		}
		err := actions.RunPkgInstall(map[string]interface{}{
			actions.OptionAppRoot: kfApp.Root(),
			actions.OptionPkgName: full,
			actions.OptionName:    pkg.Name,
			actions.OptionForce:   false,
		})

		if err != nil {
			return fmt.Errorf("There was a problem installing package %v; error %v", full, err)
		}
	}

	paramMapping := make(map[string][]string)
	// Extract params for each component
	for _, p := range appConfig.Parameters {
		if val, ok := paramMapping[p.Component]; ok {
			paramMapping[p.Component] = append(val, []string{"--" + p.Name, p.Value}...)
		} else {
			paramMapping[p.Component] = []string{"--" + p.Name, p.Value}
		}
	}

	// Create Components
	for _, c := range appConfig.Components {
		params := []string{c.Prototype, c.Name}
		if val, ok := paramMapping[c.Name]; ok {
			params = append(params, val...)
		}
		if err = s.createComponent(kfApp, params); err != nil {
			return err
		}
	}
	// Apply Params
	for _, p := range appConfig.ApplyParameters {
		err = actions.RunParamSet(map[string]interface{}{
			actions.OptionAppRoot: kfApp.Root(),
			actions.OptionName:    p.Component,
			actions.OptionPath:    p.Name,
			actions.OptionValue:   p.Value,
		})
		if err != nil {
			return fmt.Errorf("Error when setting Parameters %v for Component %v: %v", p.Name, p.Component, err)
		}
	}
	return err
}

// createComponent generates a ksonnet component from a prototype in the specified app.
func (s *ksServer) createComponent(kfApp kApp.App, args []string) error {
	componentName := args[1]
	componentPath := filepath.Join(kfApp.Root(), "components", componentName+".jsonnet")

	if exists, _ := afero.Exists(s.fs, componentPath); !exists {
		log.Infof("Creating Component: %v ...", componentName)
		err := actions.RunPrototypeUse(map[string]interface{}{
			actions.OptionAppRoot:   kfApp.Root(),
			actions.OptionArguments: args,
		})
		if err != nil {
			return fmt.Errorf("There was a problem creating component %v: %v", componentName, err)
		}
	} else {
		log.Infof("Component %v already exists", componentName)
	}
	return nil
}

// autoConfigureApp attempts to automatically optimize the Kubeflow application
// based on the cluster setup.
func (s *ksServer) autoConfigureApp(kfApp *kApp.App, appConfig *kstypes.AppConfig, namespace string, config *rest.Config) error {

	kubeClient, err := clientset.NewForConfig(rest.AddUserAgent(config, "kubeflow-bootstrapper"))
	if err != nil {
		return err
	}

	clusterVersion, err := kubeClient.DiscoveryClient.ServerVersion()

	if err != nil {
		return err
	}

	log.Infof("Cluster version: %v", clusterVersion.String())
	err = setupNamespace(kubeClient.CoreV1().Namespaces(), namespace)

	storage := kubeClient.StorageV1()
	sClasses, err := storage.StorageClasses().List(meta_v1.ListOptions{})

	if err != nil {
		return err
	}

	hasDefault := hasDefaultStorage(sClasses)

	// Component customization
	// TODO(jlewi): We depend on the original appConfig in order to optimize it.
	// Could we avoid this dependency by looking at an existing app and seeing
	// which components correspond to which prototypes? Would we have to parse
	// the actual jsonnet files?
	for _, component := range appConfig.Components {
		if component.Prototype == JupyterPrototype {
			pvcMount := ""
			if hasDefault {
				pvcMount = "/home/jovyan"
			}

			err = actions.RunParamSet(map[string]interface{}{
				actions.OptionAppRoot: (*kfApp).Root(),
				actions.OptionName:    component.Name,
				actions.OptionPath:    "jupyterNotebookPVCMount",
				actions.OptionValue:   pvcMount,
			})

			if err != nil {
				return err
			}
		}
	}

	return nil
}

func GetRepoName(project string) string {
	return fmt.Sprintf("%s-kubeflow-config", project)
}

func generateRandStr(length int) string {
	chars := "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	b := make([]byte, length)
	for i := range b {
		b[i] = chars[rand.Intn(len(chars))]
	}
	return string(b)
}

// Not thread-safe, make sure project lock is on.
// Clone project repo to local disk, which contains all existing ks apps config in the project
func (s *ksServer) CloneRepoToLocal(project string, token string) (string, error) {
	// use a 20-char-random-string as folder name for each repo clone.
	// this random directory only lives in same request, and will be deleted before request finish.
	// this can strengthen data isolation among different requests.
	folderName := generateRandStr(20)
	repoDir := path.Join(s.appsDir, folderName)
	if err := os.MkdirAll(repoDir, os.ModePerm); err != nil {
		return "", err
	}
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: token,
	})
	sourcerepoService, err := sourcerepo.New(oauth2.NewClient(context.Background(), ts))
	bo := backoff.WithMaxRetries(backoff.NewConstantBackOff(2*time.Second), 10)
	err = backoff.Retry(func() error {
		_, err = sourcerepoService.Projects.Repos.Get(fmt.Sprintf("projects/%s/repos/%s", project, GetRepoName(project))).Do()
		if err != nil {
			// repo does't exist in target project, create one
			_, err = sourcerepoService.Projects.Repos.Create(fmt.Sprintf("projects/%s", project), &sourcerepo.Repo{
				Name: fmt.Sprintf("projects/%s/repos/%s", project, GetRepoName(project)),
			}).Do()
			return fmt.Errorf("repo %v doesn't exist, made create repo request: %v", GetRepoName(project), err)
		}
		return nil
	}, bo)
	if err != nil {
		log.Errorf("Fail to create repo: %v. Error: %v", GetRepoName(project), err)
		return "", err
	}
	err = os.Chdir(repoDir)
	if err != nil {
		return "", err
	}
	cloneCmd := fmt.Sprintf("git clone https://%s:%s@source.developers.google.com/p/%s/r/%s",
		"user1", token, project, GetRepoName(project))

	if err := runCmd(cloneCmd); err != nil {
		return "", fmt.Errorf("Failed to clone from source repo: %s", GetRepoName(project))
	}
	return repoDir, nil
}

func (s *ksServer) GetApp(project string, appName string, kfVersion string, token string) (*appInfo, string, error) {
	repoDir, err := s.CloneRepoToLocal(project, token)
	if err != nil {
		log.Errorf("Cannot clone repo from cloud source repo")
	}
	appDir := path.Join(repoDir, GetRepoName(project), kfVersion, appName, KubeflowFolder)
	_, err = s.fs.Stat(appDir)
	if err != nil {
		return nil, repoDir, fmt.Errorf("App %s doesn't exist in Project %s", appName, project)
	}
	kfApp, err := kApp.Load(s.fs, nil, appDir)

	if err != nil {
		return nil, "", fmt.Errorf("There was a problem loading app %v. Error: %v", appName, err)
	}

	return &appInfo{
		App: kfApp,
	}, repoDir, nil
}

// Save ks app config local changes to project source repo.
// Not thread safe, be aware when call it.
func UpdateDmConfig(repoDir string, project string, appName string, kfVersion string, dmDeploy *deploymentmanager.Deployment) error {
	confDir := path.Join(repoDir, GetRepoName(project), kfVersion, appName, DmFolder)
	if err := os.RemoveAll(confDir); err != nil {
		return err
	}
	if err := os.MkdirAll(confDir, os.ModePerm); err != nil {
		return err
	}
	importConf := dmDeploy.Target.Imports[0]
	if err := ioutil.WriteFile(path.Join(confDir, importConf.Name), []byte(importConf.Content), os.ModePerm); err != nil {
		return err
	}
	if err := ioutil.WriteFile(path.Join(confDir, "cluster-kubeflow.yaml"), []byte(dmDeploy.Target.Config.Content),
		os.ModePerm); err != nil {
		return err
	}
	return nil
}

// Save istio manifest to project source repo.
// Not thread safe, be aware when call it.
func UpdateIstioManifest(repoDir string, project string, appName string, kfVersion string, regPath string) error {
	istioDir := path.Join(repoDir, GetRepoName(project), kfVersion, appName, IstioFolder)
	if err := os.RemoveAll(istioDir); err != nil {
		return err
	}
	if err := os.MkdirAll(istioDir, os.ModePerm); err != nil {
		return err
	}
	err := copyFile(path.Join(regPath, "../dependencies/istio/install/crds.yaml"), path.Join(istioDir, "crd.yaml"))
	if err != nil {
		return err
	}
	err = copyFile(path.Join(regPath, "../dependencies/istio/install/istio-noauth.yaml"), path.Join(istioDir, "istio-noauth.yaml"))
	if err != nil {
		return err
	}
	err = copyFile(path.Join(regPath, "../dependencies/istio/kf-istio-resources.yaml"), path.Join(istioDir, "kf-istio-resources.yaml"))
	if err != nil {
		return err
	}
	return nil
}

// Save cloud shell config to project source repo.
func UpdateCloudShellConfig(repoDir string, project string, appName string, kfVersion string, zone string) error {
	confDir := path.Join(repoDir, GetRepoName(project), kfVersion, appName, CloudShellFolder)
	if err := os.RemoveAll(confDir); err != nil {
		return err
	}
	if err := os.MkdirAll(confDir, os.ModePerm); err != nil {
		return err
	}
	for _, filename := range []string{"conn.sh", "conn.md"} {
		data, err := ioutil.ReadFile(path.Join(CloudShellTemplatePath, filename))
		if err != nil {
			return err
		}
		data = bytes.Replace(data, []byte("project_id_placeholder"), []byte(project), -1)
		data = bytes.Replace(data, []byte("zone_placeholder"), []byte(zone), -1)
		data = bytes.Replace(data, []byte("deploy_name_placeholder"), []byte(appName), -1)
		if err := ioutil.WriteFile(path.Join(confDir, filename), data, os.ModePerm); err != nil {
			return err
		}
	}
	return nil
}

// Save ks app config local changes to project source repo.
// Not thread safe, be aware when call it.
func (s *ksServer) SaveAppToRepo(project string, email string, repoDir string) error {
	repoPath := path.Join(repoDir, GetRepoName(project))
	err := os.Chdir(repoPath)
	if err != nil {
		return err
	}
	cmds := []string{
		fmt.Sprintf("git config user.email '%s'", email),
		"git config user.name 'auto-commit'",
		"git add .",
		"git commit -m 'auto commit from deployment'",
	}
	for _, cmd := range cmds {
		if err = runCmd(cmd); err != nil {
			return err
		}
	}
	bo := backoff.WithMaxRetries(backoff.NewConstantBackOff(2*time.Second), 10)
	return backoff.Retry(func() error {
		pushcmd := exec.Command("sh", "-c", "git push origin master")
		result, err := pushcmd.CombinedOutput()
		if err != nil {
			pullcmd := exec.Command("sh", "-c", "git pull --rebase")
			pullResult, _ := pullcmd.CombinedOutput()
			return fmt.Errorf("Error occrued during git push. Error: %v; try rebase: %v", string(result), string(pullResult))
		}
		return nil
	}, bo)
}

// Apply runs apply on a ksonnet application.
func (s *ksServer) Apply(ctx context.Context, req ApplyRequest) error {
	token := req.Token
	if token == "" {
		log.Errorf("No token specified in request; dropping request.")
		return fmt.Errorf("No token specified in request; dropping request.")
	}
	config, err := buildClusterConfig(ctx, req.Token, req.Project, req.Zone, req.Cluster)
	if err != nil {
		log.Errorf("Failed getting GKE cluster config: %v", err)
		return err
	}
	targetApp := req.AppInfo
	repoDir := ""
	if targetApp == nil {
		targetApp, repoDir, err = s.GetApp(req.Project, req.Name, req.KfVersion, req.Token)
		defer os.RemoveAll(repoDir)
		if err != nil {
			return err
		}
	}

	cfg := clientcmdapi.Config{
		Kind:       "Config",
		APIVersion: "v1",
		Clusters: map[string]*clientcmdapi.Cluster{
			"activeCluster": {
				CertificateAuthorityData: config.TLSClientConfig.CAData,
				Server:                   config.Host,
			},
		},
		Contexts: map[string]*clientcmdapi.Context{
			"activeCluster": {
				Cluster:  "activeCluster",
				AuthInfo: "activeCluster",
			},
		},
		CurrentContext: "activeCluster",
		AuthInfos: map[string]*clientcmdapi.AuthInfo{
			"activeCluster": {
				Token: token,
			},
		},
	}

	applyOptions := map[string]interface{}{
		actions.OptionAppRoot: targetApp.App.Root(),
		actions.OptionClientConfig: &client.Config{
			Overrides: &clientcmd.ConfigOverrides{},
			Config:    clientcmd.NewDefaultClientConfig(cfg, &clientcmd.ConfigOverrides{}),
		},
		actions.OptionComponentNames: req.Components,
		actions.OptionCreate:         true,
		actions.OptionDryRun:         false,
		actions.OptionEnvName:        "default",
		actions.OptionGcTag:          "gc-tag",
		actions.OptionSkipGc:         true,
	}
	bo := backoff.WithMaxRetries(backoff.NewConstantBackOff(5*time.Second), 6)
	doneApply := make(map[string]bool)
	err = backoff.Retry(func() error {
		for _, comp := range req.Components {
			if _, ok := doneApply[comp]; ok {
				continue
			}
			applyOptions[actions.OptionComponentNames] = []string{comp}
			err = actions.RunApply(applyOptions)
			if err == nil {
				log.Infof("Component %v apply succeeded", comp)
				doneApply[comp] = true
			} else {
				log.Errorf("(Will retry) Component %v apply failed; Error: %v", comp, err)
			}
		}
		if len(doneApply) == len(req.Components) {
			return nil
		}
		return fmt.Errorf("%v failed components in last try", len(req.Components)-len(doneApply))
	}, bo)
	if err != nil {
		log.Errorf("Components apply failed; Error: %v", err)
	} else {
		log.Infof("All components apply succeeded")
	}
	return err
}

func makeApplyAppEndpoint(svc KsService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(ApplyRequest)
		err := svc.Apply(ctx, req)

		r := &basicServerResponse{}

		if err != nil {
			r.Err = err.Error()
		}
		return r, nil
	}
}

// Create ksonnet app, and optionally apply it to target GKE cluster
func makeCreateAppEndpoint(svc KsService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(CreateRequest)
		err := svc.CreateApp(ctx, req, nil)

		r := &basicServerResponse{}

		if err != nil {
			r.Err = err.Error()
		} else {
			if req.Apply {
				components := []string{}
				for _, comp := range req.AppConfig.Components {
					components = append(components, comp.Name)
				}
				err = svc.Apply(ctx, ApplyRequest{
					Name:        req.Name,
					KfVersion:   getRegistryVersion(req, KubeflowRegName),
					Environment: "default",
					Components:  components,
					Cluster:     req.Cluster,
					Project:     req.Project,
					Zone:        req.Zone,
					Token:       req.Token,
					Email:       req.Email,
				})
				if err != nil {
					r.Err = err.Error()
				}
			}
		}
		return r, nil
	}
}

func timeSinceStart(ctx context.Context) time.Duration {
	startTime, ok := ctx.Value(StartTime).(time.Time)
	if !ok {
		return time.Duration(0)
	}
	return time.Since(startTime)
}

func checkDeploymentFinished(svc KsService, req CreateRequest, deployName string) error {
	status := ""
	errMsg := ""
	var err error
	ctx := context.Background()
	ctx = context.WithValue(ctx, StartTime, time.Now())

	for retry := 0; retry < 60; retry++ {
		time.Sleep(10 * time.Second)
		status, errMsg, err = svc.GetDeploymentStatus(ctx, req, deployName)
		if err != nil {
			log.Warningf("Failed to get deployment status: %v\nWill retry...", err)
			continue
		}
		if status == "DONE" {
			if errMsg == "" {
				// Deploy successfully
				break
			}
			log.Errorf("Deployment manager returned error message: %v", errMsg)
			// Mark status "INVALID_ARGUMENT" as most deployment manager failures are caused by insufficient quota or permission.
			// Error messages are available from UI, and should be resolvable by retries.
			deployReqCounter.WithLabelValues("INVALID_ARGUMENT").Inc()
			return fmt.Errorf(errMsg)
		}
		log.Infof("status: %v, waiting...", status)
	}
	if status != "DONE" {
		log.Errorf("Deployment status is not done: %v", status)
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		deploymentFailure.WithLabelValues("INTERNAL").Inc()
		return err
	}
	return nil
}

func finishDeployment(svc KsService, req CreateRequest,
	clusterDmDeploy *deploymentmanager.Deployment, storageDmDeploy *deploymentmanager.Deployment) {
	ctx := context.Background()
	ctx = context.WithValue(ctx, StartTime, time.Now())

	err := checkDeploymentFinished(svc, req, clusterDmDeploy.Name)
	if err != nil {
		return
	}

	if storageDmDeploy != nil {
		err = checkDeploymentFinished(svc, req, storageDmDeploy.Name)
		if err != nil {
			return
		}
	}
	clusterDeploymentLatencies.Observe(timeSinceStart(ctx).Seconds())
	log.Infof("Deployment is done")

	log.Info("Patching IAM bindings...")
	err = svc.ApplyIamPolicy(ctx, ApplyIamRequest{
		Project: req.Project,
		Cluster: req.Cluster,
		Email:   req.Email,
		Token:   req.Token,
		Action:  "add",
	})
	if err != nil {
		log.Errorf("Failed to update IAM: %v", err)
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		deploymentFailure.WithLabelValues("INTERNAL").Inc()
		return
	}

	log.Infof("Configuring cluster...")
	if err = svc.ConfigCluster(ctx, req); err != nil {
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		deploymentFailure.WithLabelValues("INTERNAL").Inc()
		return
	}

	if err = svc.InstallIstio(ctx, req); err != nil {
		log.Errorf("Failed to install istio: %v", err)
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		deploymentFailure.WithLabelValues("INTERNAL").Inc()
		return
	}

	log.Infof("Creating app...")
	err = svc.CreateApp(ctx, req, clusterDmDeploy)
	if err != nil {
		log.Errorf("Failed to create app: %v", err)
		deployReqCounter.WithLabelValues("INTERNAL").Inc()
		deploymentFailure.WithLabelValues("INTERNAL").Inc()
		return
	}

	deployReqCounter.WithLabelValues("OK").Inc()
	if req.Project != "kubeflow-prober-deploy" {
		kfDeploymentsDoneRaw.Inc()
		kfDeploymentsDoneUser.Inc()
	}
	kfDeploymentLatencies.Observe(timeSinceStart(ctx).Seconds())
}

// Add heartbeat every 10 seconds
func countHeartbeat() {
	for {
		time.Sleep(10 * time.Second)
		serviceHeartbeat.Inc()
	}
}

func makeDeployEndpoint(svc KsService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(CreateRequest)
		r := &basicServerResponse{}
		if req.Project != "kubeflow-prober-deploy" {
			deployReqCounterRaw.Inc()
			deployReqCounterUser.Inc()
		}
		if err := req.Validate(); err != nil {
			r.Err = err.Error()
			deployReqCounter.WithLabelValues("INVALID_ARGUMENT").Inc()
			return r, err
		}

		var storageDmDeployment *deploymentmanager.Deployment

		if req.StorageOption.CreatePipelinePersistentStorage {
			var err error
			storageDmDeployment, err = svc.InsertDeployment(ctx, req, StorageDmSpec)
			if err != nil {
				r.Err = err.Error()
				return r, err
			}
			req.AppConfig.ApplyParameters = append(
				req.AppConfig.ApplyParameters,
				kstypes.KsParameter{
					Component: "pipeline",
					Name:      "mysqlPd",
					Value:     req.Name + StorageDmSpec.DmNameSuffix + MetadataStoreDiskSuffix})
			req.AppConfig.ApplyParameters = append(
				req.AppConfig.ApplyParameters,
				kstypes.KsParameter{
					Component: "pipeline",
					Name:      "minioPd",
					Value:     req.Name + StorageDmSpec.DmNameSuffix + ArtifactStoreDiskSuffix})
		}

		clusterDmDeployment, err := svc.InsertDeployment(ctx, req, ClusterDmSpec)
		if err != nil {
			r.Err = err.Error()
			return r, err
		}
		go finishDeployment(svc, req, clusterDmDeployment, storageDmDeployment)
		return r, nil
	}
}

func makeHealthzEndpoint(svc KsService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		r := &HealthzResponse{}
		r.Reply = "Request accepted! Sill alive!"
		return r, nil
	}
}

func makeIamEndpoint(svc KsService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(ApplyIamRequest)
		err := svc.ApplyIamPolicy(ctx, req)
		r := &basicServerResponse{}
		if err != nil {
			r.Err = err.Error()
		}
		return r, nil
	}
}

func decodeCreateAppRequest(_ context.Context, r *http.Request) (interface{}, error) {
	var request CreateRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		deployReqCounter.WithLabelValues("INVALID_ARGUMENT").Inc()
		return nil, err
	}
	return request, nil
}

// The same encoder can be used for all RPC responses.
func encodeResponse(_ context.Context, w http.ResponseWriter, response interface{}) error {
	return json.NewEncoder(w).Encode(response)
}

// Handle "OPTIONS" request from browser
// Decorate your browser-facing handlers with it.
func optionsHandler(h http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		if r.Method == "OPTIONS" {
			return
		} else {
			h.ServeHTTP(w, r)
		}
	}
}

// StartHttp starts an HTTP server and blocks.
func (s *ksServer) StartHttp(port int) {
	if port <= 0 {
		log.Fatal("port must be > 0.")
	}
	// ctx := context.Background()

	applyAppHandler := httptransport.NewServer(
		makeApplyAppEndpoint(s),
		func(_ context.Context, r *http.Request) (interface{}, error) {
			var request ApplyRequest
			if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
				log.Info("Err decoding apply request: " + err.Error())
				return nil, err
			}
			return request, nil
		},
		encodeResponse,
	)

	createAppHandler := httptransport.NewServer(
		makeCreateAppEndpoint(s),
		decodeCreateAppRequest,
		encodeResponse,
	)

	healthzHandler := httptransport.NewServer(
		makeHealthzEndpoint(s),
		func(_ context.Context, r *http.Request) (interface{}, error) {
			return nil, nil
		},
		encodeResponse,
	)

	applyIamHandler := httptransport.NewServer(
		makeIamEndpoint(s),
		func(_ context.Context, r *http.Request) (interface{}, error) {
			var request ApplyIamRequest
			if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
				return nil, err
			}
			return request, nil
		},
		encodeResponse,
	)

	initProjectHandler := httptransport.NewServer(
		makeInitProjectEndpoint(s),
		func(_ context.Context, r *http.Request) (interface{}, error) {
			var request InitProjectRequest
			if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
				return nil, err
			}
			return request, nil
		},
		encodeResponse,
	)

	deployHandler := httptransport.NewServer(
		makeDeployEndpoint(s),
		decodeCreateAppRequest,
		encodeResponse,
	)

	// TODO: add deployment manager config generate / deploy handler here. So we'll have user's DM configs stored in
	// k8s storage / github, instead of gone with browser tabs.
	http.Handle("/", optionsHandler(healthzHandler))
	http.Handle("/kfctl/apps/apply", optionsHandler(applyAppHandler))
	http.Handle("/kfctl/apps/create", optionsHandler(createAppHandler))
	http.Handle("/kfctl/iam/apply", optionsHandler(applyIamHandler))
	http.Handle("/kfctl/initProject", optionsHandler(initProjectHandler))
	http.Handle("/kfctl/e2eDeploy", optionsHandler(deployHandler))

	// add an http handler for prometheus metrics
	http.Handle("/metrics", promhttp.Handler())

	go countHeartbeat()
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}
