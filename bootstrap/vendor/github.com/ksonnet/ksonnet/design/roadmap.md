# Roadmap to 1.0

## Using ksonnet shouldn't require Jsonnet knowledge

* Users can initialize a ksonnet project, add components, configure parameters, customize their environment, and apply configurations without knowledge of Jsonnet.

## More precise component usage

* Users can organize their components hierarchically, using directory structure.
* Users can customize an environment to target a specific subset of components.

## Component references

* Components can refer to parameters in other components.

## More flexible environments

* Users can use their ksonnet environments with multiple Kubernetes clusters. An environment is not directly tied to a Kubernetes cluster namespace.
* Users can reference the current namespace in components.

## A new approach to registries

* Users can publish their prototypes and parts libraries to a global ksonnet registry.
* Users can offer multiple versions of parts.

## Support for local dependencies

* In addition to using the global registry, users can configure ksonnet to use parts on the local filesystem as dependencies.

## Default parts

* Standard Kubernetes object types (e.g. Deployments) will be wrapped as parts, and included with ksonnet by default.
* To reduce the complexity of the full API spec, these parts will expose only the most "useful" object fields.
* These parts will act as local dependencies and be upgraded through the registry.

## JSON and YAML support

* Users can add JSON, YAML, or Jsonnet file into `components/` and be able to apply them with `ks apply`. Only Jsonnet files can use parameters.
* To better facilitate migrations, users can use `ks` to convert JSON or YAML files to Jsonnet.

## Apply

* Users can apply their configurations in a consistent manner. Resources that do not need to be changed will untouched during the `ks apply` process.

## Guidance for secrets management

* The ksonnet team will supply guidance on managing secrets in ksonnet. The team is currently investigating Bitnami's [sealed secrets](https://github.com/bitnami/sealed-secrets) as an approach.

## Refine output of `ks diff`

* Diff will only show the values the user changed in its output.
* Colors in diff output can be disabled.

## Static analysis with `ks lint`


* Introduce a linting framework that will allow ksonnet to warn users if their Jsonnet code or ksonnet app structure is no longer valid. Initial linting capabilities will include:
  * Components which target unknown parameters
  * Environment targets exist

## Editor integrations

* Extract the Jsonnet language server into its own project.
* In the VSCode extension:
  * Ensure the ksonnet lib locations are added to are added to the Jsonnet lib path.
  * Ensure dependency lib locations are added to the Jsonnet lib path.

## Docker Images

* Create a Dockerfile that will allow users to build Docker images for running ksonnet.
* Publish updated Docker images with each ksonnet release.