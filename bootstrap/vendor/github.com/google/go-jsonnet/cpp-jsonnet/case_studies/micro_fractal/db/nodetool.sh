#!/bin/bash

if [ $# == 0 ] ; then
    echo "Usage: $0 <db-hostname> ..."
    exit 1
fi

DB_HOSTNAME=$1

shift

ssh -oStrictHostKeyChecking=no -- ${DB_HOSTNAME} nodetool "$@"
