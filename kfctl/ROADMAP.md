# issue list


## Refactor bootstrap subdirectories to match best practices for kubernetes tooling

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

## kfctl should use the generated client under bootstrap/pkg/client/kfapi

## kfctl, bootstrap migration to modules

## bootstrap integration with a kubeflow controller
