package app

import (
	"encoding/json"
	"fmt"
	"net"
	"net/http"
	"path"
	"sync"

	"os"
	"os/exec"
	"time"

	"io/ioutil"
	"math/rand"
	"strings"

	"github.com/cenkalti/backoff"
	"github.com/go-kit/kit/endpoint"
	httptransport "github.com/go-kit/kit/transport/http"
	configtypes "github.com/kubeflow/kubeflow/bootstrap/v3/config"
	kfdefs "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	"github.com/kubeflow/kubeflow/bootstrap/v3/pkg/utils"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"google.golang.org/api/deploymentmanager/v2"
	"google.golang.org/api/sourcerepo/v1"
	core_v1 "k8s.io/api/core/v1"
	meta_v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	type_v1 "k8s.io/client-go/kubernetes/typed/core/v1"
)

// The name of the prototype for Jupyter.
const JupyterPrototype = "jupyterhub"

// root dir of local cached VERSIONED REGISTRIES
const CachedRegistries = "/opt/versioned_registries"

// key used for storing start time of a request to deploy in the request contexts
const StartTime = "StartTime"

const KubeflowFolder = "ks_app"
const DmFolder = "gcp_config"
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

// ksServer provides a server to wrap ksonnet.
// This allows ksonnet applications to be managed remotely.
type ksServer struct {
	// appsDir is the directory where apps should be stored.
	appsDir string
	// knownRegistries is a list of known registries
	// This can be used to map the name of a registry to info about the registry.
	// This allows apps to specify a registry by name without having to know any
	// other information about the regisry.
	knownRegistries map[string]*kfdefs.RegistryConfig

	//gkeVersionOverride allows overriding the GKE version specified in DM config. If not set the value in DM config is used.
	// https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.zones.clusters
	gkeVersionOverride string

	fs afero.Fs

	// project-id -> project lock
	projectLocks map[string]*sync.Mutex
	serverMux    sync.Mutex

	// Whether to install istio.
	installIstio bool

	listener net.Listener
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
func NewServer(appsDir string, registries []*kfdefs.RegistryConfig, gkeVersionOverride string, installIstio bool) (*ksServer, error) {
	if appsDir == "" {
		return nil, fmt.Errorf("appsDir can't be empty")
	}

	s := &ksServer{
		appsDir:            appsDir,
		projectLocks:       make(map[string]*sync.Mutex),
		knownRegistries:    make(map[string]*kfdefs.RegistryConfig),
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

// CreateRequest represents a request to create a ksonnet application.
type CreateRequest struct {
	// Name for the app.
	Name string
	// AppConfig is the config for the app.
	AppConfig configtypes.ComponentConfig

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
	ClientID     string
	ClientSecret string
	IPName       string
	Username     string
	PasswordHash string

	// For test: GCP service account client id
	SAClientID string

	StorageOption configtypes.StorageOption
	UseKfctl      bool
	KfVersion     string
}

// CreateResponse collects the response for create request.
type CreateResponse struct {
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
	config, err := utils.BuildClusterConfig(ctx, req.Token, req.Project, req.Zone, req.Cluster)
	if err != nil {
		log.Errorf("Failed getting GKE cluster config: %v", err)
		return err
	}

	err = utils.CreateResourceFromFile(config, path.Join(regPath, "../dependencies/istio/install/crds.yaml"))
	if err != nil {
		log.Errorf("Failed to create istio CRD: %v", err)
		return err
	}
	err = utils.CreateResourceFromFile(config, path.Join(regPath, "../dependencies/istio/install/istio-noauth.yaml"))
	if err != nil {
		log.Errorf("Failed to create istio manifest: %v", err)
		return err
	}
	//TODO should be a cli parameter
	nv := configtypes.NameValue{Name: "namespace", Value: req.Namespace}
	err = utils.CreateResourceFromFile(config, path.Join(regPath, "../dependencies/istio/kf-istio-resources.yaml"), nv)
	if err != nil {
		log.Errorf("Failed to create kubeflow istio resource: %v", err)
		return err
	}
	return nil
}

// fetch remote registry to local disk, or use baked-in registry if version not specified in user request.
// Then return registry's RegUri.
func (s *ksServer) getRegistryUri(registry *kfdefs.RegistryConfig) (string, error) {
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
			fileUrl := path.Join(registry.Repo, "archive", registry.Version+".tar.gz")

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

func GetRepoName(project string) string {
	return fmt.Sprintf("%s-kubeflow-config", project)
}

func GetRepoNameKfctl(project string) string {
	return fmt.Sprintf("%s-kubeflow-kfctl", project)
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
func (s *ksServer) CloneRepoToLocal(project string, token string, repoName string) (string, error) {
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
		_, err = sourcerepoService.Projects.Repos.Get(fmt.Sprintf("projects/%s/repos/%s", project, repoName)).Do()
		if err != nil {
			// repo does't exist in target project, create one
			_, err = sourcerepoService.Projects.Repos.Create(fmt.Sprintf("projects/%s", project), &sourcerepo.Repo{
				Name: fmt.Sprintf("projects/%s/repos/%s", project, repoName),
			}).Do()
			return fmt.Errorf("repo %v doesn't exist, made create repo request: %v", repoName, err)
		}
		return nil
	}, bo)
	if err != nil {
		log.Errorf("Fail to create repo: %v. Error: %v", repoName, err)
		return "", err
	}
	err = os.Chdir(repoDir)
	if err != nil {
		return "", err
	}
	cloneCmd := fmt.Sprintf("git clone https://%s:%s@source.developers.google.com/p/%s/r/%s",
		"user1", token, project, repoName)

	if err := runCmd(cloneCmd); err != nil {
		return "", fmt.Errorf("Failed to clone from source repo: %s", repoName)
	}
	return repoDir, nil
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

// Save ks app config local changes to project source repo.
// Not thread safe, be aware when call it.
func SaveAppToRepo(email string, repoPath string) error {
	//repoPath := path.Join(repoDir, GetRepoName(project))
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
	return fmt.Errorf("Not Implemented.")
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
			req.AppConfig.ComponentParams["pipeline"] = append(
				req.AppConfig.ComponentParams["pipeline"],
				configtypes.NameValue{
					Name:         "mysqlPd",
					Value:        req.Name + StorageDmSpec.DmNameSuffix + MetadataStoreDiskSuffix,
					InitRequired: false,
				})
			req.AppConfig.ComponentParams["pipeline"] = append(
				req.AppConfig.ComponentParams["pipeline"],
				configtypes.NameValue{
					Name:         "minioPd",
					Value:        req.Name + StorageDmSpec.DmNameSuffix + ArtifactStoreDiskSuffix,
					InitRequired: false,
				})
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

func makeHealthzEndpoint() endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		r := &HealthzResponse{}
		r.Reply = "Request accepted! Still alive!"
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
		return nil, fmt.Errorf("Cannot recognize request body, please refresh page and try again.")
	}
	return request, nil
}

// The same encoder can be used for all RPC responses.
func encodeResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	// If the response
	if f, ok := response.(endpoint.Failer); ok && f.Failed() != nil {
		errorEncoder(ctx, f.Failed(), w)
		return nil
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
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

// Addr returns the address we are listening on
func (s *ksServer) Addr() net.Addr {
	s.serverMux.Lock()
	defer s.serverMux.Unlock()

	if s.listener == nil {
		return nil
	}
	return s.listener.Addr()
}

// StartHttp starts an HTTP server and blocks.
func (s *ksServer) StartHttp(port int) error {
	portS := fmt.Sprintf(":%d", port)
	if port <= 0 {
		log.Info("No port specified; using next available.")
		portS = ":0"
	}

	listener, err := net.Listen("tcp", portS)

	if err != nil {
		panic(err)
	}

	s.listener = listener

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
	http.Handle("/kfctl/apps/apply", optionsHandler(applyAppHandler))
	http.Handle("/kfctl/iam/apply", optionsHandler(applyIamHandler))
	http.Handle("/kfctl/initProject", optionsHandler(initProjectHandler))
	http.Handle("/kfctl/e2eDeploy", optionsHandler(deployHandler))

	// add an http handler for prometheus metrics
	http.Handle("/metrics", promhttp.Handler())

	go countHeartbeat()

	log.Infof("Listening on address: %+v", listener.Addr())

	err = http.Serve(s.listener, nil)

	return err
}
