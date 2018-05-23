# ksonnet

[**Official Site**](https://ksonnet.io/)

[![Build Status](https://travis-ci.org/ksonnet/ksonnet.svg?branch=master)](https://travis-ci.org/ksonnet/ksonnet)
[![Go Report Card](https://goreportcard.com/badge/github.com/ksonnet/ksonnet)](https://goreportcard.com/report/github.com/ksonnet/ksonnet)


*ksonnet* is a framework for writing, sharing, and deploying Kubernetes application manifests. With its CLI, you can generate a complete application from scratch in only a few commands, or manage a complex system at scale.

Specifically, ksonnet allows you to:
* **Reuse** common manifest patterns (within your app or from external libraries)
* **Customize** manifests directly with powerful object concatenation syntax
* **Deploy** app manifests to multiple environments
* **Diff** across environments to compare two running versions of your app
* **Track** the entire state of your app configuration in version controllable files

All of this results in a more iterative process for developing manifests, one that can be supplemented by continuous integration (CI).

## Install

The ksonnet CLI, `ks`, can be installed in three different ways. Choose the method that best matches your setup:

### Homebrew on macOS

If you are using [Homebrew](https://brew.sh/) on macOS, you can install `ks` with the following command:

```
brew install ksonnet/tap/ks
```

### Download a prebuilt binary for your OS

See the [releases page](https://github.com/ksonnet/ksonnet/releases) to download the latest released binary.

### Manually build and install

You can download and manually build from source by following [these instructions](/docs/build-install.md).

## Run through an example

Here we provide some commands that show some basic ksonnet features in action. You can run these commands to deploy and update a basic web app UI, via a Kubernetes Service and Deployment. This app is shown below:

<p align="center">
<img alt="guestbook screenshot" src="/docs/img/guestbook.png" style="width:60% !important;">
</p>

Note that we will not be implementing the entire app in this example, so the buttons will not work!

**Minimal explanation is provided here, and only basic ksonnet features are shown---this is intended to be a quick demonstration.** If you are interested in learning more, see [Additional Documentation](#additional-documentation).

### Prerequisites
* *You should have access to an up-and-running Kubernetes cluster — **supported versions are 1.7 (default) and 1.8 (beta)**.*

  If you do not have a cluster, [choose a setup solution](https://kubernetes.io/docs/setup/) from the official Kubernetes docs.

* *You should have `kubectl` installed.* If not, follow the instructions for [installing via Homebrew (MacOS)](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-with-homebrew-on-macos) or [building the binary (Linux)](https://kubernetes.io/docs/tasks/tools/install-kubectl/#tabset-1).

* *Your `$KUBECONFIG` should specify a valid `kubeconfig` file*, which points at the cluster you want to use for this demonstration.

### Commands

Start by creating your app directory. **If you are running Kubernetes 1.8.x, you'll need to add `--api-spec=version:v1.8.0` to the end of the following command**:
```bash
# The ks-example app directory is created at the current path, and the
# app itself references your current cluster using $KUBECONFIG
ks init ks-example
```

You can copy and paste the commands below to deploy the web app UI:

```bash
# 'ks' commands should be run within a ksonnet app directory
cd ks-example

# Autogenerate a basic manifest
ks generate deployed-service guestbook-ui \
  --image gcr.io/heptio-images/ks-guestbook-demo:0.1 \
  --type ClusterIP

# Deploy your manifest to your cluster
ks apply default
```

Now there should be a Deployment and Service running on your cluster! Try accessing the `guestbook-ui` service in your browser. (How you do this may depend on your cluster setup).

<details>
<summary><i>If you are unsure what to do, we suggest using <code>kubectl proxy</code>.</i></summary>
<pre>
# Set up an API proxy so that you can access the 'guestbook-ui' service locally
kubectl proxy > /dev/null &
PROXY_PID=$!
QUICKSTART_NAMESPACE=$(kubectl get svc guestbook-ui -o jsonpath="{.metadata.namespace}")
GUESTBOOK_SERVICE_URL=http://localhost:8001/api/v1/proxy/namespaces/$QUICKSTART_NAMESPACE/services/guestbook-ui
open $GUESTBOOK_SERVICE_URL
</pre>
</details>

<br>

*(Remember, the buttons won't work in this example.)*

Now let's try upgrading the container image to a new version:

```bash
# Bump the container image to a different version
ks param set guestbook-ui image gcr.io/heptio-images/ks-guestbook-demo:0.2

# View updated param values
ks param list

# Update your cluster with your latest changes
ks apply default

```

Check out the webpage again in your browser (force-refresh to update the javascript). Notice that it looks different! Clean up:

```bash
# Teardown
ks delete default

# There should be no guestbook service left running
kubectl get svc guestbook-ui
```

*(If you ended up copying and pasting the `kubectl proxy` code above, make sure to clean up that process with `kill -9 $PROXY_PID`).*

Now, even though you've made modifications to the Guestbook app and removed it from your cluster, ksonnet still tracks all your manifests locally:

```bash
# View all expanded manifests (YAML)
ks show default
```

If you're still wondering how ksonnet differs from existing tools, the [tutorial](https://ksonnet.io/docs/tutorial) shows you how to use other ksonnet features to implement the rest of the Guestbook app (and yes, the buttons will work!).

## Additional documentation

ksonnet is a feature-rich framework. To learn more about how to integrate it into your workflow, check out the resources below:

* **[Tutorial](https://ksonnet.io/docs/tutorial)** - What can I build with ksonnet and why? This finishes the Guestbook app from the [example](#run-through-an-example) above.

* **[Interactive tour of ksonnet](https://ksonnet.io/tour/welcome)** - How do `ks` commands work under the hood?

* **[CLI Reference](/docs/cli-reference#command-line-reference)** - What ksonnet commands are available, and how do I use them?

* **[Concept Reference](/docs/concepts.md)** - What do all these special ksonnet terms mean (e.g. *prototypes*) ?

* **[Design Docs](/design)** - What are the detailed design specs, and what's next on the feature roadmap?


## Troubleshooting

If you encounter any problems that the documentation does not address, [file an issue](https://github.com/ksonnet/ksonnet/issues).

## Contributing

Thanks for taking the time to join our community and start contributing!

#### Before you start

* Please familiarize yourself with the [Code of
Conduct](CODE-OF-CONDUCT.md) before contributing.
* Read the contribution guidelines in [CONTRIBUTING.md](CONTRIBUTING.md).
* There is a [mailing list](https://groups.google.com/forum/#!forum/ksonnet) or the #ksonnet channel on [Slack](http://kubernetes.slack.com/messages/ksonnet) if you want to interact with
other members of the community.

#### Pull requests

* We welcome pull requests. Feel free to dig through the [issues](https://github.com/ksonnet/ksonnet/issues) and jump in.

## Changelog

See [the list of releases](https://github.com/ksonnet/ksonnet/releases) to find out about feature changes.
