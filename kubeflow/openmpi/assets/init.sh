set -exv

# Set up openmpi
mkdir -p /root/.openmpi
cp /kubeflow/openmpi/assets/mca-params.conf /root/.openmpi

# Set up ssh
mkdir -p /root/.ssh
cp /kubeflow/openmpi/secrets/id_rsa /root/.ssh
cp /kubeflow/openmpi/secrets/id_rsa.pub /root/.ssh
cp /kubeflow/openmpi/secrets/authorized_keys /root/.ssh
cp /kubeflow/openmpi/assets/ssh_config /root/.ssh/config

# Start sshd in non-daemon mode
/usr/sbin/sshd -D -e -f /kubeflow/openmpi/assets/sshd_config