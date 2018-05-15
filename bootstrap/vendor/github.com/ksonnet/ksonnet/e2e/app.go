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

package e2e

import (
	"path/filepath"
)

type app struct {
	dir string
	e2e *e2e
}

func (a *app) runKs(args ...string) *output {
	return a.e2e.ksInApp(a.dir, args...)
}

func (a *app) componentList() *output {
	o := a.runKs("component", "list")
	assertExitStatus(o, 0)

	return o
}

func (a *app) apply(namespace string, opts ...string) *output {
	args := append([]string{namespace}, opts...)
	return a.runKs(args...)
}

func (a *app) envAdd(nsName string, override bool) *output {
	args := []string{
		"env",
		"add",
		nsName,
		"--server", "http://example.com",
		"--namespace", nsName,
	}

	if override {
		args = append(args, "-o")
	}

	o := a.runKs(args...)
	assertExitStatus(o, 0)

	return o
}

func (a *app) envDescribe(envName string) *output {
	o := a.runKs("env", "describe", envName)
	assertExitStatus(o, 0)

	return o
}

func (a *app) envList() *output {
	o := a.runKs("env", "list")
	assertExitStatus(o, 0)

	return o
}

func (a *app) paramList(args ...string) *output {
	o := a.runKs(append([]string{"param", "list"}, args...)...)
	assertExitStatus(o, 0)

	return o
}

func (a *app) pkgInstall(partName string) *output {
	o := a.runKs("pkg", "install", partName)
	assertExitStatus(o, 0)

	return o
}

func (a *app) pkgList() *output {
	o := a.runKs("pkg", "list")
	assertExitStatus(o, 0)

	return o
}

func (a *app) paramSet(key, value string, args ...string) *output {
	o := a.runKs(append([]string{"param", "set", key, value}, args...)...)
	assertExitStatus(o, 0)

	return o
}

func (a *app) registryAdd(registryName, uri string) *output {
	o := a.runKs("registry", "add", registryName, uri)
	assertExitStatus(o, 0)

	return o
}

func (a *app) registryList(args ...string) *output {
	o := a.runKs(append([]string{"registry", "list"}, args...)...)
	assertExitStatus(o, 0)

	return o
}

func (a *app) generateDeployedService() {
	appDir := a.dir

	o := a.runKs(
		"generate", "deployed-service", "guestbook-ui",
		"--image", "gcr.io/heptio-images/ks-guestbook-demo:0.1",
		"--type", "ClusterIP")
	assertExitStatus(o, 0)

	component := filepath.Join(appDir, "components", "guestbook-ui.jsonnet")
	assertContents("generate/guestbook-ui.jsonnet", component)

	params := filepath.Join(appDir, "components", "params.libsonnet")
	assertContents("generate/params.libsonnet", params)
}
