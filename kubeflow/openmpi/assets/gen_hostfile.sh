set -exv

name=$1
namespace=$2
workers=$3

# Download kubectl
apk add --update ca-certificates
apk add --update -t deps curl
curl -L https://storage.googleapis.com/kubernetes-release/release/v1.9.6/bin/linux/amd64/kubectl -o /usr/local/bin/kubectl
chmod +x /usr/local/bin/kubectl

# Look up hosts and prepare hostfile for openmpi
hostfile=/kubeflow/openmpi/workdir/hostfile
until [ "$(wc -l < ${hostfile})" -eq "${workers}" ]; do
  rm -f ${hostfile}
  pods=$(kubectl -n ${namespace} get pod --selector=role=worker --field-selector=status.phase=Running -o=jsonpath='{.items[*].metadata.name}')
  for p in ${pods}; do
    # NOTE: must set MCA parameter orte_keep_fqdn_hostnames=t to force openmpi to use FQDN.
    echo "${p}.${name}.${namespace}.svc.cluster.local" >> ${hostfile}
  done
done
