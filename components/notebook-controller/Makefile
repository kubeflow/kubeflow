# kind cluster name
KIND_CLUSTER_NAME ?=kubeflow-notebook
# k8s version used in the kind cluster
KUBERNETES_VERSION ?= 1.16.1

# Based on recommendation https://sdk.operatorframework.io/docs/building-operators/golang/references/envtest-setup/
ENVTEST_ASSETS_DIR=$(shell pwd)/testbin

# Image URL to use all building/pushing image targets
IMG ?= gcr.io/kubeflow-images-public/notebook-controller
TAG ?= $(eval TAG := $(shell date +v%Y%m%d)-$(shell git describe --tags --always --dirty)-$(shell git diff | shasum -a256 | cut -c -6))$(TAG)
GOLANG_VERSION ?= 1.11.2

# Whether to use cached images with GCB
USE_IMAGE_CACHE ?= true

# Produce CRDs that work back to Kubernetes 1.11 (no version conversion)
CRD_OPTIONS ?= "crd"

# Get the currently used golang install path (in GOPATH/bin, unless GOBIN is set)
ifeq (,$(shell go env GOBIN))
GOBIN=$(shell go env GOPATH)/bin
else
GOBIN=$(shell go env GOBIN)
endif

all: manager

# check license
check-license:
	./third_party/check-license.sh

# Run tests
test: generate fmt vet manifests check-license ginkgo
	mkdir -p $(ENVTEST_ASSETS_DIR)
	test -f $(ENVTEST_ASSETS_DIR)/setup-envtest.sh || curl -sSLo $(ENVTEST_ASSETS_DIR)/setup-envtest.sh https://raw.githubusercontent.com/kubernetes-sigs/controller-runtime/master/hack/setup-envtest.sh
	source $(ENVTEST_ASSETS_DIR)/setup-envtest.sh; fetch_envtest_tools $(ENVTEST_ASSETS_DIR); setup_envtest_env $(ENVTEST_ASSETS_DIR);
	$(GINKGO) --skip="E2E TEST:" --nodes 6 --cover --coverprofile cover.out ./api/... ./controllers/...

# Build manager binary
manager: generate fmt vet
	go build -o bin/manager main.go

# Run against the configured Kubernetes cluster in ~/.kube/config
run: generate fmt vet
	go run ./main.go

# Install CRDs into a cluster
install: manifests
	kubectl apply -f config/crd/bases

# Deploy controller in the configured Kubernetes cluster in ~/.kube/config
deploy: manifests
	kubectl apply -f config/crd/bases
	kustomize build config/default | kubectl apply -f -

# Generate manifests e.g. CRD, RBAC etc.
manifests: controller-gen
	$(CONTROLLER_GEN) $(CRD_OPTIONS) rbac:roleName=manager-role webhook paths="./..." output:crd:artifacts:config=config/crd/bases

# Uninstall CRDs from a cluster
uninstall: manifests
	kustomize build config/crd | kubectl delete -f -

# Run go fmt against code
fmt:
	go fmt ./...

# Run go vet against code
vet:
	go vet ./...

# Generate code
generate: controller-gen
	$(CONTROLLER_GEN) object:headerFile=./hack/boilerplate.go.txt paths=./api/...

# Build the docker image
docker-build:
	cd .. && docker build . -t ${IMG} -f ./notebook-controller/Dockerfile
	@echo "updating kustomize image patch file for manager resource"
	sed -i'' -e 's@image: .*@image: '"${IMG}"'@' ./config/default/manager_image_patch.yaml

# Push the docker image
docker-push:
	docker push ${IMG}

# find or download controller-gen
# download controller-gen if necessary
controller-gen:
ifeq (, $(shell which controller-gen))
	go get sigs.k8s.io/controller-tools/cmd/controller-gen@v0.2.0
CONTROLLER_GEN=$(GOBIN)/controller-gen
else
CONTROLLER_GEN=$(shell which controller-gen)
endif

# find or download ginkgo
# download ginkgo if necessary
ginkgo:
ifeq (, $(shell which ginkgo))
	go get github.com/onsi/ginkgo/ginkgo@v1.14.2
GINKGO=$(GOBIN)/ginkgo
else
GINKGO=$(shell which ginkgo)
endif

# find or download kind
# download kind if necessary
kind:
ifeq (, $(shell which kind))
	go get sigs.k8s.io/kind@v0.9.0
KIND=$(GOBIN)/kind
else
KIND=$(shell which kind)
endif

# TODO(jlewi): Can we get rid of this and just use skaffold?
build-gcr: test
	docker build -t $(IMG):$(TAG) .
	@echo Built $(IMG):$(TAG)

push-gcr: build-gcr
	docker push $(IMG):$(TAG)
	@echo Pushed $(IMG):$(TAG)

# starts a kind cluster for testing
kind-start: kind
ifeq (1, $(strip $(shell kind get clusters | grep "$(KIND_CLUSTER_NAME)" | wc -l)))
	@echo "Cluster already exists"
else
	$(KIND) create cluster --name $(KIND_CLUSTER_NAME) --image kindest/node:v$(KUBERNETES_VERSION) --config ./config/test/kind-config.yaml
endif

# deletes the kind cluster
delete-kind-cluster:
	@echo "Delete kind cluster"
	$(KIND) delete cluster --name $(KIND_CLUSTER_NAME)

# loads the docker image into the kind cluster
kind-load-img: kind-start docker-build
	@echo "Loading docker image into kind cluster"
	 $(KIND) load docker-image ${IMG} --name kubeflow-notebook

# runs e2e test
e2e-tests: kind-load-img ginkgo
	TEST_USE_EXISTING_CLUSTER="true" $(GINKGO) --focus="E2E TEST:"  --cover  --coverprofile cover.out  ./api/... ./controllers/...
