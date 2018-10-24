<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Developer Guide For Ksonnet Packages](#developer-guide-for-ksonnet-packages)
  - [Creating New Ksonnet Components](#creating-new-ksonnet-components)
  - [Testing changes to ksonnet components](#testing-changes-to-ksonnet-components)
      - [ERROR Component parameters for 'jupyterhub' already exists](#error-component-parameters-for-jupyterhub-already-exists)
    - [New Packages](#new-packages)
      - [Pull Requests](#pull-requests)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Developer Guide For Ksonnet Packages

## Creating New Ksonnet Components

Here are some instructions for creating new Kubeflow packages.

1. Decide whether the component belongs in a new ksonnet [package](https://github.com/ksonnet/ksonnet/blob/master/docs/concepts.md#package)

	- Packages correspond to subdirectories of [kubeflow/kubeflow](https://github.com/kubeflow/kubeflow/tree/master/kubeflow)
	- Here's a simple decision tree

		- If all Kubeflow deployments should include this package put it in core

			- Optional packages probably don't belong in core

		- Otherwise, if there's an existing package that it belongs with put
			it in that package
		- If no existing package is a good fit create a new one

1. If you are creating a new package follow these steps

	- Copy new-package-stub to a new directory giving it an appropriate name
	- modify parts.yaml setting the following fields
		- name
		- description
	- modify registry.yaml adding an entry for the new package

1. Create a libsonnet file see [newpackage.libsonnet](https://github.com/kubeflow/kubeflow/tree/master/kubeflow/new-package-stub/newpackage.libsonnet) to define the manifests for your component

	- If you have an existing YAML manifest you can just convert that to json
	  and use that as a starting point for your parts

	- If you have a helm chart you can use the template command to output a YAML file

	  ```
	  helm template path/to/chart
	  ```

	- You can use [convert_manifest_to_jsonnet.py](https://github.com/kubeflow/kubeflow/blob/master/hack/convert_manifest_to_jsonnet.py) to easily convert a file containing YAML manifests to jsonnet

	- Typically you will want to make the following changes

		- Use params for any variables that should be easily overwritable
		- For helm packages substitute `params.name` for the name of the release

1. Create one or more prototype files in the prototypes directory for your package

	- Use [newpackage.jsonnet](https://github.com/kubeflow/kubeflow/tree/master/kubeflow/new-package-stub/prototypes/newpackage.jsonnet) as a template.

## Testing changes to ksonnet components

The easiest way to test ksonnet components is to follow the normal instructions for setting up a
ksonnet app to deploy kubeflow.

Then replace the directory `vendor/kubeflow` with a symbolic link to `${GIT_KUBEFLOW}/kubeflow`

```
ln -sf ${GIT_KUBEFLOW}/kubeflow  ${APP_DIR}/vendor/kubeflow
```

this way changes to your .libsonnet files will automatically be reflected in your components.

If you make changes to prototypes you need to regenerate the prototype. You can just delete the `.jsonnet`
file in your app's component directory and then regenerate the component using `ks generate`.

```
rm -rf ${APP_DIR}/components/jupyterhub.jsonnet
ks generate jupyterhub jupyterhub
INFO  Writing component at 'components/jupyterhub'
ERROR Component parameters for 'jupyterhub' already exists
```

#### ERROR Component parameters for 'jupyterhub' already exists
If you use the same component name you will preserve the values of any parameters you have set.
ksonnet will print a warning but it works.

However, the parameters for the component is not changed. So if you added new
@optionalParam, it will not be set in the `component/params.libsonnet` and you
will see errors like `RUNTIME ERROR: Field does not exist: NEW_OPTIONAL_PARAM`.
In this case, use a new component name.

### New Packages

If you are dealing with a new package you need to modify `app.yaml` in your ksonnet application
and add an entry in the libraries section for your new package.

#### Pull Requests
There is what appears to be a problem when trying to introduce a new package for Kubeflow: the tests are of the master branch but the PR is its own separate git ref. However:
1. the Argo workflow checks out the source at the commit/PR being tested
2. a subsequent step sets up the ksonnet directory and does `ks registry add` for the new package
3. the test then replaces `vendor/kubeflow` with a symlink to the source checked out in step 1

This ensures that we are testing the components at the SHA for the commit being tested.
