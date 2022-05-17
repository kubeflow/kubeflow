#!/bin/sh

# Wait for the pod to generate a done file.
until kubectl exec $1 -n kf-conformance -- ls $2
do
    sleep 30
    echo Waiting for $1 to finish ...
done

KFP_REPORT_PATH=/tmp/kf-conformance/$(basename $3)
kubectl cp kf-conformance/$1:$3 $KFP_REPORT_PATH

echo KFP test report copied to $KFP_REPORT_PATH