set -exv

OPENMPI_DIR=/kubeflow/openmpi
BACKOFF_SECS=10
TIMEOUT_EXIT_CODE=124

wait_mpi_ready() {
  local workers=$1
  local max_retries=$2
  local retries=0

  until mpiexec -n ${workers} --hostfile ${OPENMPI_DIR}/assets/hostfile --allow-run-as-root -q sh -c 'echo $(hostname) is ready'; do
    sleep ${BACKOFF_SECS}

    retries=$(expr ${retries} + 1)
    if [ -n "${max_retries}" ] && [ ${retries} -ge ${max_retries} ]; then
      exit ${TIMEOUT_EXIT_CODE}
    fi
  done
}

wait_controller_signal() {
  local signal=$1
  local max_retries=$2
  local retries=0

  until [ -f ${OPENMPI_DIR}/data/.openmpi-controller/${signal} ]; do
    sleep ${BACKOFF_SECS}

    retries=$(expr ${retries} + 1)
    if [ -n "${max_retries}" ] && [ ${retries} -ge ${max_retries} ]; then
      exit ${TIMEOUT_EXIT_CODE}
    fi
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
max_retries=$(expr ${timeout_secs} / ${BACKOFF_SECS})

# Set up openmpi
mkdir -p /root/.openmpi
cp ${OPENMPI_DIR}/assets/mca-params.conf /root/.openmpi

# Set up ssh
mkdir -p /root/.ssh
cp ${OPENMPI_DIR}/secrets/id_rsa /root/.ssh
cp ${OPENMPI_DIR}/secrets/id_rsa.pub /root/.ssh
cp ${OPENMPI_DIR}/secrets/authorized_keys /root/.ssh
cp ${OPENMPI_DIR}/assets/ssh_config /root/.ssh/config

exit_code=0
if [ "${role}" = "master" ]; then
  # Wait until workers are ready.
  wait_mpi_ready ${workers} ${max_retries}

  # Run the exec command in master
  sh -c "${exec}" || exit_code=$?
else
  # Wait until controller finishes initialization.
  wait_controller_signal SIGCONT ${max_retries}

  # Start sshd in daemon mode
  /usr/sbin/sshd -e -f ${OPENMPI_DIR}/assets/sshd_config

  # Block forever until controller terminates.
  wait_controller_signal SIGTERM
fi

exit ${exit_code}
