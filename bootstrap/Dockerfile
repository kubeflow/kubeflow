# TODO(jlewi): How can we make it work with golang:1.8.2-alpine
FROM golang:1.8.2

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
# We don't install via gcloud because we want 1.10 which is newer than what's in gcloud.
RUN  curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.10.0/bin/linux/amd64/kubectl && \
    mv kubectl /usr/local/bin && \
    chmod a+x /usr/local/bin/kubectl

# Install ksonnet
RUN cd /tmp && \
    wget -O ks.tar.gz \
    https://github.com/ksonnet/ksonnet/releases/download/v0.9.1/ks_0.9.1_linux_amd64.tar.gz  && \
    tar -xvf ks.tar.gz && \
    mv ks_0.9.1_linux_amd64/ks /usr/local/bin && \
    chmod a+x /usr/local/bin/ks

RUN mkdir -p /opt/kubeflow

COPY bootstraper /opt/kubeflow/
COPY start.sh /opt/kubeflow/

RUN chmod a+rx /opt/kubeflow/*

# Set default values for USER, USER_ID, GROUP_ID
# The startup script will create the user and su to that user.
# We delay the user creation until runtime so that user can specify
# the user info at runtime.

# Work around for https://github.com/ksonnet/ksonnet/issues/298
ENV USER kubeflow
ENV USER_ID 1000
ENV GROUP_ID 1000
ENV GROUP kubeflow

ENTRYPOINT ["/opt/kubeflow/start.sh"]
