#**********************************************************************
# Builder
# 
# Create a go runtime suitable for building and testing kfctl
ARG GOLANG_VERSION=1.12
FROM golang:$GOLANG_VERSION as builder

RUN apt-get update
RUN apt-get install -y git unzip

# junit report is used to conver go test output to junit for reporting
RUN go get -u github.com/jstemmer/go-junit-report

# We need gcloud to get gke credentials.
RUN \
    cd /tmp && \
    wget -nv https://dl.google.com/dl/cloudsdk/release/install_google_cloud_sdk.bash && \
    chmod +x install_google_cloud_sdk.bash && \
    ./install_google_cloud_sdk.bash --disable-prompts --install-dir=/opt/

ENV PATH /go/bin:/usr/local/go/bin:/opt/google-cloud-sdk/bin:${PATH}

# use go modules
ENV GO111MODULE=on

#**********************************************************************
# Bootstrap base
#
# A container that builds bootstrap. 
#
# TODO(https://github.com/kubeflow/kubeflow/issues/2870): We
# might get rid of the bootstrap binary and instead just have kfctl
# and allow kfctl to run in a daemon/server mode.
#
FROM builder as bootstrap_base

RUN mkdir -p /opt/kubeflow
RUN mkdir -p ${GOPATH}/src/github.com/kubeflow/kubeflow/bootstrap
WORKDIR ${GOPATH}/src/github.com/kubeflow/kubeflow/bootstrap

# TODO(jlewi) This is copying in the source. Do we really want to bake the source into the image.
# Might be better to mount it via a volume.
COPY . .
RUN unzip -q -d /tmp hack/v2.zip
RUN go mod download
RUN go build -gcflags 'all=-N -l' -o bin/bootstrapper cmd/bootstrap/main.go

#
# kfctl_base
#
# TODO(jlewi): Why are we depending on a Docker container that has bootstrapper built into it?
FROM bootstrap_base as kfctl_base
ARG VERSION=""

# TODO(jlewi): This should already be installed in the base image.
RUN apt-get install unzip
WORKDIR ${GOPATH}/src/github.com/kubeflow/kubeflow/bootstrap

# TODO(jlewi): Why are these commands being run as part of the Dockerfile? Why aren't they part of Make?
RUN GO111MODULE=off GOPATH=${GOPATH} go get k8s.io/code-generator/cmd/deepcopy-gen 
RUN ${GOPATH}/bin/deepcopy-gen -i github.com/kubeflow/kubeflow/bootstrap/config/... -O zz_generated.deepcopy
RUN ${GOPATH}/bin/deepcopy-gen -i github.com/kubeflow/kubeflow/bootstrap/pkg/apis/apps/kfdef/... -O zz_generated.deepcopy
RUN ${GOPATH}/bin/deepcopy-gen -i github.com/kubeflow/kubeflow/bootstrap/v2/pkg/apis/apps/kfdef/... -O zz_generated.deepcopy
RUN go generate ./config/... ./pkg/apis/... ./pkg/utils/... ./pkg/kfapp/... ./cmd/kfctl/...
RUN go fmt ./config/... ./pkg/apis/... ./pkg/utils/... ./pkg/kfapp/... ./cmd/kfctl/...
RUN go vet ./config/... ./pkg/apis/... ./pkg/utils/... ./pkg/kfapp/... ./cmd/kfctl/...
RUN go build -gcflags 'all=-N -l' -ldflags "-X main.VERSION=${VERSION}" -o bin/kfctl cmd/kfctl/main.go

#
# kfctl
#
FROM golang:${GOLANG_VERSION} as kfctl

ENV PATH ${GOPATH}/bin:/usr/local/go/bin:${PATH}
RUN mkdir -p /opt/kubeflow
WORKDIR /opt/kubeflow
COPY --from=kfctl_base ${GOPATH}/src/github.com/kubeflow/kubeflow/bootstrap/bin/kfctl /usr/local/bin

CMD ["/bin/bash", "-c", "trap : TERM INT; sleep infinity & wait"]

#
# bootstrap
#
FROM golang:${GOLANG_VERSION} as bootstrap
ARG registries

COPY $registries /opt/registries

RUN mkdir -p /opt/kubeflow
COPY --from=bootstrap_base ${GOPATH}/src/github.com/kubeflow/kubeflow/bootstrap/bin/bootstrapper /opt/kubeflow/

COPY config/default.yaml /opt/kubeflow/
COPY image_registries.yaml /opt/kubeflow/
RUN mkdir -p /opt/bootstrap
RUN mkdir -p /opt/versioned_registries
RUN chmod a+rx /opt/kubeflow/bootstrapper

ENV PATH ${GOPATH}/bin:/usr/local/go/bin:${PATH}
RUN mkdir -p /opt/kubeflow
WORKDIR /opt/kubeflow

EXPOSE 8080


# Set default values for USER, USER_ID, GROUP_ID
# The startup script will create the user and su to that user.
# We delay the user creation until runtime so that user can specify
# the user info at runtime.

# Work around for https://github.com/ksonnet/ksonnet/issues/298
ENV USER kubeflow
ENV USER_ID 1000
ENV GROUP_ID 1000
ENV GROUP kubeflow

CMD ["/opt/kubeflow/bootstrapper","--in-cluster","--namespace=kubeflow","--apply"]
