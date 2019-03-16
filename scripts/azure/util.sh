#!/usr/bin/env bash
#
# Define functions to customize the Kubeflow app for Azure.
#
set -xe

validate_az_arg() {
    if [[ -z "$AZ_CLIENT_ID" ]]; then
      echo "Azure service principal client id must be provided using --azClientId <AZ_CLIENT_ID>"
      exit 1
    fi
    if [[ -z "$AZ_CLIENT_SECRET" ]]; then
      echo "Azure service principal client secret must be provided using --azClientSecret <AZ_CLIENT_SECRET>"
      exit 1
    fi
    if [[ -z "$AZ_TENANT_ID" ]]; then
      echo "Azure tenant id must be provided using --azTenantId <AZ_TENANT_ID>"
      exit 1
    fi
    if [[ -z "$AZ_SUBSCRIPTION_ID" ]]; then
      echo "Azure subscription id must be provided using --azSubscriptionId <AZ_SUBSCRIPTION_ID>"
      exit 1
    fi
    if [[ -z "$AZ_LOCATION" ]]; then
      echo "Azure location must be provided using --azLocation <AZ_LOCATION>"
      exit 1
    fi
    if [[ -z "$AZ_NODE_SIZE" ]]; then
      echo "Azure node vm size must be provided using --azNodeSize <AZ_NODE_SIZE>. Ensure NVIDIA GPUs (N-series) are available in your subscription."
      exit 1
    fi
}

check_az_cli() {

  if ! which "az" &>/dev/null && ! type -a "az" &>/dev/null ; then
    echo "You don't have az cli installed. Please install az cli. https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-linux?view=azure-cli-latest"
    exit 1
  fi
}

az_login() {
    if ! az login --service-principal --username "${AZ_CLIENT_ID}" --password "${AZ_CLIENT_SECRET}" --tenant "${AZ_TENANT_ID}" &>/dev/null ; then
      echo "az login failed. Please check the env variables provided, then try again."
      exit 1
    fi
    if ! az account set -s $AZ_SUBSCRIPTION_ID &>/dev/null ; then
      echo "az account set -s ${AZ_SUBSCRIPTION_ID} failed."
      exit 1
    fi
}

createAKSCluster() {
    if [ `az group exists --name "${DEPLOYMENT_NAME}"` == "false" ] ; then
        if ! az group create --name "${DEPLOYMENT_NAME}" --location "${AZ_LOCATION}" &>/dev/null ; then
            echo "az group create failed."
            exit 1
        fi
    else
        echo "Resource group ${DEPLOYMENT_NAME} already exists, skip az group create."
    fi
    if ! az aks get-credentials --resource-group=${DEPLOYMENT_NAME} --name=${DEPLOYMENT_NAME} 2>/dev/null ;
    then
        echo "Kubernetes cluster not found, creating."
        az aks create --resource-group ${DEPLOYMENT_NAME} --name=${DEPLOYMENT_NAME} --node-count 3 --node-vm-size ${AZ_NODE_SIZE} --kubernetes-version 1.12.5 --generate-ssh-keys -l "${AZ_LOCATION}" --service-principal ${AZ_CLIENT_ID} --client-secret "${AZ_CLIENT_SECRET}" 
        if ! az aks get-credentials --resource-group=${DEPLOYMENT_NAME} --name=${DEPLOYMENT_NAME} 2>/dev/null ; then
            echo "az aks create failed."
            exit 1
        fi
    else
        echo "Kubernetes cluster already exists, skip az aks create. (az aks get-credentials)"
    fi

    kubectl config use-context ${DEPLOYMENT_NAME}
    kubectl config current-context
    kubectl get nodes
    
    # Install the nvidia device plugin
    if [ ! `kubectl get ds --all-namespaces | grep nvidia-device-plugin` ] ; then
        kubectl apply -f https://raw.githubusercontent.com/nvidia/k8s-device-plugin/v1.11/nvidia-device-plugin.yml
        echo "installed nvidia-device-plugin"
    fi
}

createAzSecrets() {
  # creates a secret "azcreds" that holds Azure credentials for use in Kubeflow Pipelines (and other places)
  check_variable "${AZ_CLIENT_ID}" "AZ_CLIENT_ID"
  check_variable "${AZ_CLIENT_SECRET}" "AZ_CLIENT_SECRET"
  check_variable "${AZ_TENANT_ID}" "AZ_TENANT_ID"
  check_variable "${AZ_SUBSCRIPTION_ID}" "AZ_SUBSCRIPTION_ID"

  set +e
  O=$(kubectl get secret --namespace=${K8S_NAMESPACE} azcreds 2>&1)
  RESULT=$?
  set -e

  if [ "${RESULT}" -eq 0 ]; then
    echo Secret azcreds already exists
  else
    kubectl create secret generic --namespace=${K8S_NAMESPACE} azcreds --from-literal=AZ_CLIENT_ID=${AZ_CLIENT_ID} --from-literal=AZ_CLIENT_SECRET=${AZ_CLIENT_SECRET} --from-literal=AZ_TENANT_ID=${AZ_TENANT_ID} --from-literal=AZ_SUBSCRIPTION_ID=${AZ_SUBSCRIPTION_ID}
  fi
}