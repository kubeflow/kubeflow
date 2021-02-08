FROM ubuntu:20.04

ENV NB_USER jovyan
ENV NB_UID 1000
ENV NB_PREFIX /
ENV HOME /home/$NB_USER

# Install -- Linux Dependencies
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -yq update \
    && apt-get -yq install --no-install-recommends \
    bash \
    bzip2 \
    ca-certificates \
    curl \
    git \
    gnupg \
    locales \
    lsb-release \
    software-properties-common \
    sudo \
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
ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8

# Install kubectl
RUN apt-get update && sudo apt-get install -y apt-transport-https gnupg2 curl && \
    curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add - && \
    echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list && \
    apt-get update && \
    apt-get install -y kubectl && \
    rm -rf /var/lib/apt/lists/*

# Create NB_USER user with UID=1000 in the 'users' group
RUN useradd -M -s /bin/bash -N -u ${NB_UID} ${NB_USER} \
    && chown -R ${NB_USER}:users /usr/local/bin \
    && mkdir -p $HOME \
    && chown -R ${NB_USER}:users ${HOME}
