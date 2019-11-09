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

	"math/rand"
	"strings"

	"github.com/cenkalti/backoff"
	"github.com/go-kit/kit/endpoint"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"google.golang.org/api/sourcerepo/v1"
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
	BindRole(context.Context, string, string, string) error
	ApplyIamPolicy(context.Context, ApplyIamRequest) error
	GetProjectLock(string) *sync.Mutex
}

// ksServer provides a server to wrap ksonnet.
// This allows ksonnet applications to be managed remotely.
type ksServer struct {
	// appsDir is the directory where apps should be stored.
	appsDir string

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
func NewServer(appsDir string, gkeVersionOverride string, installIstio bool) (*ksServer, error) {
	if appsDir == "" {
		return nil, fmt.Errorf("appsDir can't be empty")
	}

	s := &ksServer{
		appsDir:            appsDir,
		projectLocks:       make(map[string]*sync.Mutex),
		gkeVersionOverride: gkeVersionOverride,
		fs:                 afero.NewOsFs(),
		installIstio:       installIstio,
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

func (s *ksServer) GetProjectLock(project string) *sync.Mutex {
	s.serverMux.Lock()
	defer s.serverMux.Unlock()
	_, ok := s.projectLocks[project]
	if !ok {
		s.projectLocks[project] = &sync.Mutex{}
	}
	return s.projectLocks[project]
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

func timeSinceStart(ctx context.Context) time.Duration {
	startTime, ok := ctx.Value(StartTime).(time.Time)
	if !ok {
		return time.Duration(0)
	}
	return time.Since(startTime)
}

// Add heartbeat every 10 seconds
func countHeartbeat() {
	for {
		time.Sleep(10 * time.Second)
		serviceHeartbeat.Inc()
	}
}

func makeHealthzEndpoint() endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		r := &HealthzResponse{}
		r.Reply = "Request accepted! Still alive!"
		return r, nil
	}
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

	// add an http handler for prometheus metrics
	http.Handle("/metrics", promhttp.Handler())

	go countHeartbeat()

	log.Infof("Listening on address: %+v", listener.Addr())

	err = http.Serve(s.listener, nil)

	return err
}
