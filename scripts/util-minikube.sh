#!/usr/bin/env bash

# Helper functions for minikube deployment of kubeflow
# Linux or Mac OS X

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

MOUNT_LOCAL=${MOUNT_LOCAL:-"false"}

is_kubeflow_ready() {
  echo -en "${YELLOW}Getting kubeflow namespace ready...${NC}"
  local ns_ready=false
  for i in {1..5}; do
    kube_ns=$(kubectl get namespaces | grep ${K8S_NAMESPACE} | wc -l)
    if [ $kube_ns = 1 ]; then
      ns_ready=true
      echo -e "${GREEN}[OK]${NC}"
      break
    fi
    sleep 30
  done

  if [[ $ns_ready == false ]]; then
    return 1
  fi

  svc_ready=false
  amb_up=0
  tf_hub_up=0
  echo -en "${YELLOW}Bringing kubeflow services up."
  until (("$amb_up" > 0 && "$tf_hub_up" > 0)); do
    sleep 30
    amb_up=$(kubectl -n ${K8S_NAMESPACE} get pods | grep Running | grep ambassador | wc -l)
    tf_hub_up=$(kubectl -n ${K8S_NAMESPACE} get pods | grep Running | grep jupyter | wc -l)
    echo -n "."
    if (("$amb_up" > 0 && "$tf_hub_up" > 0)); then
      svc_ready=true
      echo -e "${GREEN}[OK]${NC}"
      break
    fi
  done

  if [ $svc_ready = false ]; then
    return 1
  fi
}

create_local_fs_mount_spec() {
  if $MOUNT_LOCAL; then
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
  fi
}

# if user requested a local fs path to be mounted, make it accessible via
# Jupyter Notebooks
mount_local_fs() {
  if $MOUNT_LOCAL; then
    kubectl create -f ${KUBEFLOW_KS_DIR}/pv.yaml
    kubectl create -n ${K8S_NAMESPACE} -f ${KUBEFLOW_KS_DIR}/pv-claim.yaml
  fi
}

# Setup various network tunnels
setup_tunnels() {
  sleep 30 # Give services time to bind
  kubectl -n kubeflow port-forward svc/ambassador 8080:80 2>&1 >/dev/null &
  echo -e "Access Kubeflow dashboard at ${GREEN}http://localhost:8080/${NC}"
  echo -e "Access Jupyter at ${GREEN}http://localhost:8080/hub/${NC}"
}
