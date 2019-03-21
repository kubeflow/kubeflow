#!/usr/bin/env bash
#
# this will deploy a single component using kfctl 
# It is expected to be run in a container where kfctl is built
# The image is built in the Makefile 
#   `make build-kfctl-container`
# Deploying a single component can be done by running the following (assumes GCLOUD_PROJECT is defined)
#   `envsubst < hack/job.yaml.sample | kubectl apply -f -`
# which will deploy the openvino component
#
# If you would like to deploy locallly without using a container you can run something like:
#   hack/kfctl-component.sh add openvino --registry=docker.io --repoPath=intelaipg --image=openvino-model-server:0.4
# Deleting the component would be:
#   hack/kfctl-component.sh remove openvino

pushd() { builtin pushd "$@" > /dev/null; }
popd() { builtin popd "$@" > /dev/null; }
random-string() { LC_CTYPE=C tr -dc A-Za-z0-9 < /dev/urandom | fold -w 4 | head -1; }

name=$(random-string 4)
namespace=kubeflow
dryrun=''
tmpdir=/tmp

usage () 
{
  echo -e "Usage: $0 OPTIONS COMMANDS\n"\
  'OPTIONS:\n'\
  '  -h       | --help       \n'\
  '  -V       | --verbose\n'\
  '           | --dry-run\n'\
  '             --name <name>\n'\
  '             --namespace <namespace>\n'\
  'COMMANDS:\n'\
  '  add      <component> --arg=value --arg=value\n'\
  '  remove   <component>\n'\
  '\n'\
  'where [component] is ambassador, cloud-endpoints, ...\n'
}

writeConfigFile()
{
  local component
  if (( $# == 0 ));then 
    usage
  fi
  component=$1
  shift 1
  tmpdir=$(mktemp -d)
  pushd $tmpdir
  kfctl init kubeflow 
  pushd kubeflow
  cat << APP_YAML > app.yaml
apiVersion: kfdef.apps.kubeflow.org/v1alpha1
kind: KfDef
metadata:
  name: kubeflow
  namespace: $namespace
spec:
  appdir: $tmpdir/kubeflow
  componentParams:
    ${component}:
APP_YAML
}

removecommand()
{
  writeConfigFile $1
  kfctl generate all
  kfctl delete all
  echo component $component created in $tmpdir/kubeflow
}

addcommand()
{
  local component
  if (( $# == 0 ));then 
    usage
  fi
  component=$1
  shift 1
  writeConfigFile $component
  while [[ "$#" -gt "0" && $1 =~ ^-- ]]; do
    arg="$1"
    shift
    arg=${arg#--}
    name=${arg%=*}
    value=${arg#*=}
    cat << COMPONENT_ARG >> app.yaml
    - name: $name
      value: "${value}"
COMPONENT_ARG
  done

  cat << REMAINDER >> app.yaml
  components:
  - echo-server
  - $component
  packages:
  - common
  - $component
  repo: $tmpdir/kubeflow/.cache/master/kubeflow
  useBasicAuth: false
  version: master
REMAINDER

  kfctl generate all
  kfctl apply all $dryrun
  popd
  popd
  echo component $component created in $tmpdir/kubeflow
}

commands() 
{
  if [ $# = "0" ]; then
    usage
    exit 1
  fi
  while :
  do
    case "$1" in
      add)
        shift 1
        addcommand $@
        break;
        ;;
      remove)
        shift 1
        removecommand $@
        break
        ;;
      *)
        echo "**** unknown argument $1 ****"
        exit 1
        break
        ;;  
    esac
  done
}

while :
do
  case "$1" in
    -h | --help)
	  help
	  exit 0
	  ;;
    -V | --verbose)
      verbose=true
      shift
      ;;
    --namespace=* | --namespace)
      case "$1" in
        --namespace=*)
          namespace=${1#--namespace=}
          shift 1
          ;;
        --namespace)
          namespace="$2"
          shift 2
          ;;
      esac
      ;;
    --name=* | --name)
      case "$1" in
        --name=*)
          name=${1#--name=}
          shift 1
          ;;
        --name)
          name="$2"
          shift 2
          ;;
      esac
      ;;
    --dry-run)
      dryrun=' --dry-run '
      shift 1
      ;;
    --) 
      shift
      break
      ;;
    -*)
      echo "Error: Unknown option: $1" >&2
      exit 1
      ;;
    *) 
      break
      ;;
  esac
done
commands $*
