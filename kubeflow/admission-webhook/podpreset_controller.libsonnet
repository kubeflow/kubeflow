{
  local util = import "kubeflow/common/util.libsonnet",

  new(_env, _params):: {
    local params = _env + _params,

    local podpresetCRD = {
      apiVersion: "apiextensions.k8s.io/v1beta1",
      kind: "CustomResourceDefinition",
      metadata: {
        name: "podpresets.kubeflow.org",
      },
      spec: {
        group: "kubeflow.org",
        version: "v1alpha1",
        scope: "Namespaced",
        names: {
          plural: "podpresets",
          singular: "podpreset",
          kind: "Podpreset",
        },
        validation: {
          openAPIV3Schema: {
            properties: {
              apiVersion: {
                type: "string",
              },
              kind: {
                type: "string",
              },
              metadata: {
                type: "object",
              },
              spec: {
                properties: {
                  env: {
                    items:{
                      type: "object",
                    },
                   type: "array",
                  },
                  envFrom: {
                    items: {
                      type: "object",
                    },
                    type: "array",
                  },
                  selector: {
                    type: "object",
                  },
                  volumeMounts: {
                    items: {
                      type: "object",
                    },
                    type: "array",
                  },
                  volumes: {
                    items: {
                      type: "object",
                    },
                    type: "array",
                  },
                },
                required: [
                  "selector",
                ],
                type: "object",
            },
            status:{
              type: "object",
           },
          },
          type: "object",
        },
       },
      },
      status: {
        acceptedNames: {
          kind: "",
          plural: "",
        },
        conditions: [],
        storedVersions: [],
      },
    },
    podpresetCRD:: podpresetCRD,

    parts:: self,
    all:: [
      self.podpresetCRD,
    ],

    list(obj=self.all):: util.list(obj),
  },
}
