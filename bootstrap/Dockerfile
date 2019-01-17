#
# bootstrap_base
#
ARG GOLANG_VERSION=1.11.2
FROM golang:${GOLANG_VERSION} as bootstrap_base

RUN apt-get update

# We need gcloud to get gke credentials.
RUN wget -q https://dl.google.com/dl/cloudsdk/channels/rapid/google-cloud-sdk.tar.gz && \
    tar xzf google-cloud-sdk.tar.gz -C / && \
    rm google-cloud-sdk.tar.gz && \
    /google-cloud-sdk/install.sh \
    --disable-installation-options \
    --bash-completion=false \
    --path-update=false \
    --usage-reporting=false

RUN ln -sf /google-cloud-sdk/bin/gcloud /usr/local/bin/gcloud

RUN mkdir -p /opt/kubeflow
RUN mkdir -p ${GOPATH}/src/github.com/kubeflow/kubeflow/bootstrap
WORKDIR ${GOPATH}/src/github.com/kubeflow/kubeflow/bootstrap

ENV PATH /go/bin:/usr/local/go/bin:${PATH}
# use go modules
ENV GO111MODULE=on

COPY . .
RUN go mod download
RUN go build -gcflags 'all=-N -l' -o bin/bootstrapper cmd/bootstrap/main.go
RUN go build -gcflags 'all=-N -l' -o bin/kfctl cmd/kfctl/main.go

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
