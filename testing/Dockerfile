# Docker image for running E2E tests using Argo.

FROM python:2.7-slim
MAINTAINER Jeremy Lewi

# Never prompt the user for choices on installation/configuration of packages
ENV DEBIAN_FRONTEND noninteractive
ENV TERM linux

# Define en_US.
ENV LANGUAGE=en_US.UTF-8 \
    LANG=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8 \
    LC_CTYPE=en_US.UTF-8 \
    LC_MESSAGES=en_US.UTF-8 \
    LC_ALL=en_US.UTF-8


# buildDeps should be packages needed only to build some other packages as
# these packages are purged in a later step.
#
# gcc & python-dev are needed so we can install crcmod for gsutil
RUN set -ex \
    && apt-get update -yqq \
    && apt-get install -yqq --no-install-recommends \
        curl \
        locales \
        wget \
        ca-certificates \
        git \
        zip \
        unzip \
        gcc python-dev \
        python-setuptools \
    && apt-get clean \
    && rm -rf \
        /var/lib/apt/lists/* \
        /tmp/* \
        /var/tmp/* \
        /usr/share/man \
        /usr/share/doc \
        /usr/share/doc-base

# Set the locale
RUN sed -i 's/^# en_US.UTF-8 UTF-8$/en_US.UTF-8 UTF-8/g' /etc/locale.gen \
    && locale-gen \
    && update-locale LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8

# Install go
RUN cd /tmp && \
    wget -O /tmp/go.tar.gz https://redirector.gvt1.com/edgedl/go/go1.9.2.linux-amd64.tar.gz && \
    tar -C /usr/local -xzf go.tar.gz

# Install gcloud
ENV PATH=/google-cloud-sdk/bin:/workspace:${PATH} \
    CLOUDSDK_CORE_DISABLE_PROMPTS=1

RUN wget -q https://dl.google.com/dl/cloudsdk/channels/rapid/google-cloud-sdk.tar.gz && \
    tar xzf google-cloud-sdk.tar.gz -C / && \
    rm google-cloud-sdk.tar.gz && \
    /google-cloud-sdk/install.sh \
        --disable-installation-options \
        --bash-completion=false \
        --path-update=false \
        --usage-reporting=false && \
    gcloud components install alpha beta kubectl

# Install CRCMOD for gsutil
RUN easy_install -U pip && \
    pip install -U crcmod

# Install Helm
RUN wget -O /tmp/get_helm.sh \
    https://raw.githubusercontent.com/kubernetes/helm/master/scripts/get && \
    chmod 700 /tmp/get_helm.sh && \
    /tmp/get_helm.sh && \
    rm /tmp/get_helm.sh

# Initialize helm
RUN helm init --client-only

# Install ksonnet
RUN curl -o /usr/local/bin/ks -L \
    https://github.com/ksonnet/ksonnet/releases/download/v0.8.0/ks-linux-amd64 && \
    chmod a+x /usr/local/bin/ks

# Install various python libraries.
RUN  pip install --upgrade six pyyaml google-api-python-client \
     google-cloud-storage google-auth-httplib2 pylint kubernetes==4.0.0 mock retrying

# Install docker.
RUN curl  https://get.docker.com/ | sh

COPY bootstrap.sh /usr/local/bin
RUN chmod a+x /usr/local/bin/bootstrap.sh

COPY checkout.sh /usr/local/bin
RUN chmod a+x /usr/local/bin/checkout.sh

ENTRYPOINT ["/usr/local/bin/bootstrap.sh"]