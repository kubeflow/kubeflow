ARG GOLANG_VERSION=1.11.2
FROM golang:$GOLANG_VERSION as build
ARG registries

# install vim 
RUN apt-get update && apt-get install -y vim

# install dlv debugger
RUN go get -u github.com/derekparker/delve/cmd/dlv

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

# Install kubectl
# We don't install via gcloud because we want 1.12.2 which is newer than what's in gcloud.
RUN  curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.12.2/bin/linux/amd64/kubectl && \
    mv kubectl /usr/local/bin && \
    chmod a+x /usr/local/bin/kubectl

COPY $registries /opt/registries

# bootstrap is using ksonnet 0.13.1
RUN wget -q https://github.com/ksonnet/ksonnet/releases/download/v0.13.1/ks_0.13.1_linux_amd64.tar.gz && \
    tar xzf ks_0.13.1_linux_amd64.tar.gz -C . && \
    rm ks_0.13.1_linux_amd64.tar.gz && \
    cp ks_0.13.1_linux_amd64/ks /usr/local/bin && \
    rm -rf ks_0.13.1_linux_amd64

RUN mkdir -p /opt/kubeflow

ENV PATH /go/bin:/usr/local/go/bin:$PATH

RUN mkdir -p $GOPATH/src/github.com/kubeflow/kubeflow/bootstrap
COPY . $GOPATH/src/github.com/kubeflow/kubeflow/bootstrap
WORKDIR $GOPATH/src/github.com/kubeflow/kubeflow/bootstrap

# use go modules
ENV GO111MODULE=on
RUN go build -gcflags 'all=-N -l' -o bin/bootstrapper cmd/bootstrap/main.go

RUN cp $GOPATH/src/github.com/kubeflow/kubeflow/bootstrap/bin/bootstrapper /opt/kubeflow
COPY start.sh /opt/kubeflow/
COPY dlv.sh /opt/kubeflow/
COPY config/default.yaml /opt/kubeflow/
COPY image_registries.yaml /opt/kubeflow/
RUN mkdir -p /opt/bootstrap
RUN mkdir -p /opt/versioned_registries

RUN chmod a+rx /opt/kubeflow/bootstrapper
RUN chmod a+rx /opt/kubeflow/start.sh

# Set default values for USER, USER_ID, GROUP_ID
# The startup script will create the user and su to that user.
# We delay the user creation until runtime so that user can specify
# the user info at runtime.

# Work around for https://github.com/ksonnet/ksonnet/issues/298
ENV USER kubeflow
ENV USER_ID 1000
ENV GROUP_ID 1000
ENV GROUP kubeflow

WORKDIR /opt/kubeflow
CMD ["/opt/kubeflow/bootstrapper","--namespace=kubeflow","--apply"]
