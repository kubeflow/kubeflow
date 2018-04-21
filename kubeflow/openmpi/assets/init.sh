set -exv

wait_mpi_ready() {
  local max_retries=$1
  local retries=0

  until mpiexec -n ${workers} --hostfile /kubeflow/openmpi/assets/hostfile --allow-run-as-root -q sh -c 'echo $(hostname) is ready'; do
    sleep 10

    retries=$(expr ${retries} + 1)
    if [ -n "${max_retries}" ] && [ ${retries} -ge ${max_retries} ]; then
      exit 124
    fi
  done
}

wait_controller_term() {
  until [ -f /kubeflow/openmpi/data/.openmpi-controller/term.sig ]; do
    sleep 10
  done
}

if [ $# -ne 3 ]; then
  echo "illegal number of parameters"
  exit 1
fi

role="$1"
workers="$2"
exec="$3"

# Set up openmpi
mkdir -p /root/.openmpi
cp /kubeflow/openmpi/assets/mca-params.conf /root/.openmpi

# Set up ssh
mkdir -p /root/.ssh
cp /kubeflow/openmpi/secrets/id_rsa /root/.ssh
cp /kubeflow/openmpi/secrets/id_rsa.pub /root/.ssh
cp /kubeflow/openmpi/secrets/authorized_keys /root/.ssh
cp /kubeflow/openmpi/assets/ssh_config /root/.ssh/config

# Start sshd in daemon mode
/usr/sbin/sshd -e -f /kubeflow/openmpi/assets/sshd_config

exit_code=0
if [ "${role}" = "master" ]; then
  # Run the exec command in master
  wait_mpi_ready 30
  sh -c "${exec}" || exit_code=$?
else
  wait_controller_term
fi

exit ${exit_code}
