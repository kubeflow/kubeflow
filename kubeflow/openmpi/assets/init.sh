set -exv

probe_redis() {
  local cmd="$1"
  local status=$2
  local max_retries=$3
  local retries=0

  until [ "$(${cmd})" = "${status}" ]; do
    sleep 10

    retries=$(expr ${retries} + 1)
    if [ -n "${max_retries}" ] && [ ${retries} -ge ${max_retries} ]; then
      exit 124
    fi
  done
}

ping_redis() {
  local timeout=$1

  probe_redis "redis-cli -h openmpi-redis ping" PONG ${timeout}
}

wait_cond() {
  local cond=$1
  local status=$2
  local timeout=$3

  probe_redis "redis-cli -h openmpi-redis get ${cond}" ${status} ${timeout}
}

signal_cond() {
  local cond=$1

  redis-cli -h openmpi-redis incr ${cond}
}

if [ $# -ne 4 ]; then
  echo "illegal number of parameters"
  exit 1
fi

role="$1"
workers="$2"
hostname="$3"
exec="$4"

# Set up openmpi
mkdir -p /root/.openmpi
cp /kubeflow/openmpi/assets/mca-params.conf /root/.openmpi

# Set up ssh
mkdir -p /root/.ssh
cp /kubeflow/openmpi/secrets/id_rsa /root/.ssh
cp /kubeflow/openmpi/secrets/id_rsa.pub /root/.ssh
cp /kubeflow/openmpi/secrets/authorized_keys /root/.ssh
cp /kubeflow/openmpi/assets/ssh_config /root/.ssh/config

# Install redis-cli
apt-get install -y redis-tools

# Start sshd in daemon mode
/usr/sbin/sshd -e -f /kubeflow/openmpi/assets/sshd_config
sleep 10

# Wait until redis is up
ping_redis 30

# Start running the workloads.
echo running ${hostname}

exit_code=0
ready_cond="openmpi:ready"
done_cond="openmpi:done"
if [ "${role}" = "master" ]; then
  wait_cond ${ready_cond} ${workers} 30
  sh -c "${exec}" || exit_code=$?
  signal_cond ${done_cond}
else
  signal_cond ${ready_cond}
  wait_cond ${done_cond} 1
fi

echo shutting down ${hostname}
exit ${exit_code}
