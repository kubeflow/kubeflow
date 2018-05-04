set -exv

OPENMPI_DIR=/kubeflow/openmpi
BACKOFF_SECS=10

wait_mpi_ready() {
  local max_retries=$1
  local retries=0

  until mpiexec -n ${workers} --hostfile ${OPENMPI_DIR}/assets/hostfile --allow-run-as-root -q sh -c 'echo $(hostname) is ready'; do
    sleep ${BACKOFF_SECS}

    retries=$(expr ${retries} + 1)
    if [ -n "${max_retries}" ] && [ ${retries} -ge ${max_retries} ]; then
      exit 124
    fi
  done
}

wait_controller_term() {
  until [ -f ${OPENMPI_DIR}/data/.openmpi-controller/term.sig ]; do
    sleep ${BACKOFF_SECS}
  done
}

if [ $# -ne 4 ]; then
  echo "illegal number of parameters"
  exit 1
fi

role="$1"
workers="$2"
exec="$3"
timeout_secs="$4"
retries=$(expr ${timeout_secs} / ${BACKOFF_SECS})

# Set up openmpi
mkdir -p /root/.openmpi
cp ${OPENMPI_DIR}/assets/mca-params.conf /root/.openmpi

# Set up ssh
mkdir -p /root/.ssh
cp ${OPENMPI_DIR}/secrets/id_rsa /root/.ssh
cp ${OPENMPI_DIR}/secrets/id_rsa.pub /root/.ssh
cp ${OPENMPI_DIR}/secrets/authorized_keys /root/.ssh
cp ${OPENMPI_DIR}/assets/ssh_config /root/.ssh/config

# Start sshd in daemon mode
/usr/sbin/sshd -e -f ${OPENMPI_DIR}/assets/sshd_config

exit_code=0
if [ "${role}" = "master" ]; then
  # Run the exec command in master
  wait_mpi_ready ${retries}
  sh -c "${exec}" || exit_code=$?
else
  wait_controller_term
fi

exit ${exit_code}
