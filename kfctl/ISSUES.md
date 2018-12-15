# issues to be opened


## 1. Refactor bootstrap subdirectories to match best practices for kubernetes tooling

Tooling includes 

```
client-gen
conversion-gen
deepcopy-gen
defaulter-gen
informer-gen
lister-gen
openapi-gen
```

- source tree should look like

```
Dockerfile	PROJECT		bin		config		go.mod		hack
Makefile	README.md	cmd		docs		go.sum		pkg
```

where subdirs are

```
bootstrap/cmd
bootstrap/cmd/bootstrap/app
bootstrap/cmd/bootstrap/app/options
bootstrap/bin
bootstrap/config
bootstrap/config/crds
bootstrap/config/default
bootstrap/config/samples
bootstrap/hack
bootstrap/docs
bootstrap/pkg
bootstrap/pkg/apis
bootstrap/pkg/apis/app
bootstrap/pkg/apis/app/v1alpha1
bootstrap/pkg/client
bootstrap/pkg/client/kfapi
bootstrap/pkg/client/kfapi/scheme
bootstrap/pkg/client/kfapi/typed
bootstrap/pkg/client/kfapi/typed/app
bootstrap/pkg/client/kfapi/typed/app/v1alpha1
```

## 2. kfctl should use the generated client under bootstrap/pkg/client/kfapi

## 3. Add bootstrap REST entry points for kfctl generate, apply

There may be a way to do this so the client generation tool picks up the entry point from swagger

## 4. kfctl, bootstrap, gcp-click-to-deploy migration to modules

Provide a document describing the advantages of modules

## 5. bootstrap integration with a kubeflow controller that manages changes to applications.app.kubeflow.org

## 6. bootstrap kfctl migration to use kubeless

## 7. conformance to k8 KEPs
- [portable service definitions](https://github.com/kubernetes/enhancements/blob/master/keps/sig-apps/0032-portable-service-definitions.md)

