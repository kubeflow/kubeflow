// Copyright 2017 The kubecfg authors
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

package jsonnet

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestParse(t *testing.T) {
	tests := []struct {
		name     string
		jsonnet  string
		expected string
	}{
		{
			name: "Test multiple import param replacement in a Jsonnet file.",
			jsonnet: `
				// apiVersion: 0.1
				// name: simple-service
				// description: Generates a simple service with a port exposed

				local k = import 'ksonnet.beta.2/k.libsonnet';

				local service = k.core.v1.service;
				local servicePort = k.core.v1.service.mixin.spec.portsType;
				local port = servicePort.new((import 'param://port'), (import 'param://portName'));

				local name = import 'param://name';
				k.core.v1.service.new('%s-service' % [name], {app: name}, port)`,

			expected: `
				// apiVersion: 0.1
				// name: simple-service
				// description: Generates a simple service with a port exposed

				local k = import 'ksonnet.beta.2/k.libsonnet';

				local service = k.core.v1.service;
				local servicePort = k.core.v1.service.mixin.spec.portsType;
				local port = servicePort.new((params.port), (params.portName));

				local name = params.name;
				k.core.v1.service.new('%s-service' % [name], {app: name}, port)`,
		},
		{
			name: "Test another complex case.",
			jsonnet: `
			local params = std.extVar("__ksonnet/params").components.guestbook;
			local k = import "k.libsonnet";
			local deployment = k.apps.v1beta1.deployment;
			local container = k.apps.v1beta1.deployment.mixin.spec.template.spec.containersType;
			local containerPort = container.portsType;
			local service = k.core.v1.service;
			local servicePort = k.core.v1.service.mixin.spec.portsType;

			local targetPort = import 'param://containerPort';
			local labels = {app: import 'param://name'};

			local appService = service.new(
			  import 'param://name',
			  labels,
			  servicePort.new(import 'param://servicePort', targetPort)) +
			service.mixin.spec.type(import 'param://type');

			local appDeployment = deployment.new(
			  import 'param://name',
			  import 'param://replicas',
			  container.new(import 'param://name', import 'param://replicas') +
				container.ports(containerPort.new(targetPort)),
			  labels);

			k.core.v1.list.new([appService, appDeployment])`,

			expected: `
			local params = std.extVar("__ksonnet/params").components.guestbook;
			local k = import "k.libsonnet";
			local deployment = k.apps.v1beta1.deployment;
			local container = k.apps.v1beta1.deployment.mixin.spec.template.spec.containersType;
			local containerPort = container.portsType;
			local service = k.core.v1.service;
			local servicePort = k.core.v1.service.mixin.spec.portsType;

			local targetPort = params.containerPort;
			local labels = {app: params.name};

			local appService = service.new(
			  params.name,
			  labels,
			  servicePort.new(params.servicePort, targetPort)) +
			service.mixin.spec.type(params.type);

			local appDeployment = deployment.new(
			  params.name,
			  params.replicas,
			  container.new(params.name, params.replicas) +
				container.ports(containerPort.new(targetPort)),
			  labels);

			k.core.v1.list.new([appService, appDeployment])`,
		},
		{
			name: "Test where an import param is split over multiple lines.",
			jsonnet: `
			local f = (
				import
				// foo comment
				'param://f'
			);
			{ foo: f, }`,

			expected: `
			local f = (
				params.f
			);
			{ foo: f, }`,
		},
		{
			name: "Test where no parameters are found.",
			jsonnet: `local f = f;
			{ foo: f, }`,
			expected: `local f = f;
			{ foo: f, }`,
		},
		{
			name: "Test where there are multiple import types.",
			jsonnet: `
			local k = import 'ksonnet.beta.2/k.libsonnet';

			local service = k.core.v1.service;
			local servicePort = k.core.v1.service.mixin.spec.portsType;
			local port = servicePort.new((import 'param://port'), (import 'param://portName'));

			local namespace = import 'env://namespace';

			local name = import 'param://name';
			k.core.v1.service.new('%s-service' % [name], {app: name}, port)`,

			expected: `
			local k = import 'ksonnet.beta.2/k.libsonnet';

			local service = k.core.v1.service;
			local servicePort = k.core.v1.service.mixin.spec.portsType;
			local port = servicePort.new((params.port), (params.portName));

			local namespace = env.namespace;

			local name = params.name;
			k.core.v1.service.new('%s-service' % [name], {app: name}, port)`,
		},
	}

	errors := []string{
		// Expect error where param isn't provided.
		`local f = (import 'param://');
		{ foo: f, }`,
	}

	for _, s := range tests {
		t.Run(s.name, func(t *testing.T) {
			parsed, err := parse("test", s.jsonnet)
			require.NoError(t, err)
			require.Equal(t, s.expected, parsed)
		})

	}

	for _, e := range errors {
		parsed, err := parse("test", e)
		if err == nil {
			t.Errorf("Expected error but not found\n  input: %v  got: %v", e, parsed)
		}
	}
}
