package configconverters

import (
	"fmt"
	"github.com/ghodss/yaml"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypesv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfconfig "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfconfig"
	kfdeftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1beta1"
)

// Empty struct - used to implement Converter interface.
type V1beta1 struct {
}

func maybeGetPlatform(pluginKind string) string {
	platforms := map[string]string{
		string(kfconfig.AWS_PLUGIN_KIND):              kftypesv3.AWS,
		string(kfconfig.GCP_PLUGIN_KIND):              kftypesv3.GCP,
		string(kfconfig.EXISTING_ARRIKTO_PLUGIN_KIND): kftypesv3.EXISTING_ARRIKTO,
	}

	p, ok := platforms[pluginKind]
	if ok {
		return p
	} else {
		return ""
	}
}

func (v V1beta1) ToKfConfig(appdir string, kfdefBytes []byte) (*kfconfig.KfConfig, error) {
	kfdef := &kfdeftypes.KfDef{}
	if err := yaml.Unmarshal(kfdefBytes, kfdef); err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not unmarshal config file onto KfDef struct: %v", err),
		}
	}

	// Set UseBasicAuth later.
	config := &kfconfig.KfConfig{
		Spec: kfconfig.KfConfigSpec{
			AppDir:       appdir,
			UseBasicAuth: false,
			UseIstio:     true,
		},
	}
	config.Name = kfdef.Name
	config.Namespace = kfdef.Namespace
	config.APIVersion = kfdef.APIVersion
	config.Kind = "KfConfig"
	config.Spec.Version = kfdef.Spec.Version
	for _, app := range kfdef.Spec.Applications {
		application := kfconfig.Application{
			Name: app.Name,
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

				// Use application to infer whether UseBasicAuth is true.
				if kref.Path == "common/basic-auth" {
					config.Spec.UseBasicAuth = true
				}
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
		config.Spec.Applications = append(config.Spec.Applications, application)
	}

	for _, plugin := range kfdef.Spec.Plugins {
		p := kfconfig.Plugin{
			Name:      plugin.Name,
			Namespace: kfdef.Namespace,
			Kind:      kfconfig.PluginKindType(plugin.Kind),
			Spec:      plugin.Spec,
		}
		config.Spec.Plugins = append(config.Spec.Plugins, p)

		if plugin.Kind == string(kfconfig.GCP_PLUGIN_KIND) {
			specBytes, err := yaml.Marshal(plugin.Spec)
			if err != nil {
				return nil, &kfapis.KfError{
					Code:    int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("could not marshal GCP plugin spec: %v", err),
				}
			}
			var s map[string]interface{}
			err = yaml.Unmarshal(specBytes, &s)
			if err != nil {
				return nil, &kfapis.KfError{
					Code:    int(kfapis.INTERNAL_ERROR),
					Message: fmt.Sprintf("could not unmarshal GCP plugin spec: %v", err),
				}
			}
			if p, ok := s["project"]; ok {
				config.Spec.Project = p.(string)
			}
			if e, ok := s["email"]; ok {
				config.Spec.Email = e.(string)
			}
			if i, ok := s["ipName"]; ok {
				config.Spec.IpName = i.(string)
			}
			if h, ok := s["hostname"]; ok {
				config.Spec.Hostname = h.(string)
			}
			if h, ok := s["skipInitProject"]; ok {
				config.Spec.SkipInitProject = h.(bool)
			}
			if z, ok := s["zone"]; ok {
				config.Spec.Zone = z.(string)
			}
		}
		if p := maybeGetPlatform(plugin.Kind); p != "" {
			config.Spec.Platform = p
		}
	}

	for _, secret := range kfdef.Spec.Secrets {
		s := kfconfig.Secret{
			Name: secret.Name,
		}
		if secret.SecretSource == nil {
			config.Spec.Secrets = append(config.Spec.Secrets, s)
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
		config.Spec.Secrets = append(config.Spec.Secrets, s)
	}

	for _, repo := range kfdef.Spec.Repos {
		r := kfconfig.Repo{
			Name: repo.Name,
			URI:  repo.URI,
		}
		config.Spec.Repos = append(config.Spec.Repos, r)
	}

	for _, cond := range kfdef.Status.Conditions {
		c := kfconfig.Condition{
			Type:               kfconfig.ConditionType(cond.Type),
			Status:             cond.Status,
			LastUpdateTime:     cond.LastUpdateTime,
			LastTransitionTime: cond.LastTransitionTime,
			Reason:             cond.Reason,
			Message:            cond.Message,
		}
		config.Status.Conditions = append(config.Status.Conditions, c)
	}
	for _, cache := range kfdef.Status.ReposCache {
		c := kfconfig.Cache{
			Name:      cache.Name,
			LocalPath: cache.LocalPath,
		}
		config.Status.Caches = append(config.Status.Caches, c)
	}

	return config, nil

}

func (v V1beta1) ToKfDefSerialized(config kfconfig.KfConfig) ([]byte, error) {
	kfdef := &kfdeftypes.KfDef{}
	kfdef.Name = config.Name
	kfdef.Namespace = config.Namespace
	kfdef.APIVersion = config.APIVersion
	kfdef.Kind = "KfDef"
	kfdef.Spec.Version = config.Spec.Version

	for _, app := range config.Spec.Applications {
		application := kfdeftypes.Application{
			Name: app.Name,
		}
		if app.KustomizeConfig != nil {
			kconfig := &kfdeftypes.KustomizeConfig{
				Overlays: app.KustomizeConfig.Overlays,
			}
			if app.KustomizeConfig.RepoRef != nil {
				kref := &kfdeftypes.RepoRef{
					Name: app.KustomizeConfig.RepoRef.Name,
					Path: app.KustomizeConfig.RepoRef.Path,
				}
				kconfig.RepoRef = kref
			}
			for _, param := range app.KustomizeConfig.Parameters {
				p := kfdeftypes.NameValue{
					Name:  param.Name,
					Value: param.Value,
				}
				kconfig.Parameters = append(kconfig.Parameters, p)
			}
			application.KustomizeConfig = kconfig
		}
		kfdef.Spec.Applications = append(kfdef.Spec.Applications, application)
	}

	for _, plugin := range config.Spec.Plugins {
		p := kfdeftypes.Plugin{
			Spec: plugin.Spec,
		}
		p.Name = plugin.Name
		p.Kind = string(plugin.Kind)
		kfdef.Spec.Plugins = append(kfdef.Spec.Plugins, p)
	}

	for _, secret := range config.Spec.Secrets {
		s := kfdeftypes.Secret{
			Name: secret.Name,
		}
		if secret.SecretSource != nil {
			s.SecretSource = &kfdeftypes.SecretSource{}
			if secret.SecretSource.LiteralSource != nil {
				s.SecretSource.LiteralSource = &kfdeftypes.LiteralSource{
					Value: secret.SecretSource.LiteralSource.Value,
				}
			}
			if secret.SecretSource.EnvSource != nil {
				s.SecretSource.EnvSource = &kfdeftypes.EnvSource{
					Name: secret.SecretSource.EnvSource.Name,
				}
			}
		}
		kfdef.Spec.Secrets = append(kfdef.Spec.Secrets, s)
	}

	for _, repo := range config.Spec.Repos {
		r := kfdeftypes.Repo{
			Name: repo.Name,
			URI:  repo.URI,
		}
		kfdef.Spec.Repos = append(kfdef.Spec.Repos, r)
	}

	for _, cond := range config.Status.Conditions {
		c := kfdeftypes.KfDefCondition{
			Type:               kfdeftypes.KfDefConditionType(cond.Type),
			Status:             cond.Status,
			LastUpdateTime:     cond.LastUpdateTime,
			LastTransitionTime: cond.LastTransitionTime,
			Reason:             cond.Reason,
			Message:            cond.Message,
		}
		kfdef.Status.Conditions = append(kfdef.Status.Conditions, c)
	}

	for _, cache := range config.Status.Caches {
		c := kfdeftypes.RepoCache{
			Name:      cache.Name,
			LocalPath: cache.LocalPath,
		}
		kfdef.Status.ReposCache = append(kfdef.Status.ReposCache, c)
	}

	kfdefBytes, err := yaml.Marshal(kfdef)
	if err == nil {
		return kfdefBytes, nil
	} else {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("error when marshaling to KfDef: %v", err),
		}
	}
}
