package app

import (
	"golang.org/x/net/context"
	"google.golang.org/api/deploymentmanager/v2"
	"golang.org/x/oauth2"
	"github.com/ghodss/yaml"
	"io/ioutil"
	"path"
)

type Resource struct {
	Name string `json:"name"`
	Type string `json:"type"`
	Properties map[string]interface{} `json:"properties"`
}

type DmConf struct {
	Imports interface{} `json:"imports"`
	Resources []Resource `json:"resources"`
}

// TODO: handle concurrent & repetitive deployment requests.
func (s *ksServer)InsertDeployment(ctx context.Context, req CreateRequest) error {
	regPath := s.knownRegistries["kubeflow"].RegUri
	var dmconf DmConf
	err := LoadConfig(path.Join(regPath, "../components/gcp-click-to-deploy/src/configs/cluster-kubeflow.yaml"), &dmconf)

	if err == nil {
		dmconf.Resources[0].Name = req.Name
		dmconf.Resources[0].Properties["zone"] = req.Zone
		dmconf.Resources[0].Properties["clientId"] = req.ClientId
		dmconf.Resources[0].Properties["clientSecret"] = req.ClientSecret
		dmconf.Resources[0].Properties["ipName"] = req.IpName
		dmconf.Resources[0].Properties["users"] = []string { "user:" + req.Email }
	}
	confByte, err := yaml.Marshal(dmconf)
	if err != nil {
		return err
	}
	templateData, err := ioutil.ReadFile(path.Join(regPath, "../components/gcp-click-to-deploy/src/configs/cluster.jinja"))
	if err != nil {
		return err
	}
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: req.Token,
	})
	deploymentmanagerService, err := deploymentmanager.New(oauth2.NewClient(ctx, ts))
	if err != nil {
		return err
	}
	rb := &deploymentmanager.Deployment{
		Name: req.Name,
		Target: &deploymentmanager.TargetConfiguration{
			Config: &deploymentmanager.ConfigFile{
				Content: string(confByte),
			},
			Imports: []*deploymentmanager.ImportFile{
				{
					Content: string(templateData),
					Name: "cluster.jinja",
				},
			},
		},
	}
	_, err = deploymentmanagerService.Deployments.Insert(req.Project, rb).Context(ctx).Do()
	if err != nil {
		return err
	}
	return nil
}

func (s *ksServer)GetDeploymentStatus(ctx context.Context, req CreateRequest) (string, error) {
	ts := oauth2.StaticTokenSource(&oauth2.Token{
		AccessToken: req.Token,
	})
	deploymentmanagerService, err := deploymentmanager.New(oauth2.NewClient(ctx, ts))
	if err != nil {
		return "", err
	}
	dm, err := deploymentmanagerService.Deployments.Get(req.Project, req.Name).Context(ctx).Do()
	if err != nil {
		return "", err
	}
	return dm.Operation.Status, nil
}