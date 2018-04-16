set -exv

if [ $# -ne 3 ]; then
  echo "illegal number of parameters"
  exit 1
fi

role="$1"
workers="$2"
cmd="$3"

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
redis="redis-cli -h openmpi-redis"

# Start sshd in daemon mode
/usr/sbin/sshd -e -f /kubeflow/openmpi/assets/sshd_config

# Wait until redis is up
until [ "$(${redis} ping)" = "PONG" ]; do
  sleep 5
done

wait_cond() {
  cond=$1
  status=$2
  until [ "$(${redis} get ${cond})" = "${status}" ]; do
    sleep 10
  done
}

signal_cond() {
  cond=$1
  ${redis} incr ${cond}
}

ready_cond="openmpi:ready"
done_cond="openmpi:done"
if [ "${role}" = "master" ]; then
  echo running as master
  wait_cond ${ready_cond} ${workers}
  sh -c "${cmd}"
  signal_cond ${done_cond}
else
  echo running as worker
  signal_cond ${ready_cond}
  wait_cond ${done_cond} 1
fi

# BUG: after this script exits, the container will be restarted
# since StatefulSet only supports RestartPolicy "Always".
# TODO: Investigate how to gracefully shut down the workloads.
echo shutting down $(hostname)
sleep infinity