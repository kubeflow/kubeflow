package apps

import (
	"fmt"
	"github.com/ghodss/yaml"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kfconfig "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfctlconfig"
	kfdefv1alpha1 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
)

func kfdefToConfigV1alpha1(kfdefBytes []byte) (*kfconfig.KfctlConfig, error) {
	kfdef := &kfdefv1alpha1.KfDef{}
	if err := yaml.Unmarshal(kfdefBytes, kfdef); err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not unmarshal config file onto KfDef struct: %v", err),
		}
	}

	config := &kfconfig.KfctlConfig{
		AppDir:        kfdef.Spec.AppDir,
		UseBasicAuth:  kfdef.Spec.UseBasicAuth,
		SourceVersion: "v1alpha1",
	}
	for _, app := range kfdef.Spec.Applications {
		kustomizeConfig := &kfconfig.KustomizeConfig{
			Overlays: app.KustomizeConfig.Overlays,
		}
		application := kfconfig.Application{
			Name:            app.Name,
			KustomizeConfig: kustomizeConfig,
		}
		if app.KustomizeConfig != nil {
			kconfig := &kfconfig.KustomizeConfig{
				Overlays: app.KustomizeConfig.Overlays,
			}
			if app.KustomizeConfig.RepoRef != nil {
				kref := &kfconfig.RepoRef{
					Name: app.KustomizeConfig.RepoRef.Name,
					Path: app.KustomizeConfig.RepoRef.Path,
				}
				kconfig.RepoRef = kref
			}
			for _, param := range app.KustomizeConfig.Parameters {
				p := kfconfig.NameValue{
					Name:  param.Name,
					Value: param.Value,
				}
				kconfig.Parameters = append(kconfig.Parameters, p)
			}
			application.KustomizeConfig = kconfig
		}
		config.Applications = append(config.Applications, application)
	}

	for _, secret := range kfdef.Spec.Secrets {
		s := kfconfig.Secret{
			Name: secret.Name,
		}
		if secret.SecretSource == nil {
			config.Secrets = append(config.Secrets, s)
			continue
		}
		src := &kfconfig.SecretSource{}
		if secret.SecretSource.LiteralSource != nil {
			src.LiteralSource = &kfconfig.LiteralSource{
				Value: secret.SecretSource.LiteralSource.Value,
			}
		} else if secret.SecretSource.EnvSource != nil {
			src.EnvSource = &kfconfig.EnvSource{
				Name: secret.SecretSource.EnvSource.Name,
			}
		}
		s.SecretSource = src
		config.Secrets = append(config.Secrets, s)
	}

	for _, repo := range kfdef.Spec.Repos {
		r := kfconfig.Repo{
			Name: repo.Name,
			URI:  repo.Uri,
		}
		config.Repos = append(config.Repos, r)
	}

	return config, nil
}

func LoadConfigFromURI(configFile string) (*kfconfig.KfctlConfig, error) {
	return nil, &kfapis.KfError{
		Code:    int(kfapis.INTERNAL_ERROR),
		Message: "Not implemented.",
	}
}

func WriteConfigToFile(config kfconfig.KfctlConfig, path string) error {
	return &kfapis.KfError{
		Code:    int(kfapis.INTERNAL_ERROR),
		Message: "Not implemented.",
	}
}
