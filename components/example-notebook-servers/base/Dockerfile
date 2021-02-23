FROM ubuntu:20.04

ENV NB_USER jovyan
ENV NB_UID 1000
ENV NB_PREFIX /
ENV HOME /home/$NB_USER

# set version for s6 overlay
ARG OVERLAY_VERSION="v2.2.0.3"
ARG OVERLAY_ARCH="amd64"

# Install -- Linux Dependencies
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -yq update \
    && apt-get -yq install --no-install-recommends \
    apt-transport-https \
    bash \
    bzip2 \
    ca-certificates \
    curl \
    git \
    gnupg \
    gnupg2 \
    locales \
    lsb-release \
    nano \
    software-properties-common \
    tzdata \
    unzip \
    vim \
    wget \
    zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set locale
RUN echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && \
    locale-gen
ENV LC_ALL=en_US.UTF-8 \
    LANG=en_US.UTF-8 \
    LANGUAGE=en_US.UTF-8 \
    SHELL=/bin/bash

# add s6 overlay
ADD https://github.com/just-containers/s6-overlay/releases/download/${OVERLAY_VERSION}/s6-overlay-${OVERLAY_ARCH}-installer /tmp/
RUN chmod +x /tmp/s6-overlay-${OVERLAY_ARCH}-installer && /tmp/s6-overlay-${OVERLAY_ARCH}-installer / && rm /tmp/s6-overlay-${OVERLAY_ARCH}-installer

# Install kubectl
RUN curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add - && \
    echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | tee -a /etc/apt/sources.list.d/kubernetes.list && \
    apt-get update && \
    apt-get install -y kubectl && \
    rm -rf /var/lib/apt/lists/*

# Create NB_USER user with UID=1000 in the 'users' group
# Change ownership of /etc/s6 to user jovyan
RUN useradd -M -s /bin/bash -N -u ${NB_UID} ${NB_USER} && \
    chown -R ${NB_USER}:users /usr/local/bin && \
    mkdir -p $HOME && \
    chown -R ${NB_USER}:users ${HOME} && \
    chown -R ${NB_USER}:users /etc/s6

USER $NB_UID
