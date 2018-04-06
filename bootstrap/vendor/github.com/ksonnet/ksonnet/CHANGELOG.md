# Change Log

## [v0.9.1](https://github.com/ksonnet/ksonnet/tree/v0.9.1) (2017-03-08)

This patch focuses on fixes around usability bugs.

**Closed issues:**

- version 0.9 - ks show <env> not picking up env param overrides [\#346](https://github.com/ksonnet/ksonnet/issues/346)
- ks delete default fails [\#342](https://github.com/ksonnet/ksonnet/issues/342)

**Merged pull requests:**

- bug: mapContainer extension typo [\#350](https://github.com/ksonnet/ksonnet/pull/350) ([bryanl](https://github.com/bryanl))
- bug: env used incorrent params for rendering [\#349](https://github.com/ksonnet/ksonnet/pull/349) ([bryanl](https://github.com/bryanl))
- bug: 0.1.0 apps don't rename envs in config [\#347](https://github.com/ksonnet/ksonnet/pull/347) ([bryanl](https://github.com/bryanl))
- Fix formatting for param diff [\#344](https://github.com/ksonnet/ksonnet/pull/344) ([jessicayuen](https://github.com/jessicayuen))
- Parse server version from GitVersion [\#343](https://github.com/ksonnet/ksonnet/pull/343) ([jessicayuen](https://github.com/jessicayuen))

## [v0.9.0](https://github.com/ksonnet/ksonnet/tree/v0.9.0) (2017-03-05)
[Iteration Plan](https://github.com/ksonnet/ksonnet/issues/306)

[Full Changelog](https://github.com/ksonnet/ksonnet/compare/v0.8.0...v0.9.0)

To update older ksonnet applications, run `ks upgrade --help`.

### Overview

This release focuses on two major areas:

1. Changes to the underlying ksonnet-lib dependency and utilizing them in ks.
The changes involve a major uplift to how the ksonnet language APIs are
generated, so that support for future Kubernetes versions are easier.

2. Improvements to the support for environments and components. Environments
are now able to specify targets, to apply a subset of components as opposed
to all components. We've introduced the concept of component namespaces to
add division and hierarchy to components. We've also added commands to support
removing and listing of components.

### Changes to Environment Metadata

#### spec.json > app.yaml

In _0.8.0_, each *ks* application contained a _spec.json_ file per environment.
This file contained the environment specification details; corresponding to a
Kubernetes cluster server address and namespace.

_i.e._,
```
{
  "server": "https://35.230.00.00",
  "namespace": "default"
}
```

With _0.9.0_, we will be consolidating majority of the application specification
details into a top-level _app.yaml_ file. As opposed to opening multiple files,
this approach will make it easier for users to configure changes in a single
place. Similar to `spec.json`, this metadata will be auto-generated when a
environment is created or modified from the command line. However, it is also
meant to be user-modifiable.

_i.e._,
```
apiVersion: 0.0.1
environments:
  default:
    destination:
      namespace: default
      server: https://35.230.00.00
    k8sVersion: v1.7.0
    path: default
kind: ksonnet.io/app
name: new
registries:
  incubator:
    gitVersion:
      commitSha: 422d521c05aa905df949868143b26445f5e4eda5
      refSpec: master
    protocol: github
    uri: github.com/ksonnet/parts/tree/master/incubator
version: 0.0.1
```

You will notice a couple new fields under the _environments_ field.

1. _destination_ is identical to the contents of the previous _spec.json_,
   containing the server address and namespace that this environment points to.

2. _k8sVersion_ is the Kubernetes version of the server pointed to at the _destination_
   field.

3. _path_ is the relative path in the _environments_ directory that contains
   other metadata associated with this environment. By default, path is the
   environment name.

#### Consolidation of lib files

In _0.8.0_, each environment's `.metadata` directory stored 3 files related to
the generated `ksonnet-lib`. It was unecessary and also costly as the number of
environments grow. We didn't need to store multiple copies of the same API
version on disk.

With _0.9.0_, the Kubernetes API version that each environment uses will be
recorded in the environment specification (as seen in the previous section).
The metadata files are cached once locally per k8s API version in `lib`.

These files also no longer need to be checked into source control, as *ks*
will auto-generate lib files that aren't found.

#### Targets & Component Namespaces

In _0.8.0_, there was no simple way for users to declare that a environment
should only operate on a subset of components.

With _0.9.0_, environments can now choose the set of components that they wish
to operate (_i.e._, _apply_, _delete_, etc.) on. These targets can be specified
in the _app.yaml_ file, mentioned in an earlier section.

For example, if the _components_ directory is structured as follows:
```
my-ks-app
├── components
│   ├── auth
│   │   ├── ca-secret.jsonnet
│   │   ├── params.libsonnet
│   │   └── tls-certificate.jsonnet
│   ├── dev
│   │   ├── memcached.jsonnet
│   │   └── params.libsonnet
│   ├── params.libsonnet
│   └── prod
│   ...
```

An environment configuration in _app.yaml_ may appear as follows:
```
environments:
  dev:
    k8sVersion: 1.7.0
    destinations:
      namespace: default
      server: https://35.230.00.00
    targets:
      - auth
      - dev
```

In the above example, the _dev_ environment would only operate on the
components within the _auth_ and _dev_ component namespaces.

Note: Component files do not need to be namespaced. Top-level components
and individual component files can also be referenced by _targets_.

### Command Changes

#### ks component list

`ks component list` is a new command. See docs [here](https://github.com/ksonnet/ksonnet/blob/v0.9.0/docs/cli-reference/ks_component_list.md).

#### ks component rm

`ks component rm` is a new command. See docs [here](https://github.com/ksonnet/ksonnet/blob/v0.9.0/docs/cli-reference/ks_component_rm.md).

### ksonnet-lib Changes

* Create Jsonnet AST printer
* Convert ksonnet-lib generation process to Asonnet AST

### Github

**Closed issues:**

- tutorial document as linked from Google seems semi-broken? [\#322](https://github.com/ksonnet/ksonnet/issues/322)
- Incorrect imports in ks generated files [\#321](https://github.com/ksonnet/ksonnet/issues/321)
- delete component ERROR strconv.Atoi: parsing "8+": invalid syntax [\#316](https://github.com/ksonnet/ksonnet/issues/316)
- ks param set when used with boolean does not create string value [\#311](https://github.com/ksonnet/ksonnet/issues/311)
- Move custom constructors k8s.libsonnet to k.libsonnet [\#304](https://github.com/ksonnet/ksonnet/issues/304)
- ERROR user: Current not implemented on linux/amd64 [\#298](https://github.com/ksonnet/ksonnet/issues/298)
- Difficulty handling components unique to environments [\#292](https://github.com/ksonnet/ksonnet/issues/292)
- ks delete ERROR strconv.Atoi [\#272](https://github.com/ksonnet/ksonnet/issues/272)
- Create darwin binaries and make the available via brew [\#270](https://github.com/ksonnet/ksonnet/issues/270)
- Unable to install packages with the same name under different registries [\#269](https://github.com/ksonnet/ksonnet/issues/269)
- prototypes can't rely on a registry name, but they do [\#262](https://github.com/ksonnet/ksonnet/issues/262)
- Confirm that ksonnet-lib generation works for Kubernetes 1.9[\#260](https://github.com/ksonnet/ksonnet/issues/260)
- ks can't recognise the registry 'kubeflow'[\#258](https://github.com/ksonnet/ksonnet/issues/258)
- ksonnet.io website is not available[\#256](https://github.com/ksonnet/ksonnet/issues/256)
- ks init fails when using $KUBECONFIG env var[\#251](https://github.com/ksonnet/ksonnet/issues/251)
- Badly formatted client-go version string[\#250](https://github.com/ksonnet/ksonnet/issues/250)
- Remove components[\#243](https://github.com/ksonnet/ksonnet/issues/243)
- List components[\#242](https://github.com/ksonnet/ksonnet/issues/242)

**Merged pull requests:**

- ksonnet app.yaml format changes in next minor release. Handle both versions [\#338](https://github.com/ksonnet/ksonnet/pull/338) ([bryanl](https://github.com/bryanl))
- Attempt to generate lib directory when not found [\#337](https://github.com/ksonnet/ksonnet/pull/337) ([jessicayuen](https://github.com/jessicayuen))
- Fix the execution paths for the 0.8 > 0.9 migration warning [\#335](https://github.com/ksonnet/ksonnet/pull/337) ([jessicayuen](https://github.com/jessicayuen))
- Resolve api spec based on swagger version [\#334](https://github.com/ksonnet/ksonnet/pull/334) ([jessicayuen](https://github.com/jessicayuen))
- Use new ksonnet lib generator [\#333](https://github.com/ksonnet/ksonnet/pull/333) ([bryanl](https://github.com/bryanl))
- Set param boolean types as strings [\#331](https://github.com/ksonnet/ksonnet/pull/331) ([jessicayuen](https://github.com/jessicayuen))
- Create support for plugins in ksonnet [\#330](https://github.com/ksonnet/ksonnet/pull/333) ([bryanl](https://github.com/bryanl))
- Fix bug with invalid base.libsonnet import path [\#329](https://github.com/ksonnet/ksonnet/pull/329) ([jessicayuen](https://github.com/jessicayuen))
- App spec to take a single destination [\#328](https://github.com/ksonnet/ksonnet/pull/328) ([jessicayuen](https://github.com/jessicayuen))
- Add warning for running deprecated ks app against ks >= 0.9.0 [\#327](https://github.com/ksonnet/ksonnet/pull/327) ([jessicayuen](https://github.com/jessicayuen))
- Pull client-go logic out of cmd/root.go and into client/ package [\#324](https://github.com/ksonnet/ksonnet/pull/324) ([jessicayuen](https://github.com/jessicayuen))
- Introduce component namespaces [\#323](https://github.com/ksonnet/ksonnet/pull/323) ([bryanl](https://github.com/bryanl))
- Add LibManager for managing k8s API and ksonnet-lib metadata [\#315](https://github.com/ksonnet/ksonnet/pull/315) ([jessicayuen](https://github.com/jessicayuen))
- Migrate environment spec.json to the app.yaml model [\#309](https://github.com/ksonnet/ksonnet/pull/309) ([jessicayuen](https://github.com/jessicayuen))
- Add interface for Environment Spec [\#308](https://github.com/ksonnet/ksonnet/pull/309) ([jessicayuen](https://github.com/jessicayuen))
- Extract ksonnet generator [\#307](https://github.com/ksonnet/ksonnet/pull/307) ([bryanl](https://github.com/bryanl))
- [docs] Clarify prototypes + add troubleshooting issue [\#303](https://github.com/ksonnet/ksonnet/pull/303) ([abiogenesis-now](https://github.com/abiogenesis-now))
- updating 1.0 roadmap [\#302](https://github.com/ksonnet/ksonnet/pull/302) ([bryanl](https://github.com/bryanl))
- use afero when possible [\#301](https://github.com/ksonnet/ksonnet/pull/301) ([bryanl](https://github.com/bryanl))
- Upgrade to client-go version 5 [\#299](https://github.com/ksonnet/ksonnet/pull/299) ([jessicayuen](https://github.com/jessicayuen))
- Proposal: Modular components and cleaner environments [\#295](https://github.com/ksonnet/ksonnet/pull/295) ([jessicayuen](https://github.com/jessicayuen))
- pruning vendor from dep conversion [\#293](https://github.com/ksonnet/ksonnet/pull/293) ([bryanl](https://github.com/bryanl))
- Versions retrospective and fixes [\#289](https://github.com/ksonnet/ksonnet/pull/289) ([hausdorff](https://github.com/hausdorff))
- Add remove component functionality [\#288](https://github.com/ksonnet/ksonnet/pull/288) ([jessicayuen](https://github.com/jessicayuen))
- Construct apimachinery version [\#285](https://github.com/ksonnet/ksonnet/pull/285) ([bryanl](https://github.com/bryanl))
- Removing realpath [\#283](https://github.com/ksonnet/ksonnet/pull/283) ([kris-nova](https://github.com/kris-nova))
- Implement explicit env metadata [\#282](https://github.com/ksonnet/ksonnet/pull/282) ([jessicayuen](https://github.com/jessicayuen))
- Design: propose improvements to the "fresh clone" story [\#280](https://github.com/ksonnet/ksonnet/pull/280) ([hausdorff](https://github.com/hausdorff))
- Design proposal: explicit environment metadata [\#279](https://github.com/ksonnet/ksonnet/pull/279) ([jessicayuen](https://github.com/jessicayuen))
- Small fixes to release process [\#275](https://github.com/ksonnet/ksonnet/pull/275) ([jbeda](https://github.com/jbeda))
- Document using goreleaser [\#274](https://github.com/ksonnet/ksonnet/pull/274) ([jbeda](https://github.com/jbeda))
- Clarify error message for duplicate packages on install [\#271](https://github.com/ksonnet/ksonnet/pull/271) ([jessicayuen](https://github.com/jessicayuen))
- Add command 'component list' [\#268](https://github.com/ksonnet/ksonnet/pull/268) ([jessicayuen](https://github.com/jessicayuen))
- design proposal: ksonnet lib simple constructors [\#267](https://github.com/ksonnet/ksonnet/pull/267) ([bryanl](https://github.com/bryanl))
- convert from govendor to dep [\#265](https://github.com/ksonnet/ksonnet/pull/265) ([bryanl](https://github.com/bryanl))
- Reference current Slack channel in README [\#257](https://github.com/ksonnet/ksonnet/pull/257) ([lblackstone](https://github.com/lblackstone))
- Supports k8s version number including symbols etc. [\#254](https://github.com/ksonnet/ksonnet/pull/254) ([kyamazawa](https://github.com/kyamazawa))
- Handle case where KUBECONFIG is set without named context [\#253](https://github.com/ksonnet/ksonnet/pull/253) ([lblackstone](https://github.com/lblackstone))
- Create a GitHub issue template [\#252](https://github.com/ksonnet/ksonnet/pull/252) ([lblackstone](https://github.com/lblackstone))
- Allow make file to generate ks bin with custom version and name [\#249](https://github.com/ksonnet/ksonnet/pull/249) ([bryanl](https://github.com/bryanl))

## [v0.8.0](https://github.com/ksonnet/ksonnet/tree/v0.8.0) (2017-12-20)
[Full Changelog](https://github.com/ksonnet/ksonnet/compare/v0.7.0...v0.8.0)

**Implemented enhancements:**

- Package list/install is awkward [\#195](https://github.com/ksonnet/ksonnet/issues/195)
- Rework demos/examples in light of \#169 [\#194](https://github.com/ksonnet/ksonnet/issues/194)

**Fixed bugs:**

- `param set` incorrectly supporting hyphenated param names [\#214](https://github.com/ksonnet/ksonnet/issues/214)
- Makefile hardcodes version [\#198](https://github.com/ksonnet/ksonnet/issues/198)
- Accurately read/write non-ASCII param identifiers [\#219](https://github.com/ksonnet/ksonnet/pull/219) ([jessicayuen](https://github.com/jessicayuen))

**Closed issues:**

- Packages should be able to depend on other packages [\#238](https://github.com/ksonnet/ksonnet/issues/238)
- YAML components are currently disabled; docs say they aren't [\#208](https://github.com/ksonnet/ksonnet/issues/208)
- Confusing info in `ks version` [\#199](https://github.com/ksonnet/ksonnet/issues/199)
- Support/document using github token to increase rate limits [\#196](https://github.com/ksonnet/ksonnet/issues/196)
- Issue with redis-stateless prototype [\#193](https://github.com/ksonnet/ksonnet/issues/193)
- ks version missing/incorrect data [\#170](https://github.com/ksonnet/ksonnet/issues/170)
- Create binary releases [\#131](https://github.com/ksonnet/ksonnet/issues/131)
- Check apiVersion numbers [\#75](https://github.com/ksonnet/ksonnet/issues/75)
- Add links to http://ksonnet.heptio.com/ [\#20](https://github.com/ksonnet/ksonnet/issues/20)

**Merged pull requests:**

- Test all branches of GH URI-parsing code [\#245](https://github.com/ksonnet/ksonnet/pull/245) ([hausdorff](https://github.com/hausdorff))
- Implement command `ks registry add` [\#228](https://github.com/ksonnet/ksonnet/pull/228) ([jessicayuen](https://github.com/jessicayuen))
- Check error while enumerating environments [\#220](https://github.com/ksonnet/ksonnet/pull/220) ([tanner-bruce](https://github.com/tanner-bruce))
- \[docs\] Fix premature claim of YAML support in components explanation [\#213](https://github.com/ksonnet/ksonnet/pull/213) ([abiogenesis-now](https://github.com/abiogenesis-now))
- Reverse name, registry columns for pkg list [\#206](https://github.com/ksonnet/ksonnet/pull/206) ([jessicayuen](https://github.com/jessicayuen))
- \[docs\] Remove \(now optional\) `--name` syntax from `ks generate` commands [\#205](https://github.com/ksonnet/ksonnet/pull/205) ([abiogenesis-now](https://github.com/abiogenesis-now))
- Revert "Update default version in Makefile to v0.7.0" [\#203](https://github.com/ksonnet/ksonnet/pull/203) ([jessicayuen](https://github.com/jessicayuen))
- Implement github token to work around rate limits [\#201](https://github.com/ksonnet/ksonnet/pull/201) ([jbeda](https://github.com/jbeda))
