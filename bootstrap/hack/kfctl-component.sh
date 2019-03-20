#!/usr/bin/env bash

usage () 
{
  echo -e "Usage: $0 COMMANDS\n"\
  'OPTIONS:\n'\
  '  -h       | --help       \n'\
  '  -V       | --verbose\n'\
  'COMMANDS:\n'\
  '  add      <component> -- --arg=value --arg=value\n'\
  '  remove   <component>\n'\
  '\n'\
  'where [component] is ambassador, cloud-endpoints, ...\n'
}

addcommand()
{
  local component
  if (( $# == 0 ));then 
    usage
  fi
  tmpdir=$(mktemp -d)
  component=$1
  shift 1
  pushd $tmpdir
  kfctl init kubeflow 
  pushd kubeflow
  cat << APP_YAML > app.yaml
apiVersion: kfdef.apps.kubeflow.org/v1alpha1
kind: KfDef
metadata:
  name: kubeflow
  namespace: kubeflow
spec:
  appdir: $tmpdir/kubeflow
  componentParams:
    ${component}:
APP_YAML

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
  - $component
  packages:
  - $component
  repo: $tmpdir/kubeflow/.cache/master/kubeflow
  useBasicAuth: false
  version: master
REMAINDER

  kfctl generate all
  popd
  popd
  echo kubeflow created in $tmpdir/kubeflow
}

commands () 
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



