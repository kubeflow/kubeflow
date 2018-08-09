package app

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"path"
	"sync"

	"path/filepath"

	"github.com/go-kit/kit/endpoint"
	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/ksonnet/ksonnet/actions"
	kApp "github.com/ksonnet/ksonnet/metadata/app"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"golang.org/x/net/context"
	meta_v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
	"k8s.io/client-go/rest"
)

// The name of the prototype for Jupyter.
const JUPYTER_PROTOTYPE = "jupyterhub"

// KsService defines an interface for working with ksonnet.
type KsService interface {
	// CreateApp creates a ksonnet application.
	CreateApp(context.Context, CreateRequest) error
	InsertSaKey(context.Context, InsertSaKeyRequest) error
	BindRole(context.Context, BindRoleRequest) error
}

// appInfo keeps track of information about apps.
type appInfo struct {
	App kApp.App
	mux sync.Mutex
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
	knownRegistries map[string]RegistryConfig

	// Config used to talk to Kubernetes.
	config *rest.Config

	fs afero.Fs

	apps    map[string]*appInfo
	appsMux sync.Mutex
	iamMux sync.Mutex
}

// NewServer constructs a ksServer.
func NewServer(appsDir string, registries []RegistryConfig, config *rest.Config) (*ksServer, error) {
	if appsDir == "" {
		return nil, fmt.Errorf("appsDir can't be empty")
	}

	s := &ksServer{
		appsDir:         appsDir,
		apps:            make(map[string]*appInfo),
		knownRegistries: make(map[string]RegistryConfig),
		fs:              afero.NewOsFs(),
		config:          config,
	}

	for _, r := range registries {
		s.knownRegistries[r.Name] = r
		if r.RegUri == "" {
			return nil, fmt.Errorf("Known registry %v missing URI", r.Name)
		}
	}

	info, err := s.fs.Stat(appsDir)

	// TODO(jlewi): Should we create the directory if it doesn't exist?
	if err != nil {
		return nil, err
	}

	if !info.IsDir() {
		return nil, fmt.Errorf("appsDir %v is not a directory", appsDir)
	}

	files, err := ioutil.ReadDir(appsDir)
	if err != nil {
		return nil, err
	}

	for _, file := range files {
		if !file.IsDir() {
			continue
		}

		// Try loading the directory
		appName := file.Name()
		appDir := path.Join(appsDir, appName)
		kfApp, err := kApp.Load(s.fs, appDir, true)

		if err != nil {
			// Keep going if there is a problem loading an existing app.
			log.Errorf("There was a problem loading the app: %v", appsDir)
			continue
		}

		s.apps[appName] = &appInfo{
			App: kfApp,
		}
	}
	return s, nil
}

// CreateRequest represents a request to create a ksonnet application.
type CreateRequest struct {
	// Name for the app.
	Name string
	// AppConfig is the config for the app.
	AppConfig AppConfig

	// Namespace for the app.
	Namespace string

	// Whether to try to autoconfigure the app.
	AutoConfigure bool
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

	// Environment is the environment to use.
	Environment string

	// Components is a list of the names of the components to apply.
	Components []string

	// Token is an authorization token to use to authorize to the K8s API Server.
	// Leave blank to use the pods service account.
	Token string
}

// CreateApp creates a ksonnet application based on the request.
func (s *ksServer) CreateApp(ctx context.Context, request CreateRequest) error {
	a, err := func() (*appInfo, error) {
		s.appsMux.Lock()
		defer s.appsMux.Unlock()

		if request.Name == "" {
			return nil, fmt.Errorf("Name must be a non empty string.")
		}
		info, ok := s.apps[request.Name]

		if ok {
			log.Infof("App %v exists", request.Name)
			return info, nil
		}

		log.Infof("Creating app %v", request.Name)
		log.Infof("Using K8s host %v", s.config.Host)
		envName := "default"

		appDir := path.Join(s.appsDir, request.Name)
		_, err := s.fs.Stat(appDir)

		if err != nil {
			options := map[string]interface{}{
				actions.OptionFs:       s.fs,
				actions.OptionName:     "app",
				actions.OptionEnvName:  envName,
				actions.OptionRootPath: appDir,
				actions.OptionServer:   s.config.Host,
				// TODO(jlewi): What is the proper version to use? It shouldn't be a version like v1.9.0-gke as that
				// will create an error because ksonnet will be unable to fetch a swagger spec.
				actions.OptionSpecFlag:              "version:v1.7.0",
				actions.OptionNamespace:             request.Namespace,
				actions.OptionSkipDefaultRegistries: true,
			}

			err := actions.RunInit(options)
			if err != nil {
				return nil, fmt.Errorf("There was a problem initializing the app: %v", err)
			}
			log.Infof("Successfully initialized the app %v.", appDir)

		} else {
			log.Infof("Directory %v exists", appDir)
		}

		kfApp, err := kApp.Load(s.fs, appDir, true)

		if err != nil {
			log.Errorf("There was a problem loading app %v. Error: %v", request.Name, err)
			return nil, err
		}
		s.apps[request.Name] = &appInfo{
			App: kfApp,
		}
		return s.apps[request.Name], nil
	}()

	if err != nil {
		return err
	}

	a.mux.Lock()
	defer a.mux.Unlock()

	// Add the registries to the app.
	for idx, registry := range request.AppConfig.Registries {
		if registry.RegUri == "" {
			v, ok := s.knownRegistries[registry.Name]
			if !ok {
				return fmt.Errorf("App %v uses registry %v but no URI is specified and this is not a known registry", request.Name, registry.Name)
			}
			log.Infof("No URI provided for registry %v; setting URI to %v.", registry.Name, v.RegUri)
			request.AppConfig.Registries[idx].RegUri = v.RegUri
		}
		log.Infof("App %v add registry %v URI %v", request.Name, registry.Name, registry.RegUri)
		options := map[string]interface{}{
			actions.OptionApp:  a.App,
			actions.OptionName: registry.Name,
			actions.OptionURI:  registry.RegUri,
			// Version doesn't actually appear to be used by the add function.
			actions.OptionVersion: "",
			// Looks like override allows us to override existing registries; we shouldn't
			// need to do that.
			actions.OptionOverride: false,
		}

		registries, err := a.App.Registries()
		if err != nil {
			log.Fatal("There was a problem listing registries; %v", err)
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

	s.appGenerate(a.App, &request.AppConfig)
	if request.AutoConfigure {
		return s.autoConfigureApp(&a.App, &request.AppConfig)
	}

	log.Infof("Created and initialized app at %v", a.App.Root())
	return nil
}

// appGenerate installs packages and creates components.
func (s *ksServer) appGenerate(kfApp kApp.App, appConfig *AppConfig) error {
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
			var ksRegistry KsRegistry
			if LoadConfig(regFile, &ksRegistry) == nil {
				for pkgName, _ := range ksRegistry.Libraries {
					_, err = s.fs.Stat(path.Join(registry.RegUri, pkgName))
					if err != nil {
						return fmt.Errorf("Package %v didn't exist in registry %v", pkgName, registry.RegUri)
					}
					full := fmt.Sprintf("%v/%v", registry.Name, pkgName)
					log.Infof("Installing package %v", full)

					if _, found := libs[pkgName]; found {
						log.Infof("Package %v already exists", pkgName)
						continue
					}
					err := actions.RunPkgInstall(map[string]interface{}{
						actions.OptionApp:     kfApp,
						actions.OptionLibName: full,
						actions.OptionName:    pkgName,
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

		if _, found := libs[pkg.Name]; found {
			log.Infof("Package %v already exists", pkg.Name)
			continue
		}
		err := actions.RunPkgInstall(map[string]interface{}{
			actions.OptionApp:     kfApp,
			actions.OptionLibName: full,
			actions.OptionName:    pkg.Name,
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
	for _, p := range appConfig.Parameters {
		err = actions.RunParamSet(map[string]interface{}{
			actions.OptionApp:   kfApp,
			actions.OptionName:  p.Component,
			actions.OptionPath:  p.Name,
			actions.OptionValue: p.Value,
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
			actions.OptionApp:       kfApp,
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
func (s *ksServer) autoConfigureApp(kfApp *kApp.App, appConfig *AppConfig) error {

	kubeClient, err := clientset.NewForConfig(rest.AddUserAgent(s.config, "kubeflow-bootstrapper"))
	if err != nil {
		return err
	}

	clusterVersion, err := kubeClient.DiscoveryClient.ServerVersion()

	if err != nil {
		return err
	}

	log.Infof("Cluster version: %v", clusterVersion.String())

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
		if component.Prototype == JUPYTER_PROTOTYPE {
			pvcMount := ""
			if hasDefault {
				pvcMount = "/home/jovyan"
			}

			err = actions.RunParamSet(map[string]interface{}{
				actions.OptionApp:   kfApp,
				actions.OptionName:  component.Name,
				actions.OptionPath:  "jupyterNotebookPVCMount",
				actions.OptionValue: pvcMount,
			})

			if err != nil {
				return err
			}
		}
	}

	return nil
}

// Apply runs apply on a ksonnet application.
func (s *ksServer) Apply(ctx context.Context, req ApplyRequest) error {
	a, err := func() (*appInfo, error) {
		s.appsMux.Lock()
		defer s.appsMux.Unlock()

		info, ok := s.apps[req.Name]

		if !ok {
			return nil, fmt.Errorf("App %s doesn't exist", req.Name)
		}
		return info, nil
	}()

	if err != nil {
		return err
	}

	a.mux.Lock()
	defer a.mux.Unlock()

	// (05092018): we shell out to ks apply and don't use ksonnet apply function because
	// ks runApply API expects clientcmd.ClientConfig, which has a soft dependency on existence of ~/.kube/config
	// if we use k8s client-go API, would be quite verbose if we create all resources one by one.
	// TODO: use API to create ks Components
	if err := os.Chdir(a.App.Root()); err != nil {
		return err
	}

	token := req.Token

	if token == "" {
		log.Infof("No token specified in request; defaulting to service account")
		token = "$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)"
	}
	for _, component := range req.Components {
		log.Infof("Apply kubeflow component %v", component)
		rawCmd := fmt.Sprintf("ks apply %v -c %v --token=%v", req.Environment, component, token)
		applyCmd := exec.Command("bash", "-c", rawCmd)

		var out bytes.Buffer
		var stderr bytes.Buffer
		applyCmd.Stdout = &out
		applyCmd.Stderr = &stderr
		log.Infof("Run command: %v", rawCmd)
		err := applyCmd.Run()
		log.Info("Command: %v\nstdout:\n%vstderr:\n%v", rawCmd, out.String(), stderr.String())

		if err != nil {
			log.Errorf("Component %v apply failed; Error: %v", component, err)
			return err
		} else {
			// ks apply output to stderr on success case as well
			log.Infof("Component %v apply succeded", component)
		}
	}
	return nil
}

func makeCreateAppEndpoint(svc KsService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(CreateRequest)
		err := svc.CreateApp(ctx, req)

		r := &basicServerResponse{}

		if err != nil {
			r.Err = err.Error()
		}
		return r, nil
	}
}

func makeHealthzEndpoint(svc KsService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(HealthzRequest)
		r := &HealthzResponse{}
		r.Reply = req.Msg + "accepted! Sill alive!"
		log.Info("response info: " + r.Reply)
		return r, nil
	}
}

func makeSaKeyEndpoint(svc KsService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(InsertSaKeyRequest)
		err := svc.InsertSaKey(ctx, req)
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
		return nil, err
	}
	return request, nil
}

// The same encoder can be used for all RPC responses.
func encodeResponse(_ context.Context, w http.ResponseWriter, response interface{}) error {
	return json.NewEncoder(w).Encode(response)
}

// StartHttp starts an HTTP server and blocks.
func (s *ksServer) StartHttp(port int) {
	if port <= 0 {
		log.Fatal("port must be > 0.")
	}
	// ctx := context.Background()

	createAppHandler := httptransport.NewServer(
		makeCreateAppEndpoint(s),
		decodeCreateAppRequest,
		encodeResponse,
	)

	healthzHandler := httptransport.NewServer(
		makeHealthzEndpoint(s),
		func (_ context.Context, r *http.Request) (interface{}, error) {
			var request HealthzRequest
			if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
				log.Info("Err decoding request: " + err.Error())
				return nil, err
			}
			log.Info("Request received: " + request.Msg)
			return request, nil
		},
		encodeResponse,
	)

	insertSaKeyHandler := httptransport.NewServer(
		makeSaKeyEndpoint(s),
		func (_ context.Context, r *http.Request) (interface{}, error) {
			var request InsertSaKeyRequest
			if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
				return nil, err
			}
			return request, nil
		},
		encodeResponse,
	)

	bindRoleHandler := httptransport.NewServer(
		makeBindRoleEndpoint(s),
		func (_ context.Context, r *http.Request) (interface{}, error) {
			var request BindRoleRequest
			if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
				return nil, err
			}
			return request, nil
		},
		encodeResponse,
	)

	http.Handle("/apps/create", createAppHandler)
	http.Handle("/healthz", healthzHandler)
	http.Handle("/iam/insertSaKey", insertSaKeyHandler)
	http.Handle("/iam/bindRole", bindRoleHandler)

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}
