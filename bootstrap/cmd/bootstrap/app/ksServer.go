package app

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path"
	"sync"

	"path/filepath"

	"github.com/go-kit/kit/endpoint"
	httptransport "github.com/go-kit/kit/transport/http"
	"github.com/ksonnet/ksonnet/pkg/actions"
	kApp "github.com/ksonnet/ksonnet/pkg/app"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/afero"
	"golang.org/x/net/context"
	core_v1 "k8s.io/api/core/v1"
	meta_v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	clientset "k8s.io/client-go/kubernetes"
	type_v1 "k8s.io/client-go/kubernetes/typed/core/v1"
	"k8s.io/client-go/rest"
	"k8s.io/api/rbac/v1"
	clientcmdapi "k8s.io/client-go/tools/clientcmd/api"
	"github.com/ksonnet/ksonnet/pkg/client"
	"k8s.io/client-go/tools/clientcmd"
	"time"
	"os/exec"
	"golang.org/x/oauth2"
	"google.golang.org/api/sourcerepo/v1"
	"os"
	)

// The name of the prototype for Jupyter.
const JUPYTER_PROTOTYPE = "jupyterhub"

// root dir of local cached VERSIONED REGISTRIES
const CACHED_REGISTRIES = "/opt/versioned_registries"

// KsService defines an interface for working with ksonnet.
type KsService interface {
	// CreateApp creates a ksonnet application.
	CreateApp(context.Context, CreateRequest) error
	// Apply ksonnet app to target GKE cluster
	Apply(ctx context.Context, req ApplyRequest) error
	InsertSaKeys(context.Context, InsertSaKeyRequest) error
	BindRole(context.Context, string, string, string) error
	InsertDeployment(context.Context, CreateRequest) error
	GetDeploymentStatus(context.Context, CreateRequest) (string, error)
	ApplyIamPolicy(context.Context, ApplyIamRequest) error
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
	knownRegistries map[string]RegistryConfig

	fs afero.Fs

	// project-id -> project lock
	projectLocks map[string]*sync.Mutex
	serverMux sync.Mutex
}

// NewServer constructs a ksServer.
func NewServer(appsDir string, registries []RegistryConfig) (*ksServer, error) {
	if appsDir == "" {
		return nil, fmt.Errorf("appsDir can't be empty")
	}

	s := &ksServer{
		appsDir:         appsDir,
		projectLocks:    make(map[string]*sync.Mutex),
		knownRegistries: make(map[string]RegistryConfig),
		fs:              afero.NewOsFs(),
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
	AppConfig AppConfig

	// Namespace for the app.
	Namespace string

	// Whether to try to autoconfigure the app.
	AutoConfigure bool

	// target GKE cLuster info
	Cluster string
	Project string
	ProjectNumber string
	Zone string

	// Access token, need to access target cluster in order for AutoConfigure
	Token string
	Apply bool
	Email string
	// temporary
	ClientId string
	ClientSecret string
	IpName string

	// For test: GCP service account client id
	SAClientId string
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

	// target GKE cLuster info
	Cluster string
	Project string
	Zone string

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

// CreateApp creates a ksonnet application based on the request.
func (s *ksServer) CreateApp(ctx context.Context, request CreateRequest) error {
	config, err := rest.InClusterConfig()
	if request.Token != "" {
		config, err = buildClusterConfig(ctx, request.Token, request.Project, request.Zone, request.Cluster)
	}
	if err != nil {
		log.Errorf("Failed getting GKE cluster config: %v", err)
		return err
	}
	func() {
		s.serverMux.Lock()
		defer s.serverMux.Unlock()
		_, ok := s.projectLocks[request.Project]
		if !ok {
			s.projectLocks[request.Project] = &sync.Mutex{}
		}
	}()

	s.projectLocks[request.Project].Lock()
	defer s.projectLocks[request.Project].Unlock()

	if request.Name == "" {
		return fmt.Errorf("Name must be a non empty string.")
	}
	a, err := s.GetApp(request.Project, request.Name, request.Token)
	envName := "default"
	if err == nil {
		log.Infof("App %v exists in project %v", request.Name, request.Project)
		options := map[string]interface{}{
			actions.OptionApp:     a.App,
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

		appDir := path.Join(s.appsDir, GetRepoName(request.Project), request.Name)
		_, err = s.fs.Stat(appDir)

		if err != nil {
			options := map[string]interface{}{
				actions.OptionFs:       s.fs,
				actions.OptionName:     "app",
				actions.OptionEnvName:  envName,
				actions.OptionRootPath: appDir,
				actions.OptionServer:   config.Host,
				// TODO(jlewi): What is the proper version to use? It shouldn't be a version like v1.9.0-gke as that
				// will create an error because ksonnet will be unable to fetch a swagger spec.
				actions.OptionSpecFlag:              "version:v1.10.6",
				actions.OptionNamespace:             request.Namespace,
				actions.OptionSkipDefaultRegistries: true,
			}

			err := actions.RunInit(options)
			if err != nil {
				return fmt.Errorf("There was a problem initializing the app: %v", err)
			}
			log.Infof("Successfully initialized the app %v.", appDir)

		} else {
			log.Infof("Directory %v exists", appDir)
		}

		kfApp, err := kApp.Load(s.fs, appDir, true)

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
		RegUri, err := s.getRegistryUri(&registry)
		if err != nil {
			log.Errorf("There was a problem getRegistryUri for registry %v. Error: %v", registry.Name, err)
			return err
		}
		request.AppConfig.Registries[idx].RegUri = RegUri
		log.Infof("App %v add registry %v URI %v", request.Name, registry.Name, registry.RegUri)
		options := map[string]interface{}{
			actions.OptionApp:  a.App,
			actions.OptionName: registry.Name,
			actions.OptionURI:  request.AppConfig.Registries[idx].RegUri,
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

	err = s.SaveAppToRepo(request.Project, request.Email)
	if err != nil {
		log.Errorf("There was a problem saving config to cloud repo; %v", err)
		return err
	}
	log.Infof("Created and initialized app at %v", a.App.Root())
	return nil
}

// fetch remote registry to local disk, or use baked-in registry if version not specified in user request.
// Then return registry's RegUri.
func (s *ksServer) getRegistryUri(registry *RegistryConfig) (string, error) {
	if registry.Name == "" ||
		registry.Path == "" ||
		registry.Repo == "" ||
		registry.Version == "" ||
		registry.Version == "default" {

		v, ok := s.knownRegistries[registry.Name]
		if !ok {
			return "", fmt.Errorf("Create request uses registry %v but some " +
				"required fields are not specified and this is not a known registry.", registry.Name)
		}
		log.Infof("No remote registry provided for registry %v; setting URI to local %v.", registry.Name, v.RegUri)
		return v.RegUri, nil
	} else {
		versionPath := path.Join(CACHED_REGISTRIES, registry.Name, registry.Version)

		s.serverMux.Lock()
		defer s.serverMux.Unlock()
		_, err := s.fs.Stat(versionPath)

		// If specific version doesn't exist locally, will download.
		// The local cache path will be CACHED_REGISTRIES/registry_name/registry_version/
		if err != nil {
			registryPath := path.Join(CACHED_REGISTRIES, registry.Name)
			_, err := s.fs.Stat(registryPath)
			if err != nil {
				os.Mkdir(registryPath, os.ModePerm)
			}
			fileUrl := registry.Repo + "/archive/" + registry.Version + ".tar.gz"

			err = runCmd(fmt.Sprintf("curl -L -o %v %v", versionPath + ".tar.gz", fileUrl))
			if err != nil {
				return "", err
			}
			err = runCmd(fmt.Sprintf("tar -xzvf %s  -C %s", versionPath+".tar.gz", registryPath))
			if err != nil {
				return "", err
			}
			err = os.Rename(path.Join(registryPath, registry.Name + "-" + registry.Version), versionPath)
			if err != nil {
				log.Errorf("Error occrued during os.Rename. Error: %v", err)
				return "", err
			}
		}
		return path.Join(versionPath, registry.Path), nil
	}
}

func runCmd(rawcmd string) error {
	cmd := exec.Command("sh", "-c", rawcmd)
	err := cmd.Run()
	if err != nil {
		log.Errorf("Error occrued during execute cmd %v. Error: %v", rawcmd, err)
	}
	return err
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
						actions.OptionForce:	false,
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
			actions.OptionForce:	false,
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
func (s *ksServer) autoConfigureApp(kfApp *kApp.App, appConfig *AppConfig, namespace string, config *rest.Config) error {

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
		if component.Prototype == JUPYTER_PROTOTYPE {
			pvcMount := ""
			if hasDefault {
				pvcMount = "/home/jovyan"
			}

			err = actions.RunParamSet(map[string]interface{}{
				actions.OptionApp:   *kfApp,
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


func GetRepoName(project string) string {
	return fmt.Sprintf("%s-kubeflow-config", project)
}

// Not thread-safe, make sure project lock is on.
// Clone project repo to local disk, which contains all existing ks apps config in the project
func (s *ksServer) CloneRepoToLocal(project string, token string) error {
	repoDir := path.Join(s.appsDir, GetRepoName(project))
	_, err := s.fs.Stat(repoDir)

	// delete existing local repo, pull from cloud
	if err == nil {
		os.RemoveAll(repoDir)
	}
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: token,
	})
	sourcerepoService, err := sourcerepo.New(oauth2.NewClient(context.Background(), ts))
	_, err = sourcerepoService.Projects.Repos.Get(fmt.Sprintf("projects/%s/repos/%s", project, GetRepoName(project))).Do()
	if err != nil {
		// repo does't exist in target project, create one
		_, err = sourcerepoService.Projects.Repos.Create(fmt.Sprintf("projects/%s", project), &sourcerepo.Repo{
			Name: fmt.Sprintf("projects/%s/repos/%s", project, GetRepoName(project)),
		}).Do()
		if err != nil {
			log.Errorf("Fail to create repo %v", err)
			return err
		}
	}
	err = os.Chdir(s.appsDir)
	if err != nil {
		return err
	}
	cloneCmd := fmt.Sprintf("git clone https://%s:%s@source.developers.google.com/p/%s/r/%s",
		"user1", token, project, GetRepoName(project))
	cmd := exec.Command("sh", "-c", cloneCmd)
	result, err := cmd.CombinedOutput()
	log.Infof(string(result))
	return err
}

func (s *ksServer) GetApp(project string, appName string, token string) (*appInfo, error) {
	err := s.CloneRepoToLocal(project, token)
	if err != nil {
		return nil, err
	}
	appDir := path.Join(s.appsDir, GetRepoName(project), appName)
	_, err = s.fs.Stat(appDir)
	if err != nil {
		return nil, fmt.Errorf("App %s doesn't exist in Project %s", appName, project)
	}
	kfApp, err := kApp.Load(s.fs, appDir, true)

	if err != nil {
		return nil, fmt.Errorf("There was a problem loading app %v. Error: %v", appName, err)
	}

	return &appInfo{
		App: kfApp,
	}, nil
}

// Save ks app config local changes to project source repo.
// Not thread safe, be aware when call it.
func (s *ksServer) SaveAppToRepo(project string, email string) error {
	repoDir := path.Join(s.appsDir, GetRepoName(project))
	err := os.Chdir(repoDir)
	if err != nil {
		return err
	}

	return runCmd(fmt.Sprintf("git config user.email '%s'; git config user.name 'auto-commit'; git add .; " +
		"git commit -m 'auto commit from deployment'; git pull --rebase; git push origin master", email))
}

// Apply runs apply on a ksonnet application.
func (s *ksServer) Apply(ctx context.Context, req ApplyRequest) error {
	token := req.Token
	if token == "" {
		log.Infof("No token specified in request; dropping request.")
	} else {
		config, err := buildClusterConfig(ctx, req.Token, req.Project, req.Zone, req.Cluster)
		if err != nil {
			log.Errorf("Failed getting GKE cluster config: %v", err)
			return err
		}
		s.projectLocks[req.Project].Lock()
		defer s.projectLocks[req.Project].Unlock()
		a, err := s.GetApp(req.Project, req.Name, req.Token)
		if err != nil {
			return err
		}

		bindAccount := req.Email
		if req.SAClientId != "" {
			bindAccount = req.SAClientId
		}

		roleBinding := v1.ClusterRoleBinding{
			TypeMeta: meta_v1.TypeMeta{
				APIVersion: "rbac.authorization.k8s.io/v1beta1",
				Kind:       "ClusterRoleBinding",
			},
			ObjectMeta: meta_v1.ObjectMeta{
				Name: "default-admin",
			},
			RoleRef: v1.RoleRef{
				APIGroup: "rbac.authorization.k8s.io",
				Kind:     "ClusterRole",
				Name:     "cluster-admin",
			},
			Subjects: []v1.Subject{
				{
					Kind:      v1.UserKind,
					Name:      bindAccount,
				},
			},
		}

		createK8sRoleBing(config, &roleBinding)

		cfg := clientcmdapi.Config{
			Kind: "Config",
			APIVersion: "v1",
			Clusters: map[string]*clientcmdapi.Cluster{
				"activeCluster": {
					CertificateAuthorityData: config.TLSClientConfig.CAData,
					Server: config.Host,
				},
			},
			Contexts: map[string]*clientcmdapi.Context{
				"activeCluster": {
					Cluster: "activeCluster",
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
			actions.OptionApp:            a.App,
			actions.OptionClientConfig:   &client.Config{
				Overrides: &clientcmd.ConfigOverrides{},
				Config: clientcmd.NewDefaultClientConfig(cfg, &clientcmd.ConfigOverrides{}),
			},
			actions.OptionComponentNames: req.Components,
			actions.OptionCreate:         true,
			actions.OptionDryRun:         false,
			actions.OptionEnvName:        "default",
			actions.OptionGcTag:          "gc-tag",
			actions.OptionSkipGc:         true,
		}
		retry := 0
		for retry < 3 {
			succeeded := true
			retry += 1
			for _, comp := range req.Components {
				applyOptions[actions.OptionComponentNames] = []string{comp}
				err = actions.RunApply(applyOptions)
				if err == nil {
					log.Infof("Component %v apply succeeded", comp)
				} else {
					log.Errorf("(Will retry) Component %v apply failed; Error: %v", comp, err)
					succeeded = false
				}
			}
			if succeeded {
				log.Infof("All component apply succeeded")
				return nil
			} else {
				time.Sleep(5 * time.Second)
			}
		}
		log.Errorf("Components apply failed; Error: %v", err)
		return err
	}
	return nil
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
		err := svc.CreateApp(ctx, req)

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
					Name: req.Name,
					Environment: "default",
					Components: components,
					Cluster: req.Cluster,
					Project: req.Project,
					Zone: req.Zone,
					Token: req.Token,
					Email: req.Email,
				})
				if err != nil {
					r.Err = err.Error()
				}
			}
		}
		return r, nil
	}
}

func finishDeployment(svc KsService, req CreateRequest) {
	retry := 0
	status := ""
	var err error
	ctx := context.TODO()
	for retry < 40 {
		status, err = svc.GetDeploymentStatus(ctx, req)
		if err != nil {
			log.Errorf("Failed to get deployment status: %v", err)
			return
		}
		if status == "DONE" {
			log.Infof("Deployment is done")
			break
		}
		log.Infof("status: %v, waiting...", status)
		retry += 1
		time.Sleep(10 * time.Second)
	}
	if status != "DONE" {
		log.Errorf("Deployment status is not done: %v", status)
		return
	}

	log.Info("Patching IAM bindings...")
	err = svc.ApplyIamPolicy(ctx, ApplyIamRequest{
		Project: req.Project,
		Cluster: req.Cluster,
		Email: req.Email,
		Token: req.Token,
		Action: "add",
	})
	if err != nil {
		log.Errorf("Failed to update IAM: %v", err)
		return
	}

	log.Infof("Inserting sa keys...")
	err = svc.InsertSaKeys(ctx, InsertSaKeyRequest{
		Cluster: req.Cluster,
		Namespace: req.Namespace,
		Project: req.Project,
		Token: req.Token,
		Zone: req.Zone,
	})
	if err != nil {
		log.Errorf("Failed to insert service account key: %v", err)
		return
	}

	log.Infof("Creating app...")
	err = svc.CreateApp(ctx, req)
	if err != nil {
		log.Errorf("Failed to create app: %v", err)
		return
	}

	if req.Apply {
		components := []string{}
		for _, comp := range req.AppConfig.Components {
			components = append(components, comp.Name)
		}
		err = svc.Apply(ctx, ApplyRequest{
			Name: req.Name,
			Environment: "default",
			Components: components,
			Cluster: req.Cluster,
			Project: req.Project,
			Zone: req.Zone,
			Token: req.Token,
			Email: req.Email,
			SAClientId: req.SAClientId,
		})
		if err != nil {
			log.Errorf("Failed to apply app: %v", err)
			return
		}
	}
}

func makeDeployEndpoint(svc KsService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(CreateRequest)
		r := &basicServerResponse{}

		dmServiceAccount := req.ProjectNumber + "@cloudservices.gserviceaccount.com"
		err := svc.BindRole(ctx, req.Project, req.Token, dmServiceAccount)
		if err != nil {
			r.Err = err.Error()
			return r, err
		}

		err = svc.InsertDeployment(ctx, req)
		if err != nil {
			r.Err = err.Error()
			return r, err
		}
		go finishDeployment(svc, req)
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

func makeSaKeyEndpoint(svc KsService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(InsertSaKeyRequest)
		err := svc.InsertSaKeys(ctx, req)
		r := &basicServerResponse{}
		if err != nil {
			r.Err = err.Error()
		}
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
			h.ServeHTTP(w,r)
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
		func (_ context.Context, r *http.Request) (interface{}, error) {
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
		func (_ context.Context, r *http.Request) (interface{}, error) {
			return nil, nil
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

	applyIamHandler := httptransport.NewServer(
		makeIamEndpoint(s),
		func (_ context.Context, r *http.Request) (interface{}, error) {
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
		func (_ context.Context, r *http.Request) (interface{}, error) {
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
	http.Handle("/kfctl/iam/insertSaKey", optionsHandler(insertSaKeyHandler))
	http.Handle("/kfctl/iam/apply", optionsHandler(applyIamHandler))
	http.Handle("/kfctl/initProject", optionsHandler(initProjectHandler))
	http.Handle("/kfctl/e2eDeploy", optionsHandler(deployHandler))

	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}
