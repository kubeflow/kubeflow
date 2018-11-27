#!/usr/bin/env bash
#
# A helper script to run on a VM to install and start minikube.

set -ex

# Install Docker.
sudo apt-get update -y
sudo apt-get install -y \
  apt-transport-https \
  ca-certificates \
  curl \
  software-properties-common

curl -fsSL https://download.docker.com/linux/$(
  . /etc/os-release
  echo "$ID"
)/gpg | sudo apt-key add -

sudo add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/$(
    . /etc/os-release
    echo "$ID"
  ) \
   $(lsb_release -cs) \
   stable"

sudo apt-get update -y
sudo apt-get install docker-ce -y

# Install kubectl
curl -LO https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv kubectl /usr/local/bin/

# Install minikube
curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.25.0/minikube-linux-amd64
chmod +x minikube
sudo mv minikube /usr/local/bin/

# We need a large disk for Jupyter.
sudo minikube start --vm-driver=none --disk-size=40g

# Change the permissions because we will copy these files.
sudo chmod -R a+rw ~/.kube
sudo chmod -R a+rw ~/.minikube
