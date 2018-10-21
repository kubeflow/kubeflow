local notebooks = import "kubeflow/notebooks/notebooks.libsonnet";

local params = {
  disks: "null",
  image: "gcr.io/kubeflow/jupyterhub-k8s:v20180531-3bb991b1",
  useJupyterLabAsDefault: true,
  notebookPVCMount: "/home/jovyan",
  registry: "gcr.io",
  repoName: "kubeflow-images-public",
  notebookUid: "-1",
  notebookGid: "-1",
  accessLocalFs: "false",
};
local env = {
  namespace: "kf-100",
};

local instance = notebooks.new(env, params);

std.assertEqual(
  instance.parts.crd,
  {
    apiVersion: "apiextensions.k8s.io/v1beta1",
    kind: "CustomResourceDefinition",
    metadata: {
      name: "notebooks.kubeflow.org",
    },
    spec: {
      group: "kubeflow.org",
      names: {
        kind: "Notebook",
        plural: "notebooks",
        singular: "notebook",
      },
      scope: "Namespaced",
      validation: {
        openAPIV3Schema: (import "kubeflow/notebooks/notebooks.schema"),
      },
      version: "v1alpha1",
    },
  }
) &&

std.assertEqual(
  instance.parts.service,
  {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "notebooks",
      namespace: "kf-100",
    },
    spec: {
      ports: [
        {
          port: 80,
          targetPort: 8080,
        },
      ],
      selector: {
        app: "notebooks",
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.configmap,
  {
    apiVersion: "v1",
    data: {
      "sync-notebook.jsonnet": "function(request) {\n  local existingGroups =\n    if std.type(request.children) == \"object\" then\n      [ request.children[key] for key in std.objectFields(request.children) ]\n    else\n      [],\n  local existingResources(group) =\n    if std.type(group) == \"object\" then\n      [ group[key] for key in std.objectFields(group) ]\n    else\n      [],\n  local existingResource(resource) = {\n    return::\n      if std.type(resource) == \"object\" &&\n      std.objectHas(resource, 'metadata') &&\n      std.objectHas(resource.metadata, 'name') && \n      std.objectHas(request, 'parent') &&\n      std.objectHas(request.parent, 'spec') &&\n      std.objectHas(request.parent.spec, 'namespace') &&\n      resource.metadata.name == request.parent.spec.namespace then\n        true\n      else\n        false,\n  }.return,\n  local foundChildren = std.filter(existingResource, \n    std.flattenArrays(std.map(existingResources, existingGroups))),\n  local children = [\n    {\n      apiVersion: 'v1',\n      kind: 'Service',\n      metadata: {\n        annotations: {\n          'getambassador.io/config': '---\\napiVersion: ambassador/v0\\nkind:  Mapping\\nname: notebook-mapping\\nprefix: /\\nrewrite: /\\nservice: notebook.kubeflow',\n        },\n        labels: {\n          app: 'notebook',\n        },\n        name: 'noteboook',\n        namespace: 'kubeflow',\n      },\n      spec: {\n        ports: [\n          {\n            port: 80,\n            protocol: 'TCP',\n            targetPort: 8082,\n          },\n        ],\n        selector: {\n          app: 'notebook',\n        },\n        sessionAffinity: 'None',\n        type: 'ClusterIP',\n      },\n      status: {\n        loadBalancer: {},\n      },\n    },\n    {\n      apiVersion: 'v1',\n      kind: 'Pod',\n      metadata: {\n        annotations: {\n          'hub.jupyter.org/username': 'kam',\n        },\n        labels: {\n          app: 'jupyterhub',\n          component: 'singleuser-server',\n          heritage: 'jupyterhub',\n        },\n        name: 'jupyter-kam',\n        namespace: params.namespace,\n      },\n      spec: {\n        containers: [\n          {\n            args: [\n              'start-singleuser.sh',\n              '--ip=\"0.0.0.0\"',\n              '--port=8888',\n              '--allow-root',\n            ],\n            env: [\n              {\n                name: 'JUPYTERHUB_API_TOKEN',\n                value: 'ce5d75d8b88243e280898baa677fec35',\n              },\n              {\n                name: 'JPY_API_TOKEN',\n                value: 'ce5d75d8b88243e280898baa677fec35',\n              },\n              {\n                name: 'JUPYTERHUB_CLIENT_ID',\n                value: 'jupyterhub-user-kam',\n              },\n              {\n                name: 'JUPYTERHUB_HOST',\n              },\n              {\n                name: 'JUPYTERHUB_OAUTH_CALLBACK_URL',\n                value: '/user/kam/oauth_callback',\n              },\n              {\n                name: 'JUPYTERHUB_USER',\n                value: 'kam',\n              },\n              {\n                name: 'JUPYTERHUB_API_URL',\n                value: 'http://jupyterhub-0:8081/hub/api',\n              },\n              {\n                name: 'JUPYTERHUB_BASE_URL',\n                value: '/',\n              },\n              {\n                name: 'JUPYTERHUB_SERVICE_PREFIX',\n                value: '/user/kam/',\n              },\n              {\n                name: 'MEM_GUARANTEE',\n                value: '1Gi',\n              },\n              {\n                name: 'CPU_GUARANTEE',\n                value: '500m',\n              },\n            ],\n            image: 'gcr.io/kubeflow-images-public/tensorflow-1.10.1-notebook-cpu:v0.3.0',\n            imagePullPolicy: 'IfNotPresent',\n            name: 'notebook',\n            ports: [\n              {\n                containerPort: 8888,\n                name: 'notebook-port',\n                protocol: 'TCP',\n              },\n            ],\n            resources: {\n              requests: {\n                cpu: '500m',\n                memory: '1Gi',\n              },\n            },\n            volumeMounts: [\n              {\n                mountPath: '/home/jovyan',\n                name: 'volume-kam',\n              },\n            ],\n            workingDir: '/home/jovyan',\n          },\n        ],\n        restartPolicy: 'Always',\n        schedulerName: 'default-scheduler',\n        securityContext: {\n          fsGroup: 100,\n          runAsUser: 1000,\n        },\n        serviceAccount: 'jupyter-notebook',\n        serviceAccountName: 'jupyter-notebook',\n        volumes: [\n          {\n            name: 'volume-kam',\n            persistentVolumeClaim: {\n              claimName: 'claim-kam',\n            },\n          },\n        ],\n      },\n    },\n  ],\n  local initialized = {\n    return::\n      if std.objectHas(request.parent, \"status\") &&\n         std.objectHas(request.parent.status, \"created\") &&\n         request.parent.status.created == true then\n        true\n      else\n        false,\n  }.return,\n  local desired =\n    if std.type(foundChildren) != \"array\" || std.length(foundChildren) == 0 then\n      if initialized == false then\n        children\n      else\n        []\n    else\n      children,\n  children: desired,\n  status: {\n    phase: \"Active\",\n    conditions: [{\n      type: \"Ready\",\n    }],\n    created: true,\n    // debug\n    found_children: std.length(foundChildren),\n    desired: std.length(desired),\n    request_parent: request.parent,\n    request_children: request.children,\n  },\n}\n",
      "util.libsonnet": '// Some useful routines.\n{\n  local k = import "k.libsonnet",\n  local util = self,\n\n  // Is the character upper case?\n  isUpper:: function(c) {\n    local cp = std.codepoint,\n    local value = if cp(c) >= 65 && cp(c) < 91 then\n      true\n    else\n      false,\n    result:: value,\n  }.result,\n\n  // Convert a string to upper case.\n  upper:: function(x) {\n    local cp(c) = std.codepoint(c),\n    local upperLetter(c) = if cp(c) >= 97 && cp(c) < 123 then\n      std.char(cp(c) - 32)\n    else c,\n    result:: std.join("", std.map(upperLetter, std.stringChars(x))),\n  }.result,\n\n  // Convert a string to lower case.\n  lower:: function(x) {\n    local cp(c) = std.codepoint(c),\n    local lowerLetter(c) = if cp(c) >= 65 && cp(c) < 91 then\n      std.char(cp(c) + 32)\n    else c,\n    result:: std.join("", std.map(lowerLetter, std.stringChars(x))),\n  }.result,\n\n  // Convert non-boolean types like string,number to a boolean.\n  // This is primarily intended for dealing with parameters that should be booleans.\n  toBool:: function(x) {\n    result::\n      if std.type(x) == "boolean" then\n        x\n      else if std.type(x) == "string" then\n        $.upper(x) == "TRUE"\n      else if std.type(x) == "number" then\n        x != 0\n      else\n        false,\n  }.result,\n\n  // Convert a comma-delimited string to an Array\n  toArray:: function(str) {\n    local trim(str) = {\n      rest::\n        if std.startsWith(str, " ") then\n          std.substr(str, 1, std.length(str) - 1)\n        else\n          str,\n    }.rest,\n    result::\n      if std.type(str) == "string" && str != "null" && std.length(str) > 0 then\n        std.map(trim, std.split(str, ","))\n      else [],\n  }.result,\n\n  foldl:: function(key, value, objs) {\n    local aux(arr, i, running) =\n      if i >= std.length(arr) then\n        running\n      else\n        aux(arr, i + 1, running { [key(arr[i])]+: value(arr[i]) }) tailstrict,\n    return:: aux(objs, 0, {},),\n  }.return,\n\n  sort:: function(arr, compare=function(a, b) {\n    return::\n      if a == b then\n        0\n      else if a < b then\n        -1\n      else\n        1,\n  }.return) {\n    local l = std.length(arr),\n    local f = {\n      local pivot = arr[0],\n      local rest = std.makeArray(l - 1, function(i) arr[i + 1]),\n      local left = std.filter(function(x) compare(x, pivot) <= 0, rest),\n      local right = std.filter(function(x) compare(x, pivot) > 0, rest),\n      return:: util.sort(left, compare) + [pivot] + util.sort(right, compare),\n    }.return,\n    return::\n      if std.length(arr) == 0 then\n        []\n      else\n        f,\n  }.return,\n\n  setDiff:: function(a, b, compare=function(a, b) {\n    return::\n      if a == b then\n        0\n      else if a < b then\n        -1\n      else\n        1,\n  }.return) {\n    local aux(a, b, i, j, acc) =\n      if i >= std.length(a) then\n        acc\n      else if j >= std.length(b) then\n        aux(a, b, i + 1, j, acc + [a[i]]) tailstrict\n      else\n        if compare(a[i], b[j]) == 0 then\n          aux(a, b, i + 1, j + 1, acc) tailstrict\n        else if compare(a[i], b[j]) == -1 then\n          aux(a, b, i + 1, j, acc + [a[i]]) tailstrict\n        else\n          aux(a, b, i, j + 1, acc) tailstrict,\n    return:: aux(a, b, 0, 0, []) tailstrict,\n  }.return,\n\n  // Produce a list of manifests. obj must be an array\n  list(obj):: k.core.v1.list.new(obj,),\n}\n',
    },
    kind: "ConfigMap",
    metadata: {
      name: "notebooks",
      namespace: "kf-100",
    },
  }
) &&

std.assertEqual(
  instance.parts.deployment,
  {
    apiVersion: "apps/v1beta1",
    kind: "Deployment",
    metadata: {
      name: "notebooks",
      namespace: "kf-100",
    },
    spec: {
      selector: {
        matchLabels: {
          app: "notebooks",
        },
      },
      template: {
        metadata: {
          labels: {
            app: "notebooks",
          },
        },
        spec: {
          containers: [
            {
              image: "metacontroller/jsonnetd:latest",
              imagePullPolicy: "Always",
              name: "hooks",
              volumeMounts: [
                {
                  mountPath: "/opt/notebooks/hooks",
                  name: "hooks",
                },
              ],
              workingDir: "/opt/notebooks/hooks",
            },
          ],
          volumes: [
            {
              configMap: {
                name: "notebooks",
              },
              name: "hooks",
            },
          ],
        },
      },
    },
  }
) &&

std.assertEqual(
  instance.parts.controller,
  {
    apiVersion: "metacontroller.k8s.io/v1alpha1",
    kind: "CompositeController",
    metadata: {
      name: "notebooks",
    },
    spec: {
      childResources: [
        {
          apiVersion: "v1",
          resource: "services",
        },
        {
          apiVersion: "v1",
          resource: "pods",
        },
      ],
      generateSelector: true,
      hooks: {
        sync: {
          webhook: {
            url: "http://notebooks.kf-100/sync",
          },
        },
      },
      parentResource: {
        apiVersion: "kubeflow.org/v1alpha1",
        resource: "notebooks",
      },
    },
  }
)
