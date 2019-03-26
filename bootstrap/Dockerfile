#
# bootstrap_base
#
ARG GOLANG_VERSION=1.11.5
FROM golang:$GOLANG_VERSION as bootstrap_base

RUN apt-get update
RUN apt-get install -y unzip

# We need gcloud to get gke credentials.
RUN \
    cd /tmp && \
    wget -nv https://dl.google.com/dl/cloudsdk/release/install_google_cloud_sdk.bash && \
    chmod +x install_google_cloud_sdk.bash && \
    ./install_google_cloud_sdk.bash --disable-prompts --install-dir=/opt/

ENV PATH /go/bin:/usr/local/go/bin:/opt/google-cloud-sdk/bin:${PATH}

RUN mkdir -p /opt/kubeflow
RUN mkdir -p ${GOPATH}/src/github.com/kubeflow/kubeflow/bootstrap
WORKDIR ${GOPATH}/src/github.com/kubeflow/kubeflow/bootstrap

# use go modules
ENV GO111MODULE=on

COPY . .
RUN unzip -q -d /tmp hack/v2.zip
RUN go mod download
RUN go build -gcflags 'all=-N -l' -o bin/bootstrapper cmd/bootstrap/main.go

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
