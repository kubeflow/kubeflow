set -exv

SCRIPT_DIR=$(cd $(dirname $0);pwd)
K8S_PODS_ENDPOINT="$KUBERNETES_SERVICE_HOST:$KUBERNETES_SERVICE_PORT/api/v1/namespaces/$(cat /var/run/secrets/kubernetes.io/serviceaccount/namespace)/pods"

# TOKEN should not be printed.
set +x
TOKEN_HEADER="Authorization: Bearer $(cat /var/run/secrets/kubernetes.io/serviceaccount/token)"
set -x

if [ $# -ne 5 ]; then
  echo "illegal number of parameters"
  exit 1
fi

role="$1"
workers="$2"
hostname="$3"
exec="$4"
master_pod="$5"

phase_of(){
  local pod_name=$1
  # TOKEN should not be printed.
  set +x
  curl -sL --insecure --header "$TOKEN_HEADER" \
    https://${K8S_PODS_ENDPOINT}/${pod_name} \
    | jq -r '.status.phase' 2>/dev/null
  set -x
}

wait_workers_running() {
  local max_retries=$1
  local retries=0
  local num_runnning_worker=0

  until [ ${num_runnning_worker} -eq ${workers} ]; do

    local num_runnning_worker=0
    for worker in $(cat ${SCRIPT_DIR}/hostfile | cut -f 1 -d' '); do
      local worker_pod=${worker%%.*}
      echo -n "worker pod ${worker_pod}: "
      phase=$(phase_of ${worker_pod})
      echo $phase
      if [ "$phase" = "Running" ]; then
        num_runnning_worker=$((${num_runnning_worker} + 1))
      fi
    done
    echo the number of running worker: ${num_runnning_worker}/${workers}

    if [ -n "${max_retries}" ] && [ ${retries} -ge ${max_retries} ]; then
      exit 124
    else
      sleep 1
    fi
  done
}

wait_master_done() {
    local max_retries=$1
    local retries=0
    until [ $(phase_of ${master_pod}) = "Succeeded" -o $(phase_of ${master_pod}) = "Failed" ]; do
      sleep 10;
      retries=$(expr ${retries} + 1)
      if [ -n "${max_retries}" ] && [ ${retries} -ge ${max_retries} ]; then
        exit 124
      fi
    done
}

# Set up openmpi
mkdir -p /root/.openmpi
cp /kubeflow/openmpi/assets/mca-params.conf /root/.openmpi

# Set up ssh
mkdir -p /root/.ssh
cp /kubeflow/openmpi/secrets/id_rsa /root/.ssh
cp /kubeflow/openmpi/secrets/id_rsa.pub /root/.ssh
cp /kubeflow/openmpi/secrets/authorized_keys /root/.ssh
cp /kubeflow/openmpi/assets/ssh_config /root/.ssh/config

# Install curl and jq
apt-get update && apt-get install -y curl jq

# Start sshd in daemon mode
/usr/sbin/sshd -e -f /kubeflow/openmpi/assets/sshd_config
sleep 10

# Start running the workloads.
echo running ${hostname}

exit_code=0
if [ "${role}" = "master" ]; then
  wait_workers_running 30
  sh -c "${exec}" || exit_code=$?
else
  wait_master_done
fi

echo shutting down ${hostname}
exit ${exit_code}
