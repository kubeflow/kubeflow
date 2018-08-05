#!/usr/bin/env bash

cleanup()
{
  if [[ -n $portforwardcommand ]]; then
    echo killing $portforwardcommand
    pkill -f $portforwardcommand
  fi
}
trap cleanup EXIT

portforward()
{
  local pod=$1 from_port=$2 to_port=$3 cmd
  cmd='kubectl port-forward $pod ${from_port}:${to_port} 2>&1>/dev/null &'
  portforwardcommand="kubectl port-forward $pod ${from_port}:${to_port}"
  ( $verbose && echo $cmd && eval $cmd ) || eval $cmd
}

waitforpod()
{
  local cmd="kubectl get pods --no-headers -oname --selector=app=kubeflow-bootstrapper --field-selector=status.phase=Running --namespace=kubeflow-admin | sed 's/^pod.*\///'" found=$(eval "$cmd")
  while [[ -z $found ]]; do
    sleep 1
    found=$(eval "$cmd")
  done
  echo $found
}

waitforever()
{
  which gsleep >/dev/null
  if [[ $? == 1 ]]; then
    while true; do
      sleep 1
    done
  else
    gsleep infinity
  fi
}

kubectl apply -f bootstrapper.debug.yaml
echo "Waiting for pod's status == Running ..."
pod=$(waitforpod)
port=2345
echo "Pod $pod is running. Setting up port-forward"
portforward $pod $port $port
echo "Type Ctrl^C to end debug session"
waitforever
