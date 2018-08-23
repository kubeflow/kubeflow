#!/bin/bash

# Helper functions for minikube deployment of kubeflow
# Linux or Mac OS X

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

OSX="Darwin"
LINUX="Linux"

HOST_PLATFORM=`uname`
if [[ ${HOST_PLATFORM} == $LINUX ]]
then
  fpn=`uname -a`
  if [[ $fpn =~ *(Ubuntu|Debian)* ]]
  then
    DIST_TYPE="Ubuntu"
  elif [[ $fpn =~ *(CentOS|Fedora|Red Hat)* ]]
  then
    DIST_TYPE="CentOS"
  fi
fi

MINIKUBE_CMD="minikube start"
MOUNT_LOCAL=false

GB1=$(( 1024 * 1024 * 1024 ))
MB1=$(( 1024 * 1024 ))
KB1=$(( 1024 ))

function install_ks_kubectl_minikube() {
  # Installing ksonnet if needed
  KS_VERSION=`ks version | grep 'ksonnet version' | awk '{print $3}'`
  if [[ $KS_VERSION != "0.11.0" ]]
  then
    echo -e "${YELLOW}Installing ksonnet...${NC}"
    if [[ ${HOST_PLATFORM} == $OSX ]]
    then
      curl -OL https://github.com/ksonnet/ksonnet/releases/download/v0.11.0/ks_0.11.0_darwin_amd64.tar.gz
      tar zxf ks_0.11.0_darwin_amd64.tar.gz
      export PATH=$PATH:$(pwd)/ks_0.11.0_darwin_amd64
    
    elif [[ ${HOST_PLATFORM} == $LINUX ]]
    then
      curl -OL https://github.com/ksonnet/ksonnet/releases/download/v0.11.0/ks_0.11.0_linux_amd64.tar.gz
      tar zxf ks_0.11.0_linux_amd64.tar.gz
      export PATH=$PATH:$(pwd)/ks_0.11.0_linux_amd64
    fi
    echo -e "${GREEN}[OK]${NC}"
  fi

  # Installing kubectl if needed
  if ! kubectl -h 2>&1 >/dev/null
  then
    echo -e "${YELLOW}Installing kubectl...${NC}"
    if [[ ${HOST_PLATFORM} == $OSX ]]
    then
      brew install kubectl
    elif [[ ${HOST_PLATFORM} == $LINUX ]]
    then
      if [[ $DIST_TYPE == "Ubuntu" ]]
      then
        sudo apt-get update && sudo apt-get install -y apt-transport-https
        curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
        sudo touch /etc/apt/sources.list.d/kubernetes.list 
        echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
        sudo apt-get update
        sudo apt-get install -y kubectl
      elif [[ $DIST_TYPE == "CentOS" ]]
      then
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
  if ! minikube -h 2>&1 >/dev/null
  then
    echo -e "${YELLOW}Installing minikube...$NC}"
    if [[ ${HOST_PLATFORM} == $OSX ]]
    then
      curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.28.0/minikube-darwin-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
    elif [[ ${HOST_PLATFORM} == $LINUX ]]
    then
      curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.28.0/minikube-linux-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
    fi
    echo -e "${GREEN}[OK]${NC}"
  fi
}

function cleanup_and_deploy_minikube() {
  install_ks_kubectl_minikube

  # Stop and delete previous existence of Minikube VM.
  mini_running=`minikube status | grep 'minikube:' | awk '{print $2}'`
  if [[ $mini_running != "" ]]
  then
    if [[ $mini_running = "Running" ]]
    then
      minikube stop
    fi
    minikube delete
  fi

  # start minikube with desired settings
  $MINIKUBE_CMD
  if ! minikube status 2>&1 >/dev/null
  then
    echo -e "${RED}Unable to start minikube. Please see errors above${NC}"
    return 1
  fi

  minikube_ip=`minikube ip`
  echo -e "Minikube dashboard at ${GREEN}http://$minikube_ip:30000/${NC}"
}

function infer_minikube_settings() {
  # cpus
  local np=3
  if [[ ${HOST_PLATFORM} == $LINUX ]]
  then
    np=`nproc --all`
  elif [[ ${HOST_PLATFORM} == $OSX ]]
  then
    np=`sysctl -n hw.ncpu`
  fi
  echo -n "Assign CPUs between 3..$(( np - 2 )) [$(( np / 2 ))]: "
  read p
  if [[ $p == "" ]]
  then
    p=$(( np / 2 ))
  fi
  MINIKUBE_CMD=$MINIKUBE_CMD" --cpus $p"

  # memory
  local mm=8
  if [[ ${HOST_PLATFORM} == $LINUX ]]
  then
    local mm_kb=`cat /proc/meminfo | grep 'MemTotal' | awk '{print $2}'`
    mm=$(( mm_kb * KB1 / GB1 ))
  elif [[ ${HOST_PLATFORM} == $OSX ]]
  then
    mm=$(( `sysctl -n hw.memsize` / GB1 ))
  fi
  if (( $mm < 16 ))
  then
    echo -e "${YELLOW}WARNING: Your system has low memory for an ML workload.${NC}"
  fi
  echo -n "Assign memory (in GB) between 8..$(( mm - 5 )) [$(( mm / 2 ))]: "
  read m
  if [[ $m == "" ]]
  then
    m=$(( mm / 2 ))
  fi
  MINIKUBE_CMD=$MINIKUBE_CMD" --memory $(( m * KB1 ))"

  # disk
  local dd=40
  dd=`df -h . | awk '{print $4}' | tail -1 | sed 's/[A-Za-z]//g'`
  if (( $dd < 40 ))
  then
    echo -e "${YELLOW}WARNING: Low available disk space.${NC}"
  fi
  echo -n "Assign disk space (in GB) between 40..$(( dd / 2 )) [50]: "
  read d
  if [[ $d == "" ]]
  then
    d=50
  fi
  MINIKUBE_CMD=$MINIKUBE_CMD" --disk-size ${d}g"

  # virtualizer
  echo -n "Choose a virtualizer/hypervisor installed on your system (virtualbox, vmwarefusion, kvm2, hyperkit): "
  read v
  if [[ $v != "" ]]
  then
    MINIKUBE_CMD=$MINIKUBE_CMD" --vm-driver=$v"
  fi

  # Mount local dir
  echo -n "If you'd like to access a local directory in JupyterHub, please enter the full path: "
  read l
  if [[ $l != "" ]]
  then
    MINIKUBE_CMD=$MINIKUBE_CMD" --mount-string=$l:/mnt/local --mount"
    MOUNT_LOCAL=true
  fi
}

function download_kubeflow_source() {
  # download source zip
  curl -OL https://github.com/kubeflow/kubeflow/archive/${KUBEFLOW_VERSION}.zip
  unzip ${KUBEFLOW_VERSION}.zip
  rm ${KUBEFLOW_VERSION}.zip
}

function is_kubeflow_ready() {
  echo -en "${YELLOW}Getting kubeflow namespace ready...${NC}"
  local ns_ready=false
  for i in {1..5}
  do
    kube_ns=`kubectl get namespaces | grep ${K8S_NAMESPACE} | wc -l`
    if [ $kube_ns = 1 ]
    then
       ns_ready=true
       echo -e "${GREEN}[OK]${NC}"
       break
    fi
    sleep 30
  done

  if [[ $ns_ready = false ]]
  then
    return 1
  fi

  svc_ready=false
  amb_up=0
  tf_hub_up=0
  echo -en "${YELLOW}Bringing kubeflow services up."
  until (( "$amb_up" > 0 && "$tf_hub_up" > 0 ))
  do
    sleep 30
    amb_up=`kubectl -n ${K8S_NAMESPACE} get pods | grep Running | grep ambassador | wc -l`
    tf_hub_up=`kubectl -n ${K8S_NAMESPACE} get pods | grep Running | grep tf-hub | wc -l`
    echo -n "."
    if (( "$amb_up" > 0 && "$tf_hub_up" > 0 ))
    then
      svc_ready=true
      echo -e "${GREEN}[OK]${NC}"
      break
    fi
  done

  if [ $svc_ready = false ]
  then
    return 1
  fi
}

function create_local_fs_mount_spec() {
  if $MOUNT_LOCAL
  then
    # Create a persistent volume
    cat <<EOF > ${KUBEFLOW_KS_DIR}/pv.yaml
kind: PersistentVolume
apiVersion: v1
metadata:
  name: local-volume
  labels:
    type: local
spec:
  persistentVolumeReclaimPolicy: Delete
  storageClassName: local-storage
  capacity:
    storage: 10Gi
  accessModes:
    - ReadWriteOnce
  local:
    path: "/mnt/local"
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - minikube
EOF
  kubectl create -f ./pv.yaml

  # Create a PVC attached to the volume
  cat <<EOF > ${KUBEFLOW_KS_DIR}/pv-claim.yaml
kind: PersistentVolumeClaim
apiVersion: v1
metadata:
  name: local-notebooks
spec:
  storageClassName: local-storage
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  volumeName: local-volume
EOF
  kubectl create -n ${K8S_NAMESPACE} -f ./pv-claim.yaml
  fi
}

# if user requested a local fs path to be mounted, make it accessible via
# Jupyter Notebooks
function mount_local_fs() {
  if $MOUNT_LOCAL
  then
    kubectl create -f ${KUBEFLOW_KS_DIR}/pv.yaml
    kubectl create -n ${K8S_NAMESPACE} -f ${KUBEFLOW_KS_DIR}/pv-claim.yaml
  fi
}

# Setup various network tunnels
function setup_tunnels() {
  sleep 30 # Give services time to bind
  kubectl -n kubeflow port-forward svc/ambassador 8080:80 2>&1 >/dev/null &
  echo -e "Access Kubeflow dashboard at ${GREEN}http://localhost:8080/${NC}"
  echo -e "Access JupyterHub at ${GREEN}http://localhost:8080/hub/${NC}"
}
