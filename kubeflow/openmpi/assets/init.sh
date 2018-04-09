set -exv

# Configure openmpi
mkdir -p /root/.openmpi
mca_confg=/root/.openmpi/mca-params.conf
echo "hwloc_base_binding_policy = none" > ${mca_confg}
echo "rmaps_base_mapping_policy = slot" >> ${mca_confg}
echo "btl_tcp_if_exclude = lo,docker0" >> ${mca_confg}
echo "orte_keep_fqdn_hostnames=t" >> ${mca_confg}

# Set up ssh config
mkdir -p /root/.ssh
cp /kubeflow/openmpi/secrets/* /root/.ssh

# Start sshd in non-daemon mode
/usr/sbin/sshd -D -e -f /kubeflow/openmpi/assets/sshd_config