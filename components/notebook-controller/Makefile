
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

# Run tests
test: generate fmt vet manifests
	go test ./api/... ./controllers/... -coverprofile cover.out

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
docker-build: test
	docker build . -t ${IMG}
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

build-gcr: test
	docker build -t $(IMG):$(TAG) .
	@echo Built $(IMG):$(TAG)

push-gcr: build-gcr
	docker push $(IMG):$(TAG)
	@echo Pushed $(IMG):$(TAG)

# Build the GCB workflow
build-gcb-spec:
	rm -rf ./gcb_build
	mkdir  -p gcb_build
	jsonnet ./gcb_build.jsonnet --ext-str imageBase=$(IMG) \
	  --ext-str gitVersion=$(GIT_VERSION) --ext-str tag=$(TAG) \
	  --ext-str useImageCache=$(USE_IMAGE_CACHE) \
	  > ./gcb_build/image_build.json

# Build using GCB. This is useful if we are on a slow internet connection
# and don't want to pull images locally.
# Its also used to build from our CI system.
build-gcb: build-gcb-spec
	gcloud builds submit --machine-type=n1-highcpu-32 --project=kubeflow-ci \
	    --config=./gcb_build/image_build.json \
		--timeout=3600 .
