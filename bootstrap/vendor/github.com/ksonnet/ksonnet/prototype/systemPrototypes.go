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

package prototype

var defaultPrototypes = []*SpecificationSchema{
	&SpecificationSchema{
		APIVersion: "0.1",
		Name:       "io.ksonnet.pkg.namespace",
		Params: ParamSchemas{
			RequiredParam("name", "name", "Name to give the namespace.", String),
		},
		Template: SnippetSchema{
			Description: `A simple namespace. Labels are automatically populated from the name of the
namespace.`,
			ShortDescription: `Namespace with labels automatically populated from the name`,
			JsonnetBody: []string{
				`local k = import "k.libsonnet";`,
				`local namespace = k.core.v1.namespace;`,
				``,
				`namespace`,
				`  .new(import 'param://name')`,
				`  .withLabels({name: import 'param://name'})`,
			},
		},
	},
	&SpecificationSchema{
		APIVersion: "0.1",
		Name:       "io.ksonnet.pkg.single-port-service",
		Params: ParamSchemas{
			RequiredParam("name", "serviceName", "Name of the service", String),
			RequiredParam("targetLabelSelector", "selector", `Label for the service to target (e.g., "{app: 'MyApp'}").`, Object),
			OptionalParam("servicePort", "port", "Port for the service to expose.", "80", NumberOrString),
			OptionalParam("targetPort", "port", "Port for the service target.", "80", NumberOrString),
			OptionalParam("protocol", "protocol", "Protocol to use (either TCP or UDP).", "TCP", String),
			OptionalParam("type", "serviceType", "Type of service to expose", "ClusterIP", String),
		},
		Template: SnippetSchema{
			Description: `A service that exposes 'servicePort', and directs traffic
to 'targetLabelSelector', at 'targetPort'. Since 'targetLabelSelector' is an
object literal that specifies which labels the service is meant to target, this
will typically look something like:

  ks prototype use service --targetLabelSelector "{app: 'nginx'}" [...]`,
			ShortDescription: `Service that exposes a single port`,
			JsonnetBody: []string{
				`local k = import "k.libsonnet";`,
				`local service = k.core.v1.service;`,
				`local port = k.core.v1.service.mixin.spec.portsType;`,
				``,
				`service`,
				`  .new(`,
				`    import 'param://name',`,
				`    import 'param://targetLabelSelector',`,
				`    port.new(import 'param://servicePort', import 'param://targetPort'))`,
				`  .withType(import 'param://type')`,
			},
		},
	},
	&SpecificationSchema{
		APIVersion: "0.1",
		Name:       "io.ksonnet.pkg.deployed-service",
		Params: ParamSchemas{
			RequiredParam("name", "name", "Name of the service and deployment resources", String),
			RequiredParam("image", "containerImage", "Container image to deploy", String),
			OptionalParam("servicePort", "port", "Port for the service to expose.", "80", NumberOrString),
			OptionalParam("containerPort", "port", "Container port for service to target.", "80", NumberOrString),
			OptionalParam("replicas", "replicas", "Number of replicas", "1", Number),
			OptionalParam("type", "serviceType", "Type of service to expose", "ClusterIP", String),
		},
		Template: SnippetSchema{
			Description: `A service that exposes 'servicePort', and directs traffic
to 'targetLabelSelector', at 'targetPort'.`,
			ShortDescription: `A deployment exposed with a service`,
			JsonnetBody: []string{
				`local k = import "k.libsonnet";`,
				`local deployment = k.apps.v1beta1.deployment;`,
				`local container = k.apps.v1beta1.deployment.mixin.spec.template.spec.containersType;`,
				`local containerPort = container.portsType;`,
				`local service = k.core.v1.service;`,
				`local servicePort = k.core.v1.service.mixin.spec.portsType;`,
				``,
				`local targetPort = import 'param://containerPort';`,
				`local labels = {app: import 'param://name'};`,
				``,
				`local appService = service`,
				`  .new(`,
				`    import 'param://name',`,
				`    labels,`,
				`    servicePort.new(import 'param://servicePort', targetPort))`,
				`  .withType(import 'param://type');`,
				``,
				`local appDeployment = deployment`,
				`  .new(`,
				`    import 'param://name',`,
				`    import 'param://replicas',`,
				`    container`,
				`      .new(import 'param://name', import 'param://image')`,
				`      .withPorts(containerPort.new(targetPort)),`,
				`    labels);`,
				``,
				`k.core.v1.list.new([appService, appDeployment])`,
			},
		},
	},
	&SpecificationSchema{
		APIVersion: "0.1",
		Name:       "io.ksonnet.pkg.configMap",
		Params: ParamSchemas{
			RequiredParam("name", "name", "Name to give the configMap.", String),
			OptionalParam("data", "data", "Data for the configMap.", "{}", Object),
		},
		Template: SnippetSchema{
			Description:      `A simple config map with optional user-specified data.`,
			ShortDescription: `A simple config map with optional user-specified data`,
			JsonnetBody: []string{
				`local k = import "k.libsonnet";`,
				`local configMap = k.core.v1.configMap;`,
				``,
				`configMap.new(import 'param://name', import 'param://data')`,
			},
		},
	},
	&SpecificationSchema{
		APIVersion: "0.1",
		Name:       "io.ksonnet.pkg.single-port-deployment",
		Params: ParamSchemas{
			RequiredParam("name", "deploymentName", "Name of the deployment", String),
			RequiredParam("image", "containerImage", "Container image to deploy", String),
			OptionalParam("replicas", "replicas", "Number of replicas", "1", Number),
			OptionalParam("port", "containerPort", "Port to expose", "80", NumberOrString),
		},
		Template: SnippetSchema{
			Description: `A deployment that replicates container 'image' some number of times
(default: 1), and exposes a port (default: 80). Labels are automatically
populated from 'name'.`,
			ShortDescription: `Replicates a container n times, exposes a single port`,
			JsonnetBody: []string{
				`local k = import "k.libsonnet";`,
				`local deployment = k.apps.v1beta1.deployment;`,
				`local container = k.apps.v1beta1.deployment.mixin.spec.template.spec.containersType;`,
				`local port = container.portsType;`,
				``,
				`deployment.new(`,
				`  import 'param://name',`,
				`  import 'param://replicas',`,
				`  container`,
				`    .new(import 'param://name', import 'param://image')`,
				`    .withPorts(port.new(import 'param://port')),`,
				`  {app: import 'param://name'})`,
			},
		},
	},
}
