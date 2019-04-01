#!/usr/bin/env bash
# A single commmand deployer script for Minikube with Kubeflow.
# Linux or Mac OS X
#

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

OSX="Darwin"
LINUX="Linux"

PLATFORM=$(uname)
if [[ $PLATFORM == $LINUX ]]; then
  fpn=$(uname -a)
  if [[ "$fpn" =~ .*(Ubuntu|Debian).* ]]; then
    DIST_TYPE="Ubuntu"
  elif [[ "$fpn" =~ .*(CentOS|Fedora|Red Hat).* ]]; then
    DIST_TYPE="CentOS"
  fi
fi

MINIKUBE_CMD="minikube start"
MOUNT_LOCAL=false
KUBEFLOW_VERSION=${KUBEFLOW_VERSION:-"master"}

GB1=$((1024 * 1024 * 1024))
MB1=$((1024 * 1024))
KB1=$((1024))

main() {
  infer_minikube_settings
  if cleanup_and_deploy_minikube; then
    sleep 30 # Give minikube time to take its first breath
    deploy_kubeflow
  fi
}

install_ks_kubectl_minikube() {
  # Installing ksonnet if needed
  KS_VERSION=$(ks version | grep 'ksonnet version' | awk '{print $3}')
  if [[ $KS_VERSION != "0.11.0" ]]; then
    echo -e "${YELLOW}Installing ksonnet...${NC}"
    if [[ ${PLATFORM} == $OSX ]]; then
      curl -OL https://github.com/ksonnet/ksonnet/releases/download/v0.11.0/ks_0.11.0_darwin_amd64.tar.gz
      tar zxf ks_0.11.0_darwin_amd64.tar.gz
      export PATH=$PATH:$(pwd)/ks_0.11.0_darwin_amd64

    elif [[ ${PLATFORM} == $LINUX ]]; then
      curl -OL https://github.com/ksonnet/ksonnet/releases/download/v0.11.0/ks_0.11.0_linux_amd64.tar.gz
      tar zxf ks_0.11.0_linux_amd64.tar.gz
      export PATH=$PATH:$(pwd)/ks_0.11.0_linux_amd64
    fi
    echo -e "${GREEN}[OK]${NC}"
  fi

  # Installing kubectl if needed
  if ! kubectl -h 2>&1 >/dev/null; then
    echo -e "${YELLOW}Installing kubectl...${NC}"
    if [[ $PLATFORM == $OSX ]]; then
      brew install kubectl
    elif [[ $PLATFORM == $LINUX ]]; then
      if [[ $DIST_TYPE == "Ubuntu" ]]; then
        sudo apt-get update && sudo apt-get install -y apt-transport-https
        curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
        sudo touch /etc/apt/sources.list.d/kubernetes.list
        echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
        sudo apt-get update
        sudo apt-get install -y kubectl
      elif [[ $DIST_TYPE == "CentOS" ]]; then
        sudo cat <<EOF > /etc/yum.repos.d/kubernetes.repo
        [kubernetes]
        name=Kubernetes
        baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
        enabled=1
        gpgcheck=1
        repo_gpgcheck=1
        gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOF
        sudo yum install -y kubectl
      fi
    fi
    echo -e "${GREEN}[OK]${NC}"
  fi

  # Installing minikube if needed
  if ! minikube -h 2>&1 >/dev/null; then
    echo -e "${YELLOW}Installing minikube...$NC}"
    if [[ $PLATFORM == $OSX ]]; then
      curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.28.0/minikube-darwin-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
    elif [[ $PLATFORM == $LINUX ]]; then
      curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.28.0/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
    fi
    echo -e "${GREEN}[OK]${NC}"
  fi
}

cleanup_and_deploy_minikube() {
  install_ks_kubectl_minikube

  # Stop and delete previous existence of Minikube VM.
  mini_running=$(minikube status | grep 'minikube:' | awk '{print $2}')
  if [[ $mini_running == "Running" ]]; then
    minikube stop
  fi
  minikube delete

  # start minikube with desired settings
  $MINIKUBE_CMD
  if ! minikube status 2>&1 >/dev/null; then
    echo -e "${RED}Unable to start minikube. Please see errors above${NC}"
    return 1
  fi

  minikube_ip=$(minikube ip)
  echo -e "Minikube dashboard at ${GREEN}http://$minikube_ip:30000/${NC}"
}

infer_minikube_settings() {
  # cpus
  local np=3
  if [[ $PLATFORM == $LINUX ]]; then
    np=$(nproc --all)
  elif [[ $PLATFORM == $OSX ]]; then
    np=$(sysctl -n hw.ncpu)
  fi
  echo -n "Assign CPUs between 3..$((np - 2)) [$((np / 2))]: "
  read p
  if [[ $p == "" ]]; then
    p=$((np / 2))
  fi
  MINIKUBE_CMD=$MINIKUBE_CMD" --cpus $p"

  # memory
  local mm=8
  if [[ $PLATFORM == $LINUX ]]; then
    local mm_kb=$(cat /proc/meminfo | grep 'MemTotal' | awk '{print $2}')
    mm=$((mm_kb * KB1 / GB1))
  elif [[ $PLATFORM == $OSX ]]; then
    mm=$(($(sysctl -n hw.memsize) / GB1))
  fi
  if (($mm < 16)); then
    echo -e "${YELLOW}WARNING: Your system has low memory for an ML workload.${NC}"
  fi
  echo -n "Assign memory (in GB) between 8..$((mm - 5)) [$((mm / 2))]: "
  read m
  if [[ $m == "" ]]; then
    m=$((mm / 2))
  fi
  MINIKUBE_CMD=$MINIKUBE_CMD" --memory $((m * KB1))"

  # disk
  local dd=40
  dd=$(df -h . | awk '{print $4}' | tail -1 | sed 's/[A-Za-z]//g')
  if (($dd < 40)); then
    echo -e "${YELLOW}WARNING: Low available disk space.${NC}"
  fi
  echo -n "Assign disk space (in GB) between 40..$((dd / 2)) [50]: "
  read d
  if [[ $d == "" ]]; then
    d=50
  fi
  MINIKUBE_CMD=$MINIKUBE_CMD" --disk-size ${d}g"

  # virtualizer
  echo -n "Choose a virtualizer/hypervisor installed on your system (virtualbox, vmwarefusion, kvm2, hyperkit): "
  read v
  if [[ $v != "" ]]; then
    MINIKUBE_CMD=$MINIKUBE_CMD" --vm-driver=$v"
  fi

  # Mount local dir
  echo -n "If you'd like to access a local directory in Jupyter, please enter the full path: "
  read l
  if [[ $l != "" ]]; then
    MINIKUBE_CMD=$MINIKUBE_CMD" --mount-string=$l:/mnt/local --mount"
    MOUNT_LOCAL=true
  fi
}

download_kubeflow_source() {
  curl -O https://raw.githubusercontent.com/kubeflow/kubeflow/${KUBEFLOW_VERSION}/scripts/download.sh
  /bin/bash ./download.sh
}

deploy_kubeflow() {
  download_kubeflow_source
  if [ -e ./localapp ]; then
    rm -rf ./localapp
  fi
  KUBEFLOW_REPO=$(pwd) MOUNT_LOCAL=${MOUNT_LOCAL} ./scripts/kfctl.sh init localapp --platform minikube
  pushd .
  cd localapp
  ../scripts/kfctl.sh generate all
  ../scripts/kfctl.sh apply all
  popd
}

main "$@"
