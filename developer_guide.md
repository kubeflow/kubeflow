# Developer Guide

## Testing changes to ksonnet components

The easiest way to test ksonnet components is to follow the normal instructions for setting up a 
ksonnet app to deploy kubeflow.

Then replace the directory `vendor/kubeflow` with a symbolic link to `${GIT_KUBEFLOW}/kubeflow`

```
ln -sf ${GIT_KUBEFLOW}/kubeflow  ${APP_DIR}/vendor/kubeflow
```

this way changes to your .libsonnet files will automaticaly be reflected in your components.

If you make changes to prototypes you need to regenerate the prototype. You can just delete the `.jsonnet`
file in your app's component directory and then regenerate the component using `ks generate`. 
If you use the same name you will preserve the values of any parameters you have set. 
ksonnet will print a warning but it works; e.g.

```
rm -rf ${APP_DIR}/components/kubeflow-core.jsonnet 
ks generate kubeflow-core kubeflow-core
INFO  Writing component at 'components/kubeflow-core'
ERROR Component parameters for 'kubeflow-core' already exists
```