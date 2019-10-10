package configconverters

import (
	"fmt"
	"github.com/ghodss/yaml"
	configsv3 "github.com/kubeflow/kubeflow/bootstrap/v3/config"
	kfapis "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis"
	kftypesv3 "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps"
	kfconfig "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfconfig"
	kfdeftypes "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/apis/apps/kfdef/v1alpha1"
	kfgcp "github.com/kubeflow/kubeflow/bootstrap/v3/pkg/kfapp/gcp"
	log "github.com/sirupsen/logrus"
)

// Empty struct - used to implement Converter interface.
type V1alpha1 struct {
}

func pluginNameToKind(pluginName string) kfconfig.PluginKindType {
	mapper := map[string]kfconfig.PluginKindType{
		kftypesv3.AWS:              kfconfig.AWS_PLUGIN_KIND,
		kftypesv3.GCP:              kfconfig.GCP_PLUGIN_KIND,
		kftypesv3.MINIKUBE:         kfconfig.MINIKUBE_PLUGIN_KIND,
		kftypesv3.EXISTING_ARRIKTO: kfconfig.EXISTING_ARRIKTO_PLUGIN_KIND,
	}
	kind, ok := mapper[pluginName]
	if ok {
		return kind
	} else {
		return kfconfig.PluginKindType("KfUnknownPlugin")
	}
}

// Copy GCP plugin spec. Will skip if platform is not GCP.
func copyGcpPluginSpec(from *kfdeftypes.KfDef, to *kfconfig.KfConfig) error {
	if from.Spec.Platform != kftypesv3.GCP {
		return nil
	}

	spec := kfgcp.GcpPluginSpec{}
	if err := to.GetPluginSpec(kfconfig.GCP_PLUGIN_KIND, &spec); err != nil && !kfconfig.IsPluginNotFound(err) {
		return err
	}
	spec.Project = from.Spec.Project
	spec.Email = from.Spec.Email
	spec.IpName = from.Spec.IpName
	spec.Hostname = from.Spec.Hostname
	spec.Zone = from.Spec.Zone
	spec.UseBasicAuth = from.Spec.UseBasicAuth
	spec.SkipInitProject = from.Spec.SkipInitProject
	spec.DeleteStorage = from.Spec.DeleteStorage
	spec.UseIstio = true
	return to.SetPluginSpec(kfconfig.GCP_PLUGIN_KIND, spec)
}

func (v V1alpha1) ToKfConfig(appdir string, kfdefBytes []byte) (*kfconfig.KfConfig, error) {
	log.Infof("converting to kfconfig, appdir=%v", appdir)
	kfdef := &kfdeftypes.KfDef{}
	if err := yaml.Unmarshal(kfdefBytes, kfdef); err != nil {
		return nil, &kfapis.KfError{
			Code:    int(kfapis.INTERNAL_ERROR),
			Message: fmt.Sprintf("could not unmarshal config file onto KfDef struct: %v", err),
		}
	}

	config := &kfconfig.KfConfig{
<<<<<<< HEAD
<<<<<<< HEAD
		Spec: kfconfig.KfConfigSpec{
			AppDir:          kfdef.Spec.AppDir,
			UseBasicAuth:    kfdef.Spec.UseBasicAuth,
			Project:         kfdef.Spec.Project,
			Email:           kfdef.Spec.Email,
			IpName:          kfdef.Spec.IpName,
			Hostname:        kfdef.Spec.Hostname,
			SkipInitProject: kfdef.Spec.SkipInitProject,
			Zone:            kfdef.Spec.Zone,
<<<<<<< HEAD
<<<<<<< HEAD
			Platform:        kfdef.Spec.Platform,
			UseIstio:        true,
=======
>>>>>>> d54bfc48... fix test
=======
			Platform:        kfdef.Spec.Platform,
>>>>>>> 6d5ac58b... fix appdir
		},
=======
		AppDir:       kfdef.Spec.AppDir,
		UseBasicAuth: kfdef.Spec.UseBasicAuth,
		Project:      kfdef.Spec.Project,
		Email:        kfdef.Spec.Email,
		IpName:       kfdef.Spec.IpName,
		Hostname:     kfdef.Spec.Hostname,
		SkipInitProject: kfdef.Spec.SkipInitProject
		Zone:         kfdef.Spec.Zone,
>>>>>>> e0cf7637... gcp use kfconfig
=======
		AppDir:          kfdef.Spec.AppDir,
		UseBasicAuth:    kfdef.Spec.UseBasicAuth,
		Project:         kfdef.Spec.Project,
		Email:           kfdef.Spec.Email,
		IpName:          kfdef.Spec.IpName,
		Hostname:        kfdef.Spec.Hostname,
		SkipInitProject: kfdef.Spec.SkipInitProject,
		Zone:            kfdef.Spec.Zone,
>>>>>>> 76342527... fix
	}
	if config.Spec.AppDir == "" {
		config.Spec.AppDir = appdir
	}
	config.Name = kfdef.Name
	config.Namespace = kfdef.Namespace
	config.APIVersion = kfdef.APIVersion
	config.Kind = "KfConfig"
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
			Kind:      pluginNameToKind(plugin.Name),
			Spec:      plugin.Spec,
		}
		config.Spec.Plugins = append(config.Spec.Plugins, p)
	}
	specCopiers := []func(*kfdeftypes.KfDef, *kfconfig.KfConfig) error{
		copyGcpPluginSpec,
	}
	for _, copier := range specCopiers {
		if err := copier(kfdef, config); err != nil {
			return nil, &kfapis.KfError{
				Code:    int(kfapis.INVALID_ARGUMENT),
				Message: fmt.Sprintf("error copying plugin specs: %v", err),
			}

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
		} else if secret.SecretSource.HashedSource != nil {
			src.HashedSource = &kfconfig.HashedSource{
				HashedValue: secret.SecretSource.HashedSource.HashedValue,
			}
		}
		s.SecretSource = src
		config.Spec.Secrets = append(config.Spec.Secrets, s)
	}

	for _, repo := range kfdef.Spec.Repos {
		r := kfconfig.Repo{
			Name: repo.Name,
			URI:  repo.Uri,
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
	for name, cache := range kfdef.Status.ReposCache {
		c := kfconfig.Cache{
			Name:      name,
			LocalPath: cache.LocalPath,
		}
		config.Status.Caches = append(config.Status.Caches, c)
	}

	return config, nil
}

func (v V1alpha1) ToKfDefSerialized(config kfconfig.KfConfig) ([]byte, error) {
	kfdef := &kfdeftypes.KfDef{}
	kfdef.Name = config.Name
	kfdef.Namespace = config.Namespace
	kfdef.APIVersion = config.APIVersion
	kfdef.Kind = "KfDef"

	kfdef.Spec.AppDir = config.Spec.AppDir
	kfdef.Spec.UseBasicAuth = config.Spec.UseBasicAuth
	// Should be deprecated, hardcode it just to be safe.
	kfdef.Spec.EnableApplications = true
	kfdef.Spec.UseIstio = true
	kfdef.Spec.PackageManager = "kustomize"

	gcpSpec := &kfgcp.GcpPluginSpec{}
	if err := config.GetPluginSpec(kfconfig.GCP_PLUGIN_KIND, gcpSpec); err == nil {
		kfdef.Spec.Project = gcpSpec.Project
		kfdef.Spec.Email = gcpSpec.Email
		kfdef.Spec.IpName = gcpSpec.IpName
		kfdef.Spec.Hostname = gcpSpec.Hostname
		kfdef.Spec.Zone = gcpSpec.Zone
		kfdef.Spec.SkipInitProject = gcpSpec.SkipInitProject
		kfdef.Spec.DeleteStorage = gcpSpec.DeleteStorage
	}

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
				p := configsv3.NameValue{
					Name:  param.Name,
					Value: param.Value,
				}
				kconfig.Parameters = append(kconfig.Parameters, p)
			}
			application.KustomizeConfig = kconfig
		}
		kfdef.Spec.Applications = append(kfdef.Spec.Applications, application)
	}

	platform := ""
	for _, plugin := range config.Spec.Plugins {
		p := kfdeftypes.Plugin{
			Name: plugin.Name,
			Spec: plugin.Spec,
		}
		kfdef.Spec.Plugins = append(kfdef.Spec.Plugins, p)

		if plugin.Name == kftypesv3.AWS {
			platform = kftypesv3.AWS
		} else if plugin.Name == kftypesv3.GCP {
			platform = kftypesv3.GCP
		}
	}
	// TODO: Platform is not always needed?
	// if platform == "" {
	// 	return []byte(""), &kfapis.KfError{
	// 		Code:    int(kfapis.INVALID_ARGUMENT),
	// 		Message: "Not able to find platform in plugins",
	// 	}
	// }
	kfdef.Spec.Platform = platform

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
			if secret.SecretSource.HashedSource != nil {
				s.SecretSource.HashedSource = &kfdeftypes.HashedSource{
					HashedValue: secret.SecretSource.HashedSource.HashedValue,
				}
			}
		}
		kfdef.Spec.Secrets = append(kfdef.Spec.Secrets, s)
	}

	for _, repo := range config.Spec.Repos {
		r := kfdeftypes.Repo{
			Name: repo.Name,
			Uri:  repo.URI,
		}
		kfdef.Spec.Repos = append(kfdef.Spec.Repos, r)
	}

	kfdef.Status = kfdeftypes.KfDefStatus{}
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

	kfdef.Status.ReposCache = make(map[string]kfdeftypes.RepoCache)
	for _, cache := range config.Status.Caches {
		kfdef.Status.ReposCache[cache.Name] = kfdeftypes.RepoCache{
			LocalPath: cache.LocalPath,
		}
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
