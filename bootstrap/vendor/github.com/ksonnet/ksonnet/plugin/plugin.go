// Copyright 2018 The kubecfg authors
//
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

package plugin

import (
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/pkg/errors"
	"github.com/spf13/afero"
	yaml "gopkg.in/yaml.v2"
)

// Config is configuration for a Plugin.
type Config struct {
	// Name is the name of the plugin.
	Name string `yaml:"name,omitempty"`
	// Version is the version of the plugin.
	Version string `yaml:"version,omitempty"`
	// Description is the plugin description.
	Description string `yaml:"description,omitempty"`
	// IgnoreFlags is set if this plugin will ignore flags.
	IgnoreFlags bool `yaml:"ignore_flags,omitempty"`
	// Command is the command that needs to be called to invoke the plugin.
	Command string `yaml:"command,omitempty"`
}

func readConfig(fs afero.Fs, path string) (Config, error) {
	b, err := afero.ReadFile(fs, path)
	if err != nil {
		return Config{}, err
	}

	var config Config
	if err := yaml.Unmarshal(b, &config); err != nil {
		return Config{}, err
	}

	return config, nil
}

// Plugin is a ksonnet plugin.
type Plugin struct {
	// RootDir is the root directory for the plugin.
	RootDir string
	// Config is configuration for the plugin.
	Config Config
}

// BuildRunCmd builds a command that runs the plugin.
func (p *Plugin) BuildRunCmd(env, args []string) *exec.Cmd {
	bin := strings.Replace(p.Config.Command, "$KS_PLUGIN_DIR", p.RootDir, 1)
	cmd := exec.Command(bin, args...)
	cmd.Env = env

	cmd.Stderr = os.Stderr
	cmd.Stdout = os.Stdout

	return cmd
}

// importPlugin creates a new Plugin given a path.
func importPlugin(fs afero.Fs, path string) (Plugin, error) {
	configPath := filepath.Join(path, "plugin.yaml")
	exists, err := afero.Exists(fs, configPath)
	if err != nil {
		return Plugin{}, err
	}

	if !exists {
		return Plugin{}, errors.Errorf("plugin in %q doesn't not a configuration", path)
	}

	config, err := readConfig(fs, configPath)
	if err != nil {
		return Plugin{}, errors.Wrapf(err, "read plugin configuration %q", configPath)
	}

	plugin := Plugin{
		RootDir: path,
		Config:  config,
	}

	return plugin, nil
}

// Find finds a plugin by name.
func Find(fs afero.Fs, name string) (Plugin, error) {
	plugins, err := List(fs)
	if err != nil {
		return Plugin{}, err
	}

	for _, plugin := range plugins {
		if plugin.Config.Name == name {
			return plugin, nil
		}
	}

	return Plugin{}, errors.Errorf("%s is not a known plugin", name)
}

// List plugins
func List(fs afero.Fs) ([]Plugin, error) {
	rootPath, err := pluginDir()
	if err != nil {
		return []Plugin{}, err
	}

	exist, err := afero.Exists(fs, rootPath)
	if err != nil {
		return nil, err
	}

	if !exist {
		return []Plugin{}, nil
	}

	fis, err := afero.ReadDir(fs, rootPath)
	if err != nil {
		return nil, err
	}

	plugins := make([]Plugin, 0)

	for _, fi := range fis {
		if fi.IsDir() {
			path := filepath.Join(rootPath, fi.Name())

			plugin, err := importPlugin(fs, path)
			if err != nil {
				return nil, err
			}

			plugins = append(plugins, plugin)
		}
	}

	return plugins, nil
}

// TODO: make this work with windows
func pluginDir() (string, error) {
	homeDir := os.Getenv("HOME")
	if homeDir == "" {
		return "", errors.New("could not find home directory")
	}

	return filepath.Join(homeDir, ".config", "ksonnet", "plugins"), nil
}
